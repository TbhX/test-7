export const COMPANY_INFO = {
  name: 'Kollab A',
  email: 'contact@tamsir.fr',
  supportEmail: 'support@tamsir.fr',
  location: 'Essonne (91)',
  hours: '24/7',
  price: 1000
} as const;

export const SOCIAL_LINKS = [
  { 
    icon: 'Mail', 
    href: `mailto:${COMPANY_INFO.email}`, 
    label: 'Email' 
  },
  { 
    icon: 'MessageSquare', 
    href: `mailto:${COMPANY_INFO.supportEmail}`, 
    label: 'Support' 
  }
] as const;