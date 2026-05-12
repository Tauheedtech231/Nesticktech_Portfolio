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

interface Industry {
  id: number;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
  gradient: string;
  bgPattern: string;
  borderHighlight: string;
  offsetX: string;
  offsetY: string;
  zIndex: number;
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
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Fix: Only enable useScroll after component is mounted
  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ["start end", "end start"]
  });
  
  // Fixed particles - no random values to prevent hydration mismatch
  const particles = [
    { left: "8.71%", top: "58.48%" },
    { left: "62.73%", top: "53.49%" },
    { left: "44.48%", top: "15.41%" },
    { left: "92.23%", top: "33.54%" },
    { left: "48.74%", top: "77.15%" },
    { left: "38.83%", top: "4.15%" },
    { left: "69.60%", top: "42.94%" },
    { left: "85.73%", top: "28.72%" },
    { left: "85.39%", top: "36.32%" },
    { left: "57.09%", top: "82.16%" },
    { left: "1.75%", top: "2.31%" },
    { left: "70.22%", top: "22.69%" },
    { left: "88.90%", top: "37.37%" },
    { left: "89.68%", top: "26.47%" },
    { left: "35.24%", top: "11.77%" },
    { left: "25.59%", top: "41.14%" },
    { left: "90.99%", top: "21.48%" },
    { left: "47.63%", top: "7.59%" },
    { left: "10.88%", top: "99.61%" },
    { left: "62.01%", top: "37.96%" },
    { left: "52.90%", top: "75.34%" },
    { left: "73.08%", top: "13.88%" },
    { left: "15.67%", top: "51.51%" },
    { left: "21.50%", top: "87.93%" },
    { left: "50.91%", top: "54.16%" },
    { left: "78.58%", top: "40.47%" },
    { left: "50.23%", top: "0.18%" },
    { left: "84.84%", top: "60.20%" },
    { left: "84.51%", top: "60.74%" },
    { left: "21.13%", top: "43.04%" },
  ];

  const industries: Industry[] = [
    {
      id: 1,
      name: "Education",
      icon: GraduationCap,
      description: "LMS platforms, student management systems, online learning solutions",
      color: "#6366F1",
      gradient: "from-[#6366F1] to-[#8B5CF6]",
      bgPattern: "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-t-[#6366F1]",
      offsetX: "0px",
      offsetY: "0px",
      zIndex: 10,
    },
    {
      id: 2,
      name: "E-commerce",
      icon: ShoppingBag,
      description: "Online stores, payment integration, inventory management",
      color: "#22C55E",
      gradient: "from-[#22C55E] to-[#86EFAC]",
      bgPattern: "radial-gradient(circle at 80% 40%, rgba(34,197,94,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-r-[#22C55E]",
      offsetX: "-8px",
      offsetY: "12px",
      zIndex: 9,
    },
    {
      id: 3,
      name: "Construction",
      icon: Building2,
      description: "Project management, resource planning, site monitoring",
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#FBBF24]",
      bgPattern: "radial-gradient(circle at 40% 70%, rgba(245,158,11,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-b-[#F59E0B]",
      offsetX: "5px",
      offsetY: "-8px",
      zIndex: 8,
    },
    {
      id: 4,
      name: "Startups",
      icon: Rocket,
      description: "MVP development, scaling solutions, tech strategy",
      color: "#EF4444",
      gradient: "from-[#EF4444] to-[#F87171]",
      bgPattern: "radial-gradient(circle at 60% 20%, rgba(239,68,68,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-l-[#EF4444]",
      offsetX: "-5px",
      offsetY: "8px",
      zIndex: 11,
    },
    {
      id: 5,
      name: "Banking & Finance",
      icon: Landmark,
      description: "Secure transactions, compliance systems, analytics",
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#60A5FA]",
      bgPattern: "radial-gradient(circle at 90% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-t-[#3B82F6]",
      offsetX: "10px",
      offsetY: "-5px",
      zIndex: 7,
    },
    {
      id: 6,
      name: "Medical",
      icon: Heart,
      description: "Healthcare apps, patient management, telemedicine",
      color: "#EC489A",
      gradient: "from-[#EC489A] to-[#F472B6]",
      bgPattern: "radial-gradient(circle at 10% 90%, rgba(236,72,153,0.08) 0%, transparent 60%)",
      borderHighlight: "hover:border-r-[#EC489A]",
      offsetX: "-10px",
      offsetY: "5px",
      zIndex: 12,
    },
  ];

  // Fixed stone positions - no random values
  const stonePositions = [
    { x: -600, y: -300, rotate: -35, scale: 0.2 },
    { x: 650, y: -250, rotate: 40, scale: 0.25 },
    { x: -500, y: 200, rotate: -25, scale: 0.3 },
    { x: 550, y: 180, rotate: 30, scale: 0.28 },
    { x: -400, y: -350, rotate: -45, scale: 0.22 },
    { x: 450, y: -280, rotate: 35, scale: 0.26 },
  ];

  // Store transforms for each card with fixed values - only when mounted
  const cardTransforms = industries.map((_, index) => {
    const stonePos = stonePositions[index];
    const start = 0.08 + (Math.floor(index / 2) * 0.04);
    const end = 0.35 + (Math.floor(index / 2) * 0.04);
    
    return {
      x: useTransform(scrollYProgress, [start, end], [stonePos.x, 0]),
      y: useTransform(scrollYProgress, [start, end], [stonePos.y, 0]),
      rotate: useTransform(scrollYProgress, [start, end], [stonePos.rotate, 0]),
      scale: useTransform(scrollYProgress, [start, end], [stonePos.scale, 1]),
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

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-12 bg-[#020617] overflow-hidden"
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

        {/* Floating Particles - Fixed positions */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#6366F1]/40 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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

          {/* Desktop Grid View - NO GAPS between cards - Stone pile effect */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                      zIndex: industry.zIndex,
                    }}
                  >
                    {/* Stone pile effect - overlapping borders */}
                    <div 
                      className="relative bg-[#0F172A] border border-[#1E293B] transition-all duration-300 hover:z-20 hover:-translate-y-1 cursor-pointer overflow-hidden"
                      style={{
                        margin: '-1px',
                        padding: '1.25rem',
                        minHeight: '200px',
                        backgroundImage: industry.bgPattern,
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {/* Stone-like rough edge effects */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent" />
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E293B] to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E293B] to-transparent" />
                      </div>

                      {/* Different border highlight on hover for each stone */}
                      <div className={`absolute inset-0 border-2 rounded-none opacity-0 group-hover:opacity-100 transition-all duration-300 ${industry.borderHighlight}`} />
                      
                      {/* Unique corner accent for each stone */}
                      <div 
                        className="absolute -top-8 -right-8 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle, ${industry.color}, transparent 70%)`
                        }}
                      />
                      
                      {/* Stone texture dots */}
                      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: industry.color }} />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: industry.color }} />
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: industry.color }} />
                      </div>

                      {/* Icon with stone-like animation */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#8B5CF6] transition-all duration-300">
                        {industry.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#94A3B8] leading-relaxed font-light tracking-wide">
                        {industry.description}
                      </p>

                      {/* Bottom line indicator per stone */}
                      <div 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${industry.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
                        
                        <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-5 hover:border-[#6366F1]/30 transition-all duration-300 cursor-pointer">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          <h3 className="text-base font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                            {industry.name}
                          </h3>

                          <p className="text-xs text-[#94A3B8] leading-relaxed font-light tracking-wide">
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