// src/i18n.ts
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      trajectory: 'trajectory',
      projects: 'projects',
      contact: 'contact',
    },
    hero: {
      bio: 'Full stack developer at {company}. IT technician and B.S. in Information Systems from the Federal Institute of Santa Catarina (IFC).',
      photoAlt: 'Mateus and fellow soldiers sitting by a dirt road during the march',
      role: 'Role',
      roleValue: 'Full stack',
      stack: 'Stack',
      base: 'Based in',
      languages: 'Languages',
      languagesValue: 'PT native · EN professional',
      since: 'Since',
    },
    trajectory: {
      label: 'Trajectory',
      title: 'Experience and education',
      today: 'today',
      work: 'work',
      education: 'education',
      project: 'project',
      current: 'current',
      present: 'present',
    },
    projects: {
      label: 'Projects',
      title: 'Personal and academic',
      personal: 'Personal',
      academic: 'Academic · Software Factory',
    },
    contact: {
      label: 'Contact',
      title: "Let's talk",
      email: 'e-mail',
    },
    footer: {
      verse: 'Commit to the Lord whatever you do, and he will establish your plans.',
      verseRef: 'Proverbs 16:3',
      backTop: 'Back to top',
    },
  },
  pt: {
    nav: {
      trajectory: 'trajetória',
      projects: 'projetos',
      contact: 'contato',
    },
    hero: {
      bio: 'Desenvolvedor full stack na {company}. Técnico em Informática e bacharel em Sistemas de Informação pelo Instituto Federal Catarinense.',
      photoAlt: 'Mateus e colegas de farda sentados à beira de uma estrada de terra durante a marcha',
      role: 'Função',
      roleValue: 'Full stack',
      stack: 'Stack',
      base: 'Base',
      languages: 'Idiomas',
      languagesValue: 'PT nativo · EN profissional',
      since: 'Início',
    },
    trajectory: {
      label: 'Trajetória',
      title: 'Experiência e formação',
      today: 'hoje',
      work: 'trabalho',
      education: 'formação',
      project: 'projeto',
      current: 'atual',
      present: 'atual',
    },
    projects: {
      label: 'Projetos',
      title: 'Pessoais e acadêmicos',
      personal: 'Pessoais',
      academic: 'Acadêmicos · Fábrica de Software',
    },
    contact: {
      label: 'Contato',
      title: 'Vamos conversar',
      email: 'e-mail',
    },
    footer: {
      verse: 'Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.',
      verseRef: 'Provérbios 16:3',
      backTop: 'Voltar ao topo',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})

export default i18n
