import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { FalloutTerminal } from '../components/FalloutTerminal'
import { HeroLogo3D } from '../components/HeroLogo3D'
import { SceneDecor3D } from '../components/SceneDecor3D'
import { TechOrb3D } from '../components/TechOrb3D'
import { CompanyIntro } from '../components/CompanyIntro'
import { Marquee } from '../components/Marquee'
import { StatsBar } from '../components/StatsBar'
import { AboutSection } from '../components/AboutSection'
import { LinkTree } from '../components/LinkTree'
import { PROJECTS, SERVICES, CONTACTS } from '../data'

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

      <section className="hero hero--crt">
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
            <FalloutTerminal
              actions={
                <>
                  <button
                    type="button"
                    className="btn btn--neon"
                    onClick={() => setContactsOpen(true)}
                  >
                    Contatos
                  </button>
                  <a href="#servicos" className="btn btn--ghost-neon">
                    Serviços
                  </a>
                </>
              }
            />
          </motion.div>
        </div>
      </section>

      <CompanyIntro />

      <Marquee />
      <StatsBar />

      <section className="crt-mid" aria-label="CRT Sully interativo">
        <div className="crt-mid__inner">
          <motion.div
            className="crt-mid__stage-wrap"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: easeOut }}
          >
            <SceneDecor3D />
            <HeroLogo3D />
          </motion.div>
          <p className="crt-mid__caption">
            <span className="hero__caption-dot" /> CRT Sully · WebGL interativo
          </p>
        </div>
      </section>

      <section className="section section--showcase" id="servicos">
        <div className="container">
          <div className="showcase__head">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
              <motion.p className="eyebrow" variants={fadeUp}>
                Serviços
              </motion.p>
              <motion.h2 className="section-title" variants={fadeUp} custom={1}>
                Soluções que vendem e escalam
              </motion.h2>
              <motion.p className="section-lead" variants={fadeUp} custom={2}>
                Do chatbot ao sistema integrado — com cara de produto e engenharia
                de verdade.
              </motion.p>
            </motion.div>
            <TechOrb3D className="showcase__orb" />
          </div>

          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.code}
                className="service service--tilt service--glass"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: -4 }}
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

      <AboutSection />

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
              Chatbot, web, mobile e automação — vitrine do que a Sully Tech
              constrói.
            </motion.p>
          </motion.div>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                className="project project--glass"
                initial={{ opacity: 0, y: 24, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.015 }}
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
            <div className="cta__grid-fx" aria-hidden />
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2 className="section-title">Vamos colocar sua ideia no ar?</h2>
              <p className="section-lead">
                Abre o link tree, manda um WhatsApp ou conecta no LinkedIn.
                Solicite um orçamento.
              </p>
            </div>
            <div className="cta__actions">
              <a
                className="btn btn--neon"
                href={CONTACTS.whatsapp.href}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="btn btn--ghost"
                href={CONTACTS.linkedin.href}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="btn btn--ghost" href={CONTACTS.email.href}>
                Gmail
              </a>
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
