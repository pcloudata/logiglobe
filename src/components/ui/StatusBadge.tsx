import type { CargoStatus } from '../../types'
import { cn } from '../../lib/cn'

export function StatusBadge({ status }: { status: CargoStatus }) {
  const pending = status === 'Pending'
  return (
    <span
      className={cn(
        'inline-flex min-w-[76px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold',
        pending
          ? 'bg-[var(--status-pending)] text-white'
          : 'bg-[var(--status-arrived)] text-black',
      )}
    >
      {status}
    </span>
  )
}
