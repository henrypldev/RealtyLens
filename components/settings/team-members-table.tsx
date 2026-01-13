'use client'

import {
  IconArrowDown,
  IconArrowUp,
  IconCopy,
  IconCrown,
  IconDots,
  IconLoader2,
  IconShield,
  IconTrash,
  IconUser,
} from '@tabler/icons-react'
import type * as React from 'react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cancelWorkspaceInvitation } from '@/lib/actions/invitations'
import type { MemberStatus, TeamMember, UserRole } from '@/lib/mock/workspace'
import { cn } from '@/lib/utils'

interface TeamMembersTableProps {
  members: TeamMember[]
  currentUserId?: string
}

const roleConfig: Record<
  UserRole,
  {
    label: string
    icon: React.ReactNode
    variant: 'default' | 'secondary' | 'outline'
    color: string
  }
> = {
  owner: {
    label: 'Owner',
    icon: <IconCrown className="h-3 w-3" />,
    variant: 'default',
    color: 'var(--accent-teal)',
  },
  admin: {
    label: 'Admin',
    icon: <IconShield className="h-3 w-3" />,
    variant: 'secondary',
    color: 'var(--accent-amber)',
  },
  member: {
    label: 'Member',
    icon: <IconUser className="h-3 w-3" />,
    variant: 'outline',
    color: 'var(--muted-foreground)',
  },
}

const statusConfig: Record<MemberStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
  },
}

function MemberAvatar({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-sm ring-1 ring-foreground/5"
      style={{
        background: member.image
          ? `url(${member.image}) center/cover`
          : 'linear-gradient(135deg, color-mix(in oklch, var(--accent-teal) 30%, transparent) 0%, color-mix(in oklch, var(--accent-teal) 10%, transparent) 100%)',
      }}
    >
      {!member.image && <span style={{ color: 'var(--accent-teal)' }}>{initials}</span>}
    </div>
  )
}

function MemberRow({
  member,
  isCurrentUser,
  index,
}: {
  member: TeamMember
  isCurrentUser: boolean
  index: number
}) {
  const [isPending, startTransition] = useTransition()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const role = roleConfig[member.role]
  const status = statusConfig[member.status]

  const handleCopyInviteLink = async () => {
    if (!member.inviteToken) return
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    const inviteUrl = `${baseUrl}/invite/${member.inviteToken}`
    try {
      await navigator.clipboard.writeText(inviteUrl)
      toast.success('Invite link copied to clipboard')
    } catch {
      toast.error('Failed to copy link')
    }
    setIsMenuOpen(false)
  }

  const handleCancelInvite = () => {
    startTransition(async () => {
      const result = await cancelWorkspaceInvitation(member.id)
      if (result.success) {
        toast.success('Invitation cancelled')
      } else {
        toast.error(result.error)
      }
      setIsMenuOpen(false)
    })
  }

  return (
    <tr
      className={cn(
        'group animate-fade-in-up border-foreground/5 border-b transition-colors hover:bg-muted/30',
        isCurrentUser && 'bg-muted/20',
      )}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* User info */}
      <td className="py-3 pr-4">
        <div className="flex items-center gap-3">
          <MemberAvatar member={member} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-medium text-foreground">{member.name}</p>
              {isCurrentUser && (
                <span className="font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
                  You
                </span>
              )}
            </div>
            <p className="truncate text-muted-foreground text-sm">{member.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="py-3 pr-4">
        <Badge
          className="gap-1"
          style={{
            backgroundColor:
              member.role === 'owner'
                ? 'color-mix(in oklch, var(--accent-teal) 15%, transparent)'
                : member.role === 'admin'
                  ? 'color-mix(in oklch, var(--accent-amber) 15%, transparent)'
                  : undefined,
            color: member.role !== 'member' ? role.color : undefined,
            borderColor:
              member.role !== 'member'
                ? `color-mix(in oklch, ${role.color} 30%, transparent)`
                : undefined,
          }}
          variant={role.variant}
        >
          {role.icon}
          {role.label}
        </Badge>
      </td>

      {/* Status */}
      <td className="py-3 pr-4">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2 py-0.5 font-medium text-xs',
            status.className,
          )}
        >
          {status.label}
        </span>
      </td>

      {/* Joined */}
      <td className="hidden py-3 pr-4 sm:table-cell">
        <span className="text-muted-foreground text-sm">
          {member.joinedAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3 text-right">
        <DropdownMenu onOpenChange={setIsMenuOpen} open={isMenuOpen}>
          <DropdownMenuTrigger
            render={
              <Button
                className="opacity-0 transition-opacity group-hover:opacity-100 data-[state=open]:opacity-100"
                disabled={member.role === 'owner' || isPending}
                size="icon-sm"
                variant="ghost"
              >
                {isPending ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <IconDots className="h-4 w-4" />
                )}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-48">
            {member.status === 'pending' && member.inviteToken && (
              <>
                <DropdownMenuItem className="gap-2" onClick={handleCopyInviteLink}>
                  <IconCopy className="h-4 w-4" />
                  Copy Invite Link
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {member.status === 'active' && member.role === 'member' && (
              <DropdownMenuItem className="gap-2">
                <IconArrowUp className="h-4 w-4" />
                Make Admin
              </DropdownMenuItem>
            )}
            {member.status === 'active' && member.role === 'admin' && (
              <DropdownMenuItem className="gap-2">
                <IconArrowDown className="h-4 w-4" />
                Make Member
              </DropdownMenuItem>
            )}
            {member.status === 'pending' ? (
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={handleCancelInvite}
              >
                <IconTrash className="h-4 w-4" />
                Cancel Invite
              </DropdownMenuItem>
            ) : (
              member.role !== 'owner' && (
                <>
                  {member.role !== 'admin' && <DropdownMenuSeparator />}
                  <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                    <IconTrash className="h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

export function TeamMembersTable({ members, currentUserId = 'usr_001' }: TeamMembersTableProps) {
  // Sort: owner first, then admins, then members, within each group sort by name
  // Pending members go at the end
  const sortedMembers = [...members].sort((a, b) => {
    // Active members before pending
    if (a.status !== b.status) {
      if (a.status === 'pending') return 1
      if (b.status === 'pending') return -1
    }
    const roleOrder = { owner: 0, admin: 1, member: 2 }
    const roleCompare = roleOrder[a.role] - roleOrder[b.role]
    if (roleCompare !== 0) return roleCompare
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="overflow-hidden rounded-xl border border-foreground/5">
      <table className="w-full">
        <thead>
          <tr className="border-foreground/5 border-b bg-muted/30">
            <th className="py-3 pr-4 pl-4 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Member
            </th>
            <th className="py-3 pr-4 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Role
            </th>
            <th className="py-3 pr-4 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
              Status
            </th>
            <th className="hidden py-3 pr-4 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider sm:table-cell">
              Joined
            </th>
            <th className="py-3 pr-4 text-right font-medium text-muted-foreground text-xs uppercase tracking-wider">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/5">
          {sortedMembers.map((member, index) => (
            <MemberRow
              index={index}
              isCurrentUser={member.id === currentUserId}
              key={member.id}
              member={member}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
