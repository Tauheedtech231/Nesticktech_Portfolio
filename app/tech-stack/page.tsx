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
  icon: React.ReactNode;
  gradient: string;
}

const TechStackPage = () => {
  const [selected, setSelected] = useState<TechItem | null>(null);
  const [circleSize, setCircleSize] = useState(400);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDesktop, setIsDesktop] = useState(false);
  
  const resizeTimeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const calculateSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setIsDesktop(vw >= 1024);
      
      if (vw >= 1024) {
        const minSize = Math.min(vw * 0.35, vh * 0.5, 500);
        setCircleSize(minSize);
      } else {
        const minSize = Math.min(vw * 0.7, vh * 0.35, 350);
        setCircleSize(minSize);
      }
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
    { id:1, name:"React", category:"Frontend", icon: <Braces />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:2, name:"Next.js", category:"Frontend", icon: <Box />, gradient:"from-[#8B5CF6] to-[#6366F1]" },
    { id:3, name:"TypeScript", category:"Frontend", icon: <Code2 />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:4, name:"Vue.js", category:"Frontend", icon: <Braces />, gradient:"from-[#3B82F6] to-[#60A5FA]" },
    { id:5, name:"Node.js", category:"Backend", icon: <Server />, gradient:"from-[#F59E0B] to-[#FBBF24]" },
    { id:6, name:"Python", category:"Backend", icon: <Cpu />, gradient:"from-[#EF4444] to-[#F87171]" },
    { id:7, name:"Java", category:"Backend", icon: <Terminal />, gradient:"from-[#F97316] to-[#FB923C]" },
    { id:8, name:"MongoDB", category:"Database", icon: <Database />, gradient:"from-[#3B82F6] to-[#60A5FA]" },
    { id:9, name:"PostgreSQL", category:"Database", icon: <Database />, gradient:"from-[#06B6D4] to-[#0891B2]" },
    { id:10, name:"AWS", category:"Cloud", icon: <Cloud />, gradient:"from-[#F97316] to-[#FB923C]" },
    { id:11, name:"Docker", category:"DevOps", icon: <Box />, gradient:"from-[#EC4899] to-[#F472B6]" },
    { id:12, name:"Git", category:"DevOps", icon: <GitBranch />, gradient:"from-[#F97316] to-[#FB923C]" },
    { id:13, name:"React Native", category:"Mobile", icon: <Smartphone />, gradient:"from-[#6366F1] to-[#8B5CF6]" },
    { id:14, name:"Flutter", category:"Mobile", icon: <Smartphone />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:15, name:"TensorFlow", category:"AI/ML", icon: <Cpu />, gradient:"from-[#22C55E] to-[#86EFAC]" },
    { id:16, name:"Figma", category:"Design", icon: <Figma />, gradient:"from-[#8B5CF6] to-[#6366F1]" },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Mobile', 'AI/ML', 'Design'];
  const filteredTech = activeCategory === 'All' ? techStack : techStack.filter(t => t.category === activeCategory);
  
  const ringSizes = {
    large: isDesktop ? circleSize * 1.25 : circleSize * 1.15,
    medium: circleSize,
    small: isDesktop ? circleSize * 0.7 : circleSize * 0.65,
    orbit: isDesktop ? circleSize * 0.7 : circleSize * 0.65
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-start bg-[#020617] py-8 lg:py-10 overflow-hidden">
      {/* Clean Background - Minimal */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #6366F1 0.5px, transparent 0)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header - Services Section Font Styles */}
        <div className="text-center max-w-2xl px-4 mb-6 lg:mb-8 mt-8 lg:mt-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
              Tech Stack
            </span>
          </div>
          
          {/* Heading - Services section style */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC]">
            Our Technology Stack
          </h2>
          
          {/* Description - Services section style */}
          <p className="mt-2 lg:mt-3 text-xs sm:text-sm lg:text-base text-[#94A3B8] font-light tracking-wide">
            Modern technologies we use to build scalable solutions
          </p>
        </div>

        {/* Category Filters - Services section font styles */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 lg:mb-10">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} 
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategory===c ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25' 
                : 'bg-[#0F172A] border border-[#1E293B] text-[#94A3B8] hover:border-[#6366F1] hover:text-[#6366F1]'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* Orbit Container - Reduced Height */}
        <div className="relative w-full flex items-center justify-center overflow-visible min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]">
          {/* Outer Rings - Full White */}
          <div className="relative flex items-center justify-center" style={{ width: ringSizes.large, height: ringSizes.large }}>
            {/* Ring 1 - Largest - Full White, Thicker */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: ringSizes.large, 
                height: ringSizes.large,
                border: '3px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)'
              }} 
            />
            
            {/* Ring 2 - Middle - Full White */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: ringSizes.medium, 
                height: ringSizes.medium,
                border: '2px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
              }} 
            />
            
            {/* Ring 3 - Smallest - Full White */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: ringSizes.small, 
                height: ringSizes.small,
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.08)'
              }} 
            />
            
            {/* Center Logo - Using Real Logo */}
            <div className="absolute z-20 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-[2px] shadow-lg shadow-[#6366F1]/20">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
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
            
            {/* Rotating Orbit with Tech Icons */}
            <div className="absolute" style={{ width: ringSizes.orbit, height: ringSizes.orbit }}>
              <motion.div 
                className="relative w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                {filteredTech.slice(0, 12).map((tech, index) => {
                  const angle = (index / Math.min(filteredTech.length, 12)) * 360;
                  const radius = ringSizes.orbit / 2;

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
                        className="relative rounded-full border border-[#1E293B] bg-[#0F172A] shadow-lg hover:scale-110 transition duration-300 pointer-events-auto group cursor-pointer"
                        style={{ 
                          width: isDesktop ? 56 : 48,
                          height: isDesktop ? 56 : 48,
                          marginLeft: isDesktop ? -28 : -24,
                          marginTop: isDesktop ? -28 : -24,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-full`} />
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className={`w-${isDesktop ? 5 : 4} h-${isDesktop ? 5 : 4} text-white`}>
                            {tech.icon}
                          </div>
                        </div>
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#0F172A] border border-[#1E293B] px-1.5 py-0.5 rounded text-[9px] text-[#F8FAFC] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-light tracking-wide">
                          {tech.name}
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Services section font styles */}
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
              className="bg-[#0F172A] border border-[#1E293B] rounded-2xl max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
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