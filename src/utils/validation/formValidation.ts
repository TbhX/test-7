import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom est trop long'),
    
  email: z.string()
    .email('Adresse email invalide')
    .max(255, 'Email trop long'),
    
  description: z.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description est trop longue')
    .optional(),
    
  timeline: z.enum(['urgent', 'normal', 'relaxed'])
    .optional(),
    
  paymentOption: z.enum(['full', 'split', 'cash'])
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export function validateForm(data: unknown) {
  try {
    const validatedData = projectFormSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = Object.fromEntries(
        error.errors.map(err => [err.path[0], err.message])
      );
      return { success: false, errors };
    }
    return { success: false, errors: { form: 'Invalid form data' } };
  }
}