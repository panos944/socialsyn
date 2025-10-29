'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navLinks = [
  // { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#portfolio' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Initialize scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section when clicking nav links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth',
        });
        
        // Close mobile menu after clicking a link
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-lighter py-4 shadow-sm' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-8 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Socialsyn home">
          <span className={`font-heading text-2xl ${isScrolled ? 'text-primary' : 'text-white'}`}>
            Social<span className="text-accent-foreground">syn</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm tracking-wide uppercase transition-colors duration-300 hover:text-primary ${
                isScrolled ? 'text-neutral' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`lg:hidden ${isScrolled ? 'text-primary' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white text-neutral">
            <div className="flex justify-between items-center mt-4">
              <div className="flex-1 text-center text-base tracking-[0.3em] uppercase text-neutral">
                SocialSyn
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-neutral"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center space-y-8 mt-16 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xl serif-heading transition-colors duration-300 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
