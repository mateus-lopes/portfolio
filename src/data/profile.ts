export type Locale = 'pt' | 'en'
export type Localized = Record<Locale, string>

export interface Experience {
  start: [number, number]
  end: [number, number] | null
  role: Localized
  org: string
  orgUrl?: string
  desc: Localized
}

export interface TimelineItem {
  label: Localized
  start: [number, number]
  end: [number, number]
  row: number
  kind: 'edu' | 'work' | 'now' | 'project'
  detail?: Localized
  url?: string
}

export interface Project {
  name: string
  desc: Localized
  url: string
}

export const contact = {
  email: 'mateusalbano22@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mateus-lopes-albano/',
  github: 'https://github.com/mateus-lopes',
  whatsapp: 'https://api.whatsapp.com/send?phone=5547999180331',
}

export const experiences: Experience[] = [
  {
    start: [2026, 3],
    end: null,
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    org: 'TS - Solutions',
    orgUrl: 'https://tssolutions.com.br/',
    desc: {
      pt: 'Antes, de set/2024 a mar/2026, estagiário na mesma empresa.',
      en: 'Previously an intern at the same company, from Sep 2024 to Mar 2026.',
    },
  },
  {
    start: [2024, 11],
    end: [2025, 3],
    role: { pt: 'Desenvolvedor front-end', en: 'Front-end developer' },
    org: 'C3 Labs',
    desc: {
      pt: 'Sistema de gestão de pátio de ponta a ponta: tasks, arquitetura de componentes e interfaces. Vue.js, TypeScript e Django.',
      en: 'End-to-end yard management system: task planning, component architecture and interfaces. Vue.js, TypeScript and Django.',
    },
  },
  {
    start: [2023, 12],
    end: [2024, 2],
    role: { pt: 'Desenvolvedor de software', en: 'Software developer' },
    org: 'SoftExpert',
    desc: {
      pt: 'Estágio de verão vindo de um hackathon no IFC Araquari: criador e manipulador de mapas estratégicos.',
      en: 'Summer internship born from a hackathon at IFC Araquari: a strategy map builder and editor.',
    },
  },
  {
    start: [2023, 3],
    end: [2023, 11],
    role: { pt: 'Soldado de infantaria', en: 'Infantry soldier' },
    org: 'Exército Brasileiro',
    desc: {
      pt: 'Pelotão de comando da CCAP do 62º BI, em Joinville.',
      en: 'Command platoon of the 62nd Infantry Battalion, in Joinville.',
    },
  },
  {
    start: [2021, 10],
    end: [2024, 9],
    role: { pt: 'Desenvolvedor de software', en: 'Software developer' },
    org: 'Fábrica de Software · IFC',
    orgUrl: 'https://fabricadesoftware.ifc.edu.br/',
    desc: {
      pt: 'Projetos de pesquisa, ensino e extensão, de voluntário a bolsista.',
      en: 'Research, teaching and outreach projects, from volunteer to scholarship holder.',
    },
  },
]

