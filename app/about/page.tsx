/* eslint-disable react/no-unescaped-entities */
// app/about/page.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  Sparkles,
  ArrowRight,
  Briefcase,
  Code,
  Palette,
  Megaphone,
  Crown,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ChevronDown,
  Send,
  Clock,
  Award,
  Globe
} from 'lucide-react';
import TechStackPage from '../tech-stack/page';
import Hero from './BlackHole';
import { useEffect, useState } from 'react';

const AboutPage = () => {
  // Team members data with parent-child relationships
  const teamMembers = [
    {
      id: 1,
      name: 'Hamza Hassan',
      role: 'Chief Executive Officer',
      level: 'executive',
      parentId: null,
      avatar: 'H',
      avatarColor: 'from-[#6366F1] to-[#8B5CF6]',
      icon: Crown,
      color: '#6366F1',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 2,
      name: 'Abdullah Amin',
      role: 'Senior Business Analyst',
      level: 'management',
      parentId: 1,
      avatar: 'A',
      avatarColor: 'from-[#22C55E] to-[#86EFAC]',
      icon: Briefcase,
      color: '#22C55E',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 3,
      name: 'Haris Ashar',
      role: 'Business Developer',
      level: 'management',
      parentId: 1,
      avatar: 'H',
      avatarColor: 'from-[#F59E0B] to-[#FBBF24]',
      icon: Briefcase,
      color: '#F59E0B',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 4,
      name: 'Tauheed',
      role: 'Full Stack Developer',
      level: 'technical',
      parentId: 2,
      avatar: 'T',
      avatarColor: 'from-[#EF4444] to-[#F87171]',
      icon: Code,
      color: '#EF4444',
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 5,
      name: 'Miss Maryam',
      role: 'Creative Lead',
      level: 'creative',
      parentId: 3,
      avatar: 'M',
      avatarColor: 'from-[#EC4899] to-[#F472B6]',
      icon: Palette,
      color: '#EC4899',
      gradient: 'from-[#EC4899] to-[#F472B6]',
    },
    {
      id: 6,
      name: 'Miss Palwasha',
      role: 'Marketing Lead',
      level: 'marketing',
      parentId: 3,
      avatar: 'P',
      avatarColor: 'from-[#06B6D4] to-[#0891B2]',
      icon: Megaphone,
      color: '#06B6D4',
      gradient: 'from-[#06B6D4] to-[#0891B2]',
    },
    {
      id: 7,
      name: 'Zain-ul-Abadeen',
      role: 'Senior WordPress Developer',
      level: 'technical',
      parentId: 2,
      avatar: 'Z',
      avatarColor: 'from-[#A855F7] to-[#D946EF]',
      icon: Code,
      color: '#A855F7',
      gradient: 'from-[#A855F7] to-[#D946EF]',
    },
  ];

  // State for mobile expanded sections
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2, 3]);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle expand/collapse on mobile
  const toggleNode = (id: number) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  // Get children of a node
  const getChildren = (parentId: number) => {
    return teamMembers.filter(member => member.parentId === parentId);
  };

  // Info items for left side card
  const infoItems = [
    {
      icon: Mail,
      label: 'Email Address',
      value: 'nesticktech@gmail.com',
      href: 'mailto:nesticktech@gmail.com',
      color: '#6366F1'
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: '+92 320 8423427',
      href: 'tel:+923208423427',
      color: '#22C55E'
    },
    {
      icon: MapPin,
      label: 'Office Address',
      value: 'Johar Town, Lahore, Pakistan',
      href: 'https://maps.google.com/?q=Johar+Town+Lahore',
      color: '#F59E0B'
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Monday - Friday: 9AM - 6PM',
      color: '#EC4899'
    },
    {
      icon: Award,
      label: 'Experience',
      value: '5+ Years of Excellence',
      color: '#A855F7'
    },
    {
      icon: Globe,
      label: 'Global Reach',
      value: 'Serving Clients Worldwide',
      color: '#06B6D4'
    }
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
        stiffness: 50,
        damping: 10,
        mass: 0.5,
      },
    },
  };

  // Desktop Tree Renderer
  const renderDesktopTreeNode = (node: typeof teamMembers[0], level: number = 0) => {
    const children = getChildren(node.id);
    const hasChildren = children.length > 0;
    
    return (
      <div key={node.id} className="flex flex-col items-center relative">
        {level > 0 && (
          <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gradient-to-b from-[#6366F1] to-transparent" />
        )}
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + level * 0.1, duration: 0.4 }}
          className="relative z-10 cursor-pointer group"
          whileHover={{ y: -4 }}
        >
          <div className={`bg-gradient-to-r ${node.avatarColor} p-[2px] rounded-xl transition-all duration-300 group-hover:shadow-lg cursor-pointer`}>
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[160px] md:min-w-[200px] cursor-pointer">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${node.avatarColor} flex items-center justify-center border-2 flex-shrink-0 cursor-pointer`} style={{ borderColor: node.color }}>
                  <span className="text-base md:text-lg font-bold text-white cursor-pointer">{node.avatar}</span>
                </div>
                <div className="flex-1 min-w-0 cursor-pointer">
                  <p className="text-sm md:text-base font-semibold font-sans tracking-wide text-[#F8FAFC] truncate cursor-pointer">{node.name}</p>
                  <p className="text-[10px] md:text-xs font-light tracking-wide truncate cursor-pointer" style={{ color: node.color }}>{node.role}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {hasChildren && (
          <div className="relative mt-6 w-full">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent" />
            <div className="relative pt-6 flex justify-center gap-6 md:gap-8">
              {children.map((child) => (
                <div key={child.id} className="relative">
                  <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gradient-to-b from-[#6366F1] to-transparent" />
                  {renderDesktopTreeNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Mobile Tree Renderer
  const renderMobileTreeNode = (node: typeof teamMembers[0], level: number = 0) => {
    const children = getChildren(node.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes.includes(node.id);
    const paddingLeft = level * 24;

    return (
      <div key={node.id} className="relative w-full">
        {level > 0 && (
          <div 
            className="absolute left-[26px] top-0 w-0.5 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6] cursor-pointer"
            style={{ 
              height: isExpanded && hasChildren ? 'calc(100% - 30px)' : '50px',
              left: `${paddingLeft + 10}px`
            }}
          />
        )}
        
        {level > 0 && (
          <div 
            className="absolute top-6 w-5 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] cursor-pointer"
            style={{ left: `${paddingLeft + 10}px` }}
          />
        )}

        {level > 0 && (
          <div 
            className="absolute top-5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] shadow-lg ring-2 ring-[#6366F1]/30 cursor-pointer"
            style={{ left: `${paddingLeft + 8}px` }}
          />
        )}

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: level * 0.1, duration: 0.3 }}
          className="relative w-full mb-2 cursor-pointer"
          style={{ paddingLeft: `${paddingLeft + 32}px` }}
        >
          <div 
            className={`bg-gradient-to-r ${node.avatarColor} p-[2px] rounded-xl transition-all duration-300 hover:shadow-lg w-full cursor-pointer`}
            onClick={() => hasChildren && toggleNode(node.id)}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 w-full cursor-pointer">
              <div className="flex items-center justify-between gap-3 cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${node.avatarColor} flex items-center justify-center border-2 flex-shrink-0 cursor-pointer`} style={{ borderColor: node.color }}>
                    <span className="text-base font-bold text-white cursor-pointer">{node.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer">
                    <p className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC] truncate cursor-pointer">{node.name}</p>
                    <p className="text-[10px] font-light tracking-wide truncate cursor-pointer" style={{ color: node.color }}>{node.role}</p>
                  </div>
                </div>
                {hasChildren && (
                  <ChevronDown 
                    className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 flex-shrink-0 cursor-pointer ${isExpanded ? 'rotate-180' : ''}`}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {children.map((child) => renderMobileTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootNode = teamMembers.find(member => member.parentId === null);

  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      {/* Hero Component */}
      <Hero />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-8 lg:pb-12 pt-0">
        
        {/* Team Structure */}
        <div className="relative rounded-2xl overflow-hidden mb-8 lg:mb-12">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/encryption-bg.webm" type="video/webm" />
          </video>
          
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] text-center mb-4 sm:mb-6 lg:mb-8">
                Our{' '}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  Team Structure
                </span>
              </h2>

              <div className="hidden md:block overflow-x-auto pb-4">
                <div className="min-w-[800px] flex justify-center">
                  {rootNode && renderDesktopTreeNode(rootNode)}
                </div>
              </div>

              <div className="md:hidden space-y-2">
                {rootNode && renderMobileTreeNode(rootNode)}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Tech Stack - Full Width */}
        <div className="w-full -mx-4 sm:-mx-6 lg:-mx-8">
          <TechStackPage />
        </div>

        {/* Get in Touch Section with Cards */}
   <motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-8 lg:mt-12 w-full"
>
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] text-center mb-6 sm:mb-8">
    Let's{' '}
    <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
      Build Something Great
    </span>
    <span className="text-[#F8FAFC]"> Together</span>
  </h2>
  
  <div className="grid md:grid-cols-2 gap-6 w-full max-w-full mx-auto px-4">
    
    {/* Left Side - Info Card with Background Image */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="
        relative
        overflow-hidden
        pt-12
        px-5
        pb-8
        w-full
        rounded-xl
        border border-[#1E293B]
        backdrop-blur-md
        hover:border-[#6366F1]/30
        hover:shadow-xl
        hover:shadow-[#6366F1]/5
        transition-all
        duration-500
        cursor-pointer
        will-change-transform
        min-h-[400px]
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/90 to-[#0F172A]/95" />
      </div>
      
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#6366F1]/10 blur-3xl rounded-full z-0" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold tracking-wide text-[#F8FAFC] mb-6 text-center">
          Contact Information
        </h3>
        
        <div className="space-y-4">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href || '#'}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <p className="text-xs text-[#94A3B8] group-hover:text-[#6366F1] transition-colors">
                    {item.label}
                  </p>
                  <p className="text-sm text-[#CBD5E1] font-medium">
                    {item.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>

    {/* Right Side - Form Card with Background Image */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="
        relative
        overflow-hidden
        pt-12
        px-5
        pb-8
        w-full
        rounded-xl
        border border-[#1E293B]
        backdrop-blur-md
        hover:border-[#6366F1]/30
        hover:shadow-xl
        hover:shadow-[#6366F1]/5
        transition-all
        duration-500
        will-change-transform
        min-h-[400px]
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/90 to-[#0F172A]/95" />
      </div>
      
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#6366F1]/10 blur-3xl rounded-full z-0" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-semibold tracking-wide text-[#F8FAFC] mb-6 text-center">
          Send us a Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#94A3B8] text-xs sm:text-sm mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 bg-black/50 border border-[#1E293B] rounded-lg text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors cursor-text"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-[#94A3B8] text-xs sm:text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 bg-black/50 border border-[#1E293B] rounded-lg text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors cursor-text"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-[#94A3B8] text-xs sm:text-sm mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 bg-black/50 border border-[#1E293B] rounded-lg text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors resize-none cursor-text"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group cursor-pointer text-sm sm:text-base"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Send Message
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </motion.div>
  </div>
</motion.div>
      </div>
    </main>
  );
};

export default AboutPage;