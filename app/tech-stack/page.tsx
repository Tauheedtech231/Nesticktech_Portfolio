// app/tech-stack/page.tsx
'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, X, Braces, Box, Code2, Server, Cpu, Terminal, Database, 
  Cloud, GitBranch, Smartphone, Figma, Zap
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
  
  const resizeTimeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const calculateSize = () => {
      const vw = window.innerWidth;
      setIsDesktop(vw >= 1024);
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

  const techStack: TechItem[] = [
    // Outer Ring - Frontend + Backend
    { id:1, name:"React", category:"Frontend", ring: "outer", icon: <Braces />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:2, name:"Next.js", category:"Frontend", ring: "outer", icon: <Box />, gradient:"from-[#8B5CF6] to-[#6366F1]" },
    { id:3, name:"TypeScript", category:"Frontend", ring: "outer", icon: <Code2 />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:4, name:"Vue.js", category:"Frontend", ring: "outer", icon: <Braces />, gradient:"from-[#3B82F6] to-[#60A5FA]" },
    { id:5, name:"Node.js", category:"Backend", ring: "outer", icon: <Server />, gradient:"from-[#F59E0B] to-[#FBBF24]" },
    { id:6, name:"Python", category:"Backend", ring: "outer", icon: <Cpu />, gradient:"from-[#EF4444] to-[#F87171]" },
    { id:7, name:"Java", category:"Backend", ring: "outer", icon: <Terminal />, gradient:"from-[#F97316] to-[#FB923C]" },
    
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
  ];

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Cloud', 'Mobile', 'Database', 'AI/ML', 'Design'];
  
  const filteredTech = activeCategory === 'All' 
    ? techStack 
    : techStack.filter(t => t.category === activeCategory);

  // Get tech by ring
  const getOuterRingTech = () => filteredTech.filter(t => t.ring === "outer");
  const getInnerRingTech = () => filteredTech.filter(t => t.ring === "inner");

  const outerRingTech = getOuterRingTech();
  const innerRingTech = getInnerRingTech();

  // Ring sizes (responsive)
  const outerRingSize = isDesktop ? 420 : 320;
  const innerRingSize = isDesktop ? 260 : 200;

  return (
    <section className="relative w-full flex flex-col items-center justify-start bg-black py-8 lg:py-10 overflow-hidden">
      
      {/* Video Background */}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl px-4 mb-6 lg:mb-8 mt-8 lg:mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 bg-[#0F172A]/80 backdrop-blur-sm border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
              Tech Stack
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC]">
            Our Technology Stack
          </h2>
          
          <p className="mt-2 lg:mt-3 text-xs sm:text-sm lg:text-base text-[#94A3B8] font-light tracking-wide">
            Modern technologies we use to build scalable solutions
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 lg:mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans tracking-wide transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                activeCategory===c ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25' 
                : 'bg-[#0F172A]/80 border border-[#1E293B] text-[#94A3B8] hover:border-[#6366F1] hover:text-[#6366F1]'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* 2 Rings Container - Full Width */}
        <div className="relative w-full flex items-center justify-center min-h-[450px] lg:min-h-[550px]">
          
          {/* Outer Ring - Frontend + Backend */}
          <div
            className="absolute rounded-full"
            style={{
              width: outerRingSize,
              height: outerRingSize,
              border: `2px solid rgba(99, 102, 241, 0.4)`,
              boxShadow: `0 0 40px rgba(99, 102, 241, 0.2)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Outer Ring Label */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] lg:text-xs text-[#6366F1] font-light tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                Frontend & Backend
              </span>
            </div>

            {/* Outer Ring Icons */}
            <div className="relative w-full h-full">
              <motion.div 
                className="relative w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {outerRingTech.map((tech, index) => {
                  const angle = (index / outerRingTech.length) * 360;
                  const radius = outerRingSize / 2;

                  return (
                    <div
                      key={tech.id}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                        transformOrigin: '0 0',
                      }}
                    >
                      <motion.button
                        onClick={() => setSelected(tech)}
                        className="relative rounded-full border border-[#1E293B] bg-[#0F172A]/90 backdrop-blur-sm shadow-lg hover:scale-110 transition duration-300 pointer-events-auto group cursor-pointer"
                        style={{ 
                          width: isDesktop ? 52 : 44,
                          height: isDesktop ? 52 : 44,
                          marginLeft: isDesktop ? -26 : -22,
                          marginTop: isDesktop ? -26 : -22,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-full`} />
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 text-white">
                            {tech.icon}
                          </div>
                        </div>
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#1E293B] px-1.5 py-0.5 rounded text-[8px] lg:text-[9px] text-[#F8FAFC] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-light tracking-wide">
                          {tech.name}
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Inner Ring - DevOps + Mobile + Cloud + Database */}
          <div
            className="absolute rounded-full"
            style={{
              width: innerRingSize,
              height: innerRingSize,
              border: `2px solid rgba(236, 72, 153, 0.4)`,
              boxShadow: `0 0 30px rgba(236, 72, 153, 0.15)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Inner Ring Label */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] lg:text-xs text-[#EC4899] font-light tracking-wide bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                DevOps, Cloud, Mobile & Database
              </span>
            </div>

            {/* Inner Ring Icons */}
            <div className="relative w-full h-full">
              <motion.div 
                className="relative w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {innerRingTech.map((tech, index) => {
                  const angle = (index / innerRingTech.length) * 360;
                  const radius = innerRingSize / 2;

                  return (
                    <div
                      key={tech.id}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                        transformOrigin: '0 0',
                      }}
                    >
                      <motion.button
                        onClick={() => setSelected(tech)}
                        className="relative rounded-full border border-[#1E293B] bg-[#0F172A]/90 backdrop-blur-sm shadow-lg hover:scale-110 transition duration-300 pointer-events-auto group cursor-pointer"
                        style={{ 
                          width: isDesktop ? 44 : 38,
                          height: isDesktop ? 44 : 38,
                          marginLeft: isDesktop ? -22 : -19,
                          marginTop: isDesktop ? -22 : -19,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-full`} />
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white">
                            {tech.icon}
                          </div>
                        </div>
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#1E293B] px-1.5 py-0.5 rounded text-[8px] lg:text-[9px] text-[#F8FAFC] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-light tracking-wide">
                          {tech.name}
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Center Logo */}
          <div className="absolute z-20 text-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-[2px] shadow-lg shadow-[#6366F1]/20">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/nesticklogo.jpg"
                  alt="Nestick Tech Logo"
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0F172A]/95 backdrop-blur-md border border-[#1E293B] rounded-2xl max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-1.5 bg-gradient-to-r ${selected.gradient}`} />
              
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-7 h-7 bg-[#1E293B] rounded-full flex items-center justify-center text-[#94A3B8] hover:bg-[#2D3A4F] hover:text-[#F8FAFC] transition-colors z-10 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-6">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${selected.gradient} animate-pulse`} style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-1 rounded-full bg-[#0F172A] flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.gradient} p-2`}>
                      <div className="w-full h-full text-white">
                        {selected.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold font-sans tracking-wide text-[#F8FAFC] mb-1">{selected.name}</h3>
                <span className="inline-block px-2 py-0.5 bg-[#1E293B] text-[#94A3B8] text-[10px] rounded-full mb-3 font-light tracking-wide">{selected.category}</span>
                <p className="text-[#94A3B8] text-xs font-light tracking-wide mb-4">Part of our modern technology stack at Nestick Tech</p>

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