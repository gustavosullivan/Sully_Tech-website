import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

const GREEN = '#12c45a'

function NodeRing({ color = GREEN }: { color?: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.55
    ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.25
  })

  return (
    <Float speed={1.6} floatIntensity={0.5} rotationIntensity={0.15}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive={color}
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.03, 12, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[0.85, 0.02, 12, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}

type Props = { className?: string }

export function TechOrb3D({ className = '' }: Props) {
  return (
    <div className={`tech-orb3d ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[2, 3, 2]} intensity={1.1} />
          <pointLight position={[-1, 1, 2]} color={GREEN} intensity={1.4} />
          <NodeRing />
        </Suspense>
      </Canvas>
    </div>
  )
}
