import React, { useRef, useState, useEffect } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
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

const RESPONSIVE_BASIS: Record<number, string> = {
  2: 'md:basis-1/2 lg:basis-1/2',
  3: 'md:basis-1/3 lg:basis-1/3',
  4: 'md:basis-1/4 lg:basis-1/4',
};

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({
  children,
  itemsPerView = 1,
  autoPlay = false,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = '',
}) => {
  const slideCount = React.Children.count(children);
  const totalGroups = Math.max(1, Math.ceil(slideCount / itemsPerView));
  const [activeGroup, setActiveGroup] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [emblaApi, setEmblaApi] = useState<UseEmblaCarouselType[1] | null>(null);

  const getGroupTarget = (groupIndex: number) => {
    if (!emblaApi) return 0;
    const maxIndex = emblaApi.scrollSnapList().length - 1;
    return Math.min(groupIndex * itemsPerView, maxIndex);
  };

  // Handle auto-play
  useEffect(() => {
    if (!autoPlay || !emblaApi) return;
    const scrollSnaps = emblaApi.scrollSnapList();
    if (scrollSnaps.length <= 1) return;

    const timer = setInterval(() => {
      const currentIndex = emblaApi.selectedScrollSnap();
      const currentGroup = Math.floor(currentIndex / itemsPerView);
      const nextGroup = (currentGroup + 1) % totalGroups;
      emblaApi.scrollTo(getGroupTarget(nextGroup));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, emblaApi, interval, itemsPerView, totalGroups]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveGroup = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      setActiveGroup(Math.floor(selectedIndex / itemsPerView));
    };

    updateActiveGroup();
    emblaApi.on('select', updateActiveGroup);
    emblaApi.on('reInit', updateActiveGroup);

    return () => {
      emblaApi.off('select', updateActiveGroup);
      emblaApi.off('reInit', updateActiveGroup);
    };
  }, [emblaApi, itemsPerView]);

  // Update active slide when indicator is clicked
  const handleIndicatorClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(getGroupTarget(index));
  };

  const itemWidthClass =
    itemsPerView > 1
      ? RESPONSIVE_BASIS[itemsPerView] ?? 'md:basis-1/2 lg:basis-1/2'
      : 'basis-full';

  return (
    <div className={`relative ${className}`}>
      <Carousel
        ref={carouselRef}
        className="w-full"
        setApi={setEmblaApi}
      >
        <CarouselContent>
          {React.Children.map(children, (child, i) => (
            <CarouselItem 
              key={i}
              className={itemWidthClass}
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
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                i === activeGroup ? 'bg-primary' : 'bg-gray-300'
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
