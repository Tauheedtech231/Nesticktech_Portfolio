/* eslint-disable react-hooks/set-state-in-effect */
// app/tech-stack/page.tsx
'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, X, Braces, Box, Code2, Server, Cpu, Terminal, Database, 
  Cloud, GitBranch, Smartphone, Figma, Zap, Bot, Brain, Microscope
} from "lucide-react";

interface TechItem {
  id: number;
  name: string;
  category: string;
  ring: string;
  icon: React.ReactNode;
  gradient: string;
}

const TechStackPage = () => {
  const [selected, setSelected] = useState<TechItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const resizeTimeout = useRef<NodeJS.Timeout>(null);

  // System theme detection
  useEffect(() => {
    const getSystemTheme = (): 'dark' | 'light' => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    };

    setTheme(getSystemTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
    };
  }, []);

  useEffect(() => {
    const calculateSize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width < 768);
    };

    calculateSize();

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(calculateSize, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
    };
  }, []);

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const badgeBg = isDark ? 'bg-[#0F172A]/80' : 'bg-white/80';
  const badgeBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const filterBg = isDark ? 'bg-[#0F172A]/80' : 'bg-white/80';
  const filterBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const filterText = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const modalBg = isDark ? 'bg-[#0F172A]/95' : 'bg-white/95';
  const modalBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const modalCloseBg = isDark ? 'bg-[#1E293B]' : 'bg-gray-200';
  const overlayGradient = isDark 
    ? 'from-black/50 via-transparent to-black/50'
    : 'from-gray-100/50 via-transparent to-gray-100/50';
  const iconColor = isDark ? 'text-white' : 'text-gray-900';

  const techStack: TechItem[] = [
    // Outer Ring - Frontend + Backend
    { id:1, name:"React", category:"Frontend", ring: "outer", icon: <Braces />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:2, name:"Next.js", category:"Frontend", ring: "outer", icon: <Box />, gradient:"from-[#8B5CF6] to-[#6366F1]" },
    { id:3, name:"TypeScript", category:"Frontend", ring: "outer", icon: <Code2 />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:4, name:"Vue.js", category:"Frontend", ring: "outer", icon: <Braces />, gradient:"from-[#3B82F6] to-[#60A5FA]" },
    { id:5, name:"Node.js", category:"Backend", ring: "outer", icon: <Server />, gradient:"from-[#F59E0B] to-[#FBBF24]" },
    { id:6, name:"Python", category:"Backend", ring: "outer", icon: <Cpu />, gradient:"from-[#EF4444] to-[#F87171]" },
   
    
    // Inner Ring - DevOps + Mobile + Cloud + Database
    { id:8, name:"AWS", category:"Cloud", ring: "inner", icon: <Cloud />, gradient:"from-[#F97316] to-[#FB923C]" },
    { id:9, name:"Docker", category:"DevOps", ring: "inner", icon: <Box />, gradient:"from-[#EC4899] to-[#F472B6]" },
    { id:10, name:"Git", category:"DevOps", ring: "inner", icon: <GitBranch />, gradient:"from-[#F97316] to-[#FB923C]" },
    { id:11, name:"MongoDB", category:"Database", ring: "inner", icon: <Database />, gradient:"from-[#3B82F6] to-[#60A5FA]" },
    { id:12, name:"PostgreSQL", category:"Database", ring: "inner", icon: <Database />, gradient:"from-[#06B6D4] to-[#0891B2]" },
    { id:13, name:"React Native", category:"Mobile", ring: "inner", icon: <Smartphone />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:14, name:"Flutter", category:"Mobile", ring: "inner", icon: <Smartphone />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:15, name:"TensorFlow", category:"AI/ML", ring: "inner", icon: <Cpu />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:16, name:"Figma", category:"Design", ring: "inner", icon: <Figma />, gradient:"from-[#8B5CF6] to-[#6366F1]" },
    
    // Core Ring - AI & ML (Desktop only)
    { id:17, name:"PyTorch", category:"AI/ML", ring: "core", icon: <Brain />, gradient:"from-[#EF4444] to-[#F87171]" },
    { id:18, name:"OpenAI", category:"AI/ML", ring: "core", icon: <Sparkles />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:19, name:"Hugging Face", category:"AI/ML", ring: "core", icon: <Microscope />, gradient:"from-[#EC4899] to-[#F472B6]" },
    { id:20, name:"LangChain", category:"AI/ML", ring: "core", icon: <Zap />, gradient:"from-[#F59E0B] to-[#FBBF24]" },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Cloud', 'Mobile', 'Database', 'AI/ML', 'Design'];
  
  const filteredTech = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(t => t.category === activeCategory);

  // Mobile par sirf outer aur inner rings ke items dikhayein
  const getDisplayTech = () => {
    if (isMobile) {
      return filteredTech.filter(t => t.ring === "outer" || t.ring === "inner");
    }
    return filteredTech;
  };

  const getOuterRingTech = () => getDisplayTech().filter(t => t.ring === "outer");
  const getInnerRingTech = () => getDisplayTech().filter(t => t.ring === "inner");
  const getCoreRingTech = () => {
    if (isMobile) return [];
    return getDisplayTech().filter(t => t.ring === "core");
  };

  const outerRingTech = getOuterRingTech();
  const innerRingTech = getInnerRingTech();
  const coreRingTech = getCoreRingTech();

  // Ring sizes - Properly calculated for center alignment
  const outerRingSize = isDesktop ? 520 : (isMobile ? 280 : 420);
  const innerRingSize = isDesktop ? 360 : (isMobile ? 200 : 280);
  const coreRingSize = isDesktop ? 200 : (isMobile ? 0 : 160);

  // Icon sizes
  const outerIconSize = isDesktop ? 56 : (isMobile ? 40 : 48);
  const innerIconSize = isDesktop ? 48 : (isMobile ? 36 : 42);
  const coreIconSize = isDesktop ? 44 : (isMobile ? 0 : 36);

  const labelTextSize = isDesktop ? "text-xs" : (isMobile ? "text-[8px]" : "text-[10px]");

  const ringWrapperWidth = typeof window !== 'undefined'
    ? Math.min(outerRingSize + 40, window.innerWidth - 24)
    : outerRingSize + 40;

  return (
    <section className={`relative w-full flex flex-col items-center justify-start ${bgColor} py-6 lg:py-10`} style={{ overflowX: 'clip' }}>
      
      {/* Video Background - Only in dark mode */}
      {isDark && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'brightness(0.5)' }}
          >
            <source src="/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      )}

      {/* Light mode background pattern */}
      {!isDark && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>
      )}

      {/* Gradient Overlay - Theme aware */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`} />

      <div className="relative z-10 w-full max-w-full px-3 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl px-4 mb-4 lg:mb-8 mt-4 lg:mt-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 ${badgeBg} backdrop-blur-sm border ${badgeBorder} cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300`}>
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
              Tech Stack
            </span>
          </div>
          
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight ${textColor}`}>
            Our Technology Stack
          </h2>
          
          <p className={`mt-2 lg:mt-3 text-xs sm:text-sm lg:text-base ${subTextColor} font-light tracking-wide`}>
            Modern technologies we use to build scalable solutions
          </p>
        </div>

        {/* Category Filters - Theme aware */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6 lg:mb-10 px-2 max-w-full overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} 
              className={`px-2 py-1 lg:px-3 lg:py-1.5 rounded-lg text-[10px] lg:text-xs font-medium font-sans tracking-wide transition-all duration-300 cursor-pointer backdrop-blur-sm whitespace-nowrap ${
                activeCategory===c ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25' 
                : `${filterBg} border ${filterBorder} ${filterText} hover:border-[#6366F1] hover:text-[#6366F1]`
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Rings Container */}
        <div className="relative w-full flex items-center justify-center py-6 lg:py-10">
          <div 
            className="relative flex items-center justify-center"
            style={{ 
              width: ringWrapperWidth,
              height: outerRingSize + 40,
              margin: '0 auto',
            }}
          >
          
            {/* Outer Ring - Thicker border */}
            <div
              className="absolute rounded-full"
              style={{
                width: outerRingSize,
                height: outerRingSize,
                border: `3px solid rgba(99, 102, 241, 0.6)`,
                boxShadow: `0 0 40px rgba(99, 102, 241, 0.2)`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'transparent',
              }}
            >
              <div className="absolute -top-5 lg:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                <span className={`${labelTextSize} text-[#6366F1] font-light tracking-wide ${isDark ? 'bg-black/60' : 'bg-white/60'} px-2 py-0.5 rounded-full backdrop-blur-sm border border-[#6366F1]/30`}>
                  {isMobile ? "Frontend & Backend" : "Frontend & Backend"}
                </span>
              </div>

              <div className="relative w-full h-full">
                <motion.div 
                  className="relative w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                >
                  {outerRingTech.map((tech, index) => {
                    const angle = (index / outerRingTech.length) * 360;
                    const radius = outerRingSize / 2;
                    const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                    const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

                    return (
                      <div
                        key={tech.id}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <motion.button
                          onClick={() => setSelected(tech)}
                          className="relative rounded-full transition duration-300 pointer-events-auto group cursor-pointer flex items-center justify-center"
                          style={{ 
                            width: outerIconSize,
                            height: outerIconSize,
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7 lg:w-8 lg:h-8'} ${iconColor}`}>
                              {tech.icon}
                            </div>
                          </div>
                          <div className={`absolute -bottom-5 lg:-bottom-7 left-1/2 transform -translate-x-1/2 ${isDark ? 'bg-[#0F172A]/95' : 'bg-white/95'} backdrop-blur-sm border ${badgeBorder} px-1.5 py-0.5 rounded text-[7px] lg:text-[9px] ${textColor} whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                            {tech.name}
                          </div>
                        </motion.button>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Inner Ring - Thicker border */}
            <div
              className="absolute rounded-full"
              style={{
                width: innerRingSize,
                height: innerRingSize,
                border: `3px solid rgba(236, 72, 153, 0.6)`,
                boxShadow: `0 0 30px rgba(236, 72, 153, 0.15)`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'transparent',
              }}
            >
              <div className="absolute -top-5 lg:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                <span className={`${labelTextSize} text-[#EC4899] font-light tracking-wide ${isDark ? 'bg-black/60' : 'bg-white/60'} px-2 py-0.5 rounded-full backdrop-blur-sm border border-[#EC4899]/30`}>
                  {isMobile ? "DevOps & Cloud" : "DevOps, Cloud, Mobile & DB"}
                </span>
              </div>

              <div className="relative w-full h-full">
                <motion.div 
                  className="relative w-full h-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  {innerRingTech.map((tech, index) => {
                    const angle = (index / innerRingTech.length) * 360;
                    const radius = innerRingSize / 2;
                    const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                    const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

                    return (
                      <div
                        key={tech.id}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <motion.button
                          onClick={() => setSelected(tech)}
                          className="relative rounded-full transition duration-300 pointer-events-auto group cursor-pointer flex items-center justify-center"
                          style={{ 
                            width: innerIconSize,
                            height: innerIconSize,
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6 lg:w-7 lg:h-7'} ${iconColor}`}>
                              {tech.icon}
                            </div>
                          </div>
                          <div className={`absolute -bottom-5 lg:-bottom-7 left-1/2 transform -translate-x-1/2 ${isDark ? 'bg-[#0F172A]/95' : 'bg-white/95'} backdrop-blur-sm border ${badgeBorder} px-1.5 py-0.5 rounded text-[7px] lg:text-[9px] ${textColor} whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                            {tech.name}
                          </div>
                        </motion.button>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Core Ring - Desktop only - Thicker border */}
            {!isMobile && coreRingTech.length > 0 && (
              <div
                className="absolute rounded-full"
                style={{
                  width: coreRingSize,
                  height: coreRingSize,
                  border: `3px solid rgba(34, 197, 94, 0.6)`,
                  boxShadow: `0 0 20px rgba(34, 197, 94, 0.15)`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'transparent',
                }}
              >
                <div className="absolute -top-5 lg:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                  <span className={`${labelTextSize} text-[#22C55E] font-light tracking-wide ${isDark ? 'bg-black/60' : 'bg-white/60'} px-2 py-0.5 rounded-full backdrop-blur-sm border border-[#22C55E]/30`}>
                    AI & ML
                  </span>
                </div>

                <div className="relative w-full h-full">
                  <motion.div 
                    className="relative w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  >
                    {coreRingTech.map((tech, index) => {
                      const angle = (index / coreRingTech.length) * 360;
                      const radius = coreRingSize / 2;
                      const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                      const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

                      return (
                        <div
                          key={tech.id}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          <motion.button
                            onClick={() => setSelected(tech)}
                            className="relative rounded-full transition duration-300 pointer-events-auto group cursor-pointer flex items-center justify-center"
                            style={{ 
                              width: coreIconSize,
                              height: coreIconSize,
                            }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="relative w-full h-full flex items-center justify-center">
                              <div className={`w-6 h-6 lg:w-7 lg:h-7 ${iconColor}`}>
                                {tech.icon}
                              </div>
                            </div>
                            <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${isDark ? 'bg-[#0F172A]/95' : 'bg-white/95'} backdrop-blur-sm border ${badgeBorder} px-1.5 py-0.5 rounded text-[8px] lg:text-[9px] ${textColor} whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20`}>
                              {tech.name}
                            </div>
                          </motion.button>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            )}

            {/* Center Logo */}
            <div 
              className="absolute z-20 text-center cursor-pointer"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14 lg:w-20 lg:h-20'} rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-[2px] shadow-lg shadow-[#6366F1]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
                <div className={`w-full h-full rounded-full ${isDark ? 'bg-black' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                  <Image
                    src="/nesticklogo.jpg"
                    alt="Nestick Tech Logo"
                    width={isMobile ? 40 : 80}
                    height={isMobile ? 40 : 80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Theme aware */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md flex items-center justify-center z-50 p-4`}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`${modalBg} backdrop-blur-md border ${modalBorder} rounded-2xl max-w-sm w-full text-center shadow-2xl relative overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-1.5 bg-gradient-to-r ${selected.gradient}`} />
              
              <button
                onClick={() => setSelected(null)}
                className={`absolute top-3 right-3 w-7 h-7 ${modalCloseBg} rounded-full flex items-center justify-center ${isDark ? 'text-[#94A3B8]' : 'text-gray-500'} hover:bg-[#2D3A4F] hover:text-[#F8FAFC] transition-colors z-10 cursor-pointer`}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-6">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${selected.gradient} animate-pulse`} style={{ animationDuration: '2s' }} />
                  <div className={`absolute inset-1 rounded-full ${isDark ? 'bg-[#0F172A]' : 'bg-white'} flex items-center justify-center`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.gradient} p-2`}>
                      <div className="w-full h-full text-white">
                        {selected.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className={`text-xl font-semibold font-sans tracking-wide ${textColor} mb-1`}>{selected.name}</h3>
                <span className={`inline-block px-2 py-0.5 ${isDark ? 'bg-[#1E293B]' : 'bg-gray-200'} ${subTextColor} text-[10px] rounded-full mb-3 font-light tracking-wide`}>{selected.category}</span>
                <p className={`${subTextColor} text-xs font-light tracking-wide mb-4`}>Part of our modern technology stack at Nestick Tech</p>

                <div className="flex justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechStackPage;