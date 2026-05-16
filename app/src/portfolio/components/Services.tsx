'use client';

import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  icon: string; // Simple emoji icon
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 1,
      icon: '💻',
      title: 'Development',
      description: 'Custom web and mobile applications built with modern frameworks like Next.js, React, and Node.js for scalable performance.',
      color: '#6366F1',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 2,
      icon: '🤖',
      title: 'AI Solutions',
      description: 'Intelligent AI-powered solutions including machine learning models, automation, and smart analytics for business transformation.',
      color: '#8B5CF6',
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 3,
      icon: '🔒',
      title: 'IT & Cybersecurity',
      description: 'Comprehensive security solutions, threat detection, and IT infrastructure protection to safeguard your digital assets.',
      color: '#22C55E',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 4,
      icon: '🛒',
      title: 'E-commerce Solutions',
      description: 'End-to-end e-commerce platforms with secure payment gateways, inventory management, and seamless user experiences.',
      color: '#F59E0B',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 5,
      icon: '🎯',
      title: 'Complete Business Guidance',
      description: 'Strategic consulting, digital transformation, and expert guidance to help your business scale and succeed.',
      color: '#EF4444',
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 6,
      icon: '⚙️',
      title: 'API Integration & Backend',
      description: 'Robust backend systems and API integrations for scalable, secure, and high-performance applications.',
      color: '#3B82F6',
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 12,
        mass: 0.5,
      },
    },
  };

  const introContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fromLeftVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const fromRightVariants: Variants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const fromBottomVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-8 sm:py-12 lg:py-12 bg-[#020617] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      {/* Updated container with minimal margins on big screens */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-3 xl:px-3 2xl:px-3">
        {/* Section Header - Hero Section Font Styles */}
        <motion.div
          variants={introContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl mb-8 sm:mb-10 lg:mb-16 text-left"
        >
          {/* Badge - Hero section style */}
          <motion.div 
            variants={fromLeftVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 sm:mb-4 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20"
          >
            <span className="text-xs sm:text-sm font-medium font-sans tracking-wide text-[#6366F1] italic ml-[.5rem]">Our Services</span>
          </motion.div>
          
          {/* Heading - Hero section style */}
          <motion.h2 
            variants={fromLeftVariants}
            className="text-2xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-white mb-2 ml-[.5rem] sm:mb-4 leading-tight"
          >
            Comprehensive Digital{' '}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h2>
          
          {/* Description - Hero section style */}
          <motion.p 
            variants={fromLeftVariants}
            className="text-sm sm:text-base ml-[.5rem] lg:text-lg text-[#94A3B8] max-w-2xl leading-relaxed font-light tracking-wide"
          >
            Complete solutions tailored for your business needs
          </motion.p>
          
          {/* Decorative line */}
          <motion.div 
            variants={fromRightVariants}
            className="mt-3 sm:mt-5"
          >
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-fr"
        >
          {services.map((service) => {
            return (
              <Link href="/services" key={service.id} className="block h-full cursor-pointer">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -4,
                    transition: { type: 'spring', stiffness: 200, damping: 15 }
                  }}
                  className="group relative cursor-pointer h-full"
                >
                  {/* Border glow effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm"
                    style={{ 
                      background: `linear-gradient(to right, ${service.color}, ${service.color}80)`
                    }}
                  />
                  
                  {/* Main Card */}
                  <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 sm:p-5 lg:p-6 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/5 h-full flex flex-col cursor-pointer overflow-hidden">
                    
                    {/* Icon Container */}
                    <div className="relative mb-3 sm:mb-4 flex-shrink-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                        <span className="text-xl sm:text-2xl lg:text-3xl">
                          {service.icon}
                        </span>
                      </div>
                      
                      {/* Glow effect behind icon */}
                      <div 
                        className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"
                        style={{ background: `linear-gradient(to right, ${service.color}, ${service.color}40)` }}
                      />
                    </div>

                    {/* Title - Hero section style */}
                    <h3 className="text-base sm:text-lg font-semibold font-sans tracking-wide text-white mb-1 sm:mb-2 group-hover:text-[#6366F1] transition-colors duration-300 flex-shrink-0">
                      {service.title}
                    </h3>

                    {/* Description - Hero section style */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light tracking-wide line-clamp-3 flex-grow">
                      {service.description}
                    </p>

                    {/* Arrow indicator on hover */}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-[#6366F1]" />
                    </div>

                    {/* Bottom Line - Moves left to right on hover (Blue to Green) */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1E293B] to-[#1E293B] group-hover:from-[#3B82F6] group-hover:to-[#22C55E] transition-all duration-500 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left" />

                    {/* Right Side Thin Gradient Line - Appears on hover */}
                    <div className="absolute top-0 right-0 w-0.5 h-0 bg-gradient-to-b from-[#3B82F6] to-[#22C55E] group-hover:h-full transition-all duration-500 ease-out origin-top" />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div 
                        className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-500 transform rotate-12 translate-x-6 -translate-y-6"
                        style={{ 
                          background: `linear-gradient(to bottom right, ${service.color}, ${service.color}80)`
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* CTA for more services */}
        <motion.div
          variants={fromBottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <Link href="/services" className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 text-sm sm:text-base cursor-pointer"
            >
              View All Services
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;