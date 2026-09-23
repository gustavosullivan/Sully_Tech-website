import { useEffect, useState } from 'react'

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string }
  | { kind: 'ok'; text: string }
  | { kind: 'dim'; text: string }

const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'sully init --client "seu-negocio"' },
  { kind: 'ok', text: '✓ workspace ready' },
  { kind: 'cmd', text: 'sully deploy --stack chatbots,web,automations' },
  { kind: 'out', text: 'building modules…' },
  { kind: 'ok', text: '✓ chatbots online' },
  { kind: 'ok', text: '✓ web & mobile synced' },
  { kind: 'ok', text: '✓ automations running' },
  { kind: 'cmd', text: 'sully status' },
  { kind: 'dim', text: '[ READY ] system online — develop · automate · integrate' },
]

const CHAR_MS = 18
const LINE_PAUSE_MS = 280

export function MacTerminal() {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    if (lineIdx >= SCRIPT.length) {
      setDone(true)
      return
    }

    const line = SCRIPT[lineIdx]
    if (charIdx < line.text.length) {
      const t = window.setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS)
      return () => window.clearTimeout(t)
    }

    const t = window.setTimeout(() => {
      setLineIdx((i) => i + 1)
      setCharIdx(0)
    }, LINE_PAUSE_MS)
    return () => window.clearTimeout(t)
  }, [lineIdx, charIdx, done])

  return (
    <div className="mac-term" role="img" aria-label="Terminal Sully Tech com animação de digitação">
      <div className="mac-term__chrome">
        <div className="mac-term__dots" aria-hidden>
          <span className="mac-term__dot mac-term__dot--close" />
          <span className="mac-term__dot mac-term__dot--min" />
          <span className="mac-term__dot mac-term__dot--max" />
        </div>
        <span className="mac-term__title">sully — zsh — 80×24</span>
      </div>

      <div className="mac-term__body">
        <p className="mac-term__boot">Last login: {new Date().toLocaleDateString('pt-BR')} on ttys001</p>

        {SCRIPT.slice(0, lineIdx).map((line, i) => (
          <TerminalLine key={i} line={line} text={line.text} />
        ))}

        {!done && lineIdx < SCRIPT.length && (
          <TerminalLine
            line={SCRIPT[lineIdx]}
            text={SCRIPT[lineIdx].text.slice(0, charIdx)}
            cursor
          />
        )}

        {done && (
          <p className="mac-term__line mac-term__line--cmd">
            <span className="mac-term__prompt">➜</span> ~
            <span className="mac-term__cursor" aria-hidden>
              █
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

function TerminalLine({
  line,
  text,
  cursor,
}: {
  line: Line
  text: string
  cursor?: boolean
}) {
  if (line.kind === 'cmd') {
    return (
      <p className="mac-term__line mac-term__line--cmd">
        <span className="mac-term__prompt">➜</span> ~{' '}
        <span className="mac-term__cmd">{text}</span>
        {cursor && <span className="mac-term__cursor">█</span>}
      </p>
    )
  }

  return (
    <p className={`mac-term__line mac-term__line--${line.kind}`}>
      {text}
      {cursor && <span className="mac-term__cursor">█</span>}
    </p>
  )
}
