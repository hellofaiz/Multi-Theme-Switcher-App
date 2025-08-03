import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${currentTheme.animations.transition}`}
      style={{
        backgroundColor: currentTheme.colors.surface,
        borderBottom: `1px solid ${currentTheme.colors.border}`,
        boxShadow: currentTheme.layout.shadowSize === 'shadow-2xl' ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 
                   currentTheme.layout.shadowSize === 'shadow-xl' ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' :
                   '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${currentTheme.layout.containerMaxWidth} mx-auto px-4 py-4`}>
        <div className="flex items-center justify-between">
          {/* Logo/App Name */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`w-10 h-10 ${currentTheme.layout.borderRadius} ${currentTheme.animations.transition}`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className={`text-xl font-bold`}
                  style={{ color: currentTheme.colors.background }}
                >
                  T
                </span>
              </div>
            </div>
            <h1
              className={`${currentTheme.typography.headingWeight} text-2xl ${currentTheme.animations.transition}`}
              style={{
                color: currentTheme.colors.text.primary,
                fontFamily: currentTheme.typography.fontFamily,
              }}
            >
              ThemeSwitcher
            </h1>
          </motion.div>

          {/* Theme Dropdown */}
          <div className="relative">
            <select
              value={currentTheme.id}
              onChange={(e) => setTheme(e.target.value)}
              className={`
                ${currentTheme.layout.borderRadius} 
                ${currentTheme.animations.transition}
                px-4 py-2 pr-8 
                focus:outline-none focus:ring-2 
                cursor-pointer
                ${currentTheme.typography.bodyWeight}
              `}
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text.primary,
                border: `2px solid ${currentTheme.colors.border}`,
                fontFamily: currentTheme.typography.fontFamily,
                fontSize: '14px',
              }}
            >
              {availableThemes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <div
              className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;