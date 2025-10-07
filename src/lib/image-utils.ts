/**
 * Utility functions for handling optimized images
 */

export interface ResponsiveImageProps {
  basePath: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(basePath: string): string {
  return [
    `${basePath}-300.webp 300w`,
    `${basePath}-600.webp 600w`,
    `${basePath}-1200.webp 1200w`
  ].join(', ');
}

/**
 * Default responsive sizes for different breakpoints
 */
export const defaultSizes = "(max-width: 768px) 300px, (max-width: 1024px) 600px, 1200px";

/**
 * Get the appropriate image size based on desired width
 */
export function getOptimalImageSize(basePath: string, targetWidth: number): string {
  if (targetWidth <= 300) {
    return `${basePath}-300.webp`;
  } else if (targetWidth <= 600) {
    return `${basePath}-600.webp`;
  } else {
    return `${basePath}-1200.webp`;
  }
}

/**
 * Image size configurations
 */
export const imageSizes = {
  small: 300,
  medium: 600,
  large: 1200
} as const;
