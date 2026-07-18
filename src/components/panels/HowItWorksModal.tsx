import { Route, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'

const STEPS = [
  {
    icon: Route,
    title: 'Ingest global lanes',
    body: 'LogiGlobe consolidates flights, ocean legs, and warehouse handoffs into a single live network graph.',
  },
  {
    icon: ShieldCheck,
    title: 'Score cargo risk',
    body: 'Weather, congestion, and carrier reliability feed a continuous loss-risk model — currently 10% with sunny corridors.',
  },
  {
    icon: Sparkles,
    title: 'Recommend the route',
    body: 'AI proposes the optimal path on the globe. Click a pin or Activities row to focus any shipment instantly.',
  },
]

export function HowItWorksModal() {
  const { howItWorksOpen, setHowItWorksOpen } = useDashboard()
  if (!howItWorksOpen) return null

  return (
    <div className="pointer-events-auto absolute inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-title"
        className="animate-fade-in relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0E1422] p-6 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setHowItWorksOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-yellow)]">
          LogiGlobe AI
        </p>
        <h2 id="how-title" className="font-display mt-2 text-2xl font-semibold">
          How it Works
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          Plan routes with the same AI-assisted workflow shown in Global View — from lane
          discovery to risk-aware recommendations on the 3D globe.
        </p>

        <ol className="mt-6 space-y-4">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-yellow)] text-black">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">
                  <span className="mr-2 text-white/40">{i + 1}.</span>
                  {title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={() => setHowItWorksOpen(false)}
          className="mt-7 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Back to Global View
        </button>
      </div>
    </div>
  )
}
