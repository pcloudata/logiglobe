import { useDashboard } from '../../hooks/useDashboard'

export function LiveCoords() {
  const { coords } = useDashboard()
  return (
    <div className="pointer-events-none absolute bottom-6 left-20 z-20 font-mono text-[11px] leading-relaxed text-white/55">
      <div>X: {coords.x.toFixed(6)}</div>
      <div>Y: {coords.y.toFixed(6)}</div>
    </div>
  )
}
