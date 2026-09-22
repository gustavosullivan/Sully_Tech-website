import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'SULLY',
  '— TECH',
  '',
  '> desenvolvimento de chatbots',
  '> desenvolvimento web e mobile',
  '> automações de processos',
  '> sites e landing pages',
  '> sistemas e integrações',
  '',
  '[ READY ] system online_',
] as const

const BLINK_LINES = new Set([
  '> desenvolvimento de chatbots',
  '> desenvolvimento web e mobile',
  '> automações de processos',
  '> sites e landing pages',
  '> sistemas e integrações',
  '[ READY ] system online_',
])

type Phase = 'booting' | 'ready'

export function FalloutTerminal() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('booting')
  const [flicker, setFlicker] = useState(false)

  const currentLine = BOOT_LINES[lineIndex] ?? ''
  const isBrand = currentLine === 'SULLY' || currentLine === '— TECH'
  const doneTypingLine = charIndex >= currentLine.length

  useEffect(() => {
    if (phase === 'ready') return

    if (!doneTypingLine) {
      const delay = isBrand ? 55 : 16 + Math.random() * 20
      const id = window.setTimeout(() => setCharIndex((c) => c + 1), delay)
      return () => window.clearTimeout(id)
    }

    if (lineIndex < BOOT_LINES.length - 1) {
      const pause = currentLine === '' ? 120 : isBrand ? 280 : 140
      const id = window.setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharIndex(0)
      }, pause)
      return () => window.clearTimeout(id)
    }

    const id = window.setTimeout(() => setPhase('ready'), 350)
    return () => window.clearTimeout(id)
  }, [charIndex, doneTypingLine, isBrand, lineIndex, phase, currentLine])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Math.random() > 0.86) {
        setFlicker(true)
        window.setTimeout(() => setFlicker(false), 80 + Math.random() * 120)
      }
    }, 1800)
    return () => window.clearInterval(id)
  }, [])

  const visibleLines =
    phase === 'ready' ? [...BOOT_LINES] : BOOT_LINES.slice(0, lineIndex)
  const typedCurrent = currentLine.slice(0, charIndex)

  const lineClass = (line: string) => {
    const base =
      line === 'SULLY'
        ? 'pip__brand'
        : line === '— TECH'
          ? 'pip__brand-sub'
          : line.startsWith('[ READY ]')
            ? 'pip__ready'
            : line === ''
              ? 'pip__blank'
              : 'pip__line'

    if (phase === 'ready' && BLINK_LINES.has(line)) {
      return `${base} pip__blink`
    }
    return base
  }

  return (
    <div className={`pip ${flicker ? 'pip--flicker' : ''}`}>
      <div className="pip__bezel">
        <div className="pip__screen">
          <div className="pip__scanlines" aria-hidden />
          <div className="pip__glow" aria-hidden />
          <div className="pip__vignette" aria-hidden />
          <div className="pip__static" aria-hidden />
          <div className="pip__interference" aria-hidden />

          <div className="pip__body" aria-live="polite">
            {visibleLines.map((line, i) => (
              <p key={`${line}-${i}`} className={lineClass(line)}>
                {line || '\u00a0'}
              </p>
            ))}

            {phase === 'booting' && (
              <p className={lineClass(currentLine)}>
                {typedCurrent}
                <span className="pip__cursor">█</span>
              </p>
            )}

            {phase === 'ready' && (
              <p className="pip__prompt pip__blink">
                &gt;_<span className="pip__cursor">█</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
