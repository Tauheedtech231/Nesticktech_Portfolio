// components/Portfolio.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Syringe, Home, MonitorSmartphone, BookOpen, Search, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  liveUrl: string;
  gradient: string;
  icon: React.ElementType;
}

const Portfolio = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Mansol LMS',
      description: 'Complete learning management system for educational institutions with course management, student tracking, and certification.',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      category: 'Education',
      liveUrl: 'https://neezamiyatesting.site/',
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
      icon: BookOpen,
    },
    {
      id: 2,
      title: 'Siddiq Hospital',
      description: 'Modern healthcare management system with patient records, appointment scheduling, and medical reports.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'Healthcare',
      liveUrl: 'https://siddiqhospital.site/',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      icon: Syringe,
    },
    {
      id: 3,
      title: 'Saqfiyat Interiors',
      description: 'Premium ceiling and interior décor solutions. Specializing in modern false ceilings, elegant room makeovers, and luxury kitchen designs.',
      image: "/saq.jpg",
      tags: ['Next.js', 'Tailwind', 'Framer', 'Prisma'],
      category: 'Interior Design',
      liveUrl: 'https://saqfiyat.com/',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      icon: Home,
    },
    {
      id: 4,
      title: 'Nestick Portfolio',
      description: 'Comprehensive portfolio ecosystem showcasing our development expertise and project management capabilities.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      tags: ['React', 'Three.js', 'Framer', 'Tailwind'],
      category: 'Portfolio',
      liveUrl: 'https://nes-tick-portfolio-handler-dhfj.vercel.app/',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      icon: MonitorSmartphone,
    },
  ], []);

  // Optimized filtering using useMemo instead of useEffect
  const filteredResults = useMemo(() => {
    if (searchQuery.trim() === '') {
      return projects;
    }
    const query = searchQuery.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, projects]);

  // Update filteredProjects only when filteredResults changes
  useEffect(() => {
    setFilteredProjects(filteredResults);
  }, [filteredResults]);

  // Debounced search for better performance
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Animation variants - FIXED with proper easing
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

  // Company intro animation variants - FIXED with proper easing
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-[#020617] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Intro Section - Centered */}
        <motion.div
          variants={introContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          {/* Badge - From Top */}
          <motion.div 
            variants={fromTopVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B] mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"></span>
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </motion.div>

          {/* Company Name - From Top with delay */}
          <motion.h2 
            variants={fromTopVariants}
            className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3"
          >
            Nestick Tech
          </motion.h2>

          {/* Company Description - From Top with delay */}
          <motion.p 
            variants={fromTopVariants}
            className="text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto"
          >
            We craft digital experiences that solve real-world problems. From 
            educational platforms to healthcare systems, our portfolio showcases 
            innovative solutions built with cutting-edge technology.
          </motion.p>

          {/* Stats - From Bottom */}
          <motion.div 
            variants={fromBottomVariants}
            className="flex flex-wrap justify-center gap-6 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
              <span className="text-sm text-[#94A3B8]">50+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <span className="text-sm text-[#94A3B8]">98% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-sm text-[#94A3B8]">5+ Years</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Input - Directly after Company Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-10 lg:mb-12"
        >
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl opacity-0 transition-opacity duration-300 ${isSearchFocused ? 'opacity-20' : ''}`} />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search projects by name, category, or technology..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl py-4 pl-12 pr-12 text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-colors duration-300"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 p-1 rounded-full hover:bg-[#1E293B] transition-colors"
                >
                  <X className="w-4 h-4 text-[#94A3B8]" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Count */}
          <div className="flex justify-end mt-2">
            <span className="text-xs text-[#94A3B8]">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
            </span>
          </div>
        </motion.div>

        {/* Projects Grid - 3 cards per row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative"
              >
                {/* Card Border Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg`} />
                
                {/* Main Card */}
                <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden hover:border-transparent transition-all duration-300 hover:-translate-y-1 h-full">
                  
                  {/* Image Container */}
                  <div className="relative w-full h-44 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-30 z-10 mix-blend-overlay`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent z-10" />
                    
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Badge with Icon */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#0F172A]/90 backdrop-blur-sm border border-[#1E293B] rounded-full">
                      <span className="text-xs font-medium text-[#F8FAFC]">
                        {project.category}
                      </span>
                    </div>

                    {/* Live Demo Button */}
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:shadow-lg hover:shadow-[#6366F1]/25"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#F8FAFC] mb-2 group-hover:text-[#6366F1] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-[#94A3B8] mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 bg-[#1E293B] text-[#94A3B8] rounded-full border border-transparent hover:border-[#6366F1] hover:text-[#6366F1] transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-[#94A3B8]">No projects found matching &quot;{searchQuery}&quot;</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;