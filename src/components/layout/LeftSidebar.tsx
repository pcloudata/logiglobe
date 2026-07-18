import {
  Box,
  ChevronsRight,
  Clock,
  Globe2,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { cn } from '../../lib/cn'

const NAV = [
  { icon: Globe2, label: 'Global View', active: true },
  { icon: Box, label: 'Inventory' },
  { icon: Clock, label: 'History' },
  { icon: User, label: 'Profile' },
]

export function LeftSidebar() {
  return (
    <aside className="pointer-events-auto absolute bottom-6 left-3 top-4 z-30 flex w-11 flex-col items-center rounded-2xl glass-strong py-3">
      <button
        type="button"
        aria-label="Expand"
        className="mb-4 text-[var(--accent-yellow)]"
      >
        <ChevronsRight size={18} />
      </button>

      <nav className="flex flex-1 flex-col items-center gap-4">
        {NAV.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl transition',
              active
                ? 'bg-[var(--accent-yellow)] text-[#1a1508] shadow-[0_0_16px_var(--accent-yellow-glow)]'
                : 'text-white/50 hover:bg-white/8 hover:text-white',
            )}
          >
            <Icon size={16} />
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-3">
        <button
          type="button"
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/55 hover:bg-white/10 hover:text-white"
        >
          <Settings size={16} />
        </button>
        <button
          type="button"
          aria-label="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/55 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}
