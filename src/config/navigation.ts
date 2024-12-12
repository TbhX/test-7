import { Mail, MessageSquare } from 'lucide-react';

export const FOOTER_SECTIONS = [
  {
    title: 'Services',
    links: [
      { label: 'Développement Web', href: '#services' },
      { label: 'Tableau de Bord', href: '#dashboard' },
      { label: 'Support', href: '#support' }
    ]
  },
  {
    title: 'Ressources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Conditions d\'utilisation', href: '/terms' }
    ]
  },
  {
    title: 'Contact',
    links: [
      { label: `Email: ${COMPANY_INFO.email}`, href: `mailto:${COMPANY_INFO.email}` },
      { label: 'Horaires: 24/7', href: '#hours' },
      { label: 'Localisation: Metaverse', href: '#location' }
    ]
  }
] as const;

export const SOCIAL_LINKS = [
  { icon: Mail, href: `mailto:${COMPANY_INFO.email}`, label: 'Email' },
  { icon: MessageSquare, href: `mailto:${COMPANY_INFO.supportEmail}`, label: 'Support' }
] as const;