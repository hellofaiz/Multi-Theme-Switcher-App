import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '📖' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (currentTheme.layout.type === 'sidebar') {
    return (
      <nav className="p-6">
        <h2
          className={`${currentTheme.typography.headingWeight} text-lg mb-6`}
          style={{ 
            color: currentTheme.colors.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Navigation
        </h2>
        <ul className="space-y-3">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center space-x-3 p-3 ${currentTheme.layout.borderRadius}
                  ${currentTheme.animations.transition} ${currentTheme.typography.bodyWeight}
                  ${isActive(item.path) ? 'shadow-md' : ''}
                `}
                style={{
                  backgroundColor: isActive(item.path) 
                    ? currentTheme.colors.primary 
                    : 'transparent',
                  color: isActive(item.path) 
                    ? currentTheme.colors.background 
                    : currentTheme.colors.text.primary,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="py-6">
      <div className={`${currentTheme.layout.containerMaxWidth} mx-auto px-4`}>
        <ul className={`
          flex ${currentTheme.layout.type === 'grid' ? 'justify-center space-x-8' : 'justify-start space-x-6'}
          flex-wrap
        `}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 ${currentTheme.layout.borderRadius}
                  ${currentTheme.animations.transition} ${currentTheme.typography.bodyWeight}
                  ${currentTheme.animations.hover}
                  ${isActive(item.path) ? 'shadow-lg' : ''}
                `}
                style={{
                  backgroundColor: isActive(item.path) 
                    ? currentTheme.colors.accent 
                    : currentTheme.colors.surface,
                  color: isActive(item.path) 
                    ? currentTheme.colors.background 
                    : currentTheme.colors.text.primary,
                  border: `2px solid ${isActive(item.path) ? currentTheme.colors.accent : currentTheme.colors.border}`,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              >
                <span className={currentTheme.layout.type === 'grid' ? 'text-2xl' : 'text-lg'}>
                  {item.icon}
                </span>
                <span className={currentTheme.typography.bodySize}>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;