import { Bell, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useDashboard } from '../../hooks/useDashboard'
import { USER } from '../../data/stats'

export function TopBar() {
  const { latencyMs } = useDashboard()

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-4">
      <div className="pointer-events-auto flex items-center gap-3 pl-14">
        <ThemeToggle />
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-yellow)] text-[11px] font-bold text-[#1a1508]">
            L
          </span>
          <span className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-white/95">
            LogiGlobe
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 top-3.5 -translate-x-1/2 text-center">
        <h1 className="font-display text-[30px] font-light leading-none tracking-[-0.03em] text-white">
          Global View
        </h1>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-[var(--text-muted)]">
          <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-[var(--positive)] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          <span className="font-medium uppercase tracking-[0.18em]">Live Tracking</span>
          <span className="font-mono text-[10px] text-white/75">{latencyMs} ms</span>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        <button
          type="button"
          className="glass flex items-center gap-2 rounded-full py-1 pl-1 pr-3"
        >
          <img
            src={USER.avatar}
            alt={USER.name}
            className="h-8 w-8 rounded-full bg-slate-800 object-cover"
          />
          <span className="text-[13px] font-medium tracking-tight">{USER.name}</span>
          <ChevronDown size={14} className="text-white/45" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="glass relative flex h-10 w-10 items-center justify-center rounded-full"
        >
          <Bell size={15} className="text-white/85" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent-yellow)]" />
        </button>
      </div>
    </header>
  )
}
