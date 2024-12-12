import type { Theme } from '@/types/theme';

export interface FooterConfig {
  text: string;
  hover: string;
  muted: string;
  background: string;
  border: string;
}

export interface BaseFooterProps {
  theme: Theme;
  config: FooterConfig;
}