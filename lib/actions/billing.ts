"use server";

import { revalidatePath } from "next/cache";
import { verifySystemAdmin } from "@/lib/admin-auth";
import {
  type BillingStats,
  createAffiliateEarning,
  getAffiliateRelationshipByReferred,
  getBillingStats,
  getInvoiceById,
  getInvoiceHistory,
  getWorkspacePricing,
  type InvoiceHistoryRow,
  updateInvoice,
  upsertWorkspacePricing,
} from "@/lib/db/queries";
import type { Invoice, InvoiceStatus, WorkspacePricing } from "@/lib/db/schema";

export type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

export async function getWorkspacePricingAction(
  workspaceId: string,
): Promise<ActionResult<{ imageProjectPriceOre: number; videoProjectPriceOre: number }>> {
  try {
    const pricing = await getWorkspacePricing(workspaceId);
    return {
      success: true,
      data: {
        imageProjectPriceOre: pricing.imageProjectPriceOre,
        videoProjectPriceOre: pricing.videoProjectPriceOre,
      },
    };
  } catch (error) {
    console.error("[billing:getWorkspacePricing] Error:", error);
    return { success: false, error: "Failed to get workspace pricing" };
  }
}

export async function updateWorkspacePricingAction(
  workspaceId: string,
  data: {
    imageProjectPriceOre?: number | null;
    videoProjectPriceOre?: number | null;
  },
): Promise<ActionResult<WorkspacePricing>> {
  const adminCheck = await verifySystemAdmin();
  if (adminCheck.error) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const pricing = await upsertWorkspacePricing(workspaceId, data);
    revalidatePath("/admin/billing");
    return { success: true, data: pricing };
  } catch (error) {
    console.error("[billing:updateWorkspacePricing] Error:", error);
    return { success: false, error: "Failed to update workspace pricing" };
  }
}

export async function markInvoiceAsPaidAction(invoiceId: string): Promise<ActionResult<Invoice>> {
  const adminCheck = await verifySystemAdmin();
  if (adminCheck.error) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const invoice = await getInvoiceById(invoiceId);
    if (!invoice) {
      return { success: false, error: "Invoice not found" };
    }

    const updated = await updateInvoice(invoiceId, {
      status: "paid",
      paidAt: new Date(),
    });

    if (!updated) {
      return { success: false, error: "Failed to update invoice" };
    }

    const affiliateRelationship = await getAffiliateRelationshipByReferred(invoice.workspaceId);

    if (affiliateRelationship) {
      await createAffiliateEarning({
        affiliateWorkspaceId: affiliateRelationship.affiliateWorkspaceId,
        affiliateRelationshipId: affiliateRelationship.id,
        invoiceId: invoice.id,
        invoiceAmountOre: invoice.totalAmountOre,
        commissionPercent: affiliateRelationship.commissionPercent,
      });
    }

    revalidatePath("/admin/billing");
    return { success: true, data: updated };
  } catch (error) {
    console.error("[billing:markInvoiceAsPaid] Error:", error);
    return { success: false, error: "Failed to mark invoice as paid" };
  }
}

export async function getInvoiceHistoryAction(filters?: {
  workspaceId?: string;
  status?: InvoiceStatus;
}): Promise<ActionResult<InvoiceHistoryRow[]>> {
  const adminCheck = await verifySystemAdmin();
  if (adminCheck.error) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const invoices = await getInvoiceHistory(filters);
    return { success: true, data: invoices };
  } catch (error) {
    console.error("[billing:getInvoiceHistory] Error:", error);
    return { success: false, error: "Failed to get invoice history" };
  }
}

export async function getBillingStatsAction(): Promise<ActionResult<BillingStats>> {
  const adminCheck = await verifySystemAdmin();
  if (adminCheck.error) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const stats = await getBillingStats();
    return { success: true, data: stats };
  } catch (error) {
    console.error("[billing:getBillingStats] Error:", error);
    return { success: false, error: "Failed to get billing stats" };
  }
}

export async function cancelInvoiceAction(invoiceId: string): Promise<ActionResult<Invoice>> {
  const adminCheck = await verifySystemAdmin();
  if (adminCheck.error) {
    return { success: false, error: adminCheck.error };
  }

  try {
    const updated = await updateInvoice(invoiceId, {
      status: "cancelled",
    });

    if (!updated) {
      return { success: false, error: "Invoice not found" };
    }

    revalidatePath("/admin/billing");
    return { success: true, data: updated };
  } catch (error) {
    console.error("[billing:cancelInvoice] Error:", error);
    return { success: false, error: "Failed to cancel invoice" };
  }
}
