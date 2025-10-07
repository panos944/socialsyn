'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { socialLinks, serviceLinks, footerLinks } from '@/lib/constants';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submission logic would go here
  };


  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-8 md:px-12">
        <div className="border-b border-white/20 pb-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
            {/* Company Info */}
            <div className="md:col-span-4 mb-8 md:mb-0">
              <h4 className="serif-heading text-4xl mb-6">Socialsyn</h4>
              <p className="mb-6 opacity-80 font-light">
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
              <h5 className="text-sm uppercase tracking-wider mb-5">Contact</h5>
              <div className="space-y-4">
                <p className="font-light opacity-80">Ag. Trifonos 9 <br />Kifisia, Athens, 14562</p>
                <p className="font-light opacity-80">info.socialsyn@gmail.com</p>
                <p className="font-light opacity-80">+30 6942491993</p>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-2 mb-8 md:mb-0">
              <h5 className="text-sm uppercase tracking-wider mb-5">Services</h5>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-white/80 hover:text-white transition-colors duration-300 font-light"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3">
              <h5 className="text-sm uppercase tracking-wider mb-5">Newsletter</h5>
              <p className="mb-6 opacity-80 font-light">
                Stay updated with our latest insights and news.
              </p>
              <form className="mb-2" onSubmit={handleSubmit}>
                <div className="flex items-center border-b border-white/20 pb-3">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="minimal-input border-0 px-0 text-white bg-transparent focus-visible:ring-0"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white p-2"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
          <p className="font-light">
            &copy; {currentYear || 2024} Socialsyn. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            {footerLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-white/80 hover:text-white transition-colors duration-300 font-light"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
