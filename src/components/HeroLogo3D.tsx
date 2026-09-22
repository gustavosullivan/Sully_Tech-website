import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const BEIGE = '#d8c9ae'
const BEIGE_MID = '#b9a88c'
const BEIGE_DARK = '#8f7f66'
const BEIGE_DEEP = '#6e6250'
const GREEN = '#00ff41'

function createScreenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8

  const draw = (showCursor: boolean) => {
    ctx.fillStyle = '#020a02'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const glow = ctx.createRadialGradient(512, 300, 40, 512, 320, 520)
    glow.addColorStop(0, 'rgba(0, 255, 65, 0.10)')
    glow.addColorStop(0.55, 'rgba(0, 255, 65, 0.03)')
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(0, 255, 65, 0.045)'
    for (let y = 0; y < canvas.height; y += 3) {
      ctx.fillRect(0, y, canvas.width, 1)
    }

    ctx.strokeStyle = 'rgba(0, 255, 65, 0.22)'
    ctx.lineWidth = 3
    ctx.strokeRect(28, 24, canvas.width - 56, canvas.height - 48)

    const left = 72
    ctx.textBaseline = 'top'
    ctx.shadowColor = 'rgba(0, 255, 65, 0.65)'
    ctx.shadowBlur = 12

    ctx.fillStyle = GREEN
    ctx.font = 'bold 78px "IBM Plex Mono", "Courier New", monospace'
    ctx.fillText('SULLY_', left, 56)

    ctx.shadowBlur = 6
    ctx.fillStyle = '#7dff9a'
    ctx.font = '28px "IBM Plex Mono", "Courier New", monospace'
    ctx.fillText('SOFTWARE & TECH', left, 150)

    ctx.fillStyle = GREEN
    ctx.font = '36px "IBM Plex Mono", "Courier New", monospace'
    ;['> CHATBOTS', '> WEB & MOBILE', '> AUTOMATE', '> SITES'].forEach((line, i) => {
      ctx.shadowBlur = 8
      ctx.fillText(line, left, 230 + i * 58)
    })

    ctx.shadowBlur = 10
    ctx.font = 'bold 34px "IBM Plex Mono", "Courier New", monospace'
    ctx.fillText('[ READY ]', left, 490)

    if (showCursor) {
      ctx.shadowBlur = 14
      ctx.fillStyle = GREEN
      ctx.fillRect(left + 210, 492, 22, 34)
    }

    texture.needsUpdate = true
  }

  draw(true)
  return { texture, draw }
}

function GlowRing() {
  const ring = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ring.current) return
    const pulse = 0.97 + Math.sin(state.clock.elapsedTime * 1.1) * 0.03
    ring.current.scale.setScalar(pulse)
  })

  return (
    <group ref={ring} position={[0, 0.2, -0.7]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.018, 24, 128]} />
        <meshBasicMaterial color={GREEN} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.07, 16, 96]} />
        <meshBasicMaterial
          color={GREEN}
          transparent
          opacity={0.16}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function TerminalScreen() {
  const cursorOn = useRef(true)
  const screen = useMemo(() => createScreenTexture(), [])

  useEffect(() => () => screen.texture.dispose(), [screen])

  useFrame((state) => {
    const show = Math.floor(state.clock.elapsedTime * 2.2) % 2 === 0
    if (show !== cursorOn.current) {
      cursorOn.current = show
      screen.draw(show)
    }
  })

  return (
    <group position={[0, 0.08, 0.245]}>
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.78, 1.08, 0.05]} />
        <meshStandardMaterial color="#0a0c0a" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.62, 0.96]} />
        <meshBasicMaterial map={screen.texture} toneMapped={false} />
      </mesh>
    </group>
  )
}

