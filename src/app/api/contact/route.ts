import { NextRequest, NextResponse } from 'next/server';
import { ContactFormData, ApiResponse, ErrorResponse } from '@/types/api';
import { validateContactForm } from '@/lib/server/validation';
import { sendContactEmail } from '@/lib/server/email';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate form data
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationErrors.map(err => err.message)
        } as ErrorResponse,
        { status: 400 }
      );
    }

    // Send email
    try {
      await sendContactEmail(body);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails - you might want to log this to a database
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully'
      } as ApiResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.'
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Contact API is working'
    } as ApiResponse,
    { status: 200 }
  );
}