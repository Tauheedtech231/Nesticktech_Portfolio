"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hero from './src/portfolio/components/Hero';
import Services from './src/portfolio/components/Services';
import TestimonialsSlider from './src/portfolio/components/Testimonials';
import FAQ from './src/portfolio/components/FAQ';
import PartnersSlider from './src/portfolio/components/ProductsSlider';
import Home from './src/portfolio/components/IndustriesSection';
import ProjectsSection from './src/portfolio/components/Products';

function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Instagram-style Pre-loader with Larger Dots */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-5 h-5 rounded-full bg-[#6366F1]"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <PartnersSlider />
        <Services />
        <Home />
        <ProjectsSection />
        <TestimonialsSlider />
        <FAQ />
      </motion.div>
    </>
  );
}

export default Page;