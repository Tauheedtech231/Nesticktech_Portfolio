// app/services/page.tsx
'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import {
  Globe2,
  Smartphone,
  Apple,
  Briefcase,
  Palette,
  Server,
  ShieldCheck,
  Bot,
  Zap,
  Brain,
  MessageSquare,
  Eye,
  BarChart3,
  Sparkles,
  Shield,
  Network,
  Lock,
  Swords,
  Radar,
  Cloud,
  ShoppingBag,
  Layout,
  CreditCard,
  Package,
  Store,
  TrendingUp,
  Compass,
  LineChart,
  Calculator,
  Users,
  Headphones,
  Search,
  Code2,
  ArrowRight,
  X,
  Send,
  CheckCircle
} from 'lucide-react';

// Fixed: Correct type for service icon using LucideIcon
interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  gradient: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessDetails: string;
  serviceRequired: string;
  projectDescription: string;
}

const ServicesPage = () => {
  const sectionRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessDetails: '',
    serviceRequired: '',
    projectDescription: '',
  });

  // Memoized services data for better performance
  const allServices: Service[] = useMemo(() => [
    // Development Services
    {
      id: 1,
      icon: Globe2,
      title: 'Web Development',
      description: 'Custom web applications with modern frameworks.',
      longDescription: 'We build responsive, high-performance web applications using Next.js, React, and Node.js. Our solutions are scalable, secure, and optimized for search engines.',
      category: 'Development',
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications.',
      longDescription: 'We develop cross-platform mobile applications for Android and iOS using React Native and Flutter, ensuring smooth performance on all devices.',
      category: 'Development',
      technologies: ['React Native', 'Flutter', 'Firebase', 'iOS/Android'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 3,
      icon: Apple,
      title: 'iOS Development',
      description: 'Native iOS applications with Swift.',
      longDescription: 'Native iOS applications built with Swift and SwiftUI for premium Apple ecosystem experiences with exceptional performance.',
      category: 'Development',
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'iOS'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 4,
      icon: Briefcase,
      title: 'Enterprise Software (CRM/ERP)',
      description: 'Custom CRM and ERP solutions.',
      longDescription: 'Custom CRM and ERP solutions to streamline business operations, manage clients, optimize workflows, and drive growth.',
      category: 'Development',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 5,
      icon: Palette,
      title: 'UI/UX Design & Prototyping',
      description: 'User-centered design solutions.',
      longDescription: 'User-centered design solutions with interactive prototypes for seamless digital experiences that delight users.',
      category: 'Development',
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Testing'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 6,
      icon: Server,
      title: 'API Integration & Backend',
      description: 'Robust backend systems and APIs.',
      longDescription: 'Robust backend systems and API integrations for scalable, secure, and high-performance applications with seamless data flow.',
      category: 'Development',
      technologies: ['Node.js', 'Python', 'REST API', 'GraphQL'],
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      id: 7,
      icon: ShieldCheck,
      title: 'QA & Testing Services',
      description: 'Comprehensive quality assurance.',
      longDescription: 'Comprehensive quality assurance, automated testing, and manual testing for bug-free applications with 100% coverage.',
      category: 'Development',
      technologies: ['Selenium', 'Jest', 'Cypress', 'Manual Testing'],
      gradient: 'from-[#EC489A] to-[#F472B6]',
    },
    
    // AI Solutions
    {
      id: 8,
      icon: Bot,
      title: 'AI Agents',
      description: 'Intelligent autonomous agents.',
      longDescription: 'Intelligent autonomous agents that automate complex tasks, make decisions, and learn from interactions to improve business processes.',
      category: 'AI Solutions',
      technologies: ['Python', 'LangChain', 'OpenAI', 'AutoGPT'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 9,
      icon: Zap,
      title: 'Complete Automation Solutions',
      description: 'End-to-end business automation.',
      longDescription: 'End-to-end business automation solutions that streamline workflows, reduce manual effort, and increase operational efficiency.',
      category: 'AI Solutions',
      technologies: ['Python', 'RPA', 'Zapier', 'Custom APIs'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 10,
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Predictive & recommendation systems.',
      longDescription: 'Predictive analytics and recommendation systems that leverage machine learning to provide actionable insights and personalized experiences.',
      category: 'AI Solutions',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'MLflow'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 11,
      icon: MessageSquare,
      title: 'AI Chatbots & Virtual Assistants',
      description: 'Intelligent conversation agents.',
      longDescription: 'Intelligent chatbots and virtual assistants that provide 24/7 customer support, answer queries, and automate conversations.',
      category: 'AI Solutions',
      technologies: ['OpenAI', 'Dialogflow', 'Rasa', 'LLMs'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 12,
      icon: Eye,
      title: 'Computer Vision & NLP',
      description: 'Advanced image and text processing.',
      longDescription: 'Advanced computer vision and natural language processing solutions for image recognition, text analysis, and document processing.',
      category: 'AI Solutions',
      technologies: ['OpenCV', 'YOLO', 'Hugging Face', 'Transformers'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 13,
      icon: BarChart3,
      title: 'AI Data Analytics & Automation',
      description: 'Smart analytics with automation.',
      longDescription: 'AI-powered data analytics with automated insights, trend detection, and intelligent reporting for data-driven decisions.',
      category: 'AI Solutions',
      technologies: ['Python', 'Pandas', 'Tableau', 'AutoML'],
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      id: 14,
      icon: Sparkles,
      title: 'AI Personalization',
      description: 'Personalized user experiences.',
      longDescription: 'AI-driven personalization engines that deliver tailored content, product recommendations, and user experiences at scale.',
      category: 'AI Solutions',
      technologies: ['Recommender Systems', 'User Analytics', 'A/B Testing'],
      gradient: 'from-[#EC489A] to-[#F472B6]',
    },
    
    // IT & Cybersecurity
    {
      id: 15,
      icon: Shield,
      title: 'SOC Services',
      description: '24/7 security operations center.',
      longDescription: '24/7 Security Operations Center (SOC) services with real-time threat monitoring, detection, and rapid incident response.',
      category: 'IT & Cybersecurity',
      technologies: ['SIEM', 'EDR', 'Threat Intelligence', 'SOAR'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 16,
      icon: Network,
      title: 'Network Security & Vulnerability Scanning',
      description: 'Vulnerability assessment and scanning.',
      longDescription: 'Comprehensive network security assessments and vulnerability scanning to identify and remediate security weaknesses.',
      category: 'IT & Cybersecurity',
      technologies: ['Nessus', 'OpenVAS', 'Nmap', 'Wireshark'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 17,
      icon: Swords,
      title: 'Penetration Testing & Ethical Hacking',
      description: 'Professional ethical hacking services.',
      longDescription: 'Professional penetration testing and ethical hacking services to identify vulnerabilities before attackers do.',
      category: 'IT & Cybersecurity',
      technologies: ['Metasploit', 'Burp Suite', 'Kali Linux', 'OWASP'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 18,
      icon: Radar,
      title: 'MDR (Managed Detection & Response)',
      description: 'Managed detection and response.',
      longDescription: 'Managed Detection and Response (MDR) services that provide 24/7 threat hunting, detection, and response capabilities.',
      category: 'IT & Cybersecurity',
      technologies: ['EDR', 'XDR', 'Threat Hunting', 'Incident Response'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 19,
      icon: Lock,
      title: 'Incident Response & Recovery',
      description: 'Rapid threat recovery services.',
      longDescription: 'Rapid incident response and recovery services to minimize damage and restore operations after security breaches.',
      category: 'IT & Cybersecurity',
      technologies: ['Forensics', 'Containment', 'Recovery Planning', 'IR Playbooks'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 20,
      icon: Cloud,
      title: 'Cloud Security & Compliance',
      description: 'Secure cloud infrastructure.',
      longDescription: 'Cloud security and compliance solutions ensuring your cloud infrastructure meets industry standards and regulations.',
      category: 'IT & Cybersecurity',
      technologies: ['AWS Security', 'Azure Security', 'CSPM', 'Compliance Frameworks'],
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    
    // E-commerce Solutions
    {
      id: 21,
      icon: ShoppingBag,
      title: 'Shopify / WordPress / WooCommerce Setup',
      description: 'Complete online store setup.',
      longDescription: 'Complete e-commerce store setup on Shopify, WordPress, or WooCommerce with custom themes and optimized functionality.',
      category: 'E-commerce Solutions',
      technologies: ['Shopify', 'WordPress', 'WooCommerce', 'Elementor'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 22,
      icon: CreditCard,
      title: 'Payment Integration',
      description: 'JazzCash, EasyPaisa, Stripe integration.',
      longDescription: 'Seamless payment gateway integration including JazzCash, EasyPaisa, Stripe, and other local and international payment methods.',
      category: 'E-commerce Solutions',
      technologies: ['JazzCash API', 'EasyPaisa API', 'Stripe', 'PayPal'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 23,
      icon: Package,
      title: 'Inventory & Order Management',
      description: 'Smart inventory control.',
      longDescription: 'Intelligent inventory and order management systems that streamline stock control, order processing, and fulfillment.',
      category: 'E-commerce Solutions',
      technologies: ['Inventory Systems', 'Order Tracking', 'Warehouse Management'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 24,
      icon: Store,
      title: 'Omnichannel Storefronts',
      description: 'Unified shopping experience.',
      longDescription: 'Omnichannel storefronts that provide a unified shopping experience across web, mobile, and physical stores.',
      category: 'E-commerce Solutions',
      technologies: ['Multi-channel', 'Unified Commerce', 'API Integration'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 25,
      icon: TrendingUp,
      title: 'SEO Optimization',
      description: 'Boost your store visibility.',
      longDescription: 'Advanced SEO optimization to boost your store visibility, increase organic traffic, and drive more sales.',
      category: 'E-commerce Solutions',
      technologies: ['SEO', 'Keyword Research', 'Analytics', 'Schema Markup'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    
    // Business Guidance
    {
      id: 26,
      icon: Compass,
      title: 'Business Strategy & Market Entry',
      description: 'Strategic planning for success.',
      longDescription: 'Strategic business planning and market entry consulting to help you navigate new markets and scale successfully.',
      category: 'Business Guidance',
      technologies: ['Market Research', 'Strategy', 'Business Planning', 'Competitive Analysis'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 27,
      icon: LineChart,
      title: 'Digital Transformation Roadmaps',
      description: 'Future-proof your business.',
      longDescription: 'Comprehensive digital transformation roadmaps to future-proof your business and leverage technology for growth.',
      category: 'Business Guidance',
      technologies: ['Digital Strategy', 'Technology Assessment', 'Implementation Planning'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 28,
      icon: Calculator,
      title: 'Financial Planning & Growth Strategy',
      description: 'Growth & investment strategy.',
      longDescription: 'Financial planning and growth strategy services to optimize resources and accelerate business growth.',
      category: 'Business Guidance',
      technologies: ['Financial Modeling', 'Budgeting', 'Investment Strategy', 'ROI Analysis'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 29,
      icon: Users,
      title: 'HR & Team Building Advisory',
      description: 'Build high-performing teams.',
      longDescription: 'HR and team building advisory services to help you recruit, retain, and develop high-performing teams.',
      category: 'Business Guidance',
      technologies: ['Recruitment', 'Training', 'Culture Development', 'Leadership'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 30,
      icon: Headphones,
      title: 'Ongoing Business Support',
      description: 'Continuous business assistance.',
      longDescription: 'Ongoing business support and consulting to help you navigate challenges and seize opportunities.',
      category: 'Business Guidance',
      technologies: ['Advisory', 'Operations Support', 'Strategic Planning', 'Crisis Management'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
  ], []);

  // Categories
  const categories = useMemo(() => ['All', 'Development', 'AI Solutions', 'IT & Cybersecurity', 'E-commerce Solutions', 'Business Guidance'], []);

  // Filter services based on search and category - Optimized with useMemo
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.longDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allServices, searchQuery, selectedCategory]);

  const handleServiceClick = useCallback((serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setFormData(prev => ({ ...prev, serviceRequired: serviceTitle }));
    setIsModalOpen(true);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
        businessDetails: '',
        serviceRequired: '',
        projectDescription: '',
      });
    }, 3000);
  }, []);

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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Focus search input on mount
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#6366F1] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#020617] pt-20 lg:pt-24">
        {/* Hero Section with Smooth Animations */}
        <section className="relative overflow-hidden border-b border-[#1E293B]">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            {/* Animated Intro Section - Services Section Font Styles */}
            <motion.div
              variants={introContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-center max-w-3xl mx-auto"
            >
              {/* Badge */}
              <motion.div 
                variants={fromTopVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B] mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className="text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                  Our Services
                </span>
              </motion.div>

              {/* Heading - Services section style */}
              <motion.h1 
                variants={fromTopVariants}
                className="text-3xl md:text-4xl  font-bold font-serif tracking-tight mb-4"
              >
                <span className="text-[#F8FAFC]">Digital </span>
                <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent animate-gradient">
                  Solutions
                </span>
                <span className="text-[#F8FAFC]"> For Modern Business </span>
              </motion.h1>

              {/* Description - Services section style */}
              <motion.p 
                variants={fromTopVariants}
                className="text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 font-light tracking-wide"
              >
                Transform your business with cutting-edge technology solutions tailored to your unique needs
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                variants={fromBottomVariants}
                className="max-w-2xl mx-auto relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search services by name, description, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-[#0F172A] border border-[#1E293B] rounded-xl text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#6366F1] transition-colors duration-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>

              {/* Category Filters */}
              <motion.div 
                variants={fromBottomVariants}
                className="flex flex-wrap justify-center gap-2 mt-6"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25'
                        : 'bg-[#0F172A] border border-[#1E293B] text-[#94A3B8] hover:border-[#6366F1] hover:text-[#6366F1]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Results count */}
              <motion.p 
                variants={fromBottomVariants}
                className="text-sm text-[#94A3B8] mt-6 font-light tracking-wide"
              >
                Showing {filteredServices.length} of {allServices.length} services
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid with Stagger Animation */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredServices.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              >
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  
                  return (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      className="group relative cursor-pointer"
                    >
                      {/* Card Border Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm`} />
                      
                      {/* Card */}
                      <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/5 h-full flex flex-col hover:-translate-y-1 cursor-pointer">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs px-2 py-1 bg-[#1E293B] text-[#94A3B8] rounded-lg border border-transparent group-hover:border-[#6366F1]/30 transition-colors duration-300 font-light tracking-wide">
                            {service.category}
                          </span>
                        </div>

                        {/* Content - Services section font styles */}
                        <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2 font-light tracking-wide">
                          {service.longDescription}
                        </p>

                        {/* Technologies */}
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {service.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2 py-1 bg-[#1E293B] text-[#94A3B8] rounded-lg transition-all duration-300 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] font-light tracking-wide"
                              >
                                {tech}
                              </span>
                            ))}
                            {service.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-[#1E293B] text-[#94A3B8] rounded-lg transition-all duration-300 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] font-light tracking-wide">
                                +{service.technologies.length - 3}
                              </span>
                            )}
                          </div>
                          
                          {/* Learn More Button */}
                          <button
                            onClick={() => handleServiceClick(service.title)}
                            className="inline-flex items-center gap-2 text-sm font-medium font-sans tracking-wide text-[#6366F1] hover:gap-3 transition-all duration-300 group/btn cursor-pointer"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </button>
                        </div>

                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform rotate-12 translate-x-6 -translate-y-6`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[#0F172A] rounded-full flex items-center justify-center border border-[#1E293B]">
                  <Search className="w-8 h-8 text-[#94A3B8]" />
                </div>
                <h3 className="text-xl font-semibold font-sans tracking-wide text-[#F8FAFC] mb-2">No services found</h3>
                <p className="text-[#94A3B8] mb-6 font-light tracking-wide">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-[#6366F1] text-white font-semibold font-sans tracking-wide rounded-xl hover:bg-[#8B5CF6] transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section with Animation - Services section font styles */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-[#1E293B] py-16 lg:py-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-[#94A3B8] mb-8 font-light tracking-wide">
                Let&apos;s discuss how our services can help you achieve your business goals and drive innovation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
              >
                Contact Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0F172A] border-b border-[#1E293B] px-4 sm:px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg sm:text-xl font-semibold font-sans tracking-wide text-white">
                Request Consultation
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Business Details *
                  </label>
                  <input
                    type="text"
                    name="businessDetails"
                    required
                    value={formData.businessDetails}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide"
                    placeholder="Company name & industry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Service Required *
                  </label>
                  <input
                    type="text"
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    readOnly
                    className="w-full px-4 py-3 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-lg text-[#6366F1] font-medium font-sans tracking-wide cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    required
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none font-light tracking-wide"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold font-sans tracking-wide text-white mb-2">Request Submitted!</h4>
                <p className="text-[#94A3B8] font-light tracking-wide">
                  Thank you for your interest. Our team will contact you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ServicesPage;