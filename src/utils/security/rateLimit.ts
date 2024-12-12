import { RATE_LIMIT } from '@/config';

// Store for rate limiting
const requestStore = new Map<string, { count: number; timestamp: number }>();

/**
 * Checks if a request should be rate limited
 */
export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const record = requestStore.get(identifier) || { count: 0, timestamp: now };

  // Reset if outside window
  if (now - record.timestamp > RATE_LIMIT.windowMs) {
    record.count = 1;
    record.timestamp = now;
    requestStore.set(identifier, record);
    return true;
  }

  // Check if within limits
  if (record.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  // Increment count
  record.count++;
  requestStore.set(identifier, record);
  return true;
};

/**
 * Cleans up expired rate limit records
 */
export const cleanupRateLimits = (): void => {
  const now = Date.now();
  for (const [key, record] of requestStore.entries()) {
    if (now - record.timestamp > RATE_LIMIT.windowMs) {
      requestStore.delete(key);
    }
  }
};