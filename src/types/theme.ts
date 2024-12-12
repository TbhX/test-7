export type Theme = 'web' | 'musical' | 'gaming';

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
}