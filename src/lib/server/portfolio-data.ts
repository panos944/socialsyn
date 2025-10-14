import { PortfolioItem } from '@/types/api';

// Portfolio data organized by category
export const portfolioData: Record<string, PortfolioItem[]> = {
  'digital-marketing': [
    {
      id: 1,
      title: 'PPC Campaign for SaaS Platform',
      description: 'Optimized ad spend resulting in 45% lower cost-per-acquisition and 80% increase in qualified leads.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'digital-marketing',
      categoryLabel: 'Digital Marketing'
    },
    {
      id: 5,
      title: 'SEO Strategy for E-commerce',
      description: 'Complete SEO overhaul that improved organic rankings and increased traffic by 200%.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'digital-marketing',
      categoryLabel: 'Digital Marketing'
    }
  ],
  'social-media': [
    {
      id: 2,
      title: 'Instagram Growth Feed Strategy',
      description: 'Complete social media strategy that increased engagement by 300%.',
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'social-media',
      categoryLabel: 'Social Media'
    }
  ],
  'photography': [
    {
      id: 3,
      title: 'Product Photography for E-commerce',
      description: 'Professional product photos that improved conversion rate by 35%.',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'photography',
      categoryLabel: 'Photography'
    }
  ],
  'graphic-design': [
    {
      id: 4,
      title: 'Brand Identity for Restaurant Chain',
      description: 'Complete brand redesign including logo, menu design, and restaurant signage.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'graphic-design',
      categoryLabel: 'Graphic Design'
    }
  ]
};

export const getAllPortfolioItems = (): PortfolioItem[] => {
  return Object.values(portfolioData).flat();
};

export const getPortfolioByCategory = (category: string): PortfolioItem[] | null => {
  return portfolioData[category] || null;
};

