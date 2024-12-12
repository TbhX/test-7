import { customAlphabet } from 'nanoid';
import { ACCESS_CODE } from '@/config';
import { logger } from '../logger';

// Generate a secure, random access code
const generateCode = customAlphabet(ACCESS_CODE.charset, ACCESS_CODE.length);

// Store active access codes (in a real app, this would be in a database)
const activeAccessCodes = new Map<string, {
  email: string;
  createdAt: number;
}>();

/**
 * Creates a new access code for a given email
 */
export function createAccessCode(email: string): string {
  const code = generateCode();
  activeAccessCodes.set(code, {
    email,
    createdAt: Date.now()
  });
  
  logger.info('Access code created', { email });
  return code;
}

/**
 * Validates an access code for a given email
 */
export async function validateAccessCode(code: string, email?: string): Promise<boolean> {
  const record = activeAccessCodes.get(code);
  if (!record) return false;
  
  // Verify email if provided
  if (email && record.email !== email) return false;
  
  // Check if code is expired
  const isExpired = Date.now() - record.createdAt > ACCESS_CODE.expiryHours * 60 * 60 * 1000;
  if (isExpired) {
    activeAccessCodes.delete(code);
    logger.warn('Access code expired', { code });
    return false;
  }
  
  return true;
}