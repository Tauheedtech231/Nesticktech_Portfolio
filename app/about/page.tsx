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
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

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

  // Toggle flip animation on contact cards
  const toggleFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Get children of a node
  const getChildren = (parentId: number) => {
    return teamMembers.filter(member => member.parentId === parentId);
  };

  // Contact info - Front shows icons only, back shows real info
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'nesticktech@gmail.com',
      href: 'mailto:nesticktech@gmail.com',
      backContent: 'nesticktech@gmail.com',
      subText: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+92 320 8423427',
      href: 'tel:+923208423427',
      backContent: '+92 320 8423427',
      subText: 'Mon-Fri: 9AM - 6PM',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Johar Town, Lahore',
      href: 'https://maps.google.com/?q=Johar+Town+Lahore',
      backContent: 'Johar Town, Lahore',
      subText: 'Get directions on Google Maps',
    },
    {
      icon: MessageSquare,
      label: 'Live Chat',
      value: 'Mon-Fri: 9AM - 6PM',
      href: '/contact',
      backContent: 'Live Chat Available',
      subText: 'Click to start chatting',
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
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[160px] md:min-w-[200px]">
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
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-3 w-full">
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
    <main className="min-h-screen bg-black overflow-hidden relative">
      {/* Hero Component - No margin on top */}
      <Hero />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 pt-0">
        {/* Team Structure with Background Video */}
        <div className="relative rounded-2xl overflow-hidden mb-16 lg:mb-20">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/encryption-bg.webm" type="video/webm" />
          </video>
          
          {/* Minimal dark overlay for text readability only - not blocking video */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Team Structure Content */}
          <div className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
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
          </div>
        </div>
        
        <TechStackPage />

        {/* Get in Touch Section with Flip Cards */}
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
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 via-transparent to-[#8B5CF6]/10" />
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
                const isFlipped = flippedCards.includes(index);
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group relative cursor-pointer h-[160px] sm:h-[170px]"
                    onHoverStart={() => toggleFlip(index)}
                    onHoverEnd={() => toggleFlip(index)}
                  >
                    <div className="relative w-full h-full preserve-3d transition-all duration-600 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                      {/* Front of card - Shows only icon */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/20 backdrop-blur-md border border-blue-500/30 rounded-xl flex flex-col items-center justify-center backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <Icon className="w-12 h-12 sm:w-14 sm:h-14 text-blue-400 mb-3" />
                        <p className="text-xs sm:text-sm text-blue-300 font-medium">Hover to Reveal</p>
                      </div>

                      {/* Back of card - Shows real info */}
                      <Link
                        href={info.href}
                        className="absolute inset-0 block bg-gradient-to-br from-blue-600/30 to-blue-400/30 backdrop-blur-md border border-blue-500/40 rounded-xl p-4 sm:p-5 hover:border-blue-400/60 transition-all duration-300 cursor-pointer backface-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300 mb-2" />
                          <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">{info.label}</h3>
                          <p className="text-[11px] sm:text-xs text-blue-200 font-medium break-words">{info.backContent}</p>
                          <p className="text-[9px] sm:text-[10px] text-blue-300/70 mt-2">{info.subText}</p>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-2" />
                        </div>
                      </Link>
                    </div>
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

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transition-all-duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </main>
  );
};

export default AboutPage;