import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

/**
 * Soft limb glow hugging the planet — not a thick neon ring.
 * Reference look: thin bright edge that fades outward.
 */
const rimFragment = /* glsl */ `
varying vec3 vNormal;
void main() {
  float f = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  // Narrow bright rim near the edge
  float rim = pow(f, 4.5);
  // Soft outer halo
  float halo = pow(f, 2.2) * 0.35;
  float a = rim + halo;
  vec3 col = mix(vec3(0.45, 0.82, 1.0), vec3(0.7, 0.92, 1.0), rim);
  gl_FragColor = vec4(col * (1.2 + rim * 1.8), a * 0.85);
}
`

/** Subtle blue haze on the front face near the limb */
const frontFragment = /* glsl */ `
varying vec3 vNormal;
void main() {
  float f = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
  float haze = pow(f, 3.0) * 0.45;
  vec3 col = vec3(0.4, 0.75, 1.0);
  gl_FragColor = vec4(col, haze);
}
`

export function Atmosphere() {
  return (
    <group>
      {/* Front-face atmospheric haze at the limb */}
      <mesh scale={1.01}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={frontFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Soft backside rim — tight to the planet */}
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={rimFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
