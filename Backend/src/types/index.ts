export interface ContactFormData {
  name: string;
  email: string;
  service?: string;
  message: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryLabel: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: string[];
} 