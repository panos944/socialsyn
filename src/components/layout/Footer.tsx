'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { socialLinks, serviceLinks } from '@/lib/constants';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-8 md:px-12">
        <div className="border-b border-white/30 pb-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-9 gap-10 md:gap-20">
            {/* Company Info */}
            <div className="md:col-span-4 mb-8 md:mb-0">
              <div className="mb-6">
                <Image
                  src="/images-used/Socialsyn_Logo-05.png"
                  alt="Socialsyn logo"
                  width={300}
                  height={96}
                  className="h-12 w-auto md:h-12"
                  style={{ transform: 'scale(2.5)', transformOrigin: 'left center', filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <p className="mb-6 opacity-95 text-sm md:text-lg tracking-[0.018em] leading-relaxed text-white/95">
                Strategic digital marketing solutions that elevate your brand and drive measurable results for your business.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-white/80 hover:text-white transition-colors duration-300"
                    aria-label={`Find us on ${link.icon}`}
                  >
                    <i className={`fab fa-${link.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-3 mb-8 md:mb-0">
              <h5 className="text-[0.85rem] uppercase tracking-[0.42em] mb-6 text-white">
                <span className="inline-block border-b border-white/70 pb-2">Contact</span>
              </h5>
              <div className="space-y-3 text-sm md:text-lg tracking-[0.012em] text-white/95">
                <p className="leading-relaxed">Ag. Trifonos 9 <br />Kifisia, Athens, 14562</p>
                <p>info.socialsyn@gmail.com</p>
                <p>+30 6942491993</p>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-2 mb-8 md:mb-0">
              <h5 className="text-[0.85rem] uppercase tracking-[0.42em] mb-6 text-white">
                <span className="inline-block border-b border-white/70 pb-2">Services</span>
              </h5>
              <ul className="space-y-3 text-sm md:text-lg tracking-[0.012em] text-white/95">
                {serviceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-base text-white/90 tracking-[0.02em]">
          <p>
            &copy; {currentYear || 2024} Socialsyn. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">
            Designed &amp; developed by{' '}
            <a
              href="https://www.web-architects.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              Web Architects
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
