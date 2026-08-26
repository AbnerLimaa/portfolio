// Edit this file to re-label the entire site. Header, Footer, the homepage
// and SEO defaults all read from here instead of hardcoding copy.
export const SITE = {
  name: 'Abner Lima',
  role: 'Senior Software Engineer',
  email: 'abner.lima27@outlook.com',
  tagline: 'Software architecture, high-performance and scalable distributed systems specialist.',
  description:
    'My Portfolio — Software Engineer specialized in event-driven architecture, microservices, and robust cloud infrastructure with experience working for the financial market.',
  status: 'Currently building open-source at Cajá Tech · open to new work',
  social: [
    { label: 'GitHub', href: 'https://github.com/AbnerLimaa' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abner-lima-64262b114' },
  ],
  locale: 'en',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Me', href: '/about' },
] as const;

export const NAV_LINKS_PT_BR = [
  { label: 'Trabalhos', href: '/pt-br/work' },
  { label: 'Projetos', href: '/pt-br/projects' },
  { label: 'Blog', href: '/pt-br/blog' },
  { label: 'Sobre Mim', href: '/pt-br/about' },
] as const;