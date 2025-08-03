import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { sanitizeInput, isValidEmail, formRateLimiter } from '../utils/security';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security validations
    if (!formRateLimiter.canAttempt('contact-form')) {
      setSubmitStatus('error');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission with sanitized data
    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };
      
      console.log('Form submission (sanitized):', sanitizedData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const contactInfo = [
    { label: 'Email', value: 'hello@themeswitcher.com', icon: '📧' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: '📞' },
    { label: 'Address', value: '123 Theme Street, Design City', icon: '📍' },
    { label: 'Hours', value: 'Mon-Fri 9AM-6PM EST', icon: '🕒' },
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
          Get in Touch
        </h1>
        <p
          className={`${currentTheme.typography.bodySize} ${currentTheme.typography.bodyWeight} max-w-2xl mx-auto`}
          style={{
            color: currentTheme.colors.text.secondary,
            fontFamily: currentTheme.typography.fontFamily,
          }}
        >
          Have questions about ThemeSwitcher or want to collaborate? 
          We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
        </p>
      </motion.section>

      <div className={`
        ${currentTheme.layout.type === 'grid' || currentTheme.layout.type === 'default'
          ? 'grid grid-cols-1 lg:grid-cols-2 gap-8'
          : 'space-y-8'
        }
      `}>
        {/* Contact Form */}
        <motion.section
          className={`p-8 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}`}
          style={{
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`,
          }}
          variants={itemVariants}
        >
          <h2
            className={`${currentTheme.typography.headingWeight} text-2xl mb-6`}
            style={{
              color: currentTheme.colors.text.primary,
              fontFamily: currentTheme.typography.fontFamily,
            }}
          >
            Send us a Message
          </h2>

          {submitStatus === 'success' && (
            <motion.div
              className={`p-4 mb-6 ${currentTheme.layout.borderRadius}`}
              style={{
                backgroundColor: currentTheme.colors.accent,
                color: currentTheme.colors.background,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className={`${currentTheme.typography.bodyWeight}`}>
                Thank you! Your message has been sent successfully.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              className={`p-4 mb-6 ${currentTheme.layout.borderRadius}`}
              style={{
                backgroundColor: '#ef4444',
                color: currentTheme.colors.background,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className={`${currentTheme.typography.bodyWeight}`}>
                Sorry, there was an error sending your message. Please try again.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block ${currentTheme.typography.bodyWeight} mb-2`}
                  style={{
                    color: currentTheme.colors.text.primary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`
                    w-full px-4 py-3 ${currentTheme.layout.borderRadius} 
                    ${currentTheme.animations.transition} focus:outline-none focus:ring-2
                  `}
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text.primary,
                    border: `2px solid ${currentTheme.colors.border}`,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                />
              </div>
              <div>
                <label
                  className={`block ${currentTheme.typography.bodyWeight} mb-2`}
                  style={{
                    color: currentTheme.colors.text.primary,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`
                    w-full px-4 py-3 ${currentTheme.layout.borderRadius} 
                    ${currentTheme.animations.transition} focus:outline-none focus:ring-2
                  `}
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.text.primary,
                    border: `2px solid ${currentTheme.colors.border}`,
                    fontFamily: currentTheme.typography.fontFamily,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className={`block ${currentTheme.typography.bodyWeight} mb-2`}
                style={{
                  color: currentTheme.colors.text.primary,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              >
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={`
                  w-full px-4 py-3 ${currentTheme.layout.borderRadius} 
                  ${currentTheme.animations.transition} focus:outline-none focus:ring-2
                `}
                style={{
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text.primary,
                  border: `2px solid ${currentTheme.colors.border}`,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              />
            </div>

            <div>
              <label
                className={`block ${currentTheme.typography.bodyWeight} mb-2`}
                style={{
                  color: currentTheme.colors.text.primary,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              >
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className={`
                  w-full px-4 py-3 ${currentTheme.layout.borderRadius} 
                  ${currentTheme.animations.transition} focus:outline-none focus:ring-2 resize-none
                `}
                style={{
                  backgroundColor: currentTheme.colors.background,
                  color: currentTheme.colors.text.primary,
                  border: `2px solid ${currentTheme.colors.border}`,
                  fontFamily: currentTheme.typography.fontFamily,
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full px-8 py-4 ${currentTheme.layout.borderRadius} ${currentTheme.typography.bodyWeight}
                ${currentTheme.animations.transition} disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center space-x-2
              `}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: currentTheme.colors.background,
                fontFamily: currentTheme.typography.fontFamily,
              }}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </motion.button>
          </form>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          className={`p-8 ${currentTheme.layout.borderRadius} ${currentTheme.layout.shadowSize}`}
          style={{
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`,
          }}
          variants={itemVariants}
        >
          <h2
            className={`${currentTheme.typography.headingWeight} text-2xl mb-6`}
            style={{
              color: currentTheme.colors.text.primary,
              fontFamily: currentTheme.typography.fontFamily,
            }}
          >
            Contact Information
          </h2>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                className="flex items-start space-x-4"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`
                    w-12 h-12 ${currentTheme.layout.borderRadius} flex items-center justify-center
                    text-xl
                  `}
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    color: currentTheme.colors.background,
                  }}
                >
                  {info.icon}
                </div>
                <div>
                  <h3
                    className={`${currentTheme.typography.bodyWeight} mb-1`}
                    style={{
                      color: currentTheme.colors.text.primary,
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    {info.label}
                  </h3>
                  <p
                    className={`${currentTheme.typography.bodySize}`}
                    style={{
                      color: currentTheme.colors.text.secondary,
                      fontFamily: currentTheme.typography.fontFamily,
                    }}
                  >
                    {info.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${currentTheme.colors.border}` }}>
            <h3
              className={`${currentTheme.typography.bodyWeight} mb-4`}
              style={{
                color: currentTheme.colors.text.primary,
                fontFamily: currentTheme.typography.fontFamily,
              }}
            >
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {['🐦', '📘', '📸', '💼'].map((icon, index) => (
                <motion.button
                  key={index}
                  className={`
                    w-12 h-12 ${currentTheme.layout.borderRadius} flex items-center justify-center
                    ${currentTheme.animations.transition} text-xl
                  `}
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    border: `2px solid ${currentTheme.colors.border}`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Contact;