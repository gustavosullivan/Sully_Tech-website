export const CONTACTS = {
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/5554993698492',
    hint: '+55 54 99369-8492',
    icon: 'wa' as const,
  },
  email: {
    label: 'Gmail',
    href: 'mailto:gubportela@gmail.com',
    hint: 'gubportela@gmail.com',
    icon: 'mail' as const,
  },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gustavobportelacc/',
    hint: 'gustavobportelacc',
    icon: 'in' as const,
  },
  site: {
    label: 'Site oficial',
    href: '/',
    hint: 'Landing page Sully Tech',
    icon: 'site' as const,
  },
} as const

export const ABOUT = {
  name: 'Gustavo Portela',
  role: 'Fundador · Sully Tech',
  photo: '/gustavo.jpg',
  motto: 'Disciplina constrói liberdade',
  lead:
    'Sou desenvolvedor e fundador da Sully Tech. Ajudo empresas e pessoas a tirar ideias do papel — seja um chatbot, um app, um site ou uma automação que realmente facilita o dia a dia.',
  paragraphs: [
    'Gosto de trabalho direto: entendo o problema, monto uma solução clara e entrego com qualidade. Sem enrolação e sem tecnologia só pra impressionar — o que importa é o resultado no seu negócio.',
  ],
} as const

export const PROJECTS = [
  {
    id: 'chatbots',
    tag: 'CHATBOT',
    title: 'Chatbots inteligentes',
    description:
      'Atendimento automatizado no WhatsApp e web — qualificação de leads, FAQs e fluxos que atendem 24/7.',
    stack: ['WhatsApp', 'IA', 'APIs'],
  },
  {
    id: 'web-mobile',
    tag: 'WEB/MOBILE',
    title: 'Apps web e mobile',
    description:
      'Interfaces rápidas e responsivas, do painel interno ao produto pro cliente final.',
    stack: ['React', 'TypeScript', 'Mobile'],
  },
  {
    id: 'automations',
    tag: 'AUTOMAÇÃO',
    title: 'Automações de processos',
    description:
      'Tarefas manuais viram fluxo rodando sozinho — menos erro, mais tempo pro que importa.',
    stack: ['Python', 'Webhooks', 'Filas'],
  },
  {
    id: 'sites',
    tag: 'SITES',
    title: 'Sites e landing pages',
    description:
      'Presença digital com cara de marca, performance e conversão — do institucional ao lançamento.',
    stack: ['Landing', 'SEO', 'UI'],
  },
] as const

export const SOCIAL_PROOF = [
  'WhatsApp',
  'React',
  'TypeScript',
  'Python',
  'APIs',
  'Landing pages',
] as const

export const SERVICES = [
  {
    code: '01',
    title: 'Chatbots inteligentes',
    copy: 'Conversas que vendem, atendem e qualificam — no WhatsApp ou no site, 24/7.',
    size: 'lg' as const,
  },
  {
    code: '02',
    title: 'Web & Mobile',
    copy: 'Aplicações sob medida, rápidas e pensadas pro uso real do seu time e do cliente.',
    size: 'md' as const,
  },
  {
    code: '03',
    title: 'Automações de processos',
    copy: 'Tarefas manuais viram fluxo — menos erro, mais escala.',
    size: 'md' as const,
  },
  {
    code: '04',
    title: 'Sites & landing pages',
    copy: 'Presença digital com cara de marca, performance e conversão.',
    size: 'sm' as const,
  },
  {
    code: '05',
    title: 'Sistemas & integrações',
    copy: 'Conectamos ferramentas, APIs e dados para o negócio fluir.',
    size: 'sm' as const,
  },
] as const

