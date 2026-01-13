import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
        // Status variants for property table
        'status-active':
          'border-emerald-500/20 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
        'status-pending': 'border-amber-500/20 bg-amber-500/15 text-amber-700 dark:text-amber-400',
        'status-completed': 'border-blue-500/20 bg-blue-500/15 text-blue-700 dark:text-blue-400',
        'status-archived': 'border-zinc-500/20 bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
        // Admin status variants
        'status-suspended': 'border-red-500/20 bg-red-500/15 text-red-700 dark:text-red-400',
        'status-trial':
          'border-violet-500/20 bg-violet-500/15 text-violet-700 dark:text-violet-400',
        'status-inactive': 'border-zinc-500/20 bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
        // Plan variants
        'plan-free': 'border-zinc-500/20 bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
        'plan-pro': 'border-blue-500/20 bg-blue-500/15 text-blue-700 dark:text-blue-400',
        'plan-enterprise': 'border-amber-500/20 bg-amber-500/15 text-amber-700 dark:text-amber-400',
        // Role variants
        'role-owner': 'border-violet-500/20 bg-violet-500/15 text-violet-700 dark:text-violet-400',
        'role-admin': 'border-blue-500/20 bg-blue-500/15 text-blue-700 dark:text-blue-400',
        'role-member': 'border-zinc-500/20 bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
        // Tag variant for property tags
        tag: 'rounded-md bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  })
}

export { Badge, badgeVariants }
