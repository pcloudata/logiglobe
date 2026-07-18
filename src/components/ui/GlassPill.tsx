import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function GlassPill({
  children,
  className,
  onClick,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'div' | 'button'
}) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm',
        onClick && 'cursor-pointer transition hover:border-white/25',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