function CRTMonitor() {
  const group = useRef<THREE.Group>(null)
  const led = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      const mx = THREE.MathUtils.clamp(state.pointer.x, -0.85, 0.85)
      const my = THREE.MathUtils.clamp(state.pointer.y, -0.55, 0.55)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.28, 0.07)
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        THREE.MathUtils.clamp(-my * 0.1, -0.1, 0.07),
        0.07,
      )
      group.current.position.y = Math.sin(t * 0.85) * 0.05
    }
    if (led.current) {
      const mat = led.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.55 + Math.sin(t * 3.2) * 0.45
    }
  })

  return (
    <group ref={group} position={[0, 0.05, 0]} scale={1.05}>
      <GlowRing />

      <group position={[0, 0.22, 0]}>
        <mesh position={[0, 0, -0.12]}>
          <boxGeometry args={[2.2, 1.58, 0.55]} />
          <meshStandardMaterial color={BEIGE} roughness={0.55} metalness={0.06} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <boxGeometry args={[2.22, 1.6, 0.08]} />
          <meshStandardMaterial color={BEIGE_MID} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.19]}>
          <boxGeometry args={[2.1, 1.48, 0.05]} />
          <meshStandardMaterial color={BEIGE} roughness={0.58} />
        </mesh>
        <mesh position={[0, 0.08, 0.22]}>
          <boxGeometry args={[1.86, 1.16, 0.04]} />
          <meshStandardMaterial color="#2a261f" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.08, 0.235]}>
          <boxGeometry args={[1.74, 1.04, 0.02]} />
          <meshStandardMaterial color={BEIGE_DEEP} roughness={0.7} />
        </mesh>

        <TerminalScreen />

        <mesh position={[0, -0.7, 0.22]}>
          <boxGeometry args={[2.0, 0.16, 0.06]} />
          <meshStandardMaterial color={BEIGE_DARK} roughness={0.65} />
        </mesh>

        {[-0.72, -0.5, -0.28].map((x, i) => (
          <mesh key={x} position={[x, -0.7, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.04, 20]} />
            <meshStandardMaterial
              color={i === 0 ? '#5a4c38' : '#cfc0a6'}
              roughness={0.35}
              metalness={0.25}
            />
          </mesh>
        ))}

        <mesh ref={led} position={[0.88, -0.7, 0.28]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={GREEN} transparent toneMapped={false} />
        </mesh>

        {[-1.12, 1.12].map((x) => (
          <group key={x} position={[x, 0.05, -0.05]}>
            {[-0.4, -0.22, -0.04, 0.14, 0.32].map((y) => (
              <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.07, 0.025, 0.32]} />
                <meshStandardMaterial color={BEIGE_DEEP} roughness={0.85} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      <mesh position={[0, -0.78, -0.05]}>
        <cylinderGeometry args={[0.13, 0.2, 0.4, 24]} />
        <meshStandardMaterial color={BEIGE_DARK} roughness={0.55} metalness={0.12} />
      </mesh>
      <mesh position={[0, -1.05, 0.02]}>
        <boxGeometry args={[1.2, 0.11, 0.78]} />
        <meshStandardMaterial color={BEIGE} roughness={0.48} />
      </mesh>
    </group>
  )
}

function BrandLabel() {
  const map = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0, 255, 65, 0.55)'
    ctx.shadowBlur = 18
    ctx.lineWidth = 10
    ctx.strokeStyle = '#000'
    ctx.font = 'bold 140px Orbitron, Arial Black, sans-serif'
    ctx.strokeText('SULLY', 480, 110)
    ctx.fillStyle = '#f5f7f5'
    ctx.fillText('SULLY', 480, 110)
    ctx.shadowBlur = 12
    ctx.fillStyle = GREEN
    ctx.font = 'bold 52px Orbitron, Arial Black, sans-serif'
    ctx.fillText('TECH', 780, 175)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  useEffect(() => () => map.dispose(), [map])

  return (
    <mesh position={[0, -1.42, 0.28]}>
      <planeGeometry args={[1.6, 0.4]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={['#c8ffd4', '#1a2a1a', 0.75]} />
      <directionalLight position={[3.5, 5, 4]} intensity={1.15} color="#f2fff4" />
      <directionalLight position={[-3, 2, 2]} intensity={0.45} color="#7dff9a" />
      <directionalLight position={[0, -3, 2]} intensity={0.4} color="#3dff6a" />
      <pointLight position={[0, 0.5, 2.4]} intensity={1.2} color={GREEN} distance={6} />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.28}>
        <CRTMonitor />
        <BrandLabel />
      </Float>
    </>
  )
}

export function HeroLogo3D() {
  return (
    <div className="hero__stage" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 4.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
