import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { FLIGHTS } from '../../data/flights'
import { createArcPoints, vector3ToLatLon } from '../../lib/geo'
import { useDashboard } from '../../hooks/useDashboard'
import { Atmosphere } from './Atmosphere'
import { Earth } from './Earth'
import { FlightMarkers } from './FlightMarkers'
import { FlightRoutes } from './FlightRoutes'
import { Stars } from './Stars'
import { Suspense } from 'react'

const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0)
const DEFAULT_POSITION = new THREE.Vector3(0.35, 0.55, 2.35)

function ControlsBridge() {
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const {
    zoomCommand,
    requestZoom,
    recenterToken,
    focusFlightId,
    clearFocus,
    setCoords,
  } = useDashboard()

  useEffect(() => {
    if (!zoomCommand) return
    const dir = Math.sign(zoomCommand)
    const controlsObj = controls.current
    if (!controlsObj) return
    const offset = new THREE.Vector3().copy(camera.position).sub(controlsObj.target)
    const distance = offset.length() * (dir > 0 ? 1.12 : 0.88)
    offset.normalize().multiplyScalar(THREE.MathUtils.clamp(distance, 1.45, 4.2))
    camera.position.copy(controlsObj.target).add(offset)
    controlsObj.update()
    requestZoom(0)
  }, [zoomCommand, camera, requestZoom])

  useEffect(() => {
    if (!recenterToken) return
    camera.position.copy(DEFAULT_POSITION)
    controls.current?.target.copy(DEFAULT_TARGET)
    controls.current?.update()
  }, [recenterToken, camera])

  useEffect(() => {
    if (!focusFlightId) return
    const flight = FLIGHTS.find((f) => f.id === focusFlightId)
    if (!flight) return
    const mid = createArcPoints(flight.from, flight.to, 2, 1, 0.14)[1]
    const camPos = mid.clone().normalize().multiplyScalar(2.4)
    camera.position.lerp(camPos, 1)
    controls.current?.target.copy(DEFAULT_TARGET)
    controls.current?.update()
    clearFocus()
  }, [focusFlightId, camera, clearFocus])

  const lastPush = useRef(0)
  useFrame(() => {
    const now = performance.now()
    if (now - lastPush.current < 80) return
    lastPush.current = now
    const look = camera.position.clone().normalize()
    const { lat, lon } = vector3ToLatLon(look)
    setCoords({ x: lat, y: lon })
  })

  return (
    <OrbitControls
      ref={controls}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.45}
      zoomSpeed={0.7}
      panSpeed={0.4}
      minDistance={1.45}
      maxDistance={4.2}
      enablePan
    />
  )
}

function PointerPicker() {
  const { setCoords } = useDashboard()
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!e.point) return
    const { lat, lon } = vector3ToLatLon(e.point.clone().normalize())
    setCoords({ x: lat, y: lon })
  }
  return (
    <mesh visible={false} onPointerMove={onPointerMove}>
      <sphereGeometry args={[1.01, 32, 32]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#05070c']} />
      {/* Soft fill only — Earth itself is unlit (day texture) */}
      <ambientLight intensity={0.4} />
      <Stars />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Atmosphere />
      <FlightRoutes />
      <FlightMarkers />
      <PointerPicker />
      <ControlsBridge />
    </>
  )
}

export function GlobeScene() {
  const cam = useMemo(
    () => ({ position: DEFAULT_POSITION.toArray() as [number, number, number], fov: 42 }),
    [],
  )

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={cam}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
