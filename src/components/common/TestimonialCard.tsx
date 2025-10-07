'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    comment: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="h-full bg-white p-8 mx-2">
      <div className="text-primary mb-6">
        <Quote size={32} />
      </div>

      <p className="serif-heading text-xl mb-10">&ldquo;{testimonial.comment}&rdquo;</p>

      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4 rounded-none">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p style={{ color: 'hsl(var(--neutral-light))' }} className="text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
