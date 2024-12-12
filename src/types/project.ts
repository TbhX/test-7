export interface ProjectFormData {
  name: string;
  email: string;
  description?: string;
  timeline?: 'urgent' | 'normal' | 'relaxed';
  paymentOption: 'full' | 'split' | 'cash';
}

export interface ProjectValidationResult {
  success: boolean;
  errors?: Record<string, string>;
}