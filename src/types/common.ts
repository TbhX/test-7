import type { LucideIcon } from 'lucide-react';

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps extends BaseProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}

export interface LoadingProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
}

export interface ErrorProps extends BaseProps {
  message: string;
  onRetry?: () => void;
}