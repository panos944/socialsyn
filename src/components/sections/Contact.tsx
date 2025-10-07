'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/constants';
import { MapPin, Mail, Phone } from 'lucide-react';

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
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex items-center justify-center">
                  <div className="mr-4">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-lg">Email</h4>
                    <a href="mailto:info.socialsyn@gmail.com" className="text-neutral-light text-base hover:text-primary transition-colors duration-300">
                      info.socialsyn@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center justify-center">
                  <div className="mr-4">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-lg">Phone</h4>
                    <a href="tel:+306942491993" className="text-neutral-light text-base hover:text-primary transition-colors duration-300">
                      +30 6942491993
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center justify-center">
                  <div className="mr-4">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-lg">Location</h4>
                    <p className="text-neutral-light text-base">
                      Ag. Trifonos 9, Kifisia<br />
                      Athens, Greece<br />
                      14561
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="pt-8">
                <h4 className="text-sm uppercase tracking-wider mb-6 font-medium">Follow Us</h4>
                <div className="flex justify-center space-x-8">
                  {socialLinks.map(link => (
                    <a 
                      key={link.id}
                      href={link.url} 
                      className="text-neutral hover:text-primary transition-colors duration-300 text-2xl"
                      aria-label={`Connect with us on ${link.icon}`}
                    >
                      <i className={`fab fa-${link.icon}`}></i>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
