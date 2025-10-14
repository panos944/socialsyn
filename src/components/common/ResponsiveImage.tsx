import Image from 'next/image';
import { defaultSizes, getOptimalImageSize } from '@/lib/image-utils';

interface ResponsiveImageProps {
  basePath: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
}

/**
 * ResponsiveImage component that automatically generates srcSet for optimized WebP images
 * 
 * @param basePath - The base path without size suffix (e.g., "/optimized/img_8065")
 * @param alt - Alt text for accessibility
 * @param width - Image width (optional if using fill)
 * @param height - Image height (optional if using fill)
 * @param className - CSS classes
 * @param priority - Whether to prioritize loading
 * @param quality - Image quality (0-100)
 * @param sizes - Responsive sizes string
 * @param fill - Whether to fill the container
 */
export function ResponsiveImage({
  basePath,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 100,
  sizes = defaultSizes,
  fill = false
}: ResponsiveImageProps) {
  // Note: Next.js Image component handles srcSet automatically
  const src = getOptimalImageSize(basePath, width || 600);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        // Note: Next.js doesn't support srcSet with fill, but the src will be optimized
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      // Note: Next.js handles srcSet automatically when using their Image component with responsive sizing
    />
  );
}

export default ResponsiveImage;
