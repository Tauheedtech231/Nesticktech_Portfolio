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
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Scroll progress for product showcase - much slower transition
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

  // Parallax scroll effects for background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.4, 0.2]);
  
  // Card scale animation
  const cardScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);

  // Current active product based on scroll - MUCH slower change
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const newIndex = Math.min(
        Math.floor(value * products.length * 0.6),
        products.length - 1
      );
      if (newIndex !== activeProductIndex && newIndex >= 0) {
        setActiveProductIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, products.length, activeProductIndex]);

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
        <section className="relative  bg-[#020617] overflow-hidden">
          {/* Parallax Background */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            style={{ y: bgY }}
          >
            <motion.div 
              className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl"
              style={{ opacity: bgOpacity }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl"
              style={{ opacity: bgOpacity }}
            />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#6366F1]/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  y: useTransform(scrollYProgress, [0, 1], [0, (Math.random() - 0.5) * 100]),
                  x: useTransform(scrollYProgress, [0, 1], [0, (Math.random() - 0.5) * 50]),
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              className="max-w-3xl text-left"
            >
              <motion.div 
                variants={fromLeftVariants}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-[#1E293B] mb-3 cursor-pointer"
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
                variants={fromLeftVariants}
                className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-2"
              >
                Owned{' '}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Solutions
                </span>
              </motion.h1>

              <motion.p 
                variants={fromLeftVariants}
                className="text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-light tracking-wide"
              >
                Powerful, scalable, and ready-to-deploy products built by our expert team to solve real-world business challenges.
              </motion.p>

              <motion.div 
                variants={fromLeftVariants}
                className="mt-3"
              >
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Product Showcase Section - Single Card with Image and Description */}
        <section ref={showcaseRef} className="relative py-8 bg-[#020617] min-h-[200vh]">
          <div className="sticky top-20 lg:top-24 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center">
                <motion.div 
                  className="w-full max-w-5xl"
                  style={{
                    scale: cardScale,
                  }}
                >
                  <motion.div
                    key={currentProduct?.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl shadow-[#6366F1]/10 hover:shadow-[#6366F1]/20 transition-all duration-500"
                  >
                    {/* Card Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentProduct?.gradient} opacity-0 hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative flex flex-col lg:flex-row gap-6 p-6 lg:p-8">
                      {/* Left Side - Content Section */}
                      <div className="lg:w-1/2 space-y-4">
                        <div className="inline-flex items-center gap-2">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentProduct?.gradient} flex items-center justify-center shadow-lg cursor-pointer`}>
                            {currentProduct && <currentProduct.icon className="w-5 h-5 text-white" />}
                          </div>
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(currentProduct?.status || 'Live')} cursor-pointer`}>
                            {currentProduct?.status}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-white cursor-pointer hover:text-[#6366F1] transition-colors duration-300">
                          {currentProduct?.name}
                        </h2>

                        <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed font-light tracking-wide">
                          {currentProduct?.fullDescription}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {currentProduct?.features.slice(0, 6).map((feature, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-center gap-1.5 cursor-pointer"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" />
                              <span className="text-xs text-[#94A3B8] font-light">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {currentProduct?.tags.map((tag, idx) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-[11px] px-2.5 py-1 bg-[#1E293B] text-[#94A3B8] rounded-full border border-transparent hover:border-[#6366F1] hover:text-[#6366F1] transition-all duration-300 cursor-pointer"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          onClick={() => handleRequestDemo(currentProduct?.name || '')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group cursor-pointer text-sm mt-2"
                        >
                          <Rocket className="w-3.5 h-3.5" />
                          <span>Request Demo</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>

                      {/* Right Side - Image Section */}
                      <motion.div 
                        className="relative lg:w-1/2 cursor-pointer group/image"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative rounded-2xl overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct?.gradient} opacity-20 rounded-2xl z-10`} />
                          <Image
                            src={currentProduct?.image || ''}
                            alt={currentProduct?.name || ''}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover/image:scale-110 cursor-pointer"
                            priority
                          />
                          
                          {/* Floating badges */}
                          <motion.div 
                            className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 z-20 cursor-pointer"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className="flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                              <span className="text-[10px] text-white font-medium">4.9/5 Rating</span>
                            </div>
                          </motion.div>

                          <motion.div 
                            className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 z-20 cursor-pointer"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                          >
                            <div className="flex items-center gap-1">
                              <Users className="w-2.5 h-2.5 text-[#6366F1]" />
                              <span className="text-[10px] text-white font-medium">100+ Businesses</span>
                            </div>
                          </motion.div>

                          <motion.div 
                            className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 z-20 cursor-pointer"
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          >
                            <div className="flex items-center gap-1">
                              <Shield className="w-2.5 h-2.5 text-[#22C55E]" />
                              <span className="text-[10px] text-white font-medium">Enterprise Grade</span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 py-3 bg-gradient-to-t from-[#0F172A] to-transparent">
                      {products.map((_, idx) => (
                        <motion.div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                            idx === activeProductIndex
                              ? 'w-6 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                              : 'w-1 bg-[#1E293B] hover:bg-[#6366F1]/50'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => {
                            const targetProgress = idx / products.length;
                            window.scrollTo({
                              top: (showcaseRef.current?.offsetTop || 0) + (targetProgress * window.innerHeight * 2),
                              behavior: 'smooth'
                            });
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Request Demo Modal - Keep as is */}
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