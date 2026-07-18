import { useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Daytime Blue Marble — rendered unlit so oceans stay vivid blue
 * (MeshStandard + ACES was crushing this into a night look).
 */
const EARTH_DAY =
  'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg'

export function Earth() {
  const colorMap = useTexture(EARTH_DAY)

  useEffect(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace
    colorMap.anisotropy = 8
    colorMap.needsUpdate = true
  }, [colorMap])

  return (
    <mesh>
      <sphereGeometry args={[1, 96, 96]} />
      {/* Unlit = full day brightness, matching the reference */}
      <meshBasicMaterial
        map={colorMap}
        toneMapped={false}
        // Slight cool lift so oceans read brighter blue
        color={new THREE.Color('#dceeff')}
      />
    </mesh>
  )
}
