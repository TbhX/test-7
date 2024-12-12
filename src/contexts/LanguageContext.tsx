import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { replaceParams } from '@/utils/string';
import type { Language, TranslationKey } from '@/types/language';

interface LanguageContextType {
  currentLang: Language;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem('language') as Language;
  if (saved && (saved === 'fr' || saved === 'en')) {
    return saved;
  }
  return navigator.language.startsWith('fr') ? 'fr' : 'en';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', currentLang);
  }, [currentLang]);

  const t = useCallback((key: TranslationKey, params?: Record<string, string>): string => {
    const translations = currentLang === 'fr' ? fr : en;
    const value = key.split('.').reduce((obj, k) => obj?.[k], translations as any);
    
    if (typeof value !== 'string') {
      return key;
    }

    return params ? replaceParams(value, params) : value;
  }, [currentLang]);

  const toggleLanguage = useCallback(() => {
    setCurrentLang(prev => prev === 'fr' ? 'en' : 'fr');
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}