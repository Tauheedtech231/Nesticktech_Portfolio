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
  ChevronDown
} from 'lucide-react';
import TechStackPage from '../tech-stack/page';
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

  // Get children of a node
  const getChildren = (parentId: number) => {
    return teamMembers.filter(member => member.parentId === parentId);
  };

  // Contact info
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'nesticktech@gmail.com',
      href: 'mailto:nesticktech@gmail.com',
      color: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+92 320 8423427',
      href: 'tel:+923208423427',
      color: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Johar Town, Lahore',
      href: 'https://maps.google.com/?q=Johar+Town+Lahore',
      color: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      icon: MessageSquare,
      label: 'Live Chat',
      value: 'Mon-Fri: 9AM - 6PM',
      href: '/contact',
      color: 'from-[#EF4444] to-[#F87171]',
    },
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

  // Desktop Tree Renderer with dynamic connecting lines
  const renderDesktopTreeNode = (node: typeof teamMembers[0], level: number = 0) => {
    const children = getChildren(node.id);
    const hasChildren = children.length > 0;
    
    return (
      <div key={node.id} className="flex flex-col items-center relative">
        {/* Connecting line from parent to this node (for non-root nodes) */}
        {level > 0 && (
          <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-gradient-to-b from-[#6366F1] to-transparent" />
        )}
        
        {/* Node Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 + level * 0.1, duration: 0.4 }}
          className="relative z-10 cursor-pointer group"
          whileHover={{ y: -4 }}
        >
          <div className={`bg-gradient-to-r ${node.avatarColor} p-[2px] rounded-xl transition-all duration-300 group-hover:shadow-lg`}>
            <div className="bg-[#0F172A] rounded-xl p-3 md:p-4 min-w-[160px] md:min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${node.avatarColor} flex items-center justify-center border-2 flex-shrink-0`} style={{ borderColor: node.color }}>
                  <span className="text-base md:text-lg font-bold text-white">{node.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-semibold font-sans tracking-wide text-[#F8FAFC] truncate">{node.name}</p>
                  <p className="text-[10px] md:text-xs font-light tracking-wide truncate" style={{ color: node.color }}>{node.role}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connecting line to children */}
        {hasChildren && (
          <div className="relative mt-6 w-full">
            {/* Horizontal line connecting children */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent" />
            
            {/* Children Nodes */}
            <div className="relative pt-6 flex justify-center gap-6 md:gap-8">
              {children.map((child, idx) => (
                <div key={child.id} className="relative">
                  {/* Vertical line from horizontal to child */}
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

  // Mobile Tree Renderer with vertical node connections
  const renderMobileTreeNode = (node: typeof teamMembers[0], level: number = 0, parentId: number | null = null) => {
    const children = getChildren(node.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes.includes(node.id);
    const paddingLeft = level * 24;

    return (
      <div key={node.id} className="relative w-full">
        {/* Vertical connecting line from parent */}
        {level > 0 && (
          <div 
            className="absolute left-[26px] top-0 w-0.5 bg-gradient-to-b from-[#6366F1] to-[#8B5CF6]"
            style={{ 
              height: isExpanded && hasChildren ? 'calc(100% - 30px)' : '50px',
              left: `${paddingLeft + 10}px`
            }}
          />
        )}
        
        {/* Horizontal connecting line from vertical line to node */}
        {level > 0 && (
          <div 
            className="absolute top-6 w-5 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
            style={{ left: `${paddingLeft + 10}px` }}
          />
        )}

        {/* Connection Dot */}
        {level > 0 && (
          <div 
            className="absolute top-5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] shadow-lg ring-2 ring-[#6366F1]/30"
            style={{ left: `${paddingLeft + 8}px` }}
          />
        )}

        {/* Node Card */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: level * 0.1, duration: 0.3 }}
          className="relative cursor-pointer group w-full mb-2"
          style={{ paddingLeft: `${paddingLeft + 32}px` }}
        >
          <div 
            className={`bg-gradient-to-r ${node.avatarColor} p-[2px] rounded-xl transition-all duration-300 group-hover:shadow-lg w-full`}
            onClick={() => hasChildren && toggleNode(node.id)}
          >
            <div className="bg-[#0F172A] rounded-xl p-3 w-full">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${node.avatarColor} flex items-center justify-center border-2 flex-shrink-0`} style={{ borderColor: node.color }}>
                    <span className="text-base font-bold text-white">{node.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC] truncate">{node.name}</p>
                    <p className="text-[10px] font-light tracking-wide truncate" style={{ color: node.color }}>{node.role}</p>
                  </div>
                </div>
                {hasChildren && (
                  <ChevronDown 
                    className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {children.map((child) => renderMobileTreeNode(child, level + 1, node.id))}
          </div>
        )}
      </div>
    );
  };

  // Find root node (CEO)
  const rootNode = teamMembers.find(member => member.parentId === null);

  return (
    <main className="min-h-screen bg-[#020617] pt-20 lg:pt-24 overflow-hidden relative">
      {/* Background Elements - Removed Video */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header with Shorter Description */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300">
            <Users className="w-4 h-4 text-[#6366F1]" />
            <span className="text-xs lg:text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
              About Us
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              Masterminds
            </span>
            <span className="text-[#F8FAFC]"> Behind Innovation</span>
          </h1>
          
          {/* Shorter Description */}
          <p className="text-sm sm:text-base text-[#E2E8F0] max-w-2xl mx-auto font-light tracking-wide leading-relaxed bg-[#0F172A]/40 backdrop-blur-sm px-6 py-3 rounded-xl">
            Expert developers and creative designers crafting innovative digital solutions.
          </p>
        </motion.div>

        {/* Our Story and Mission Section - CENTERED with Navbar-Style Background Effect */}
       <motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="mb-16 lg:mb-20 relative"
>
  {/* Navbar-Style Background Effects - Pinkish-White Glow */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Main Soft Background Glow - Pink/White/Purple */}
    <div 
      className="absolute top-[-80px] left-1/2 -translate-x-1/2 
                 w-[600px] h-[350px] bg-gradient-to-r from-purple-500/40 via-pink-400/30 to-purple-600/40 blur-[120px] rounded-full"
    />
    
    {/* Secondary Pinkish Glow */}
    <div 
      className="absolute top-[-60px] left-1/2 -translate-x-1/2 
                 w-[450px] h-[280px] bg-pink-400/20 blur-[100px] rounded-full"
    />
    
    {/* Purple Ring Glow Effect 1 - Outer Ring */}
    <div className="absolute top-[-120px] left-1/2 -translate-x-1/2">
      <div className="w-[380px] h-[380px] rounded-full border-[40px] border-purple-400/40 blur-md" />
    </div>
    
    {/* Pink Ring Glow Effect 2 - Inner Pink Ring */}
    <div className="absolute top-[-120px] left-1/2 -translate-x-1/2">
      <div className="absolute inset-0 w-[380px] h-[380px] rounded-full border-[25px] border-pink-400/40 blur-xl" />
    </div>

    {/* Soft Pinkish-White Ring Glow */}
    <div className="absolute top-[-100px] left-1/2 -translate-x-1/2">
      <div className="w-[420px] h-[420px] rounded-full border-[15px] border-pink-300/25 blur-2xl" />
    </div>

    {/* Intense Pink Core Glow - Not too white */}
    <div 
      className="absolute top-[-40px] left-1/2 -translate-x-1/2 
                 w-[200px] h-[150px] bg-pink-400/25 blur-[80px] rounded-full"
    />

    {/* Bottom Glow Line - Pinkish */}
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400/60 via-purple-400/50 to-transparent" />
  </div>

  {/* Original Cards Container */}
  <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 max-w-4xl mx-auto relative z-10">
    {/* Story Card */}
    <motion.div
      variants={itemVariants}
      className="
        relative
        bg-[#0F172A]/60
        backdrop-blur-sm
        border border-[#1E293B]
        rounded-2xl
        p-6 sm:p-8
        text-center
        group
        hover:border-[#6366F1]
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Card Glow - Pinkish */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-24 bg-gradient-to-r from-[#6366F1]/30 via-pink-400/20 to-[#8B5CF6]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6366F1]/10 mb-4 group-hover:scale-110 transition-transform">
        <Sparkles className="w-6 h-6 text-[#6366F1]" />
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4">
        Our{" "}
        <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
          Story
        </span>
      </h2>

      <p className="text-xs sm:text-sm lg:text-base text-[#94A3B8] leading-relaxed font-light tracking-wide">
        Founded in 2022, Nestick Tech started with a simple mission: to help businesses leverage technology for growth and innovation. What began as a small team of passionate developers has grown into a full-service digital agency serving clients worldwide.
      </p>

      <p className="text-xs sm:text-sm lg:text-base text-[#94A3B8] leading-relaxed font-light tracking-wide mt-3">
        Today, we&apos;re proud to have delivered 50+ successful projects across various industries, from e-commerce and education to healthcare and finance.
      </p>
    </motion.div>

    {/* Mission Card */}
    <motion.div
      variants={itemVariants}
      className="
        relative
        bg-[#0F172A]/60
        backdrop-blur-sm
        border border-[#1E293B]
        rounded-2xl
        p-6 sm:p-8
        text-center
        group
        hover:border-[#6366F1]
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Card Glow - Pinkish */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-24 bg-gradient-to-r from-[#8B5CF6]/30 via-pink-400/20 to-[#6366F1]/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B5CF6]/10 mb-4 group-hover:scale-110 transition-transform">
        <Target className="w-6 h-6 text-[#8B5CF6]" />
      </div>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4">
        Our{" "}
        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent">
          Mission
        </span>
      </h2>

      <p className="text-xs sm:text-sm lg:text-base text-[#94A3B8] leading-relaxed font-light tracking-wide">
        To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in building long-term partnerships with our clients, understanding their unique challenges, and delivering solutions that exceed expectations.
      </p>

      <div className="mt-6">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group cursor-pointer text-sm sm:text-base"
        >
          Work With Us
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  </div>
</motion.div>

        {/* Team Structure */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 lg:mb-20"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] text-center mb-6 sm:mb-8 lg:mb-12">
            Our{' '}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Team Structure
            </span>
          </h2>

          {/* Desktop View - Horizontal Tree */}
          <div className="hidden md:block overflow-x-auto pb-4">
            <div className="min-w-[800px] flex justify-center">
              {rootNode && renderDesktopTreeNode(rootNode)}
            </div>
          </div>

          {/* Mobile View - Vertical Collapsible List with Nodes */}
          <div className="md:hidden space-y-2">
            {rootNode && renderMobileTreeNode(rootNode)}
          </div>
        </motion.div>
        
        <TechStackPage />

        {/* Get in Touch Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              alt="Contact Us - Customer Support"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/80 via-[#020617]/80 to-[#0F172A]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
          </div>

          <div className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] text-center mb-6 sm:mb-8">
              Get In{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-sm`} />
                    <Link
                      href={info.href}
                      className="relative block bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl p-3 sm:p-5 hover:border-[#6366F1]/50 transition-all duration-300 cursor-pointer"
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${info.color} p-1.5 sm:p-2.5 mb-2 sm:mb-3`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-[10px] sm:text-xs font-medium font-sans tracking-wide text-[#94A3B8] mb-0.5 sm:mb-1">{info.label}</h3>
                      <p className="text-[11px] sm:text-xs lg:text-sm text-[#F8FAFC] font-semibold font-sans tracking-wide break-words">{info.value}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-6 sm:mt-8"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 group cursor-pointer text-sm sm:text-base"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Send us a Message
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;