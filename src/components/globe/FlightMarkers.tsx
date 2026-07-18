import { Html } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, Ship } from 'lucide-react'
import { FLIGHTS } from '../../data/flights'
import { createArcPoints, latLonToVector3 } from '../../lib/geo'
import { useDashboard } from '../../hooks/useDashboard'
import { cn } from '../../lib/cn'

const ROUTE_YELLOW = '#F0C93A'

function EndpointLabel({
  lat,
  lon,
  label,
}: {
  lat: number
  lon: number
  label: string
}) {
  const pos = useMemo(() => latLonToVector3(lat, lon, 1.02), [lat, lon])
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color={ROUTE_YELLOW} />
      </mesh>
      <Html center distanceFactor={4.2} style={{ pointerEvents: 'none' }}>
        <div className="label-pill rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#111827] shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {label}
        </div>
      </Html>
    </group>
  )
}

function FlightBadge({
  flightId,
  code,
  kind,
  from,
  to,
  primary,
}: {
  flightId: string
  code: string
  kind: 'flight' | 'ship'
  from: { lat: number; lon: number }
  to: { lat: number; lon: number }
  primary: boolean
}) {
  const { selectedFlightId, setSelectedFlightId } = useDashboard()
  const selected = selectedFlightId === flightId
  const group = useRef<THREE.Group>(null)
  const mid = useMemo(
    () => createArcPoints(from, to, 2, 1, primary ? 0.16 : 0.1)[1],
    [from, to, primary],
  )

  useFrame(({ clock }) => {
    if (group.current && primary) {
      group.current.position.y = mid.y + Math.sin(clock.elapsedTime * 1.4) * 0.008
    }
  })

  const Icon = kind === 'ship' ? Ship : Plane

  return (
    <group ref={group} position={mid}>
      {primary && (
        <mesh>
          <ringGeometry args={[0.038, 0.052, 32]} />
          <meshBasicMaterial
            color={ROUTE_YELLOW}
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      <Html center distanceFactor={3.8} zIndexRange={[100, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedFlightId(flightId)
          }}
          className={cn(
            'marker-hit flex flex-col items-center gap-1 transition',
            selected && 'scale-105',
          )}
        >
          {primary ? (
            <>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#111827] shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {code}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-yellow)] text-[#1a1508] shadow-[0_0_16px_var(--accent-yellow-glow)]">
                <Icon size={14} />
              </span>
            </>
          ) : (
            <span
              className={cn(
                'flex items-center gap-1.5 rounded-full border border-white/12 bg-black/70 px-2 py-1 text-white backdrop-blur-md',
                selected && 'border-[var(--accent-yellow)]/50 bg-[var(--accent-yellow)] text-[#1a1508]',
              )}
            >
              <Icon size={11} />
              <span className="text-[10px] font-semibold tracking-wide">{code}</span>
            </span>
          )}
        </button>
      </Html>
    </group>
  )
}

export function FlightMarkers() {
  const primary = FLIGHTS.find((f) => f.highlight === 'primary')!

  return (
    <group>
      <EndpointLabel lat={primary.from.lat} lon={primary.from.lon} label={primary.fromCode} />
      <EndpointLabel lat={primary.to.lat} lon={primary.to.lon} label={primary.toCode} />

      {FLIGHTS.map((flight) => (
        <FlightBadge
          key={flight.id}
          flightId={flight.id}
          code={flight.code}
          kind={flight.kind}
          from={flight.from}
          to={flight.to}
          primary={flight.highlight === 'primary'}
        />
      ))}
    </group>
  )
}
