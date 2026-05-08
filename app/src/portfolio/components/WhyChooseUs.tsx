// components/WhyChooseUs.tsx
'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Users,
  Shield,
  Code,
  HeadphonesIcon,
  TrendingUp,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface Reason {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [currentStat, setCurrentStat] = useState(0);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-50px 0px"
  });

  const reasons: Reason[] = [
    {
      id: 1,
      icon: Rocket,
      title: 'Rapid Development',
      description: 'We deliver projects 40% faster using agile methodologies and modern tech stacks without compromising quality.',
      color: '#6366F1',
    },
    {
      id: 2,
      icon: Users,
      title: 'Expert Team',
      description: 'Our developers have 5+ years of experience working with Fortune 500 companies and innovative startups.',
      color: '#22C55E',
    },
    {
      id: 3,
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Enterprise-grade security with scalable architecture that grows with your business needs.',
      color: '#F59E0B',
    },
    {
      id: 4,
      icon: Code,
      title: 'Clean Code',
      description: 'We follow industry best practices and write maintainable, well-documented code for long-term success.',
      color: '#EF4444',
    },
    {
      id: 5,
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock technical support and maintenance to keep your applications running smoothly.',
      color: '#8B5CF6',
    },
    {
      id: 6,
      icon: TrendingUp,
      title: 'Business Growth',
      description: 'Our solutions are designed to increase efficiency, reduce costs, and drive revenue growth.',
      color: '#EC4899',
    },
  ];

  // Statistics with only tick icons - no arrows
  const statistics = [
    { value: '50+', label: 'Projects Delivered', icon: CheckCircle },
    { value: '98%', label: 'Client Satisfaction', icon: CheckCircle },
    { value: '5+', label: 'Years Experience', icon: CheckCircle },
    { value: '24/7', label: 'Support Available', icon: CheckCircle },
  ];

  // Auto-slider for statistics on mobile/tablet
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isInView) {
      timer = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statistics.length);
      }, 3000); // Change every 3 seconds
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, statistics.length]);

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants:Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
        mass: 0.5,
      },
    },
  };

  const statVariants:Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 12,
      },
    },
  };

  // Slider animation variants
  const sliderVariants:Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-[#020617] overflow-hidden"
    >
      {/* Background decorative elements - very subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#0F172A] border border-[#1E293B]">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl md:text-4xl lg:text-4xl font-bold text-[#F8FAFC] mb-4">
            Why Businesses{' '}
            <span className="text-white">
              Trust Us
            </span>
          </h2>
          
          <p className="text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto">
            We combine technical expertise with business acumen to deliver solutions that drive real results.
          </p>
        </motion.div>

        {/* Statistics - Grid on desktop, Slider on mobile/tablet */}
        <div className="mb-16 lg:mb-20">
          {/* Desktop Grid (hidden on mobile/tablet) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="hidden lg:grid lg:grid-cols-4 gap-4"
          >
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statVariants}
                  whileHover={{ y: -3 }}
                  className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 text-center group transition-all duration-200"
                >
                  {/* Tick Icon */}
                  <div className="w-8 h-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#6366F1]/20 transition-colors duration-200">
                    <Icon className="w-4 h-4 text-[#6366F1]" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-xl lg:text-2xl font-bold text-[#F8FAFC] mb-1">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs text-[#94A3B8]">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile/Tablet Slider (visible below lg breakpoint) */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait" custom={currentStat}>
              <motion.div
                key={currentStat}
                custom={currentStat}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-8 text-center max-w-md mx-auto"
              >
                {(() => {
                  const stat = statistics[currentStat];
                  const Icon = stat.icon;
                  return (
                    <>
                      {/* Tick Icon */}
                      <div className="w-12 h-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-[#6366F1]" />
                      </div>
                      
                      {/* Value */}
                      <div className="text-3xl font-bold text-[#F8FAFC] mb-2">
                        {stat.value}
                      </div>
                      
                      {/* Label */}
                      <div className="text-sm text-[#94A3B8]">
                        {stat.label}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {statistics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStat(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStat 
                      ? 'w-6 bg-[#6366F1]' 
                      : 'bg-[#1E293B] hover:bg-[#6366F1]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reasons Grid - Simple Cards without shadow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                {/* Simple Card - No shadow, just border */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 hover:border-[#6366F1]/30 transition-all duration-200 h-full">
                  {/* Title */}
                  <h3 className="text-base font-semibold text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      
      </div>
    </section>
  );
};

export default WhyChooseUs;