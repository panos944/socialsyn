'use client';

import Link from 'next/link';
import Image from 'next/image';

interface PortfolioCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    categoryLabel: string;
  };
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  // Create URL-friendly slug from category
  const categorySlug = item.category;

  return (
    <div className="portfolio-item group cursor-pointer">
      <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg">
        <Image
          src={item.image} 
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
        
        {/* Enhanced Hover Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
          <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h4 className="serif-heading text-xl mb-2 font-medium">{item.title}</h4>
            <p className="text-sm mb-3 opacity-90">{item.categoryLabel}</p>
            {item.description && (
              <p className="text-xs opacity-80 leading-relaxed mb-4">{item.description}</p>
            )}
            <div className="mt-4">
              <Link href={`/portfolio/${categorySlug}`}>
                <span className="inline-block text-xs uppercase tracking-wider border-b border-white pb-1 hover:border-opacity-70 transition-all duration-300 hover:scale-105">
                  View Full Portfolio
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>
      
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wider text-neutral-light">
          {item.categoryLabel}
        </div>
        <h3 className="serif-heading text-xl">{item.title}</h3>
      </div>
    </div>
  );
}
