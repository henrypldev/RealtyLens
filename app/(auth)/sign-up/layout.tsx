import { constructMetadata } from '@/lib/constructMetadata'

export const metadata = constructMetadata({
  title: 'Sign Up | RealtyLens - Start Editing Real Estate Photos with AI',
  description:
    'Create your free RealtyLens account and start transforming property photos with AI. Virtual staging, sky replacement, and professional enhancement in seconds.',
  canonical: '/sign-up',
  keywords: [
    'sign up',
    'create account',
    'real estate photo editor',
    'virtual staging free trial',
    'AI photo editing',
  ],
})

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
