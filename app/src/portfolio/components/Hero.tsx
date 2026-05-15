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
    <section className="relative min-h-screen bg-[#020617] overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      {/* Background Image - Now visible with minimal overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="Technology Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Light overlay for text readability - reduced opacity */}
        <div className="absolute inset-0 bg-[#020617]/40"></div>
      </div>

      {/* Background orbs - now with higher opacity for visibility */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-48 lg:w-64 h-48 lg:h-64 bg-[#6366F1]/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-56 lg:w-80 h-56 lg:h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Grid overlay - reduced opacity */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-140px)]">
          
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0 w-full space-y-5 sm:space-y-6 z-10 order-1"
          >
            {/* Background Glow Effect */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-72 h-72 bg-[#6366F1]/30 blur-3xl rounded-full -z-10" />

            {/* Badge - About page style */}
            <motion.div variants={badgeVariants}>
              <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#6366F1]/20 border border-[#6366F1]/30 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#6366F1]" />
                <span className="text-xs sm:text-sm font-medium font-sans tracking-wide text-[#6366F1]">
                  Welcome to Nestick Tech
                </span>
              </span>
            </motion.div>

            {/* Heading - About page style (font-serif, font-bold, tracking-tight) */}
            <motion.div variants={textVariants} className="w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#F8FAFC] leading-[1.2] tracking-tight">
                <span className="block lg:inline lg:whitespace-nowrap">Your</span>{' '}
                <span className="block lg:inline">
                  <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent relative">
                    Digital Business
                    <span className="absolute left-0 -bottom-1 w-full h-2 bg-gradient-to-r from-[#6366F1]/40 to-[#8B5CF6]/40 blur-sm rounded-full"></span>
                  </span>
                </span>{' '}
                <span className="block lg:inline lg:whitespace-nowrap">Partner</span>
              </h1>
            </motion.div>

            {/* Tech Stack - About page style */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
            >
              <span className="text-sm sm:text-base lg:text-lg text-[#CBD5E1] font-light tracking-wide">Powered by</span>

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

            {/* Description - About page style (font-light tracking-wide) */}
            <motion.p
              variants={textVariants}
              className="text-sm sm:text-base text-[#CBD5E1] max-w-xl leading-relaxed font-light tracking-wide px-2 sm:px-0"
            >
              We don&apos;t just build apps or websites — we provide complete digital solutions, helping businesses grow, scale, and succeed from idea to execution.
            </motion.p>

            {/* CTA Buttons - Centered */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-2 mb-4 sm:px-0 justify-center items-center"
            >
              {/* Primary Button */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full">
                <Link
                  href="/consultation"
                  className="group relative flex items-center justify-center w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-sans rounded-xl overflow-hidden shadow-lg transition-all duration-300 text-center text-sm sm:text-base whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-sans">
                    Book Free Consultation
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full">
                <Link
                  href="/get-quote"
                  className="group flex items-center justify-center w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0F172A]/80 backdrop-blur-md border border-[#1E293B] text-white font-sans rounded-xl hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 text-center text-sm sm:text-base whitespace-nowrap"
                >
                  Get Quote
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Network Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.25, 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] mt-2 sm:mt-4 lg:mt-0 order-2 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent pointer-events-none z-10 lg:hidden" />
            
            <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-[#6366F1]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-28 sm:h-28 bg-[#8B5CF6]/20 rounded-full blur-2xl" />
            
            <div className={`w-full h-full ${isMobile ? 'scale-100' : 'scale-95 lg:scale-100'}`}>
              <NetworkSphere />
            </div>
            
            <div className="absolute -inset-4 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
};

export default Hero;