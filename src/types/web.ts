export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: number;
  features?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface ProjectRequest {
  name: string;
  email: string;
  company?: string;
  description: string;
  timeline: string;
}