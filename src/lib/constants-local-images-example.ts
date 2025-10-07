// Import your local images
// Example imports (you'll need to create these files)
import digitalMarketingImg from '@/assets/images/services-digital-marketing.jpg';
import socialMediaImg from '@/assets/images/services-social-media.jpg';
import photographyImg from '@/assets/images/services-photography.jpg';
import graphicDesignImg from '@/assets/images/services-graphic-design.jpg';

// Portfolio images
import portfolio1Img from '@/assets/images/portfolio-1.jpg';
import portfolio2Img from '@/assets/images/portfolio-2.jpg';
// import portfolio3Img from '@/assets/images/portfolio-3.jpg';
// import portfolio4Img from '@/assets/images/portfolio-4.jpg';
// import portfolio5Img from '@/assets/images/portfolio-5.jpg';
// import portfolio6Img from '@/assets/images/portfolio-6.jpg';

// Testimonial avatar images
import testimonial1Img from '@/assets/images/testimonial-1.jpg';
// import testimonial2Img from '@/assets/images/testimonial-2.jpg';
// import testimonial3Img from '@/assets/images/testimonial-3.jpg';

// Team images
import team1Img from '@/assets/images/team-1.jpg';
// import team2Img from '@/assets/images/team-2.jpg';
// import team3Img from '@/assets/images/team-3.jpg';
// import team4Img from '@/assets/images/team-4.jpg';

// Service cards data
export const services = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Strategic campaigns that increase visibility, drive traffic, and boost conversions across digital platforms.",
    image: digitalMarketingImg, // Using local image instead of URL
    features: ["SEO Optimization", "PPC Advertising", "Content Marketing"],
  },
  {
    id: 2,
    title: "Social Media",
    description: "Expert management of your social platforms to build community, engagement, and brand loyalty.",
    image: socialMediaImg, // Using local image
    features: ["Content Creation", "Community Management", "Performance Analytics"],
  },
  {
    id: 3,
    title: "Photography",
    description: "Professional photography services that capture your brand's essence and elevate your visual content.",
    image: photographyImg, // Using local image
    features: ["Product Photography", "Brand Storytelling", "Corporate Headshots"],
  },
  {
    id: 4,
    title: "Graphic Design",
    description: "Creative visual solutions that communicate your brand's message and captivate your audience.",
    image: graphicDesignImg, // Using local image
    features: ["Brand Identity", "Social Media Graphics", "Print & Digital Materials"],
  },
];

// Portfolio data
export const portfolioItems = [
  {
    id: 1,
    title: "SEO Campaign for Tech Startup",
    description: "Increased organic traffic by 200% and improved conversion rates through strategic SEO optimization.",
    image: portfolio1Img, // Using local image
    category: "digital-marketing",
    categoryLabel: "Digital Marketing",
  },
  {
    id: 2,
    title: "Instagram Growth Strategy",
    description: "Developed content strategy that increased followers by 150% and engagement rate by 75% in 3 months.",
    image: portfolio2Img, // Using local image
    category: "social-media",
    categoryLabel: "Social Media",
  },
  // ...other portfolio items...
];

// Testimonial data
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director, TechInnovate",
    image: testimonial1Img, // Using local image
    rating: 5,
    comment: "Socialsyn transformed our digital presence completely. Their strategic approach to social media management resulted in a 300% increase in engagement and a significant boost in our conversion rates.",
  },
  // ...other testimonials...
];

// Team images
export const teamImages = [
  {
    id: 1,
    image: team1Img, // Using local image
    alt: "Agency team meeting",
  },
  // ...other team images...
];

// Rest of your constants remain unchanged
// Contact info data
export const contactInfo = [
  // ...
];

// Social media links
export const socialLinks = [
  // ...
];

// Services for quick links
export const serviceLinks = [
  // ...
];

// Quick links
export const quickLinks = [
  // ...
];

// Footer links
export const footerLinks = [
  // ...
];