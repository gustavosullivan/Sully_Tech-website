import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { MacTerminal } from '../components/MacTerminal'
import { AboutSection } from '../components/AboutSection'
import { LinkTree } from '../components/LinkTree'
import { PROJECTS, SERVICES, SOCIAL_PROOF } from '../data'

const easeOut = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.07 * i, duration: 0.5, ease: easeOut },
  }),
}

export function LandingPage() {
  const [contactsOpen, setContactsOpen] = useState(false)

  return (
    <>
      <Header onOpenContacts={() => setContactsOpen(true)} />

      <section className="hero hero--saas">
        <div className="container hero__split">
          <motion.div
            className="hero__copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <p className="hero__eyebrow">Sully Tech · software & automação</p>
            <h1 className="hero__headline">
              Tecnologia que vende, atende e escala o seu negócio
            </h1>
            <p className="hero__sub">
              Chatbots, web, mobile e automações com cara de produto — entrega
              clara, foco em conversão e resultado real.
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--cta"
                onClick={() => setContactsOpen(true)}
              >
                Começar agora
              </button>
              <a href="#servicos" className="btn btn--ghost">
                Ver serviços
              </a>
            </div>
            <ul className="hero__trust" aria-label="Diferenciais">
              <li>Resposta rápida</li>
              <li>Proposta objetiva</li>
              <li>Entrega com qualidade</li>
            </ul>
          </motion.div>

          <motion.div
            className="hero__terminal"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut, delay: 0.12 }}
          >
            <MacTerminal />
          </motion.div>
        </div>
      </section>

      <section className="social-proof" aria-label="Tecnologias e canais">
        <div className="container">
          <p className="social-proof__label">Integramos o que o seu negócio já usa</p>
          <ul className="social-proof__list">
            {SOCIAL_PROOF.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="servicos">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Serviços
            </motion.p>
            <motion.h2 className="section-title" variants={fadeUp} custom={1}>
              Tudo que você precisa para digitalizar com propósito
            </motion.h2>
            <motion.p className="section-lead" variants={fadeUp} custom={2}>
              Do primeiro contato automatizado ao produto no ar — com marca,
              performance e foco em conversão.
            </motion.p>
          </motion.div>

          <div className="bento">
            {SERVICES.map((service, i) => (
              <motion.article
                key={service.code}
                className={`bento__item bento__item--${service.size ?? 'md'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <span className="bento__code">{service.code}</span>
                <h3 className="bento__title">{service.title}</h3>
                <p className="bento__copy">{service.copy}</p>
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
              Uma vitrine do que a Sully Tech constrói — chatbot, web, mobile e
              automação.
            </motion.p>
          </motion.div>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                className="project project--clean"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
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
            className="cta__panel cta__panel--light"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2 className="section-title">Pronto para colocar sua ideia no ar?</h2>
              <p className="section-lead">
                Fale com a gente, receba uma proposta clara e avance com
                confiança.
              </p>
            </div>
            <div className="cta__actions">
              <button
                type="button"
                className="btn btn--cta"
                onClick={() => setContactsOpen(true)}
              >
                Começar agora
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
