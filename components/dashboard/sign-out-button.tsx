'use client'

import { IconLoader, IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    // Capture sign out event before resetting
    posthog.capture('user_signed_out')
    posthog.reset()
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
      },
    })
  }

  return (
    <Button
      className="gap-2 text-muted-foreground hover:text-foreground"
      disabled={isLoading}
      onClick={handleSignOut}
      size="sm"
      variant="ghost"
    >
      {isLoading ? (
        <IconLoader className="size-4 animate-spin" />
      ) : (
        <IconLogout className="size-4" />
      )}
      <span className="hidden sm:inline">Sign out</span>
    </Button>
  )
}
