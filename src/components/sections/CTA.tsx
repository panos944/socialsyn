'use client';

import { motion } from 'framer-motion';

export default function CTA() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
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
    <section className="py-28 bg-primary text-white">
      <div className="container mx-auto px-8 md:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="serif-heading text-4xl md:text-5xl mb-4">
              Ready to transform your brand&apos;s digital presence?
            </h2>
            <p className="text-white/80">
              Let&apos;s create something exceptional together.
            </p>
          </div>
          
          <div>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group flex items-center"
            >
              {/* <div className="mr-4 w-16 h-16 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                <ArrowRight size={24} className="text-white" />
              </div> */}
              {/* <span className="text-sm uppercase tracking-widest">
                Start a conversation
              </span> */}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
