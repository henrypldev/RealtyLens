'use client'

import { IconArrowRight } from '@tabler/icons-react'
import { Camera, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useSession } from '@/lib/auth-client'
import { siteConfig } from '@/lib/siteconfig'
import { Button } from '../ui/button'

function AuthButton() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div
        className="h-10 w-28 animate-pulse rounded-full"
        style={{ backgroundColor: 'var(--landing-border)' }}
      />
    )
  }

  const href = session ? '/dashboard' : '/sign-in'
  const text = session ? 'Dashboard' : 'Get Started'

  return (
    <Button
      size="lg"
      render={
        <Link href={href}>
          {text}
          <IconArrowRight className="size-4" />
        </Link>
      }
      nativeButton={false}
    />
  )
}

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">{siteConfig.name}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            {/* CTA Button */}
            <Suspense
              fallback={
                <div
                  className="h-10 w-28 animate-pulse rounded-full"
                  style={{ backgroundColor: 'var(--landing-border)' }}
                />
              }
            >
              <AuthButton />
            </Suspense>
          </div>

          <button
            className="md:hidden p-2 min-h-11 min-w-11 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-base font-medium text-muted-foreground hover:text-foreground py-2"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-base font-medium text-muted-foreground hover:text-foreground py-2"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="text-base font-medium text-muted-foreground hover:text-foreground py-2"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="outline" className="w-full min-h-11 bg-transparent">
                  Log in
                </Button>
                <Button className="w-full min-h-11">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
