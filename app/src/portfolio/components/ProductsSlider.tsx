// components/PartnersSlider.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  image: string;
}

const PartnersSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(20);

  const partners: Partner[] = [
    { id: 1, name: "Saqfiyat", image: "/p1.jpg" },
    { id: 2, name: "Skeler Security", image: "/p2.jpg" },
    { id: 3, name: "Futurizm", image: "/p3.jpg" },
    { id: 4, name: "Pixsy Studio", image: "/p4.jpg" },
  ];

  // Fix smooth slider animation
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth;
    const scrollDistance = totalWidth / 2;
    
    const duration = (scrollDistance / 150) * 1.5;
    setAnimationDuration(Math.max(12, Math.min(25, duration)));
  }, []);

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  // Animation variants - Hero section style
  const fromBottomVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-8 sm:py-10 bg-gradient-to-b from-[#0A0F1E] to-[#020617] overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.03)_25%,rgba(99,102,241,0.03)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.03)_75%)] bg-[size:40px_40px] animate-[shift_20s_linear_infinite]" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#6366F1]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Hero section font styles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-5 md:mb-6"
        >
          {/* Heading - Hero section style */}
          <motion.h2 
            variants={fromBottomVariants}
            className="text-xl md:text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent"
          >
            Trusted By Industry Leaders
          </motion.h2>
        </motion.div>

        {/* Simple Container - No border color, just blur */}
        <motion.div 
          variants={fromBottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-[#0F172A]/30 backdrop-blur-sm"
        >
          {/* Slider */}
          <div
            ref={sliderRef}
            className="flex gap-8 md:gap-12 lg:gap-16 items-center py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              animation: `scroll ${animationDuration}s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
              width: 'fit-content',
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative mb-1 md:mb-2">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center border border-[#334155] group-hover:border-[#6366F1] transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#6366F1]/20 overflow-hidden">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                      />
                    </div>
                  </div>
                  
                  {/* Partner Name - Hero section font style */}
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium font-sans tracking-wide text-[#E2E8F0] group-hover:text-[#6366F1] transition-colors duration-300 text-center whitespace-nowrap">
                    {partner.name}
                  </span>
                  
                  {/* Subtle underline effect */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-full transition-all duration-300 mt-0.5 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-24 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes shift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 80px 80px;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
};

export default PartnersSlider;