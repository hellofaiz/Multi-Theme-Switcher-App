// Security utilities for the theme switcher app

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validates theme ID to prevent theme injection
 */
export const isValidThemeId = (themeId: string): boolean => {
  const allowedThemes = ['theme1', 'theme2', 'theme3'];
  return allowedThemes.includes(themeId);
};

/**
 * Rate limiter for form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  canAttempt(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }
}

export const formRateLimiter = new RateLimiter();

/**
 * Secure localStorage wrapper with error handling
 */
export const secureStorage = {
  get: (key: string): string | null => {
    try {
      const item = localStorage.getItem(key);
      if (item && key === 'selectedTheme') {
        // Validate theme before returning
        return isValidThemeId(item) ? item : null;
      }
      return item;
    } catch (error) {
      console.warn('localStorage access failed:', error);
      return null;
    }
  },
  
  set: (key: string, value: string): boolean => {
    try {
      if (key === 'selectedTheme' && !isValidThemeId(value)) {
        console.warn('Invalid theme ID attempted to be stored');
        return false;
      }
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn('localStorage write failed:', error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('localStorage remove failed:', error);
      return false;
    }
  }
};

/**
 * CSP violation reporting
 */
export const reportCSPViolation = (violationEvent: SecurityPolicyViolationEvent): void => {
  console.warn('CSP Violation detected:', {
    violatedDirective: violationEvent.violatedDirective,
    blockedURI: violationEvent.blockedURI,
    originalPolicy: violationEvent.originalPolicy,
  });
  
  // In production, you would send this to your logging service
  // fetch('/api/csp-report', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(violationData)
  // });
};

// Set up CSP violation listener
if (typeof window !== 'undefined') {
  window.addEventListener('securitypolicyviolation', reportCSPViolation);
}