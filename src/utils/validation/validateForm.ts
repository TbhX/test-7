import { projectFormSchema } from './schemas/project';
import type { ProjectFormData } from '@/types/project';

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