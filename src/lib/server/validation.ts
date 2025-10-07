import { ContactFormData } from '@/types/api';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateContactForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (data.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
  }

  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (data.message.trim().length > 1000) {
    errors.push({ field: 'message', message: 'Message must be less than 1000 characters' });
  }

  // Validate service (optional)
  if (data.service && typeof data.service === 'string' && data.service.length > 100) {
    errors.push({ field: 'service', message: 'Service must be less than 100 characters' });
  }

  return errors;
};

