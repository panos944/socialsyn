import { Router, Request, Response } from 'express';
import { PortfolioItem, ApiResponse, ErrorResponse } from '../types';

const router = Router();

// Mock portfolio data (replace with database queries)
const portfolioData: Record<string, PortfolioItem[]> = {
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

// Get portfolio by category
router.get('/:category', (req: Request, res: Response): void => {
  try {
    const { category } = req.params;
    
    const items = portfolioData[category];
    
    if (!items) {
      res.status(404).json({
        success: false,
        message: 'Portfolio category not found'
      } as ErrorResponse);
      return;
    }

    res.json({
      success: true,
      message: `Portfolio items for ${category}`,
      data: {
        category,
        items
      }
    } as ApiResponse);
  } catch (error) {
    console.error('Portfolio category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio items'
    } as ErrorResponse);
  }
});

// Get all portfolio items
router.get('/', (req: Request, res: Response): void => {
  try {
    const allItems = Object.values(portfolioData).flat();
    
    res.json({
      success: true,
      message: 'All portfolio items',
      data: allItems
    } as ApiResponse);
  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio items'
    } as ErrorResponse);
  }
});

export default router;