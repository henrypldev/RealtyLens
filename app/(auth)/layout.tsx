import { Toaster } from '@/components/ui/sonner'
import { constructMetadata } from '@/lib/constructMetadata'

export const metadata = constructMetadata({
  title: 'Authentication | RealtyLens',
  description: 'Sign in or create an account to access RealtyLens AI photo editing.',
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">{children}</div>
      <Toaster position="top-center" />
    </div>
  )
}
