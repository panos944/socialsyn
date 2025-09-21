import React, { useRef, useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CarouselWrapperProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({
  children,
  itemsPerView = 1,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = '',
}) => {
  const [active, setActive] = useState(0);
  const totalSlides = Math.ceil(React.Children.count(children) / itemsPerView);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, totalSlides]);

  // Update active slide when indicator is clicked
  const handleIndicatorClick = (index: number) => {
    setActive(index);
    if (carouselRef.current) {
      // This assumes Embla Carousel is being used under the hood
      // If not, this will need to be adjusted to work with your carousel implementation
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Carousel
        ref={carouselRef}
        className="w-full"
        onSelect={() => setActive(0)}
      >
        <CarouselContent>
          {React.Children.map(children, (child, i) => (
            <CarouselItem 
              key={i}
              className={`${itemsPerView > 1 ? `md:basis-1/${itemsPerView} lg:basis-1/${itemsPerView}` : 'basis-full'}`}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {showControls && (
          <>
            <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
            <CarouselNext className="absolute right-0 translate-x-1/2" />
          </>
        )}
      </Carousel>

      {showIndicators && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                i === active ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselWrapper;
