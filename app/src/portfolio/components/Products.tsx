/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  Store,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface FormData {
  name: string;
  companyName: string;
  productInterest: string;
  useCase: string;
  contactNumber: string;
}

const projects = [
  {
    id: 1,
    name: "Neezamiya",
    shortDescription:
      "Complete educational management system for schools and universities",
    status: "Live",
    tags: ["Education", "LMS", "School Management"],
    icon: Building2,
    image: '/neezamiya.jpg'
  },
  {
    id: 2,
    name: "Advance POS",
    shortDescription: "Smart point of sale system for retail businesses",
    status: "Live",
    tags: ["Retail", "POS", "Inventory"],
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "MarX",
    shortDescription: "Digital marketing suite for modern businesses",
    status: "In Development",
    tags: ["Marketing", "Automation", "CRM"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Build N",
    shortDescription: "Construction project management software",
    status: "Concept",
    tags: ["Construction", "Project"],
    icon: Store,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const canScroll = useRef(true);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    productInterest: "",
    useCase: "",
    contactNumber: "",
  });

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

  // Check if both left and right content are fully visible
  useEffect(() => {
    const checkVisibility = () => {
      if (leftContentRef.current && rightContentRef.current) {
        const leftRect = leftContentRef.current.getBoundingClientRect();
        const rightRect = rightContentRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const isLeftFullyVisible = leftRect.top >= 0 && leftRect.bottom <= viewportHeight;
        const isRightFullyVisible = rightRect.top >= 0 && rightRect.bottom <= viewportHeight;
        
        setIsContentVisible(isLeftFullyVisible && isRightFullyVisible);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [activeIndex]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  // Function to reset scroll ability after 1 second
  const resetScrollAbility = () => {
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }
    
    scrollTimer.current = setTimeout(() => {
      canScroll.current = true;
      scrollTimer.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (!isContentVisible) return;

    const handleWheel = (e: WheelEvent) => {
      // If modal is open, don't change products
      if (openModal) {
        return;
      }

      if (!canScroll.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          setActiveIndex(prev => prev + 1);
          canScroll.current = false;
          resetScrollAbility();
        }
      } 
      else if (e.deltaY < 0) {
        if (activeIndex > 0) {
          e.preventDefault();
          setActiveIndex(prev => prev - 1);
          canScroll.current = false;
          resetScrollAbility();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, isContentVisible, openModal]);

  // Navigation functions
  const goToNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const cardBorder = isDark ? 'border-white/10' : 'border-gray-200';
  const statusBg = isDark ? 'bg-blue-500/20' : 'bg-blue-100';
  const statusText = isDark ? 'text-blue-300' : 'text-blue-700';
  const iconColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const descColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const tagBg = isDark ? 'bg-white/10' : 'bg-gray-200';
  const tagBorder = isDark ? 'border-white/10' : 'border-gray-300';
  const tagText = isDark ? 'text-white/80' : 'text-gray-700';
  const buttonGradient = isDark 
    ? 'from-blue-500 to-indigo-600' 
    : 'from-blue-600 to-indigo-700';
  const modalBg = isDark ? 'bg-[#0f172a]' : 'bg-white';
  const modalText = isDark ? 'text-white' : 'text-gray-900';
  const inputBg = isDark ? 'bg-black/30' : 'bg-gray-100';
  const inputBorder = isDark ? 'border-white/10' : 'border-gray-300';
  const inputText = isDark ? 'text-white' : 'text-gray-900';
  const progressActive = isDark ? 'bg-blue-500' : 'bg-blue-600';
  const progressViewed = isDark ? 'bg-blue-500/50' : 'bg-blue-600/50';
  const progressInactive = isDark ? 'bg-white/20' : 'bg-gray-300';

  const project = projects[activeIndex];
  const Icon = project.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setOpenModal(false);
    setFormData({
      name: "",
      companyName: "",
      productInterest: "",
      useCase: "",
      contactNumber: "",
    });
  };

  return (
    <section ref={sectionRef} className={`min-h-screen ${bgColor} ${textColor}`}>
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-8 max-w-3xl ml-4 sm:ml-6 md:ml-12"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20"
        >
          <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic cursor-pointer">
            Our Products
          </span>
        </motion.div>

        <motion.h1
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight ${textColor} leading-tight`}
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Own Products
          </span>
        </motion.h1>

        <motion.p
          className={`mt-3 text-xs sm:text-sm md:text-base ${subTextColor} leading-relaxed font-light max-w-xl`}
        >
          Discover powerful in-house solutions crafted to solve real business challenges efficiently.
        </motion.p>

        <motion.div className="mt-4">
          <div className="w-14 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
        </motion.div>
      </motion.div>

      {/* MAIN CONTENT - Sticky Section */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Desktop: 2 columns | Mobile: Single Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT CONTENT */}
            <div 
              ref={leftContentRef}
              className="space-y-5 md:space-y-6 lg:space-y-8"
            >
              {/* Mobile Card - With navigation buttons */}
              <div className="lg:hidden">
                <div 
                  key={project.id}
                  className={`${cardBg} backdrop-blur-sm rounded-2xl overflow-hidden border ${cardBorder}`}
                >
                  {/* Fixed height with object-contain to show full image */}
                  <div className="relative w-full h-64 overflow-hidden bg-black/20">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content inside card */}
                  <div className="p-5 space-y-4">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${statusBg} ${statusText}`}>
                      {project.status}
                    </span>

                    <div className="flex items-center gap-3">
                      <Icon className={`${iconColor} w-6 h-6 flex-shrink-0`} />
                      <h2 className={`text-xl sm:text-2xl font-bold break-words leading-tight ${textColor}`}>
                        {project.name}
                      </h2>
                    </div>

                    <p className={`${descColor} text-sm leading-relaxed`}>
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs ${tagBg} rounded-full border ${tagBorder} ${tagText}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setOpenModal(true)}
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${buttonGradient} hover:scale-[1.02] transition-all duration-300 font-medium text-sm text-white`}
                    >
                      Request Demo
                    </button>

                    {/* Mobile Navigation Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={goToPrev}
                        disabled={activeIndex === 0}
                        className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                          activeIndex === 0 
                            ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                            : `bg-white/10 hover:bg-white/20 ${textColor}`
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Previous</span>
                      </button>
                      
                      <button
                        onClick={goToNext}
                        disabled={activeIndex === projects.length - 1}
                        className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                          activeIndex === projects.length - 1 
                            ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                            : `bg-gradient-to-r ${buttonGradient} text-white`
                        }`}
                      >
                        <span className="text-sm font-medium">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - With animations */}
              <div className="hidden lg:block space-y-6 md:space-y-8">
                <motion.div
                  key={`status-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className={`px-3 py-1.5 text-xs sm:text-sm rounded-full ${tagBg} border ${tagBorder} w-fit cursor-pointer hover:bg-white/20 transition-all duration-300 ${tagText}`}>
                    {project.status}
                  </span>
                </motion.div>

                <motion.div
                  key={`title-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                  className="flex items-center gap-3"
                >
                  <Icon className={`${iconColor} w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0`} />
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold break-words leading-tight ${textColor}`}>
                    {project.name}
                  </h2>
                </motion.div>

                <motion.p
                  key={`desc-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className={`${descColor} text-base sm:text-lg md:text-xl leading-relaxed`}
                >
                  {project.shortDescription}
                </motion.p>

                <motion.div
                  key={`tags-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 text-xs sm:text-sm ${tagBg} rounded-full border ${tagBorder} cursor-pointer hover:bg-white/20 hover:border-white/30 transition-all duration-300 ${tagText}`}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  key={`button-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                >
                  <button
                    onClick={() => setOpenModal(true)}
                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r ${buttonGradient} hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-base sm:text-lg font-medium shadow-lg hover:shadow-blue-500/25 text-white`}
                  >
                    Request Demo
                  </button>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT - Desktop only image with animations */}
            <div 
              ref={rightContentRef}
              className="hidden lg:flex items-center justify-center"
            >
              <motion.div
                key={`img-${project.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-lg mx-auto cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-2xl shadow-2xl w-full h-auto object-contain max-h-[70vh]"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Progress indicator - Theme aware */}
      {/* <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex 
                ? `w-8 ${progressActive}` 
                : idx < activeIndex 
                ? `w-4 ${progressViewed}` 
                : `w-4 ${progressInactive}`
            }`}
          />
        ))}
      </div> */}

      {/* MODAL - Theme aware */}
      {openModal && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          style={{ zIndex: 9999 }}
        >
          <div className={`${modalBg} p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto relative`}>
            <h2 className={`text-2xl sm:text-3xl font-bold sticky top-0 ${modalBg} py-2 z-10 ${modalText} mt-[1rem]`}>
              Request Demo
            </h2>

            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500`}
            />

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500`}
            />

            <input
              name="productInterest"
              placeholder="Product Interest"
              value={formData.productInterest}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500`}
            />

            <textarea
              name="useCase"
              placeholder="Use Case"
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg resize-vertical placeholder:text-gray-500`}
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500`}
            />

            <button 
              onClick={handleSubmit}
              className={`w-full py-3 sm:py-4 bg-gradient-to-r ${buttonGradient} rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-[1.02] font-medium text-base sm:text-lg text-white`}
            >
              Submit
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className={`text-sm sm:text-base ${subTextColor} text-center w-full hover:${textColor} transition-colors cursor-pointer pt-2`}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}