'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  ShoppingBag, 
  Building2, 
  Rocket, 
  Landmark, 
  Heart,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';

interface Industry {
  id: number;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
  gradient: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  projectDescription: string;
}

const IndustriesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.1]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  const industries: Industry[] = [
    {
      id: 1,
      name: "Education",
      icon: GraduationCap,
      description: "LMS platforms, student management systems, online learning solutions",
      color: "#6366F1",
      gradient: "from-[#6366F1] to-[#8B5CF6]",
    },
    {
      id: 2,
      name: "E-commerce",
      icon: ShoppingBag,
      description: "Online stores, payment integration, inventory management",
      color: "#22C55E",
      gradient: "from-[#22C55E] to-[#86EFAC]",
    },
    {
      id: 3,
      name: "Construction",
      icon: Building2,
      description: "Project management, resource planning, site monitoring",
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#FBBF24]",
    },
    {
      id: 4,
      name: "Startups",
      icon: Rocket,
      description: "MVP development, scaling solutions, tech strategy",
      color: "#EF4444",
      gradient: "from-[#EF4444] to-[#F87171]",
    },
    {
      id: 5,
      name: "Banking & Finance",
      icon: Landmark,
      description: "Secure transactions, compliance systems, analytics",
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#60A5FA]",
    },
    {
      id: 6,
      name: "Medical",
      icon: Heart,
      description: "Healthcare apps, patient management, telemedicine",
      color: "#EC489A",
      gradient: "from-[#EC489A] to-[#F472B6]",
    },
  ];

  const handleConsultancyClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        projectDescription: '',
      });
      setSelectedIndustry('');
    }, 3000);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % industries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + industries.length) % industries.length);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
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

  const fromTopVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
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

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    projectDescription: '',
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-12 sm:py-12 lg:py-12 bg-[#020617] overflow-hidden"
      >
        {/* Parallax Background elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y: y1 }}
        >
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl"
            style={{ opacity: opacity1, scale: scale1 }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl"
            style={{ opacity: opacity2 }}
          />
        </motion.div>

        {/* Parallax floating particles */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: y2 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#6366F1]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + (i % 5)}s infinite ease-in-out`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Parallax grid pattern */}
        <motion.div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"
          style={{ y: y3 }}
        />

        {/* Parallax glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-full blur-3xl"
          style={{ y: y4, x: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#8B5CF6]/10 to-[#6366F1]/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]), x: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Services Section Font Styles */}
          <motion.div
            variants={introContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-8 lg:mb-12"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
          >
            {/* Badge - Italic text and cursor pointer */}
            <motion.div 
              variants={fromTopVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs lg:text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                Industries We Serve
              </span>
            </motion.div>
            
            {/* Heading - Services section style */}
            <motion.h2 
              variants={fromTopVariants}
              className="text-2xl  lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-3"
            >
              Trusted by{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Leading Industries
              </span>
            </motion.h2>
            
            {/* Description - Services section style */}
            <motion.p 
              variants={fromTopVariants}
              className="text-base md:text-lg text-[#94A3B8] font-light tracking-wide"
            >
              Specialized digital solutions tailored for your industry&apos;s unique challenges
            </motion.p>
          </motion.div>

          {/* Desktop Grid View - with cursor pointer on cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -15]) }}
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative cursor-pointer"
                  style={{ 
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    y: useTransform(scrollYProgress, [0, 1], [0, -(index * 5)]),
                    transition: "transform 0.3s ease-out"
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                  
                  <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 h-full hover:-translate-y-1 cursor-pointer">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Industry Name - Services section font style */}
                    <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                      {industry.name}
                    </h3>

                    {/* Description - Services section font style */}
                    <p className="text-sm text-[#94A3B8] leading-relaxed font-light tracking-wide">
                      {industry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Slider View - with cursor pointer on buttons */}
          <div className="relative sm:hidden">
            <div className="overflow-hidden px-2">
              <motion.div
                ref={sliderRef}
                className="flex"
                animate={{ x: -currentSlide * 100 + '%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <div
                      key={industry.id}
                      className="flex-shrink-0 w-full px-2"
                    >
                      <div className="group relative cursor-pointer">
                        <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                        
                        <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 cursor-pointer">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          {/* Industry Name - Services section font style */}
                          <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                            {industry.name}
                          </h3>

                          {/* Description - Services section font style */}
                          <p className="text-sm text-[#94A3B8] leading-relaxed font-light tracking-wide">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Navigation Buttons - with cursor pointer */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0F172A] border border-[#1E293B] rounded-full p-2 hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#6366F1]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0F172A] border border-[#1E293B] rounded-full p-2 hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#6366F1]" />
            </button>

            {/* Dots Indicator - with cursor pointer */}
            <div className="flex justify-center gap-2 mt-6">
              {industries.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-6 h-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full'
                      : 'w-1.5 h-1.5 bg-[#1E293B] rounded-full hover:bg-[#6366F1]/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA - with cursor pointer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-8 pt-6 border-t border-[#1E293B]"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
          >
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#94A3B8] mb-4 text-sm sm:text-base font-light tracking-wide"
            >
              Ready to transform your business with cutting-edge digital solutions?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 hover:scale-105 group text-sm sm:text-base cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-12px) translateX(6px);
            opacity: 0.5;
          }
          75% {
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default IndustriesSection;