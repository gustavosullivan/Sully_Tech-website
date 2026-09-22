import { motion } from 'framer-motion'
import { ABOUT } from '../data'

const easeOut = [0.16, 1, 0.3, 1] as const

export function AboutSection() {
  return (
    <section className="section about" id="sobre">
      <div className="container">
        <motion.div
          className="about__grid"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <div className="about__photo-wrap">
            <div className="about__frame">
              <img src={ABOUT.photo} alt={ABOUT.name} className="about__photo" />
              <div className="about__glow" aria-hidden />
            </div>
            <p className="about__motto">&gt; “{ABOUT.motto}”</p>
          </div>

          <div className="about__content">
            <p className="eyebrow">// about_me</p>
            <h2 className="about__name">{ABOUT.name}</h2>
            <p className="about__role">{ABOUT.role}</p>
            <p className="about__lead">{ABOUT.lead}</p>
            {ABOUT.paragraphs.map((p) => (
              <p key={p} className="about__text">
                {p}
              </p>
            ))}
            <div className="about__links">
              <a
                className="btn btn--solid"
                href="https://www.linkedin.com/in/gustavobportelacc/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="btn btn--ghost" href="#projetos">
                Ver projetos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
