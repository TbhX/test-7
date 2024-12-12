import React, { useState } from 'react';
import { Code2, Music, Gamepad2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Theme } from '@/types/theme';

interface NavigationProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function Navigation({ currentTheme, onThemeChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const themes = [
    { id: 'web', name: 'Développement Web', icon: Code2, color: 'from-indigo-600 to-purple-600' },
    { id: 'musical', name: 'Musique', icon: Music, color: 'from-green-600 to-emerald-600' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'from-purple-600 to-pink-600' }
  ] as const;

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4">
        {themes.map(({ id, name, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => onThemeChange(id as Theme)}
            className={`
              relative group flex items-center gap-2 px-4 py-2 rounded-lg 
              transition-all duration-300
              ${currentTheme === id 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
              }
            `}
          >
            {currentTheme === id && (
              <motion.div
                layoutId="active-theme"
                className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-lg`}
              />
            )}

            <div className="relative flex items-center gap-2">
              <Icon className={`w-5 h-5 transition-transform duration-300 
                ${currentTheme === id ? 'scale-110' : 'group-hover:scale-110'}`} 
              />
              <span className="font-medium">{name}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-b border-white/10 py-4"
            >
              <div className="max-w-7xl mx-auto px-4">
                <nav className="flex flex-col space-y-2">
                  {themes.map(({ id, name }) => (
                    <button
                      key={id}
                      onClick={() => {
                        onThemeChange(id as Theme);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        flex items-center px-4 py-3 rounded-lg transition-colors
                        ${currentTheme === id 
                          ? 'bg-white/10 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <span className="text-lg">{name}</span>
                      {currentTheme === id && (
                        <motion.div
                          layoutId="mobile-active-theme"
                          className="w-1.5 h-1.5 ml-3 rounded-full bg-white"
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}