import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '@/config';

interface FooterSocialProps {
  config: {
    text: string;
    hover: string;
    muted: string;
  };
}

export function FooterSocial({ config }: FooterSocialProps) {
  const socialLinks = [
    { 
      icon: Mail, 
      href: `mailto:${COMPANY_INFO.email}`, 
      label: 'Email' 
    },
    { 
      icon: MessageSquare, 
      href: `mailto:${COMPANY_INFO.supportEmail}`, 
      label: 'Support' 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl font-bold ${config.text}`}>
          {COMPANY_INFO.name}
        </h3>
        <p className={`mt-2 ${config.muted}`}>
          Solutions professionnelles de développement web pour votre présence digitale.
          Package tout inclus pour {COMPANY_INFO.price}€.
        </p>
      </div>

      <div className="flex gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`p-3 rounded-lg bg-gray-800/50 ${config.text} ${config.hover} 
                       transition-all duration-300 hover:scale-110`}
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>
  );
}