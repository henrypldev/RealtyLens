import { constructMetadata } from '@/lib/constructMetadata'

export const metadata = constructMetadata({
  title: 'Sign In | RealtyLens - AI Real Estate Photo Editor',
  description:
    'Sign in to your RealtyLens account to access AI-powered photo editing for real estate. Transform property photos with virtual staging and enhancement.',
  canonical: '/sign-in',
})

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
