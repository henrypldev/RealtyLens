'use server'

import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getProjectById, getWorkspaceById } from '@/lib/db/queries'
import {
  type PaymentMethod,
  type PaymentStatus,
  polarCustomer,
  projectPayment,
} from '@/lib/db/schema'
import { getBaseUrl, POLAR_CONFIG, polar } from '@/lib/polar'

export type ActionResult<T> = { success: true; data: T } | { success: false; error: string }

export async function getOrCreatePolarCustomer(
  workspaceId: string,
): Promise<ActionResult<{ polarCustomerId: string }>> {
  try {
    const existing = await db.query.polarCustomer.findFirst({
      where: eq(polarCustomer.workspaceId, workspaceId),
    })

    if (existing) {
      return {
        success: true,
        data: { polarCustomerId: existing.polarCustomerId },
      }
    }

    const workspaceData = await getWorkspaceById(workspaceId)
    if (!workspaceData) {
      return { success: false, error: 'Workspace not found' }
    }

    const result = await polar.customers.create({
      organizationId: POLAR_CONFIG.ORGANIZATION_ID,
      email: workspaceData.contactEmail || `workspace-${workspaceId}@proppi.app`,
      name: workspaceData.name,
      externalId: workspaceId,
      metadata: {
        workspaceId,
        organizationNumber: workspaceData.organizationNumber || '',
      },
    })

    await db.insert(polarCustomer).values({
      id: nanoid(),
      workspaceId,
      polarCustomerId: result.id,
    })

    return { success: true, data: { polarCustomerId: result.id } }
  } catch (error) {
    console.error('[payments:getOrCreatePolarCustomer] Error:', error)
    return { success: false, error: 'Failed to create Polar customer' }
  }
}

export async function getProjectPaymentStatus(projectId: string): Promise<{
  isPaid: boolean
  method?: PaymentMethod
  status?: PaymentStatus
}> {
  try {
    const payment = await db.query.projectPayment.findFirst({
      where: eq(projectPayment.projectId, projectId),
    })

    if (!payment) {
      return { isPaid: false }
    }

    return {
      isPaid: payment.status === 'completed',
      method: payment.paymentMethod as PaymentMethod,
      status: payment.status as PaymentStatus,
    }
  } catch (error) {
    console.error('[payments:getProjectPaymentStatus] Error:', error)
    return { isPaid: false }
  }
}

