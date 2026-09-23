import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const GREEN = '#00ff41'

function Bits() {
  const group = useRef<THREE.Group>(null)
  const meshes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        pos: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 5 - 1,
        ] as [number, number, number],
        scale: 0.035 + Math.random() * 0.09,
        speed: 0.25 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        kind: i % 3,
      })),
    [],
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      const m = meshes[i]
      child.position.y = m.pos[1] + Math.sin(t * m.speed + m.phase) * 0.42
      child.rotation.x = t * 0.45
      child.rotation.y = t * 0.3
    })
  })

  return (
    <group ref={group}>
      {meshes.map((m) => (
        <mesh key={m.id} position={m.pos} scale={m.scale}>
          {m.kind === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : m.kind === 1 ? (
            <octahedronGeometry args={[0.7, 0]} />
          ) : (
            <tetrahedronGeometry args={[0.8, 0]} />
          )}
          <meshBasicMaterial color={GREEN} transparent opacity={0.32} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function TorusAccent({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.x = s.clock.elapsedTime * 0.28
    ref.current.rotation.y = s.clock.elapsedTime * 0.4
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.55, 0.035, 16, 72]} />
      <meshBasicMaterial color={GREEN} transparent opacity={0.5} toneMapped={false} />
    </mesh>
  )
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.y = s.clock.elapsedTime * 0.35
  })
  return (
    <Float speed={1.4} floatIntensity={0.55} rotationIntensity={0.2}>
      <mesh ref={ref} position={[-2.2, 0.2, -1.4]} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#0a3d18"
          emissive={GREEN}
          emissiveIntensity={0.45}
          roughness={0.25}
          metalness={0.4}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

export function SceneDecor3D() {
  return (
    <div className="decor3d" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 3]} intensity={1.2} color={GREEN} />
          <Float speed={1.2} floatIntensity={0.4}>
            <TorusAccent position={[2.5, 0.7, -1.2]} />
          </Float>
          <Float speed={0.9} floatIntensity={0.3}>
            <TorusAccent position={[-2.6, -0.8, -1.6]} />
          </Float>
          <CoreOrb />
          <Bits />
        </Suspense>
      </Canvas>
    </div>
  )
}