// Barras da linha do tempo. O fim é exclusivo: [2022, 1] termina no começo de janeiro de 2022.
export const timeline: TimelineItem[] = [
  {
    label: { pt: 'Técnico em Informática · IFC', en: 'IT Technician · IFC' },
    start: [2019, 2],
    end: [2022, 1],
    row: 0,
    kind: 'edu',
  },
  {
    label: { pt: 'Bacharelado em SI · IFC', en: 'B.S. Information Systems · IFC' },
    start: [2022, 2],
    end: [2027, 1],
    row: 0,
    kind: 'edu',
  },
  {
    label: { pt: 'ACE Store · e-commerce', en: 'ACE Store · e-commerce' },
    detail: {
      pt: 'Loja de uma empresa fictícia, com front-end e back-end próprios',
      en: 'Online store for a fictional company, with its own front end and back end',
    },
    url: 'https://github.com/mateus-lopes/aceWebFrontend',
    start: [2020, 2],
    end: [2021, 1],
    row: 1,
    kind: 'project',
  },
  {
    label: { pt: 'PSEC · TCC do técnico', en: 'PSEC · technical course capstone' },
    detail: {
      pt: 'Portal educativo com jogos para crianças com necessidades especiais',
      en: 'Educational portal with games for children with special needs',
    },
    url: 'https://github.com/mateus-lopes/psecAPP',
    start: [2021, 2],
    end: [2022, 1],
    row: 2,
    kind: 'project',
  },
  {
    label: { pt: 'Fábrica de Software', en: 'Software Factory' },
    detail: {
      pt: 'Projetos de pesquisa, ensino e extensão no IFC, de voluntário a bolsista',
      en: 'Research, teaching and outreach projects at IFC, from volunteer to scholarship holder',
    },
    url: 'https://fabricadesoftware.ifc.edu.br/',
    start: [2021, 10],
    end: [2024, 10],
    row: 1,
    kind: 'work',
  },
  {
    label: { pt: 'Exército', en: 'Army' },
    start: [2023, 3],
    end: [2023, 12],
    row: 2,
    kind: 'work',
  },
  {
    label: { pt: 'SoftExpert', en: 'SoftExpert' },
    start: [2023, 12],
    end: [2024, 3],
    row: 3,
    kind: 'work',
  },
  {
    label: { pt: 'TS - Solutions · estágio', en: 'TS - Solutions · internship' },
    start: [2024, 9],
    end: [2026, 3],
    row: 4,
    kind: 'work',
  },
  {
    label: { pt: 'C3 Labs', en: 'C3 Labs' },
    start: [2024, 11],
    end: [2025, 4],
    row: 5,
    kind: 'work',
  },
  {
    label: { pt: 'TS - Solutions · full stack', en: 'TS - Solutions · full stack' },
    start: [2026, 3],
    end: [2026, 11],
    row: 6,
    kind: 'now',
  },
]

export const personalProjects: Project[] = [
  {
    name: 'Lista de Mercado Inteligente',
    desc: {
      pt: 'Aprende o que você compra e sugere o que está acabando.',
      en: 'Learns what you buy and suggests what is running out.',
    },
    url: 'https://app-pedidos.mateusalbano.workers.dev',
  },
  {
    name: 'UJAMJ',
    desc: {
      pt: 'App da mocidade, com busca e funcionamento offline.',
      en: 'Youth group app, with search and offline support.',
    },
    url: 'https://ujamj.mateusalbano.workers.dev',
  },
  {
    name: 'Trilha de Programação',
    desc: {
      pt: 'Material para aprender programação do zero.',
      en: 'A guide to learning programming from scratch.',
    },
    url: 'https://mateus-lopes.github.io/trilha-programacao/',
  },
  {
    name: 'Planner Semanal',
    desc: {
      pt: 'Tarefas por dia, cuidados pessoais e pote de vitórias.',
      en: 'Daily tasks, self-care and a jar of small wins.',
    },
    url: 'https://planner-mariana.mateusalbano.workers.dev',
  },
]

export const academicProjects: Project[] = [
  {
    name: 'Projeto Markowitz',
    desc: {
      pt: 'Carteira ideal entre risco e retorno.',
      en: 'Optimal portfolio between risk and return.',
    },
    url: 'https://github.com/mateus-lopes/projeto-markowitz',
  },
  {
    name: 'Campus PI',
    desc: {
      pt: 'Indicadores dos Institutos Federais.',
      en: 'Performance indicators of Federal Institutes.',
    },
    url: 'https://github.com/mateus-lopes/fabricaPI',
  },
  {
    name: 'Empenhos IFC',
    desc: {
      pt: 'Orçamento do campus aberto à comunidade.',
      en: 'Campus budget open to the community.',
    },
    url: 'https://github.com/mateus-lopes/empenhosIFC',
  },
  {
    name: 'Fábrica Painel',
    desc: {
      pt: 'Submissão de trabalhos da SEPE.',
      en: 'Paper submission for the SEPE academic week.',
    },
    url: 'https://github.com/mateus-lopes/fabricaPainel_frontEnd',
  },
  {
    name: 'Atlas de Histologia',
    desc: {
      pt: 'Imagens e conteúdo para Medicina Veterinária.',
      en: 'Images and content for Veterinary Medicine.',
    },
    url: 'https://github.com/mateus-lopes/fabricaHistologia_frontend',
  },
]
