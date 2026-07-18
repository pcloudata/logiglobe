import { useMemo, useRef } from 'react'
import { Plane, Ship } from 'lucide-react'
import { FLIGHTS } from '../../data/flights'
import { latLonToFlat } from '../../lib/geo'
import { useDashboard } from '../../hooks/useDashboard'
import { cn } from '../../lib/cn'

const MAP =
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'

const W = 1200
const H = 600

function arcPath(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
) {
  const a = latLonToFlat(from.lat, from.lon, W, H)
  const b = latLonToFlat(to.lat, to.lon, W, H)
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2 - 40
  return { a, b, d: `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`, mid: { x: mx, y: my + 10 } }
}

export function FlatMap() {
  const { selectedFlightId, setSelectedFlightId, setCoords } = useDashboard()
  const wrap = useRef<HTMLDivElement>(null)

  const routes = useMemo(
    () =>
      FLIGHTS.map((f) => ({
        flight: f,
        ...arcPath(f.from, f.to),
      })),
    [],
  )

  return (
    <div
      ref={wrap}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#05070B]"
      onMouseMove={(e) => {
        const rect = wrap.current?.getBoundingClientRect()
        if (!rect) return
        const x = ((e.clientX - rect.left) / rect.width) * W
        const y = ((e.clientY - rect.top) / rect.height) * H
        const lon = (x / W) * 360 - 180
        const lat = 90 - (y / H) * 180
        setCoords({ x: lat, y: lon })
      }}
    >
      <div className="relative w-[min(92vw,1100px)] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        <img src={MAP} alt="World map" className="block h-auto w-full opacity-90" />
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {routes.map(({ flight, d, mid }) => {
            const selected = selectedFlightId === flight.id
            const Icon = flight.kind === 'ship' ? Ship : Plane
            return (
              <g key={flight.id}>
                <path
                  d={d}
                  fill="none"
                  stroke="#F0C93A"
                  strokeWidth={selected || flight.highlight === 'primary' ? 3.5 : 2}
                  strokeOpacity={selected ? 1 : 0.7}
                />
                <foreignObject x={mid.x - 40} y={mid.y - 14} width={80} height={28}>
                  <button
                    type="button"
                    onClick={() => setSelectedFlightId(flight.id)}
                    className={cn(
                      'flex h-7 w-full items-center justify-center gap-1 rounded-full text-[10px] font-bold',
                      selected || flight.highlight === 'primary'
                        ? 'bg-[var(--accent-yellow)] text-black'
                        : 'bg-black/70 text-white',
                    )}
                  >
                    <Icon size={10} />
                    {flight.code}
                  </button>
                </foreignObject>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
