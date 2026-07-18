import * as THREE from 'three'
import type { LatLon } from '../types'

export function latLonToVector3(
  lat: number,
  lon: number,
  radius = 1,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

export function vector3ToLatLon(v: THREE.Vector3): LatLon {
  const radius = v.length() || 1
  const lat =
    90 - (Math.acos(THREE.MathUtils.clamp(v.y / radius, -1, 1)) * 180) / Math.PI
  let lon = (Math.atan2(v.z, -v.x) * 180) / Math.PI - 180
  while (lon > 180) lon -= 360
  while (lon < -180) lon += 360
  return { lat, lon }
}

/** Great-circle arc with altitude bulge for visual routes */
export function createArcPoints(
  from: LatLon,
  to: LatLon,
  segments = 64,
  radius = 1,
  altitude = 0.14,
): THREE.Vector3[] {
  const start = latLonToVector3(from.lat, from.lon, radius).normalize()
  const end = latLonToVector3(to.lat, to.lon, radius).normalize()
  const points: THREE.Vector3[] = []

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = new THREE.Vector3().copy(start).lerp(end, t).normalize()
    const elev = Math.sin(Math.PI * t) * altitude
    p.multiplyScalar(radius + elev)
    points.push(p)
  }

  return points
}

export function midpointLatLon(from: LatLon, to: LatLon): LatLon {
  const mid = createArcPoints(from, to, 2, 1, 0.14)[1]
  return vector3ToLatLon(mid)
}

export function latLonToFlat(
  lat: number,
  lon: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const x = ((lon + 180) / 360) * width
  const y = ((90 - lat) / 180) * height
  return { x, y }
}
