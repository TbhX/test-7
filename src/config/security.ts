export const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 3600000, // 1 hour
  errorMessage: 'Too many requests. Please try again later.'
} as const;

export const SECURITY = {
  passwordMinLength: 8,
  passwordMaxLength: 100,
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
} as const;