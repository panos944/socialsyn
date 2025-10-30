'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/constants';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-8 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="section-label">CONTACT US</div>
            <h2 className="serif-heading text-4xl md:text-5xl mb-4">
              Let&apos;s start a conversation
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'hsl(var(--neutral-light))' }}>
              We&apos;d love to hear about your project and explore how we can help elevate your brand.
            </p>
          </motion.div>

          {/* Centered Contact Information */}
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              variants={containerVariants}
              className="space-y-12"
            >
              <div className="space-y-10">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-center gap-3 text-neutral">
                    <Mail className="h-5 w-5" />
                    <h4 className="font-medium text-lg">Email</h4>
                  </div>
                  <a href="mailto:info.socialsyn@gmail.com" className="text-neutral-light text-base hover:text-primary transition-colors duration-300">
                    info.socialsyn@gmail.com
                  </a>
                </motion.div>

                {/* <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-center gap-3 text-neutral">
                    <Phone className="h-5 w-5" />
                    <h4 className="font-medium text-lg">Phone</h4>
                  </div>
                  <a href="tel:+306942491993" className="text-neutral-light text-base hover:text-primary transition-colors duration-300">
                    +30 6942491993
                  </a>
                </motion.div> */}

                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-center gap-3 text-neutral">
                    <MapPin className="h-5 w-5" />
                    <h4 className="font-medium text-lg">Location</h4>
                  </div>
                  <p className="text-neutral-light text-base leading-relaxed">
                    Ag. Trifonos 9, Kifisia<br />
                    Athens, Greece<br />
                    14561
                  </p>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="pt-12 space-y-6">
                <div className="w-full max-w-xl mx-auto text-center">
                  <h4 className="text-sm uppercase tracking-[0.35em] mb-5 font-medium text-neutral">
                    Follow Us
                  </h4>
                  <div className="flex justify-center space-x-8 text-2xl text-neutral">
                    {socialLinks.map(link => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="transition-colors duration-300 hover:text-primary"
                        aria-label={`Connect with us on ${link.icon}`}
                      >
                        <i className={`fab fa-${link.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://www.instagram.com/socialsyn_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full border border-neutral/20 px-6 py-3 text-xs tracking-[0.35em] uppercase text-neutral transition-colors duration-300 bg-white shadow-sm hover:shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #f58529 0%, #f77737 20%, #d62976 60%, #962fbf 80%, #4f5bd5 100%)',
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <Instagram className="h-4 w-4" strokeWidth={1.7} />
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/socialsyn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-full border border-neutral/20 px-6 py-3 text-xs tracking-[0.35em] uppercase text-neutral transition-colors duration-300 bg-[#1877F2] text-white shadow-sm hover:shadow-md"
                    style={{ borderColor: 'rgba(255,255,255,0.18)' }}
                  >
                    <Facebook className="h-4 w-4" strokeWidth={1.7} />
                    Facebook
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
