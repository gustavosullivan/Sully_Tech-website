import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const GREEN = '#00ff41'

function Bits() {
  const group = useRef<THREE.Group>(null)
  const meshes = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      pos: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 1,
      ] as [number, number, number],
      scale: 0.04 + Math.random() * 0.08,
      speed: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      const m = meshes[i]
      child.position.y = m.pos[1] + Math.sin(t * m.speed + m.phase) * 0.35
      child.rotation.x = t * 0.4
      child.rotation.z = t * 0.25
    })
  })

  return (
    <group ref={group}>
      {meshes.map((m) => (
        <mesh key={m.id} position={m.pos} scale={m.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={GREEN} transparent opacity={0.35} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function TorusAccent() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    if (!ref.current) return
    ref.current.rotation.x = s.clock.elapsedTime * 0.25
    ref.current.rotation.y = s.clock.elapsedTime * 0.35
  })
  return (
    <mesh ref={ref} position={[2.4, 0.6, -1.2]}>
      <torusGeometry args={[0.55, 0.04, 16, 64]} />
      <meshBasicMaterial color={GREEN} transparent opacity={0.45} toneMapped={false} />
    </mesh>
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
          <Float speed={1.2} floatIntensity={0.4}>
            <TorusAccent />
          </Float>
          <Bits />
        </Suspense>
      </Canvas>
    </div>
  )
}
