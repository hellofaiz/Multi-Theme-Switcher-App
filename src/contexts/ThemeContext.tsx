import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { secureStorage } from '../utils/security';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    border: string;
  };
  typography: {
    fontFamily: string;
    headingSize: string;
    bodySize: string;
    headingWeight: string;
    bodyWeight: string;
  };
  layout: {
    type: 'default' | 'sidebar' | 'grid';
    containerMaxWidth: string;
    spacing: string;
    borderRadius: string;
    shadowSize: string;
  };
  animations: {
    transition: string;
    hover: string;
  };
}

export const themes: Record<string, Theme> = {
  theme1: {
    id: 'theme1',
    name: 'Minimalist Light',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        accent: '#0369a1',
      },
      border: '#e2e8f0',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headingSize: 'text-3xl md:text-4xl',
      bodySize: 'text-base',
      headingWeight: 'font-light',
      bodyWeight: 'font-normal',
    },
    layout: {
      type: 'default',
      containerMaxWidth: 'max-w-6xl',
      spacing: 'space-y-6',
      borderRadius: 'rounded-lg',
      shadowSize: 'shadow-sm',
    },
    animations: {
      transition: 'transition-all duration-300 ease-in-out',
      hover: 'hover:scale-105 hover:shadow-md',
    },
  },
  theme2: {
    id: 'theme2',
    name: 'Dark Professional',
    colors: {
      primary: '#fbbf24',
      secondary: '#6b7280',
      accent: '#10b981',
      background: '#111827',
      surface: '#1f2937',
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        accent: '#fbbf24',
      },
      border: '#374151',
    },
    typography: {
      fontFamily: 'Georgia, serif',
      headingSize: 'text-4xl md:text-5xl',
      bodySize: 'text-lg',
      headingWeight: 'font-bold',
      bodyWeight: 'font-medium',
    },
    layout: {
      type: 'sidebar',
      containerMaxWidth: 'max-w-full',
      spacing: 'space-y-8',
      borderRadius: 'rounded-none',
      shadowSize: 'shadow-2xl',
    },
    animations: {
      transition: 'transition-all duration-500 ease-out',
      hover: 'hover:scale-102 hover:shadow-xl',
    },
  },
  theme3: {
    id: 'theme3',
    name: 'Colorful Playful',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#fef3c7',
      surface: '#ffffff',
      text: {
        primary: '#7c2d12',
        secondary: '#a16207',
        accent: '#be185d',
      },
      border: '#fbbf24',
    },
    typography: {
      fontFamily: 'Pacifico, cursive',
      headingSize: 'text-5xl md:text-6xl',
      bodySize: 'text-xl',
      headingWeight: 'font-normal',
      bodyWeight: 'font-normal',
    },
    layout: {
      type: 'grid',
      containerMaxWidth: 'max-w-7xl',
      spacing: 'space-y-12',
      borderRadius: 'rounded-3xl',
      shadowSize: 'shadow-xl',
    },
    animations: {
      transition: 'transition-all duration-700 ease-bounce',
      hover: 'hover:scale-110 hover:rotate-1 hover:shadow-2xl',
    },
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<string>('theme1');

  useEffect(() => {
    // Load theme from secure localStorage on mount
    const savedTheme = secureStorage.get('selectedTheme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentThemeId(savedTheme);
    }
  }, []);

  const setTheme = (themeId: string) => {
    if (themes[themeId]) {
      setCurrentThemeId(themeId);
      secureStorage.set('selectedTheme', themeId);
    }
  };

  const contextValue: ThemeContextType = {
    currentTheme: themes[currentThemeId],
    setTheme,
    availableThemes: Object.values(themes),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};