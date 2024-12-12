import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { WebTheme } from './components/web/WebTheme';
import { MusicalTheme } from './components/music/MusicalTheme';
import { GamingTheme } from './components/gaming/GamingTheme';
import { DashboardAccess } from './components/auth/DashboardAccess';
import { Navigation } from './components/Navigation';
import { ThemeFooter } from './components/layout/ThemeFooter';
import { CookieConsent } from './components/common/CookieConsent';
import type { Theme } from './types/theme';

export default function App() {
  const [theme, setTheme] = useState<Theme>('web');
  const [showTerms, setShowTerms] = useState(false);
  const isDashboardRoute = window.location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {!isDashboardRoute && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Navigation 
                currentTheme={theme} 
                onThemeChange={setTheme} 
              />
              {theme === 'web' && (
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Accès Client</span>
                </button>
              )}
            </div>
          </div>
        </header>
      )}
      
      <main className={`flex-grow ${!isDashboardRoute ? 'pt-16' : ''}`}>
        {isDashboardRoute ? (
          <DashboardAccess />
        ) : (
          <>
            {theme === 'web' && (
              <WebTheme 
                showTerms={showTerms} 
                onCloseTerms={() => setShowTerms(false)} 
              />
            )}
            {theme === 'musical' && <MusicalTheme />}
            {theme === 'gaming' && <GamingTheme />}
          </>
        )}
      </main>

      {!isDashboardRoute && (
        <>
          <ThemeFooter 
            theme={theme} 
            onShowTerms={() => setShowTerms(true)} 
          />
          <CookieConsent />
        </>
      )}
    </div>
  );
}