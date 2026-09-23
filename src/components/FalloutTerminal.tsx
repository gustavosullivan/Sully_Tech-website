import { type ReactNode, useEffect, useState } from 'react'

const SUBTITLE = 'TECH AND DEVELOPMENT'
const READY_LINE = '[ READY ] system online_'

const BOOT_LINES = [
  'SULLY',
  SUBTITLE,
  '',
  '> desenvolvimento de chatbots',
  '> desenvolvimento web e mobile',
  '> automações de processos',
  '> sites e landing pages',
  '> sistemas e integrações',
  '',
  READY_LINE,
] as const

const BLINK_DELAY: Record<string, string> = {
  [SUBTITLE]: 'pip__blink--d0',
  '> desenvolvimento de chatbots': 'pip__blink--d1',
  '> desenvolvimento web e mobile': 'pip__blink--d2',
  '> automações de processos': 'pip__blink--d3',
  '> sites e landing pages': 'pip__blink--d4',
  '> sistemas e integrações': 'pip__blink--d5',
  [READY_LINE]: 'pip__blink--d6',
}

type Phase = 'booting' | 'ready'

function LineContent({ line, typed }: { line: string; typed?: string }) {
  const text = typed ?? line

  if (line === SUBTITLE) {
    return (
      <>
        <span className="pip__brand-indent" aria-hidden="true">
          SUL
        </span>
        <span className="pip__brand-sub-text">{text}</span>
      </>
    )
  }

  return <>{text || '\u00a0'}</>
}

type FalloutTerminalProps = {
  actions?: ReactNode
}

export function FalloutTerminal({ actions }: FalloutTerminalProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('booting')
  const [flicker, setFlicker] = useState(false)

  const currentLine = BOOT_LINES[lineIndex] ?? ''
  const isBrand = currentLine === 'SULLY' || currentLine === SUBTITLE
  const doneTypingLine = charIndex >= currentLine.length

  useEffect(() => {
    if (phase === 'ready') return

    if (!doneTypingLine) {
      const delay = isBrand ? 48 : 16 + Math.random() * 20
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
    const timers: number[] = []
    const schedule = () => {
      const wait = 3200 + Math.random() * 4200
      timers.push(
        window.setTimeout(() => {
          if (Math.random() > 0.45) {
            setFlicker(true)
            timers.push(
              window.setTimeout(() => setFlicker(false), 380 + Math.random() * 220),
            )
          }
          schedule()
        }, wait),
      )
    }
    schedule()
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  const visibleLines =
    phase === 'ready'
      ? BOOT_LINES.filter((line) => line !== READY_LINE)
      : BOOT_LINES.slice(0, lineIndex)
  const typedCurrent = currentLine.slice(0, charIndex)
  const typingReady = phase === 'booting' && currentLine === READY_LINE

  const lineClass = (line: string) => {
    const base =
      line === 'SULLY'
        ? 'pip__brand'
        : line === SUBTITLE
          ? 'pip__brand-sub'
          : line.startsWith('[ READY ]')
            ? 'pip__ready'
            : line === ''
              ? 'pip__blank'
              : 'pip__line'

    const delayClass = phase === 'ready' ? BLINK_DELAY[line] : undefined
    if (delayClass) {
      return `${base} pip__blink ${delayClass}`
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
                <LineContent line={line} />
              </p>
            ))}

            {phase === 'booting' && !typingReady && (
              <p className={lineClass(currentLine)}>
                <LineContent line={currentLine} typed={typedCurrent} />
                <span className="pip__cursor">█</span>
              </p>
            )}

            {typingReady && (
              <div className="pip__status-row">
                <div className="pip__status-lines">
                  <p className={lineClass(READY_LINE)}>
                    {typedCurrent}
                    <span className="pip__cursor">█</span>
                  </p>
                </div>
              </div>
            )}

            {phase === 'ready' && (
              <div className="pip__status-row">
                <div className="pip__status-lines">
                  <p className={`pip__ready pip__blink ${BLINK_DELAY[READY_LINE]}`}>
                    {READY_LINE}
                  </p>
                  <p className="pip__prompt pip__blink pip__blink--d6">
                    &gt;_<span className="pip__cursor">█</span>
                  </p>
                </div>
                {actions ? <div className="pip__status-actions">{actions}</div> : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
