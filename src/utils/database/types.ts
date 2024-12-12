export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export interface Project {
  id: string;
  clientId: string;
  description: string;
  timeline: 'urgent' | 'normal' | 'relaxed' | 'flexible';
}

export interface AccessCode {
  id: string;
  clientId: string;
  code: string;
  expiresAt: Date;
}