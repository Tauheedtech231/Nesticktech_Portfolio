// components/Hero.tsx
'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Cpu, Globe, Shield, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import NetworkSphere with no SSR and loading state
const NetworkSphere = dynamic(() => import('./NetworkSphere'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Hero = () => {
  const [currentTech, setCurrentTech] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Tech stack array for animation
  const techStacks = [
    { name: 'React', icon: Code2, color: '#6366F1' },
    { name: 'Node.js', icon: Globe, color: '#22C55E' },
    { name: 'Python', icon: Cpu, color: '#8B5CF6' },
    { name: 'Next.js', icon: Zap, color: '#F59E0B' },
    { name: 'TypeScript', icon: Shield, color: '#3B82F6' },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-cycle through tech stacks
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStacks.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [techStacks.length]);

  // Container variants - optimized
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  // Text variants - optimized
  const textVariants:Variants = {
    hidden: { 
      y: 15, 
      opacity: 0
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        mass: 0.6,
        duration: 0.5
      }
    }
  };

  // Badge variants
  const badgeVariants:Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        duration: 0.4
      }
    }
  };

  // Button variants
  const buttonVariants:Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const CurrentIcon = techStacks[currentTech].icon;

  return (
    <section className="relative min-h-screen bg-[#020617] overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-10 sm:pb-16 lg:pb-20">
      {/* High Quality Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Technology Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/80 to-[#0F172A]/90" />
      </div>

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 lg:w-64 h-48 lg:h-64 bg-[#6366F1]/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-56 lg:w-80 h-56 lg:h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Grid overlay - reduced opacity on mobile */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] sm:opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Mobile: Column layout, Desktop: Grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-140px)]">
          
          {/* Left side - Content (Top on mobile, Left on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full space-y-4 sm:space-y-6 z-10 order-1 lg:order-1 lg:pl-4 xl:pl-8"
          >
            {/* Background Glow Effect */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 w-72 h-72 bg-[#6366F1]/20 blur-3xl rounded-full -z-10" />

            {/* Badge */}
            <motion.div variants={badgeVariants} className=' mt-[1rem] sm:mt-0'>
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#6366F1]" />
                <span className="text-xs sm:text-sm font-medium font-sans tracking-wide text-[#6366F1]">
                  Welcome to Nestick Tech
                </span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={textVariants} className="w-full">
              <h1 className="text-3xl sm:text-5xl  font-bold font-serif text-[#F8FAFC] leading-[1.2] tracking-tight">
                <span className="block">Your</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent relative">
                    Digital Business
                    <span className="absolute left-0 -bottom-2 w-full h-2 bg-gradient-to-r from-[#6366F1]/40 to-[#8B5CF6]/40 blur-sm rounded-full"></span>
                  </span>
                </span>
                <span className="block">Partner</span>
              </h1>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
            >
              <span className="text-sm sm:text-base lg:text-lg text-[#94A3B8] font-light tracking-wide">Powered by</span>

              <div className="relative h-8 sm:h-10 lg:h-12 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTech}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 sm:gap-2"
                  >
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br p-1.5 sm:p-2 shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${techStacks[currentTech].color}, ${techStacks[currentTech].color}80)`
                      }}
                    >
                      <CurrentIcon className="w-full h-full text-white" />
                    </div>

                    <span
                      className="text-base sm:text-lg lg:text-xl font-semibold font-sans tracking-wide"
                      style={{ color: techStacks[currentTech].color }}
                    >
                      {techStacks[currentTech].name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed font-light tracking-wide px-2 sm:px-0"
            >
              We don&apos;t just build apps or websites — we provide complete digital solutions, helping businesses grow, scale, and succeed from idea to execution.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-2 mb-4 sm:px-0 justify-center lg:justify-start items-center"
            >
              {/* Primary Button */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full sm:w-auto">
                <Link
                  href="/consultation"
                  className="group relative flex items-center justify-center w-full px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-sans rounded-xl overflow-hidden shadow-lg transition-all duration-300 text-center text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-sans">
                    Book Free Consultation
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full sm:w-auto">
                <Link
                  href="/get-quote"
                  className="group flex items-center justify-center w-full px-5 sm:px-6 py-3 sm:py-3.5 bg-[#0F172A]/80 backdrop-blur-md border border-[#1E293B] text-white font-sans rounded-xl hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 text-center text-sm sm:text-base"
                >
                  Get Quote
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Network Sphere (Bottom on mobile, Right on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.25, 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="relative w-full h-[300px] sm:h-[370px] md:h-[420px] lg:h-[460px] mt-0 sm:mt-6 lg:mt-0 order-2 lg:order-2 lg:pr-4 xl:pr-8"
          >
            {/* Remove dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/20 via-transparent to-transparent pointer-events-none z-10 lg:hidden" />
            
            <div className="absolute -top-5 -right-5 w-18 h-18 sm:w-22 sm:h-22 bg-[#6366F1]/12 rounded-full blur-2xl" />
            <div className="absolute -bottom-5 -left-5 w-22 h-22 sm:w-26 sm:h-26 bg-[#8B5CF6]/12 rounded-full blur-2xl" />
            
            <div className={`w-full h-full ${isMobile ? 'scale-100' : 'scale-90 lg:scale-95'}`}>
              <NetworkSphere />
            </div>
            
            <div className="absolute -inset-5 bg-gradient-to-r from-[#6366F1]/5 to-[#8B5CF6]/5 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient - lighter on mobile */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-[#020617] to-transparent opacity-80 sm:opacity-100" />
    </section>
  );
};

export default Hero;