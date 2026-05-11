/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  ShoppingBag, 
  Building2, 
  Rocket, 
  Landmark, 
  Heart,
  Sparkles,
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
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
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

  // Generate random starting positions and angles for each card
  const getRandomTransform = (index: number) => {
    // Different random seeds for each card
    const seeds = [1, 2, 3, 4, 5, 6];
    const seed = seeds[index];
    
    // Random starting X position (-300px to 300px)
    const startX = (Math.sin(seed * 45) * 200) + (Math.random() * 100);
    // Random starting Y position (-200px to 200px)
    const startY = (Math.cos(seed * 30) * 150) + (Math.random() * 80);
    // Random rotation (-45deg to 45deg)
    const startRotate = (Math.sin(seed * 60) * 40) + (Math.random() * 20);
    // Random scale (0.3 to 0.7)
    const startScale = 0.3 + (Math.random() * 0.4);
    
    return { startX, startY, startRotate, startScale };
  };

  // Store random transforms for each card
  const cardTransforms = industries.map((_, index) => {
    const { startX, startY, startRotate, startScale } = getRandomTransform(index);
    const start = 0.1 + (index * 0.04);
    const end = 0.4 + (index * 0.04);
    
    return {
      x: useTransform(scrollYProgress, [start, end], [startX, 0]),
      y: useTransform(scrollYProgress, [start, end], [startY, 0]),
      rotate: useTransform(scrollYProgress, [start, end], [startRotate, 0]),
      scale: useTransform(scrollYProgress, [start, end], [startScale, 1]),
      opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
    };
  });

  // Header animation
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0.05, 0.2], [0.8, 1]);

  // CTA animation
  const ctaY = useTransform(scrollYProgress, [0.55, 0.7], [50, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Floating particles with random movement
  const particles = [...Array(30)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: i * 0.1,
    xMove: useTransform(scrollYProgress, [0, 1], [0, (Math.random() - 0.5) * 200]),
    yMove: useTransform(scrollYProgress, [0, 1], [0, (Math.random() - 0.5) * 150]),
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
        className="relative py-8 bg-[#020617] overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y: bgY }}
        >
          <div className="absolute top-20 left-10 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#6366F1]/40 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                x: particle.xMove,
                y: particle.yMove,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Fly in from top */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
            style={{
              y: headerY,
              opacity: headerOpacity,
              scale: headerScale,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs lg:text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                Industries We Serve
              </span>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-3">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Leading Industries
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-[#94A3B8] font-light tracking-wide">
              Specialized digital solutions tailored for your industry&apos;s unique challenges
            </p>
          </motion.div>

          {/* Desktop Grid View - Cards come from different random angles */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const transform = cardTransforms[index];
              return (
                <motion.div
                  key={industry.id}
                  className="group relative cursor-pointer"
                  style={{
                    x: transform.x,
                    y: transform.y,
                    rotate: transform.rotate,
                    scale: transform.scale,
                    opacity: transform.opacity,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${industry.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                  
                  <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 h-full hover:-translate-y-1 cursor-pointer">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                      {industry.name}
                    </h3>

                    <p className="text-sm text-[#94A3B8] leading-relaxed font-light tracking-wide">
                      {industry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Slider View */}
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
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                            {industry.name}
                          </h3>

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

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-12 pt-6 border-t border-[#1E293B]"
            style={{
              y: ctaY,
              opacity: ctaOpacity,
            }}
          >
            <p className="text-[#94A3B8] mb-4 text-sm sm:text-base font-light tracking-wide">
              Ready to transform your business with cutting-edge digital solutions?
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group text-sm sm:text-base cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div ref={modalRef} className="bg-[#0F172A] rounded-2xl max-w-md w-full p-6 border border-[#1E293B]">
            <h3 className="text-xl font-bold text-white mb-4">Get Free Consultation</h3>
            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white font-medium">Thank you!</p>
                <p className="text-[#94A3B8] text-sm mt-1">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#020617] border border-[#1E293B] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#020617] border border-[#1E293B] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] transition-colors"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#020617] border border-[#1E293B] rounded-lg text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1] transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IndustriesSection;