// app/get-quote/page.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Code,
  Rocket,
  ArrowRight,
  FileText,
  Building2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Star,
  Shield,
  Zap,
  ChevronRight,
  TrendingUp,
  Settings,
  GitBranch,
  Target,
  Lock,
  BarChart,
  Layers
} from 'lucide-react';
import Image from 'next/image';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  requirements: string;
}

interface ServicePackage {
  id: number;
  name: string;
  price: string;
  features: string[];
  popular: boolean;
  gradient: string;
}

const GetQuotePage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    requirements: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const sectionRef = useRef(null);

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'AI/ML Solutions',
    'E-commerce Development',
    'Custom Software',
    'UI/UX Design',
    'Digital Marketing',
    'IT Consulting',
    'Other'
  ];

  const budgetRanges = [
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure yet'
  ];

  const timelines = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Not sure'
  ];

  const servicePackages: ServicePackage[] = [
    {
      id: 1,
      name: 'Basic Package',
      price: 'Starting from $1,000',
      features: [
        'Basic website/app development',
        'Responsive design',
        '3 months support',
        'Basic SEO setup',
        '1 round of revisions'
      ],
      popular: false,
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 2,
      name: 'Professional Package',
      price: 'Starting from $5,000',
      features: [
        'Advanced web/app development',
        'Custom UI/UX design',
        '6 months support',
        'Advanced SEO optimization',
        '3 rounds of revisions',
        'Analytics integration',
        'Priority support'
      ],
      popular: true,
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 3,
      name: 'Enterprise Package',
      price: 'Starting from $15,000',
      features: [
        'Enterprise-grade solution',
        'Custom architecture',
        '12 months support',
        'Full SEO & marketing suite',
        'Unlimited revisions',
        '24/7 dedicated support',
        'Scalable infrastructure',
        'Security audit'
      ],
      popular: false,
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePackageSelect = (id: number) => {
    setSelectedPackage(id);
    const packageName = servicePackages.find(p => p.id === id)?.name;
    setFormData(prev => ({ ...prev, projectType: packageName || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        projectType: '',
        budget: '',
        timeline: '',
        projectDescription: '',
        requirements: '',
      });
      setSelectedPackage(null);
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

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

  return (
    <main className="min-h-screen bg-[#020617] pt-20 lg:pt-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header Section - Services Section Font Styles */}
        <motion.div
          variants={introContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <motion.div 
            variants={fromTopVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B] mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span className="text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
              Get a Quote
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fromTopVariants}
            className="text-3xl md:text-4xl  font-bold font-serif tracking-tight text-[#F8FAFC] mb-4"
          >
            Get Your{' '}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Custom Quote
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fromTopVariants}
            className="text-base lg:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Tell us about your project and we&apos;ll provide a tailored quote within 24 hours. 
            No obligation, just expert advice.
          </motion.p>
        </motion.div>

        {/* Packages Section - Services Section Font Styles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 lg:mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold font-serif tracking-tight text-[#F8FAFC] text-center mb-8"
          >
            Choose a Package That Fits Your Needs
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id ? 'ring-2 ring-[#6366F1] ring-offset-2 ring-offset-[#020617]' : ''
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-medium font-sans tracking-wide rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`bg-[#0F172A] border ${selectedPackage === pkg.id ? 'border-[#6366F1]' : 'border-[#1E293B]'} rounded-2xl p-6 hover:border-[#6366F1]/50 transition-all duration-300 h-full`}>
                  <h3 className="text-xl font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-[#6366F1] mb-4">{pkg.price}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#94A3B8] font-light tracking-wide">
                        <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`mt-auto pt-4 border-t border-[#1E293B] ${selectedPackage === pkg.id ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs text-[#6366F1] font-medium">✓ Selected</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Form */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section - Services Section Font Styles */}
          <motion.div
            variants={fromLeftVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-2">Project Details</h2>
              <p className="text-sm text-[#94A3B8] font-light tracking-wide mb-6">Fill out the form below to get your custom quote</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Project Type *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Expected Timeline *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Project Description *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-[#94A3B8]" />
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 resize-none font-light tracking-wide"
                      placeholder="Describe your project, goals, and requirements..."
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Additional Requirements (Optional)
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all duration-300 resize-none font-light tracking-wide"
                    placeholder="Any specific technologies, integrations, or features you need?"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Your Quote
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg text-[#22C55E]"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-light tracking-wide">Quote request submitted! We&apos;ll get back to you within 24 hours.</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-[#EF4444]"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-light tracking-wide">Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column - Info & Benefits - Services Section Font Styles */}
          <motion.div
            variants={fromRightVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Why Get Quote */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
              <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-4">Why Get a Quote?</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: 'Quick turnaround time - 24 hour response', color: '#6366F1' },
                  { icon: Shield, text: 'No obligation, completely free', color: '#22C55E' },
                  { icon: Users, text: 'Expert consultation included', color: '#F59E0B' },
                  { icon: Code, text: 'Detailed project breakdown', color: '#EF4444' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[#020617] rounded-lg border border-[#1E293B] cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <span className="text-sm text-[#F8FAFC] font-light tracking-wide">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What's Included - Expanded Content */}
<div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden group cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300">
  <Link href="/contact" className="block">
    <div className="relative w-full h-80 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      >
        <source src="/contact.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
      
      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-4 shadow-xl">
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-white text-xl font-bold font-serif tracking-tight mb-2">Need Assistance?</h3>
        <p className="text-[#94A3B8] text-sm font-light tracking-wide mb-4">Our team is ready to help you</p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300">
          <span>Contact Support</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </Link>
</div>

            {/* Our Process */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
              <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-4">Our Process</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Submit Request', desc: 'Fill out the quote form with your project details' },
                  { step: '2', title: 'Review & Analysis', desc: 'Our experts review your requirements' },
                  { step: '3', title: 'Custom Quote', desc: 'Receive detailed quote within 24 hours' },
                  { step: '4', title: 'Consultation Call', desc: 'Discuss details and next steps' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC]">{item.title}</h4>
                      <p className="text-xs text-[#94A3B8] font-light tracking-wide">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/20 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-sm text-[#F8FAFC] font-semibold font-sans tracking-wide mb-1">Trusted by 200+ businesses</p>
              <p className="text-xs text-[#94A3B8] font-light tracking-wide">98% client satisfaction rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default GetQuotePage;