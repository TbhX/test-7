export type Language = 'en' | 'fr';

export type TranslationFunction = (key: string, params?: Record<string, string>) => string;

export interface Translations {
  // Common
  loading: string;
  error: string;
  success: string;
  back: string;
  continue: string;
  submit: string;
  required: string;

  // Header
  clientAccess: string;
  webDev: string;
  music: string;
  gaming: string;

  // Footer
  footerWeb: {
    quickLinks: string;
    startProject: string;
    faq: string;
    termsOfService: string;
    contact: string;
    email: string;
    support: string;
    hours: string;
    allRightsReserved: string;
  };
  footerMusic: {
    followUs: string;
    latestReleases: string;
    streaming: string;
  };
  footerGaming: {
    projectStatus: string;
    visitWebsite: string;
    loading: string;
    projectProgress: string;
  };
}

export type TranslationKey = keyof Translations | `${keyof Translations}.${string}`;