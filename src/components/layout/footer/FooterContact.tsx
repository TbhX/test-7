import React from 'react';
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/config';
import type { FooterConfig } from './types';

interface FooterContactProps {
  config: FooterConfig;
}

export function FooterContact({ config }: FooterContactProps) {
  const contactInfo = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`
    },
    {
      id: 'support',
      icon: MessageSquare,
      label: 'Support',
      value: COMPANY_INFO.supportEmail,
      href: `mailto:${COMPANY_INFO.supportEmail}`
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Localisation',
      value: COMPANY_INFO.location
    },
    {
      id: 'hours',
      icon: Clock,
      label: 'Horaires',
      value: COMPANY_INFO.hours
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className={`text-xl font-bold ${config.text}`}>Contact</h3>
      <div className="grid gap-4">
        {contactInfo.map(({ id, icon: Icon, label, value, href }) => (
          <div key={id} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gray-800/50 ${config.text}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-sm ${config.muted}`}>{label}</span>
              {href ? (
                <a
                  href={href}
                  className={`block font-medium ${config.text} ${config.hover} transition-colors`}
                >
                  {value}
                </a>
              ) : (
                <span className={`block font-medium ${config.text}`}>{value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}