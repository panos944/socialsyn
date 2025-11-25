'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  { name: 'Photography', href: '#portfolio' },
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
          <Image
            src="/images-used/Socialsyn_Logo-05.png"
            alt="Socialsyn logo"
            width={280}
            height={90}
            priority
            className="h-12 w-auto md:h-12"
            style={{
              transform: 'scale(2.5)',
              transformOrigin: 'left center',
              filter: isScrolled ? 'none' : 'brightness(0) invert(1)'
            }}
          />
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
            <div className="flex items-center justify-center pb-6 border-b border-neutral-lighter relative">
              <Image
                src="/images-used/Socialsyn_Logo-05.png"
                alt="Socialsyn logo"
                width={380}
                height={120}
                className="h-20 w-auto"
                priority
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-neutral absolute right-0 top-1/2 -translate-y-1/2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center space-y-8 mt-12 text-center">
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
