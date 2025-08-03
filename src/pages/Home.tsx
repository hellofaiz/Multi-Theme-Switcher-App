import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Home: React.FC = () => {
  const { currentTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          className={`w-16 h-16 ${currentTheme.layout.borderRadius}`}
          style={{ backgroundColor: currentTheme.colors.primary }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div
          className={`inline-block p-4 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}`}
          style={{
            backgroundColor: currentTheme.colors.surface,
            color: currentTheme.colors.text.primary,
            border: `1px solid ${currentTheme.colors.border}`,
          }}
        >
          <p className="text-lg font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`${currentTheme.layout.spacing}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
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
          Welcome to ThemeSwitcher
        </h1>
        <p
          className={`${currentTheme.typography.bodySize} ${currentTheme.typography.bodyWeight} mb-8 max-w-2xl mx-auto`}
          style={{
            color: currentTheme.colors.text.secondary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Experience the power of dynamic theming with our multi-theme React application. 
          Switch between three distinct themes to see how layout, typography, and colors 
          transform the entire user experience.
        </p>
        <motion.button
          className={`
            px-8 py-3 ${currentTheme.layout.borderRadius} ${currentTheme.typography.bodyWeight}
            ${currentTheme.animations.transition} ${currentTheme.animations.hover}
          `}
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: currentTheme.colors.background,
            fontFamily: currentTheme.typography.fontFamily,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Themes
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section variants={itemVariants}>
        <h2
          className={`${currentTheme.typography.headingSize} ${currentTheme.typography.headingWeight} mb-8 text-center`}
          style={{
            color: currentTheme.colors.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Featured Products
        </h2>

        {currentTheme.layout.type === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`
                  p-6 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}
                  ${currentTheme.animations.transition} ${currentTheme.animations.hover}
                  transform-gpu
                `}
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  border: `2px solid ${currentTheme.colors.border}`,
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 1 : -1 }}
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className={`${currentTheme.typography.bodyWeight} text-lg mb-2 line-clamp-2`}
                  style={{
                    color: currentTheme.colors.text.primary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  {product.title}
                </h3>
                <p
                  className={`${currentTheme.typography.bodySize} mb-4 line-clamp-3`}
                  style={{
                    color: currentTheme.colors.text.secondary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-2xl ${currentTheme.typography.headingWeight}`}
                    style={{
                      color: currentTheme.colors.accent,
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    ${product.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span style={{ color: currentTheme.colors.accent }}>⭐</span>
                    <span
                      style={{ color: currentTheme.colors.text.secondary }}
                      className="text-sm"
                    >
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`${currentTheme.layout.spacing}`}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className={`
                  flex flex-col md:flex-row p-6 ${currentTheme.layout.borderRadius} 
                  ${currentTheme.layout.shadowSize} ${currentTheme.animations.transition}
                  ${currentTheme.animations.hover}
                `}
                style={{
                  backgroundColor: currentTheme.colors.surface,
                  border: `1px solid ${currentTheme.colors.border}`,
                }}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="md:w-48 h-48 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover ${currentTheme.layout.borderRadius}`}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`${currentTheme.typography.headingWeight} text-xl mb-3`}
                    style={{
                      color: currentTheme.colors.text.primary,
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className={`${currentTheme.typography.bodySize} ${currentTheme.typography.bodyWeight} mb-4`}
                    style={{
                      color: currentTheme.colors.text.secondary,
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-2xl ${currentTheme.typography.headingWeight}`}
                      style={{
                        color: currentTheme.colors.accent,
                        fontFamily: currentTheme.typography.fontFamily,
                      }}
                    >
                      ${product.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span style={{ color: currentTheme.colors.accent }}>⭐</span>
                      <span
                        style={{ color: currentTheme.colors.text.secondary }}
                        className="text-sm"
                      >
                        {product.rating.rate} ({product.rating.count})
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
};

export default Home;