const ITEMS = [
  'Chatbots',
  'Web Apps',
  'Mobile',
  'Automações',
  'Landing Pages',
  'Integrações',
  'WhatsApp API',
  'Sistemas',
  'MVP',
  'UI/UX',
]

export function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee__item">
            {item}
            <span className="marquee__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
