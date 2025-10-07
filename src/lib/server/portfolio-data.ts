import { PortfolioItem } from '@/types/api';

// Portfolio data organized by category
export const portfolioData: Record<string, PortfolioItem[]> = {
  'digital-marketing': [
    {
      id: 1,
      title: 'PPC Campaign for SaaS Platform',
      description: 'Optimized ad spend resulting in 45% lower cost-per-acquisition and 80% increase in qualified leads.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      category: 'digital-marketing',
      categoryLabel: 'Digital Marketing'
    },
    {
      id: 5,
      title: 'SEO Strategy for E-commerce',
      description: 'Complete SEO overhaul that improved organic rankings and increased traffic by 200%.',
      image: '/images/images/LUISANT/IMG_8203.JPG',
      category: 'digital-marketing',
      categoryLabel: 'Digital Marketing'
    }
  ],
  'social-media': [
    {
      id: 2,
      title: 'Instagram Growth Feed Strategy',
      description: 'Complete social media strategy that increased engagement by 300%.',
      image: '/images/feeds/Untitled-XSXS3.jpg',
      category: 'social-media',
      categoryLabel: 'Social Media'
    }
  ],
  'photography': [
    {
      id: 3,
      title: 'Product Photography for E-commerce',
      description: 'Professional product photos that improved conversion rate by 35%.',
      image: '/images/images/JCou/IMG_9439 5.JPG',
      category: 'photography',
      categoryLabel: 'Photography'
    }
  ],
  'graphic-design': [
    {
      id: 4,
      title: 'Brand Identity for Restaurant Chain',
      description: 'Complete brand redesign including logo, menu design, and restaurant signage.',
      image: '/images/images/ITALOS/IMG_7836 2.JPG',
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

