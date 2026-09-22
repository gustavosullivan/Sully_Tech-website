import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { label: 'Foco em entrega', value: 100, suffix: '%', prefix: '' },
  { label: 'Canais de contato', value: 3, suffix: '', prefix: '' },
  { label: 'Stack moderna', value: 24, suffix: '/7', prefix: '' },
  { label: 'Projetos sob medida', value: 4, suffix: '+', prefix: '' },
]

function Counter({ to, suffix, prefix }: { to: number; suffix: string; prefix: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1100
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

export function StatsBar() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stats__item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <p className="stats__value">
              <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
            </p>
            <p className="stats__label">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