export async function createPolarCheckoutSession(
  projectId: string,
  productType: 'image' | 'video' = 'image',
): Promise<ActionResult<{ url: string; checkoutId: string }>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' }
    }

    const projectData = await getProjectById(projectId)
    if (!projectData) {
      return { success: false, error: 'Project not found' }
    }

    const existingPayment = await db.query.projectPayment.findFirst({
      where: eq(projectPayment.projectId, projectId),
    })

    if (existingPayment?.status === 'completed') {
      return { success: false, error: 'Project already paid' }
    }

    const workspaceData = await getWorkspaceById(projectData.project.workspaceId)
    if (!workspaceData) {
      return { success: false, error: 'Workspace not found' }
    }

    const baseUrl = getBaseUrl()
    const productId =
      productType === 'video' ? POLAR_CONFIG.PRODUCT_ID_VIDEO : POLAR_CONFIG.PRODUCT_ID_IMAGE

    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${baseUrl}/dashboard/${projectId}?payment=success`,
      customerEmail:
        workspaceData.contactEmail ||
        session.user.email ||
        `workspace-${projectData.project.workspaceId}@proppi.app`,
      customerName: workspaceData.name,
      customerExternalId: projectData.project.workspaceId,
      metadata: {
        projectId,
        workspaceId: projectData.project.workspaceId,
        userId: session.user.id,
        productType,
      },
    })

    if (existingPayment) {
      await db
        .update(projectPayment)
        .set({
          polarCheckoutId: checkout.id,
          status: 'pending',
          updatedAt: new Date(),
        })
        .where(eq(projectPayment.id, existingPayment.id))
    } else {
      await db.insert(projectPayment).values({
        id: nanoid(),
        projectId,
        workspaceId: projectData.project.workspaceId,
        paymentMethod: 'polar',
        polarCheckoutId: checkout.id,
        amountCents:
          productType === 'video'
            ? POLAR_CONFIG.VIDEO_PRICE_USD_CENTS
            : POLAR_CONFIG.PROJECT_PRICE_USD_CENTS,
        currency: 'usd',
        status: 'pending',
      })
    }

    return {
      success: true,
      data: {
        url: checkout.url,
        checkoutId: checkout.id,
      },
    }
  } catch (error) {
    console.error('[payments:createPolarCheckoutSession] Error:', error)
    return { success: false, error: 'Failed to create checkout session' }
  }
}

export async function handlePolarOrderPaid(
  checkoutId: string,
  orderId: string,
): Promise<ActionResult<{ projectId: string }>> {
  try {
    const payment = await db.query.projectPayment.findFirst({
      where: eq(projectPayment.polarCheckoutId, checkoutId),
    })

    if (!payment) {
      return { success: false, error: 'Payment record not found' }
    }

    await db
      .update(projectPayment)
      .set({
        status: 'completed',
        polarOrderId: orderId,
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(projectPayment.id, payment.id))

    revalidatePath(`/dashboard/${payment.projectId}`)
    return { success: true, data: { projectId: payment.projectId } }
  } catch (error) {
    console.error('[payments:handlePolarOrderPaid] Error:', error)
    return { success: false, error: 'Failed to handle payment success' }
  }
}

export async function handlePolarPaymentFailure(
  checkoutId: string,
): Promise<ActionResult<{ projectId: string }>> {
  try {
    const payment = await db.query.projectPayment.findFirst({
      where: eq(projectPayment.polarCheckoutId, checkoutId),
    })

    if (!payment) {
      return { success: false, error: 'Payment record not found' }
    }

    await db
      .update(projectPayment)
      .set({
        status: 'failed',
        updatedAt: new Date(),
      })
      .where(eq(projectPayment.id, payment.id))

    revalidatePath(`/dashboard/${payment.projectId}`)
    return { success: true, data: { projectId: payment.projectId } }
  } catch (error) {
    console.error('[payments:handlePolarPaymentFailure] Error:', error)
    return { success: false, error: 'Failed to handle payment failure' }
  }
}

export interface SavedPaymentMethod {
  id: string
  brand: string | null
  last4: string | null
  expMonth: number | null
  expYear: number | null
}

export async function getWorkspacePaymentMethods(
  workspaceId: string,
): Promise<ActionResult<{ paymentMethods: SavedPaymentMethod[] }>> {
  try {
    const customerRecord = await db.query.polarCustomer.findFirst({
      where: eq(polarCustomer.workspaceId, workspaceId),
    })

    if (!customerRecord) {
      return { success: true, data: { paymentMethods: [] } }
    }

    const customerSession = await polar.customerSessions.create({
      customerId: customerRecord.polarCustomerId,
    })

    const paymentMethods = await polar.customerPortal.customers.listPaymentMethods(
      { customerSession: customerSession.token },
      {},
    )

    const methods: SavedPaymentMethod[] = []
    for await (const page of paymentMethods) {
      for (const pm of page.items || []) {
        if (pm.type === 'card' && pm.card) {
          methods.push({
            id: pm.stripePaymentMethodId || pm.id || '',
            brand: pm.card.brand || null,
            last4: pm.card.last4 || null,
            expMonth: pm.card.expMonth || null,
            expYear: pm.card.expYear || null,
          })
        }
      }
    }

    return { success: true, data: { paymentMethods: methods } }
  } catch (error) {
    console.error('[payments:getWorkspacePaymentMethods] Error:', error)
    return { success: true, data: { paymentMethods: [] } }
  }
}

export async function createBillingPortalSession(): Promise<ActionResult<{ url: string }>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return { success: false, error: 'Not authenticated' }
    }

    const workspaceId = session.user.workspaceId
    if (!workspaceId) {
      return { success: false, error: 'No workspace found' }
    }

    const customerResult = await getOrCreatePolarCustomer(workspaceId)
    if (!customerResult.success) {
      return { success: false, error: customerResult.error }
    }

    const customerSession = await polar.customerSessions.create({
      customerId: customerResult.data.polarCustomerId,
      returnUrl: `${getBaseUrl()}/dashboard/settings`,
    })

    return { success: true, data: { url: customerSession.customerPortalUrl } }
  } catch (error) {
    console.error('[payments:createBillingPortalSession] Error:', error)
    return { success: false, error: 'Failed to create billing portal session' }
  }
}
