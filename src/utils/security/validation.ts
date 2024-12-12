import { z } from 'zod';
import { SECURITY } from '@/config';

// Validation schemas
export const emailSchema = z.string()
  .email('Format d\'email invalide')
  .toLowerCase()
  .trim();

export const passwordSchema = z.string()
  .min(SECURITY.passwordMinLength, `Le mot de passe doit contenir au moins ${SECURITY.passwordMinLength} caractères`)
  .max(SECURITY.passwordMaxLength, 'Mot de passe trop long');

export const accessCodeSchema = z.string()
  .length(12, 'Code d\'accès invalide')
  .regex(/^[2-9A-HJ-NP-Z]+$/, 'Format de code invalide');

// Form validation types
export interface ValidationResult<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

/**
 * Generic validation function
 */
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> => {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        error: error.errors[0].message
      };
    }
    return {
      success: false,
      data: null,
      error: 'Erreur de validation'
    };
  }
};