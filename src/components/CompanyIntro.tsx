import { motion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as const

const PILLARS = [
  {
    label: '01',
    title: 'Objetivos claros',
    copy: 'Entender o problema, desenhar o caminho e entregar com foco no resultado — sem ruído, sem tecnologia só pra impressionar.',
  },
  {
    label: '02',
    title: 'Crescer a startup',
    copy: 'Construir produtos e presença digital que acompanham o ritmo do negócio: do primeiro MVP ao próximo nível de escala.',
  },
  {
    label: '03',
    title: 'Inovar de verdade',
    copy: 'Chatbots, web, mobile, automações e integrações — soluções modernas que simplificam o dia a dia e abrem novas portas.',
  },
] as const

const FOCUS = [
  'Chatbots & atendimento',
  'Web & mobile',
  'Automações',
  'Sites & landings',
  'Sistemas & APIs',
] as const

export function CompanyIntro() {
  return (
    <section className="company" id="empresa" aria-labelledby="company-title">
      <div className="company__glow" aria-hidden />
      <div className="container company__inner">
        <motion.header
          className="company__head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <p className="company__eyebrow">Quem somos</p>
          <h2 id="company-title" className="company__title">
            <span className="company__title-main">Sully</span>
            <span className="company__title-line">
              <span className="company__title-sub">Tech</span>
              <span className="company__title-and">and</span>
              <span className="company__title-sub">Development</span>
            </span>
          </h2>
          <p className="company__lead">
            Somos uma startup de tecnologia em construção — com ambição de produto,
            disciplina de engenharia e o objetivo de transformar ideias em sistemas
            que funcionam de verdade.
          </p>
        </motion.header>

        <div className="company__grid">
          <motion.div
            className="company__story"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
          >
            <h3 className="company__story-title">A empresa</h3>
            <p>
              A Sully Tech nasce pra ajudar pessoas e negócios a sair do papel:
              atendimento inteligente, presença digital forte e processos que
              andam sozinhos. Ainda no começo da jornada — e justamente por isso
              com energia pra crescer lado a lado com quem confia na gente.
            </p>
            <p>
              Nossa meta é simples: entregar valor cedo, aprender rápido e
              evoluir produtos que escalam. Serviços sob medida, comunicação
              direta e foco no que move o negócio pra frente.
            </p>
          </motion.div>

          <ul className="company__pillars">
            {PILLARS.map((item, i) => (
              <motion.li
                key={item.label}
                className="company__pillar"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.08 * i }}
              >
                <span className="company__pillar-label">{item.label}</span>
                <h3 className="company__pillar-title">{item.title}</h3>
                <p className="company__pillar-copy">{item.copy}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="company__focus"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="company__focus-label">Onde atuamos</p>
          <ul className="company__focus-list">
            {FOCUS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
