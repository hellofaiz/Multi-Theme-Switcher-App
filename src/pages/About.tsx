import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { currentTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const features = [
    {
      title: 'Dynamic Theming',
      description: 'Experience seamless theme switching with persistent storage across sessions.',
      icon: '🎨',
    },
    {
      title: 'Responsive Design',
      description: 'Optimized for all devices from mobile phones to desktop computers.',
      icon: '📱',
    },
    {
      title: 'Modern Architecture',
      description: 'Built with React, TypeScript, and modern development practices.',
      icon: '⚛️',
    },
    {
      title: 'Smooth Animations',
      description: 'Powered by Framer Motion for delightful user interactions.',
      icon: '✨',
    },
  ];

  return (
    <motion.div
      className={`${currentTheme.layout.spacing}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.section
        className={`text-center py-12 px-6 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}`}
        style={{
          backgroundColor: currentTheme.colors.surface,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
        variants={itemVariants}
      >
        <h1
          className={`${currentTheme.typography.headingSize} ${currentTheme.typography.headingWeight} mb-6`}
          style={{
            color: currentTheme.colors.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          About ThemeSwitcher
        </h1>
        <p
          className={`${currentTheme.typography.bodySize} ${currentTheme.typography.bodyWeight} max-w-3xl mx-auto leading-relaxed`}
          style={{
            color: currentTheme.colors.text.secondary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          ThemeSwitcher is a demonstration of modern React development practices, showcasing 
          how to build a robust, themeable application with TypeScript, Context API, and 
          responsive design principles. This project implements three distinct themes that 
          don't just change colors, but transform the entire user experience through different 
          layouts, typography, and interactive elements.
        </p>
      </motion.section>

      {/* Features Grid */}
      <motion.section variants={itemVariants}>
        <h2
          className={`${currentTheme.typography.headingSize} ${currentTheme.typography.headingWeight} mb-8 text-center`}
          style={{
            color: currentTheme.colors.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Key Features
        </h2>

        <div className={`
          ${currentTheme.layout.type === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 gap-8' 
            : 'space-y-6'
          }
        `}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className={`
                p-6 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}
                ${currentTheme.animations.transition} ${currentTheme.animations.hover}
                ${currentTheme.layout.type === 'sidebar' ? 'flex items-start space-x-4' : 'text-center'}
              `}
              style={{
                backgroundColor: currentTheme.colors.surface,
                border: `1px solid ${currentTheme.colors.border}`,
              }}
              variants={itemVariants}
              whileHover={{ 
                scale: currentTheme.layout.type === 'grid' ? 1.05 : 1.02,
                rotate: currentTheme.layout.type === 'grid' ? Math.random() > 0.5 ? 1 : -1 : 0,
              }}
            >
              <div className={`
                ${currentTheme.layout.type === 'sidebar' ? 'flex-shrink-0' : 'mb-4'}
              `}>
                <div
                  className={`
                    ${currentTheme.layout.type === 'sidebar' 
                      ? 'w-12 h-12' 
                      : 'w-16 h-16 mx-auto'
                    } 
                    ${currentTheme.layout.borderRadius} flex items-center justify-center text-2xl
                  `}
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    color: currentTheme.colors.background,
                  }}
                >
                  {feature.icon}
                </div>
              </div>
              <div className={currentTheme.layout.type === 'sidebar' ? 'flex-1' : ''}>
                <h3
                  className={`
                    ${currentTheme.typography.headingWeight} text-xl mb-3
                    ${currentTheme.layout.type === 'sidebar' ? 'text-left' : 'text-center'}
                  `}
                  style={{
                    color: currentTheme.colors.text.primary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className={`
                    ${currentTheme.typography.bodySize} ${currentTheme.typography.bodyWeight}
                    ${currentTheme.layout.type === 'sidebar' ? 'text-left' : 'text-center'}
                  `}
                  style={{
                    color: currentTheme.colors.text.secondary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        className={`py-12 px-6 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}`}
        style={{
          backgroundColor: currentTheme.colors.surface,
          border: `1px solid ${currentTheme.colors.border}`,
        }}
        variants={itemVariants}
      >
        <h2
          className={`${currentTheme.typography.headingSize} ${currentTheme.typography.headingWeight} mb-8 text-center`}
          style={{
            color: currentTheme.colors.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Technology Stack
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 
            'React Router', 'Context API', 'Vite', 'FakeStore API'
          ].map((tech) => (
            <motion.span
              key={tech}
              className={`
                px-4 py-2 ${currentTheme.layout.borderRadius} ${currentTheme.typography.bodyWeight}
                ${currentTheme.animations.transition}
              `}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
                fontFamily: currentTheme.typography.fontFamily,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.random() * 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center py-8"
        variants={itemVariants}
      >
        <motion.button
          className={`
            px-8 py-4 ${currentTheme.layout.borderRadius} ${currentTheme.typography.bodyWeight}
            ${currentTheme.animations.transition} ${currentTheme.animations.hover}
            text-lg
          `}
          style={{
            backgroundColor: currentTheme.colors.accent,
            color: currentTheme.colors.background,
            fontFamily: currentTheme.typography.fontFamily,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://github.com', '_blank')}
        >
          View Source Code
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default About;