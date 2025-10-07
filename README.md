# SocialSyn

A digital marketing agency website built with Next.js 15, featuring a modern full-stack architecture with API routes for contact forms and portfolio management.

## Project Structure

This is a unified Next.js project with integrated backend functionality:

- **src/app/**: Next.js 15 App Router pages and API routes
  - **api/contact/**: Contact form API endpoint with email integration
  - **api/portfolio/**: Portfolio items API endpoint
- **src/components/**: React components (UI, sections, layouts)
- **src/lib/**: Utility functions and server-side logic
  - **server/**: Server-side utilities (email, validation, data)
- **src/types/**: TypeScript type definitions
- **public/**: Static assets and optimized images

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your environment variables:
   - `EMAIL_USER`: Your Gmail address for sending emails
   - `EMAIL_PASS`: Your Gmail app password (not regular password)
   - `CONTACT_EMAIL`: Email address to receive contact form submissions

### Setting up Gmail App Password

1. Enable 2-Step Verification on your Google account
2. Go to [Google Account > Security > App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this password in your `EMAIL_PASS` variable

## Features

- **Modern UI**: Built with Tailwind CSS, Radix UI, and Framer Motion
- **Contact Form**: Full validation and email notifications via Nodemailer
- **Portfolio Management**: Dynamic portfolio items with category filtering
- **3D Graphics**: Three.js integration for immersive visuals
- **Responsive Design**: Mobile-first approach
- **Type-Safe**: Full TypeScript support
- **Server-Side Rendering**: Next.js 15 App Router with RSC

## API Endpoints

### Contact Form
- `POST /api/contact`: Submit contact form
- `GET /api/contact`: Health check

### Portfolio
- `GET /api/portfolio`: Get all portfolio items
- `GET /api/portfolio?category=<category>`: Get items by category

## Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D graphics
- [Nodemailer](https://nodemailer.com/) - Email sending
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation

## Deployment

This project is configured for deployment on Vercel. Simply connect your repository to Vercel and it will automatically deploy.

Make sure to set up your environment variables in the Vercel dashboard.
