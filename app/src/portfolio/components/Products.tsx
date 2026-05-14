/* eslint-disable react-hooks/rules-of-hooks */

// app/products/page.tsx
'use client';

import { AnimatePresence, motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { 
  Building2, 
  ShoppingCart, 
  TrendingUp, 
  Store,
  Sparkles,
  Send,
  CheckCircle,
  User,
  Building,
  Briefcase,
  Phone,
  FileText,
  Rocket,
  ArrowRight,
  LucideIcon,
  X,
  Star,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  status: 'Live' | 'In Development' | 'Concept';
  tags: string[];
  gradient: string;
  icon: LucideIcon;
  color: string;
  image: string;
  features: string[];
}

interface FormData {
  name: string;
  companyName: string;
  productInterest: string;
  useCase: string;
  contactNumber: string;
}

const ProductsPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [lastSwitchTime, setLastSwitchTime] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Scroll progress for product showcase
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"]
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    companyName: '',
    productInterest: '',
    useCase: '',
    contactNumber: '',
  });

  const products: Product[] = useMemo(() => [
    {
      id: 1,
      name: 'Neezamiya',
      shortDescription: 'Complete educational management system for schools and universities',
      fullDescription: 'All-in-one platform for schools, colleges, and universities. Manage students, teachers, attendance, grades, fees, examinations, and parent portals with real-time analytics and reporting.',
      status: 'Live',
      tags: ['Education', 'LMS', 'School Management', 'Analytics'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      icon: Building2,
      color: '#6366F1',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
      features: ['Student Management', 'Teacher Portal', 'Grade Tracking', 'Fee Management', 'Parent Communication', 'Exam Scheduling']
    },
    {
      id: 2,
      name: 'Advance POS',
      shortDescription: 'Smart point of sale system for retail businesses',
      fullDescription: 'Complete retail management solution with inventory tracking, sales analytics, customer management, employee management, and seamless payment integration for multiple payment methods.',
      status: 'Live',
      tags: ['Retail', 'POS', 'Inventory', 'Analytics'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      icon: ShoppingCart,
      color: '#22C55E',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      features: ['Inventory Tracking', 'Sales Analytics', 'Customer Management', 'Payment Integration', 'Employee Management', 'Real-time Reports']
    },
    {
      id: 3,
      name: 'MarX',
      shortDescription: 'Digital marketing suite for modern businesses',
      fullDescription: 'Powerful marketing automation platform for businesses to manage campaigns, track leads, optimize conversions, and analyze performance across all channels.',
      status: 'In Development',
      tags: ['Marketing', 'Automation', 'Analytics', 'CRM'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      icon: TrendingUp,
      color: '#F59E0B',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      features: ['Campaign Management', 'Lead Tracking', 'Conversion Optimization', 'Channel Analytics', 'Email Marketing', 'Social Media Integration']
    },
    {
      id: 4,
      name: 'Build N',
      shortDescription: 'Construction project management software',
      fullDescription: 'Comprehensive solution for construction companies to manage projects, resources, budgets, timelines, teams, and client communications efficiently.',
      status: 'Concept',
      tags: ['Construction', 'Project Management', 'Budgeting', 'Team Collaboration'],
      gradient: 'from-[#EF4444] to-[#F87171]',
      icon: Store,
      color: '#EF4444',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
      features: ['Project Tracking', 'Resource Management', 'Budget Monitoring', 'Team Collaboration', 'Client Portal', 'Timeline Planning']
    },
  ], []);

  // Calculate which product should be visible based on scroll
  const rawProductIndex = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0, 0, 1, 2, 3, 3]
  );

  // Update active product index with 1 second pause and 2 second end pause
  useEffect(() => {
    const unsubscribe = rawProductIndex.onChange((value) => {
      const index = Math.round(value);
      const now = Date.now();
      const timeSinceLastSwitch = now - lastSwitchTime;
      
      // If 1 second hasn't passed, prevent scroll (cursor stuck)
      if (timeSinceLastSwitch < 1000 && index !== activeProductIndex) {
        // Do nothing - scroll is blocked
        return;
      }
      
      if (index >= 0 && index < products.length && index !== activeProductIndex) {
        setActiveProductIndex(index);
        setLastSwitchTime(now);
        
        // Check if we've reached the last product
        if (index === products.length - 1) {
          setIsAtEnd(true);
          // 2 second pause at the end
          setTimeout(() => {
            setIsAtEnd(false);
          }, 2000);
        }
      }
    });
    return () => unsubscribe();
  }, [rawProductIndex, products.length, activeProductIndex, lastSwitchTime]);

  // Handle request demo
  const handleRequestDemo = (productName: string) => {
    setSelectedProduct(productName);
    setFormData(prev => ({ ...prev, productInterest: productName }));
    setIsModalOpen(true);
  };

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
        name: '',
        companyName: '',
        productInterest: '',
        useCase: '',
        contactNumber: '',
      });
      setSelectedProduct('');
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

  // Animation variants
  const slideInFromRight:Variants = {
    hidden: { 
      x: 300, 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.3
      }
    },
    exit: { 
      x: -300, 
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Live': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'In Development': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'Concept': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const currentProduct = products[activeProductIndex];

  return (
    <>
      <main className="min-h-screen bg-[#020617]">
        {/* Hero Section */}
        <section className="relative bg-[#020617] overflow-hidden pt-8 pb-4">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-left"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-[#1E293B] mb-3"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#6366F1]"></span>
                </span>
                <span className="text-xs font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                  Our Products
                </span>
              </motion.div>

              <motion.h1 
                className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-2"
              >
                Owned{' '}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Solutions
                </span>
              </motion.h1>

              <motion.p 
                className="text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-light tracking-wide"
              >
                Powerful, scalable, and ready-to-deploy products built by our expert team to solve real-world business challenges.
              </motion.p>

              <motion.div 
                className="mt-3"
              >
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section 
          ref={showcaseRef} 
          className="relative bg-[#020617]"
          style={{
            height: `${products.length * 70}vh` // Height reduced
          }}
        >
          {/* Sticky Container */}
          <div className="sticky top-20 lg:top-24 h-[75vh] lg:[80vh] flex items-center justify-center overflow-hidden"> {/* Height reduced */}
            <div className="w-full h-full flex items-center justify-center">
              
              {/* Full Width Card Container */}
              <div className="w-full h-[70vh] lg:h-[75vh] relative px-0"> {/* Height reduced */}
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct?.id}
                    variants={slideInFromRight}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="w-full h-full bg-[#0F172A] border-x-0 lg:border-x border-[#1E293B] lg:rounded-2xl overflow-hidden shadow-2xl shadow-[#6366F1]/10">
                      
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${currentProduct?.gradient} opacity-10`} />
                      
                      {/* Content */}
                      <div className="relative w-full h-full flex flex-col lg:flex-row">
                        
                        {/* Left Side - Content */}
                        <div className="lg:w-[60%] p-6 lg:p-8 flex flex-col justify-center space-y-3"> {/* Padding reduced */}
                          <div className="inline-flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentProduct?.gradient} flex items-center justify-center shadow-lg`}>
                              {currentProduct && <currentProduct.icon className="w-5 h-5 text-white" />}
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(currentProduct?.status || 'Live')}`}>
                              {currentProduct?.status}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-white">
                            {currentProduct?.name}
                          </h2>

                          <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed font-light tracking-wide">
                            {currentProduct?.fullDescription}
                          </p>

                          {/* Features Grid */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {currentProduct?.features.slice(0, 6).map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                                <span className="text-xs text-[#94A3B8] font-light">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {currentProduct?.tags.map((tag, idx) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2.5 py-1 bg-[#1E293B] text-[#94A3B8] rounded-full border border-transparent"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA Button - Width Reduced */}
                          <motion.button
                            onClick={() => handleRequestDemo(currentProduct?.name || '')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer text-sm w-fit"
                          >
                            <Rocket className="w-3 h-3" />
                            <span>Request Demo</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>

                        {/* Right Side - Image */}
                        <div className="lg:w-[40%] p-4 lg:p-6 relative"> {/* Padding reduced */}
                          <div className="relative w-full h-full rounded-2xl overflow-hidden group/image cursor-pointer"> {/* Cursor pointer added */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct?.gradient} opacity-20 rounded-2xl`} />
                            <Image
                              src={currentProduct?.image || ''}
                              alt={currentProduct?.name || ''}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/image:scale-105 cursor-pointer" // Hover animation + cursor pointer
                              priority
                            />
                            
                            {/* Floating badges */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 cursor-pointer">
                              <div className="flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                                <span className="text-[10px] text-white font-medium">4.9/5</span>
                              </div>
                            </div>

                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 cursor-pointer">
                              <div className="flex items-center gap-1">
                                <Users className="w-2.5 h-2.5 text-[#6366F1]" />
                                <span className="text-[10px] text-white font-medium">100+</span>
                              </div>
                            </div>

                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 cursor-pointer">
                              <div className="flex items-center gap-1">
                                <Shield className="w-2.5 h-2.5 text-[#22C55E]" />
                                <span className="text-[10px] text-white font-medium">Enterprise</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  {products.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeProductIndex
                          ? 'w-10 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                          : 'w-2.5 bg-[#1E293B]'
                      }`}
                    />
                  ))}
                </div>

                {/* Product Counter */}
                <div className="absolute bottom-4 right-6 text-sm text-[#94A3B8] font-light">
                  {activeProductIndex + 1} / {products.length}
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Request Demo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#0F172A] border-b border-[#1E293B] px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold font-sans tracking-wide text-white">
                      Request Demo
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-light tracking-wide">
                      {selectedProduct} - Get a personalized demo
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isSubmitted ? (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="p-4 sm:p-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-sans"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-sans"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input
                        type="tel"
                        name="contactNumber"
                        required
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-sans"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                      Use Case / Requirement *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" />
                      <textarea
                        name="useCase"
                        required
                        rows={4}
                        value={formData.useCase}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none font-sans"
                        placeholder="Tell us about your business needs..."
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Demo
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  className="p-6 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold font-sans tracking-wide text-white mb-2">Request Submitted!</h4>
                  <p className="text-[#94A3B8] font-light tracking-wide mb-4">
                    Thank you for your interest! Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;