type IconName = 'wa' | 'mail' | 'in' | 'site'

export function ContactIcon({ name }: { name: IconName }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'wa') {
    return (
      <svg {...common}>
        <path d="M20 11.5A8.5 8.5 0 0 1 7.2 18.7L4 20l1.4-3.1A8.5 8.5 0 1 1 20 11.5Z" />
        <path d="M9.2 9.8c.3-.6.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.2.6l-.4.4c-.1.1-.2.3 0 .5.4.6 1 1.2 1.7 1.6.2.1.4.1.5 0l.5-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.6.8-.5.2-1.2.3-2-.1-1.4-.7-2.8-1.8-3.9-3.2-1-1.2-1.7-2.5-1.9-3.5-.1-.6 0-1.1.2-1.3Z" />
      </svg>
    )
  }

  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }

  if (name === 'in') {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M6.5 9H3v12h3.5V9ZM4.75 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM21 14.3c0-3.1-1.7-4.5-3.9-4.5-1.8 0-2.6 1-3.1 1.7V9H10.6v12H14v-6.3c0-.3 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.7V21H21v-6.7Z" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  )
}
