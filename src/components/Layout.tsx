import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <motion.div
      className={`min-h-screen ${currentTheme.animations.transition}`}
      style={{
        backgroundColor: currentTheme.colors.background,
        fontFamily: currentTheme.typography.fontFamily,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      {currentTheme.layout.type === 'sidebar' ? (
        <div className="flex pt-20">
          {/* Sidebar */}
          <motion.aside
            className="w-64 fixed left-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderRight: `1px solid ${currentTheme.colors.border}`,
            }}
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation />
          </motion.aside>
          
          {/* Main content */}
          <main className="flex-1 ml-64">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      ) : (
        <main className="pt-20">
          <Navigation />
          <div className={`${currentTheme.layout.containerMaxWidth} mx-auto px-4 py-8`}>
            {children}
          </div>
        </main>
      )}
    </motion.div>
  );
};

export default Layout;