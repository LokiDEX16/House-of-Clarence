/**
 * Authentication utilities
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (user: any): boolean => {
  return user && user.id && user.email;
};

/**
 * Format user display name
 */
export const formatUserName = (email: string): string => {
  return email.split('@')[0];
};
