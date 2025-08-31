import { NextResponse } from 'next/server'
import { portfolioItems } from '@/lib/constants'

export async function GET() {
  try {
    return NextResponse.json({
      portfolio: portfolioItems,
      total: portfolioItems.length
    }, { status: 200 })
  } catch (error) {
    console.error('Portfolio API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}