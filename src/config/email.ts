export const EMAIL_CONFIG = {
  smtp: {
    host: 'mail49.lwspanel.com', // Use alternative hostname
    port: 465,
    secure: true,
    auth: {
      user: 'support@tamsir.fr',
      pass: 'Tamsirtamsir91_'
    }
  },
  sender: {
    name: 'Kollab A Support',
    email: 'support@tamsir.fr'
  }
} as const;