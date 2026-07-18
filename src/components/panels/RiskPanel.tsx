import { ArrowDown, Sun } from 'lucide-react'
import { RISK } from '../../data/stats'

export function RiskPanel() {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-[var(--risk-blue)] p-5 text-white shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug">
          Risk of Cargo Loss
        </h3>
        <button
          type="button"
          className="shrink-0 rounded-full bg-[var(--accent-yellow)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1a1508]"
        >
          Details
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-4xl font-bold tabular-nums">
            {RISK.lossPercent}%
          </span>
          <ArrowDown size={18} className="text-white/90" />
        </div>
        <p className="mt-1 text-sm font-medium text-white/90">Loss risk</p>
        <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-white/75">
          {RISK.subtitle}
        </p>
      </div>

      <div className="relative mt-auto flex flex-1 items-end justify-center pb-2 pt-6">
        <div
          className="absolute inset-x-4 bottom-0 top-4 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            maskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />
        <div className="relative z-10 flex w-full max-w-[180px] flex-col items-center">
          <svg viewBox="0 0 200 110" className="w-full">
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* 25% tick position on arc */}
            <circle cx="55" cy="45" r="16" fill="white" />
            <foreignObject x="43" y="33" width="24" height="24">
              <div className="flex h-full w-full items-center justify-center text-black">
                <Sun size={14} />
              </div>
            </foreignObject>
            <text
              x="55"
              y="28"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {RISK.weatherGauge}%
            </text>
          </svg>
          <span className="-mt-2 text-sm font-medium">{RISK.weather}</span>
        </div>
      </div>
    </div>
  )
}
