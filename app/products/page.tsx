// app/products/page.tsx
'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { 
  Building2, 
  ShoppingCart, 
  TrendingUp, 
  Store,
  Sparkles,
  Search,
  X,
  Send,
  CheckCircle,
  User,
  Building,
  Briefcase,
  Phone,
  FileText,
  Rocket,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
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
}

interface FormData {
  name: string;
  companyName: string;
  productInterest: string;
  useCase: string;
  contactNumber: string;
}

const ProductsPage = () => {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
    },
  ], []);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (searchQuery.trim() === '') {
      return products;
    }
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query) ||
      product.fullDescription.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, products]);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
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

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Live': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'In Development': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'Concept': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#020617] pt-20 lg:pt-24">
        <section
          ref={sectionRef}
          className="relative py-12 lg:py-16 bg-[#020617] overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Company Intro Section - Reduced Padding like Blogs */}
            <motion.div
              variants={introContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
            >
              {/* Badge */}
              <motion.div 
                variants={fromTopVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B] mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"></span>
                </span>
                <span className="text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                  Our Products
                </span>
              </motion.div>

              {/* Heading - Smaller like Blogs */}
              <motion.h2 
                variants={fromTopVariants}
                className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-3"
              >
                Owned{' '}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Solutions
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p 
                variants={fromTopVariants}
                className="text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
              >
                Powerful, scalable, and ready-to-deploy products built by our expert team to solve real-world business challenges.
              </motion.p>

              {/* Stats */}
              <motion.div 
                variants={fromBottomVariants}
                className="flex flex-wrap justify-center gap-6 pt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  <span className="text-sm text-[#94A3B8] font-light tracking-wide">4 Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-sm text-[#94A3B8] font-light tracking-wide">2 Live Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm text-[#94A3B8] font-light tracking-wide">In Development</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl mx-auto mb-8 lg:mb-10"
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl opacity-0 transition-opacity duration-300 ${isSearchFocused ? 'opacity-20' : ''}`} />
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search products by name, category, or technology..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl py-3 pl-12 pr-12 text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-colors duration-300 font-light tracking-wide"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 p-1 rounded-full hover:bg-[#1E293B] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4 text-[#94A3B8]" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results Count */}
              <div className="flex justify-end mt-2">
                <span className="text-xs text-[#94A3B8] font-light tracking-wide">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </span>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredId(product.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="group relative cursor-pointer"
                  >
                    {/* Card Border Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg`} />
                    
                    {/* Main Card */}
                    <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden hover:border-transparent transition-all duration-300 hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Icon and Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(product.status)} font-light tracking-wide`}>
                            {product.status}
                          </span>
                        </div>

                        {/* Product Name */}
                        <h3 className="text-xl font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                          {product.name}
                        </h3>
                        
                        {/* Short Description */}
                        <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed line-clamp-2 font-light tracking-wide">
                          {product.shortDescription}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 bg-[#1E293B] text-[#94A3B8] rounded-full border border-transparent hover:border-[#6366F1] hover:text-[#6366F1] transition-colors duration-300 font-light tracking-wide cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Request Demo Button */}
                        <button
                          onClick={() => handleRequestDemo(product.name)}
                          className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group/btn cursor-pointer"
                        >
                          <Rocket className="w-4 h-4" />
                          <span>Request Demo</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Bottom Gradient Line */}
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${product.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#0F172A] rounded-full flex items-center justify-center border border-[#1E293B]">
                  <Search className="w-8 h-8 text-[#94A3B8]" />
                </div>
                <h3 className="text-xl font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2">No products found</h3>
                <p className="text-[#94A3B8] mb-6 font-light tracking-wide">
                  Try adjusting your search to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-[#6366F1] text-white font-semibold font-sans tracking-wide rounded-xl hover:bg-[#8B5CF6] transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  Clear Search
                </button>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 pt-6 border-t border-[#1E293B] text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold font-sans tracking-wide text-white mb-3">
                  Need a Custom Solution?
                </h3>
                <p className="text-[#94A3B8] mb-6 font-light tracking-wide">
                  Don&apos;t see what you&apos;re looking for? Let&apos;s build something unique for your business.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] border border-[#1E293B] text-[#F8FAFC] font-medium font-sans tracking-wide rounded-xl hover:border-[#6366F1] hover:text-[#6366F1] transition-all duration-300 group cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Request Demo Modal - (keep the same modal code as before) */}
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
              {/* Modal Header */}
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

              {/* Form */}
              {!isSubmitted ? (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="p-4 sm:p-6 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Name */}
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
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
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
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  {/* Product Interest */}
                  <div>
                    <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                      Product Interest *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <select
                        name="productInterest"
                        required
                        value={formData.productInterest}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors appearance-none font-light tracking-wide cursor-pointer"
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name} ({product.status})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contact Number */}
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
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Use Case / Requirement */}
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
                        className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none font-light tracking-wide"
                        placeholder="Tell us about your business needs and how this product can help..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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
                // Success Message
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
                    Thank you for your interest in {selectedProduct}! Our team will contact you within 24 hours to schedule a demo.
                  </p>
                  <p className="text-xs text-[#6366F1] font-medium tracking-wide">
                    A confirmation email has been sent
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