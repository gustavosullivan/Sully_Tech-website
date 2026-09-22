import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { FalloutTerminal } from '../components/FalloutTerminal'
import { HeroLogo3D } from '../components/HeroLogo3D'
import { SceneDecor3D } from '../components/SceneDecor3D'
import { Marquee } from '../components/Marquee'
import { StatsBar } from '../components/StatsBar'
import { AboutSection } from '../components/AboutSection'
import { LinkTree } from '../components/LinkTree'
import { PROJECTS, SERVICES } from '../data'
import { useState } from 'react'

const easeOut = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: easeOut },
  }),
}

export function LandingPage() {
  const [contactsOpen, setContactsOpen] = useState(false)

  return (
    <>
      <Header onOpenContacts={() => setContactsOpen(true)} />

      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <div className="hero__orbs" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="hero__layout">
          <motion.div
            className="hero__copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <FalloutTerminal />
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: easeOut, delay: 0.2 }}
          >
            <div className="hero__stage-wrap">
              <SceneDecor3D />
              <HeroLogo3D />
            </div>
            <p className="hero__caption">
              <span className="hero__caption-dot" /> CRT Sully · interativo
            </p>
          </motion.div>
        </div>
      </section>

      <Marquee />
      <StatsBar />
      <AboutSection />

      <section className="section" id="servicos">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Serviços
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>
              Soluções que vendem e escalam
            </motion.h2>
            <motion.p className="section-lead" variants={fadeUp} custom={2}>
              Do primeiro contato automatizado ao produto no ar — com cara de
              marca e foco em resultado.
            </motion.p>
          </motion.div>

          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.code}
                className="service service--tilt"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -8, rotateX: 4, rotateY: -3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="service__code">{service.code}</span>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__copy">{service.copy}</p>
                <div className="service__shine" aria-hidden />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="projetos">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Portfólio
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>
              Entregas com cara de produto
            </motion.h2>
            <motion.p className="section-lead" variants={fadeUp} custom={2}>
              Uma vitrine do que a Sully Tech constrói — chatbot, web, mobile e
              automação.
            </motion.p>
          </motion.div>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                className="project project--glass"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="project__top">
                  <span className="project__tag">{project.tag}</span>
                  <span className="project__idx">0{i + 1}</span>
                </div>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.description}</p>
                <ul className="project__stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contato">
        <div className="container">
          <motion.div
            className="cta__panel cta__panel--wow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="cta__glow" aria-hidden />
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2 className="section-title">Vamos colocar sua ideia no ar?</h2>
              <p className="section-lead">
                Abre o link tree, manda um WhatsApp ou conecta no LinkedIn.
                Resposta rápida, proposta clara.
              </p>
            </div>
            <div className="cta__actions">
              <button
                type="button"
                className="btn btn--solid"
                onClick={() => setContactsOpen(true)}
              >
                Abrir contatos
              </button>
              <a
                className="btn btn--ghost"
                href="https://wa.me/5554993698492"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <Link to="/site" className="btn btn--ghost">
                /site
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© {new Date().getFullYear()} Sully Tech · Develop · Automate · Integrate</span>
          <Link to="/site">link tree → /site</Link>
        </div>
      </footer>

      {contactsOpen && <LinkTree variant="modal" onClose={() => setContactsOpen(false)} />}
    </>
  )
}
