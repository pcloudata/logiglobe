import { useDashboard } from '../../hooks/useDashboard'

export function LeftPromo() {
  const { setHowItWorksOpen } = useDashboard()

  return (
    <div className="pointer-events-none absolute left-20 top-[40%] z-20 max-w-[250px] -translate-y-1/2">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
        AI-Powered
      </p>
      <h2 className="font-display mt-2 text-[23px] font-medium leading-[1.2] tracking-[-0.02em] text-white">
        Plan Your Route with AI Now{' '}
        <span className="text-[var(--accent-yellow)]">+</span>
      </h2>
      <button
        type="button"
        onClick={() => setHowItWorksOpen(true)}
        className="pointer-events-auto mt-3.5 border-b border-[var(--accent-yellow)]/90 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-yellow)] transition hover:text-[var(--accent-yellow-soft)]"
      >
        How it Works
      </button>
    </div>
  )
}
