/* eslint-disable react-hooks/set-state-in-effect */
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Tech stack array for animation
  const techStacks = [
    { name: 'React', icon: Code2, color: '#6366F1' },
    { name: 'Node.js', icon: Globe, color: '#22C55E' },
    { name: 'Python', icon: Cpu, color: '#8B5CF6' },
    { name: 'Next.js', icon: Zap, color: '#F59E0B' },
    { name: 'TypeScript', icon: Shield, color: '#3B82F6' },
  ];

  // System theme detection
  useEffect(() => {
    const getSystemTheme = (): 'dark' | 'light' => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    };

    setTheme(getSystemTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
    };
  }, []);

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

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-white';
  
  // WHITE TEXT for all content in both modes
  const textColor = 'text-white';
  const subTextColor = 'text-white/80';
  
  const badgeBg = isDark ? 'bg-[#6366F1]/20' : 'bg-[#6366F1]/20';
  const badgeBorder = isDark ? 'border-[#6366F1]/30' : 'border-[#6366F1]/30';
  const badgeText = 'text-[#6366F1]';
  const secondaryButtonBg = isDark ? 'bg-[#0F172A]/80' : 'bg-black/50';
  const secondaryButtonBorder = isDark ? 'border-[#1E293B]' : 'border-white/30';
  const secondaryButtonText = 'text-white';
  const gradientFrom = 'from-[#6366F1]';
  const gradientTo = 'to-[#8B5CF6]';
  
  // Background image based on theme
  const backgroundImage = isDark 
    ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";
  
  // NO overlay in light mode, dark overlay in dark mode
  const overlayColor = isDark ? 'bg-black/50' : 'bg-transparent';

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
    <section className={`relative min-h-screen ${bgColor} overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backgroundImage}
          alt="Technology Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* NO overlay in light mode, dark overlay in dark mode */}
        <div className={`absolute inset-0 ${overlayColor}`}></div>
      </div>

      {/* Background orbs - theme-aware */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-48 lg:w-64 h-48 lg:h-64 ${isDark ? 'bg-[#6366F1]/20' : 'bg-[#6366F1]/20'} rounded-full blur-3xl opacity-40`} />
        <div className={`absolute bottom-20 right-10 w-56 lg:w-80 h-56 lg:h-80 ${isDark ? 'bg-[#8B5CF6]/20' : 'bg-[#8B5CF6]/20'} rounded-full blur-3xl opacity-40`} />
      </div>

      {/* Grid overlay - theme-aware */}
      <div className={`absolute inset-0 bg-[url('/grid-pattern.svg')] ${isDark ? 'opacity-10' : 'opacity-5'}`} />

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-6 h-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-140px)]">
          
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0 w-full space-y-5 sm:space-y-6 z-10 order-1"
          >
            {/* Background Glow Effect - theme-aware */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-72 h-72 ${isDark ? 'bg-[#6366F1]/30' : 'bg-[#6366F1]/30'} blur-3xl rounded-full -z-10`} />

            {/* Badge - Same in both modes */}
            <motion.div variants={badgeVariants}>
              <span className={`inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 ${badgeBg} border ${badgeBorder} rounded-full backdrop-blur-md`}>
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#6366F1]" />
                <span className={`text-xs sm:text-sm font-medium font-sans tracking-wide ${badgeText}`}>
                  Welcome to Nestick Tech
                </span>
              </span>
            </motion.div>

            {/* Heading - White text always */}
            <motion.div variants={textVariants} className="w-full">
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-serif ${textColor} leading-[1.2] tracking-tight`}>
                <span className="block lg:inline lg:whitespace-nowrap">Your</span>{' '}
                <span className="block lg:inline">
                  <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent relative`}>
                    Digital Business
                    <span className={`absolute left-0 -bottom-1 w-full h-2 bg-gradient-to-r ${gradientFrom}/40 ${gradientTo}/40 blur-sm rounded-full`}></span>
                  </span>
                </span>{' '}
                <span className="block lg:inline lg:whitespace-nowrap">Partner</span>
              </h1>
            </motion.div>

            {/* Tech Stack - White text always */}
            <motion.div
              variants={textVariants}
              className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
            >
              <span className={`text-sm sm:text-base lg:text-lg ${subTextColor} font-light tracking-wide`}>Powered by</span>

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

            {/* Description - White text always */}
            <motion.p
              variants={textVariants}
              className={`text-sm sm:text-base ${subTextColor} max-w-xl leading-relaxed font-light tracking-wide px-2 sm:px-0`}
            >
              We don&apos;t just build apps or websites — we provide complete digital solutions, helping businesses grow, scale, and succeed from idea to execution.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md px-2 mb-4 sm:px-0 justify-center items-center"
            >
              {/* Primary Button */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full">
                <Link
                  href="/consultation"
                  className={`group relative flex items-center justify-center w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-sans rounded-xl overflow-hidden shadow-lg transition-all duration-300 text-center text-sm sm:text-base whitespace-nowrap`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-sans">
                    Book Free Consultation
                    <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Secondary Button - White text always */}
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex-1 w-full">
                <Link
                  href="/get-quote"
                  className={`group flex items-center justify-center w-full px-4 sm:px-5 py-3 sm:py-3.5 ${secondaryButtonBg} backdrop-blur-md border ${secondaryButtonBorder} ${secondaryButtonText} font-sans rounded-xl hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 text-center text-sm sm:text-base whitespace-nowrap`}
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
            className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[450px] mt-2 sm:mt-4 lg:mt-0 mb-8 sm:mb-12 lg:mb-16 order-2"
          >
            <div className="w-full h-full">
              <NetworkSphere />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient fade at bottom - theme-aware */}
      <div className={`absolute bottom-0 left-0 w-full h-16 sm:h-20 lg:h-24 bg-gradient-to-t ${isDark ? 'from-[#020617]' : 'from-transparent'} to-transparent`} />
    </section>
  );
};

export default Hero;