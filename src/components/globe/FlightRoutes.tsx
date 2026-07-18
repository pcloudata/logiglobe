import { useMemo } from 'react'
import * as THREE from 'three'
import { FLIGHTS } from '../../data/flights'
import { createArcPoints } from '../../lib/geo'
import { useDashboard } from '../../hooks/useDashboard'

function RouteLine({
  from,
  to,
  selected,
  primary,
}: {
  from: { lat: number; lon: number }
  to: { lat: number; lon: number }
  selected: boolean
  primary: boolean
}) {
  const { curve, radius } = useMemo(() => {
    const points = createArcPoints(from, to, 72, 1, primary ? 0.16 : 0.1)
    const curve = new THREE.CatmullRomCurve3(points)
    return {
      curve,
      radius: selected ? 0.007 : primary ? 0.005 : 0.0035,
    }
  }, [from, to, selected, primary])

  return (
    <mesh>
      <tubeGeometry args={[curve, 96, radius, 8, false]} />
      <meshBasicMaterial
        color={selected || primary ? '#F0C93A' : '#D4B44A'}
        transparent
        opacity={selected ? 1 : primary ? 0.95 : 0.48}
        depthWrite={false}
      />
    </mesh>
  )
}

export function FlightRoutes() {
  const { selectedFlightId } = useDashboard()

  return (
    <group>
      {FLIGHTS.map((flight) => (
        <RouteLine
          key={flight.id}
          from={flight.from}
          to={flight.to}
          selected={selectedFlightId === flight.id}
          primary={flight.highlight === 'primary'}
        />
      ))}
    </group>
  )
}
