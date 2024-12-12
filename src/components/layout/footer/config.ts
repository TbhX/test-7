import type { Theme } from '@/types/theme';
import type { FooterConfig } from './types';

export function getFooterConfig(theme: Theme): FooterConfig {
  switch (theme) {
    case 'musical':
      return {
        text: 'text-[#1DB954]',
        hover: 'hover:text-white',
        muted: 'text-gray-400',
        background: 'bg-black',
        border: 'border-[#1DB954]/20'
      };
    case 'gaming':
      return {
        text: 'text-purple-400',
        hover: 'hover:text-white',
        muted: 'text-gray-400',
        background: 'bg-[#18181B]',
        border: 'border-purple-500/20'
      };
    default:
      return {
        text: 'text-gray-300',
        hover: 'hover:text-white',
        muted: 'text-gray-400',
        background: 'bg-gray-900',
        border: 'border-gray-800'
      };
  }
}