export const SITE = {
  name: 'LEED Digital',
  origin: 'https://leed.digital',
  locale: 'pt-BR',
  positioning: 'Desenvolvimento de sistemas e agentes de IA para operações empresariais.',
  description: 'A LEED Digital desenvolve sistemas, agentes de IA e integrações para operações empresariais complexas.',
  email: 'info@leed.digital',
  formEndpoint: 'https://formspree.io/f/mwvwaypr',
  gtmId: 'GTM-NP9RS6FC',
  adsId: 'AW-16851840618',
  adsConversionId: 'AW-16851840618/F-r4CKe8lZgcEOrcyuM-',
} as const

export const PRIMARY_NAV = [
  { href: '/servicos/desenvolvimento-de-sistemas/', label: 'Sistemas' },
  { href: '/servicos/agentes-de-ia/', label: 'Agentes de IA' },
  { href: '/como-trabalhamos/', label: 'Como trabalhamos' },
  { href: '/insights/', label: 'Insights' },
  { href: '/sobre/', label: 'Sobre' },
] as const

export const FOOTER_GROUPS = [
  {
    title: 'Soluções',
    links: [
      { href: '/servicos/desenvolvimento-de-sistemas/', label: 'Desenvolvimento de sistemas' },
      { href: '/servicos/agentes-de-ia/', label: 'Agentes de IA' },
      { href: '/servicos/integracoes-e-dados/', label: 'Integrações e dados' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/sobre/', label: 'Sobre' },
      { href: '/como-trabalhamos/', label: 'Como trabalhamos' },
      { href: '/casos/', label: 'Casos' },
    ],
  },
  {
    title: 'Conteúdo e contato',
    links: [
      { href: '/insights/', label: 'Insights' },
      { href: '/contact/', label: 'Contato' },
      { href: `mailto:${SITE.email}`, label: SITE.email },
    ],
  },
] as const
