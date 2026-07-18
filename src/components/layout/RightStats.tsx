import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { MAIN_STATS } from '../../data/stats'

function CountUp({ to, duration = 900 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{value}</>
}

function Sparkline({ up }: { up?: boolean }) {
  return (
    <svg width="56" height="18" viewBox="0 0 56 18" className="opacity-80">
      <path
        d={up ? 'M1 14 L12 10 L22 12 L34 5 L45 8 L55 2' : 'M1 4 L12 8 L22 6 L34 12 L45 9 L55 14'}
        fill="none"
        stroke={up ? '#34D399' : '#F87171'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function RightStats() {
  return (
    <div className="pointer-events-none absolute right-8 top-28 z-20 w-[210px]">
      <h3 className="font-display text-[17px] font-medium tracking-[-0.02em] text-white">
        Main Statistics
      </h3>

      <div className="mt-6">
        <p className="text-[11px] font-medium text-[var(--text-muted)]">Monthly Delivered</p>
        <div className="mt-1.5 flex items-end gap-2">
          <span className="font-display text-[36px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-white">
            <CountUp to={MAIN_STATS.monthlyDelivered} />
          </span>
          <span className="mb-1 inline-flex items-center gap-0.5 text-[11px] font-semibold text-[var(--positive)]">
            <TrendingUp size={12} />+{MAIN_STATS.monthlyDelta}%
          </span>
        </div>
        <div className="mt-1.5">
          <Sparkline up />
        </div>
      </div>

      <div className="mt-7">
        <p className="text-[11px] font-medium text-[var(--text-muted)]">Yearly Delivered</p>
        <div className="mt-1.5 flex items-end gap-2">
          <span className="font-display text-[36px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-white">
            <CountUp to={MAIN_STATS.yearlyDelivered} />
          </span>
          <span className="mb-1 inline-flex items-center gap-0.5 text-[11px] font-semibold text-[var(--positive)]">
            <TrendingUp size={12} />+{MAIN_STATS.yearlyDelta}%
          </span>
        </div>
        <div className="mt-1.5">
          <Sparkline up />
        </div>
      </div>
    </div>
  )
}
