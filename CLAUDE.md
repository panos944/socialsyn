# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SocialSyn is a digital marketing agency website built with Next.js frontend and Express.js backend. The project showcases services like digital marketing, social media management, photography, and graphic design.

## Project Structure

This is a monorepo with two main applications:

- **Frontend/**: Next.js 15 application with TypeScript, using App Router
- **Backend/**: Express.js API server with TypeScript

### Frontend Architecture

- **Framework**: Next.js 15 with App Router and Turbopack for development
- **React**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom components and animations
- **UI Components**: Radix UI primitives with shadcn/ui components in `src/components/ui/`
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Database**: Drizzle ORM with Neon Database (@neondatabase/serverless)
- **Animations**: Framer Motion for page and component animations
- **Icons**: Lucide React and React Icons
- **Fonts**: Geist and Geist Mono from Google Fonts
- **Media**: React Player for video content

Key directories:
- `src/app/`: Next.js App Router pages and API routes
- `src/components/`: Reusable React components organized by function
  - `common/`: Shared components (cards, backgrounds, utility components)
  - `layout/`: Header, Footer components
  - `sections/`: Page sections (Hero, About, Portfolio, Services, Contact, etc.)
  - `ui/`: Complete shadcn/ui component library (40+ components)
  - `providers.tsx`: App-level providers (QueryClient, TooltipProvider, Toaster)
- `src/lib/`: Utilities, constants, and configurations
  - `constants.ts`: All static content (services, portfolio, testimonials)
  - `queryClient.ts`: TanStack Query configuration
  - `utils.ts`: Utility functions and helpers
- `src/hooks/`: Custom React hooks (mobile detection, scroll, toast)
- `public/images/`: Organized by client folders (DOMAINE HATZIMICHALIS, ITALOS, JCou, LEDOM, etc.)

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **Development**: ts-node-dev for hot reloading during development
- **Security**: Helmet, CORS with configurable origins, rate limiting (100 req/15min)
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer for contact form submissions
- **Validation**: express-validator for request validation
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Environment**: dotenv for configuration management

## Common Commands

### Frontend Development
```bash
cd Frontend
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd Backend
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run type-check   # TypeScript type checking without emitting files
```

## Development Workflow

1. **Frontend runs on**: http://localhost:3000
2. **Backend runs on**: http://localhost:5001 (or PORT env var)
3. **CORS Configuration**: Backend allows frontend origin (configurable via FRONTEND_URL env var)

## Environment Configuration

- Backend uses dotenv for environment variables
- Frontend likely uses .env.local for Next.js environment variables
- Backend expects FRONTEND_URL, PORT, and NODE_ENV variables

## Key Technologies

- **Frontend**: React 19, Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript, MongoDB (Mongoose), Nodemailer
- **UI Library**: Radix UI with shadcn/ui components (40+ pre-built components)
- **Validation**: Zod (frontend), express-validator (backend)
- **Database**: Drizzle ORM with Neon Database (PostgreSQL) + MongoDB for backend
- **Development**: Turbopack (frontend), ts-node-dev (backend)
- **Styling**: Tailwind CSS with custom animations and typography plugin

## Content Management

Static content is centrally managed in `Frontend/src/lib/constants.ts`:
- **Services**: 4 main service offerings with features and images
- **Portfolio**: 6 portfolio items with categories and descriptions  
- **Testimonials**: Client testimonials with ratings and profile images
- **Stats**: Company statistics and achievements
- **Contact Info**: Office details, email, phone, and hours
- **Navigation**: Social links, service links, quick links, footer links

Images are organized in `public/images/` with client-specific folders:
- `images/` (main folder): Client project photos organized by company name
- `feeds/`: Social media content and feed images
- `Insta_screenshots/`: Instagram analytics and screenshots

## API Endpoints

Backend (Express.js) provides:
- `POST /api/contact`: Contact form submission with validation
- `GET /api/portfolio`: Portfolio data endpoints  
- `GET /api/health`: Health check with environment status

Frontend (Next.js) API routes:
- `/api/contact/`: Next.js API route (likely proxies to backend)
- `/api/portfolio/`: Next.js API route (likely proxies to backend)

The backend includes comprehensive middleware for security, rate limiting, and error handling.