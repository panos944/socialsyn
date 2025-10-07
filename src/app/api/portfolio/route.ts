import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, ErrorResponse } from '@/types/api';
import { getAllPortfolioItems, getPortfolioByCategory } from '@/lib/server/portfolio-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      // Get portfolio items by category
      const items = getPortfolioByCategory(category);
      
      if (!items) {
        return NextResponse.json(
          {
            success: false,
            message: 'Portfolio category not found'
          } as ErrorResponse,
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: `Portfolio items for ${category}`,
          data: {
            category,
            items
          }
        } as ApiResponse,
        { status: 200 }
      );
    }

    // Get all portfolio items
    const allItems = getAllPortfolioItems();
    
    return NextResponse.json(
      {
        success: true,
        message: 'All portfolio items',
        data: allItems
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch portfolio items'
      } as ErrorResponse,
      { status: 500 }
    );
  }
}