/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  Store,
  X,
  Send,
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
    image: "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    name: "MarX",
    shortDescription: "Digital marketing suite for modern businesses",
    status: "In Development",
    tags: ["Marketing", "Automation", "CRM"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    name: "Build N",
    shortDescription: "Construction project management software",
    status: "Concept",
    tags: ["Construction", "Project"],
    icon: Store,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop"
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const bothVisible = leftVisible && rightVisible;
  
  const activeIndexRef = useRef(activeIndex);
  const viewedProductsRef = useRef<number[]>([]);
  const animatingRef = useRef(isAnimating);

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

  // Mark current product as viewed
  useEffect(() => {
    if (activeIndex >= 0 && !viewedProducts.includes(activeIndex)) {
      setViewedProducts(prev => [...prev, activeIndex]);
    }
  }, [activeIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    viewedProductsRef.current = viewedProducts;
  }, [viewedProducts]);

  useEffect(() => {
    animatingRef.current = isAnimating;
  }, [isAnimating]);

  const allProductsViewed = viewedProducts.length === projects.length;

  // Use IntersectionObserver to detect when BOTH left and right panes
  // are at least 90% visible. Only then enable the wheel-driven
  // product switching behavior.
  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    const options: IntersectionObserverInit = {
      threshold: 0.9,
    };

    const leftObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setLeftVisible(entry.isIntersecting && entry.intersectionRatio >= 0.9));
    }, options);

    const rightObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setRightVisible(entry.isIntersecting && entry.intersectionRatio >= 0.9));
    }, options);

    leftObserver.observe(leftRef.current);
    rightObserver.observe(rightRef.current);

    return () => {
      leftObserver.disconnect();
      rightObserver.disconnect();
    };
  }, [leftRef.current, rightRef.current]);

  // Wheel handler - ONLY when BOTH left and right panes are visible
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // ONLY intercept wheel when both panes are visible in viewport
      if (!bothVisible) return;
      
      // Don't interfere if modal is open
      if (openModal) return;
      
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }

      const currentIndex = activeIndexRef.current;
      const currentViewed = viewedProductsRef.current;

      // Scrolling DOWN (next product)
      if (e.deltaY > 0) {
        if (currentIndex < projects.length - 1) {
          // Check if current product has been viewed
          if (!currentViewed.includes(currentIndex)) {
            e.preventDefault();
            return;
          }
          
          e.preventDefault();
          setIsAnimating(true);
          setActiveIndex(currentIndex + 1);
          setTimeout(() => setIsAnimating(false), 500);
        }
      }
      
      // Scrolling UP (previous product)
      else if (e.deltaY < 0) {
        if (currentIndex > 0) {
          e.preventDefault();
          setIsAnimating(true);
          setActiveIndex(currentIndex - 1);
          setTimeout(() => setIsAnimating(false), 500);
        }
      }
    };

    if (bothVisible) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [bothVisible, openModal]);

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0f172a]' : 'bg-white';
  const inputBg = isDark ? 'bg-black/30' : 'bg-gray-100';
  const inputBorder = isDark ? 'border-white/10' : 'border-gray-300';
  const inputText = isDark ? 'text-white' : 'text-gray-900';
  const tagBg = isDark ? 'bg-white/10' : 'bg-gray-200';
  const tagBorder = isDark ? 'border-white/10' : 'border-gray-300';
  const statusBg = isDark ? 'bg-white/10 border-white/20' : 'bg-gray-200 border-gray-300';
  const statusText = isDark ? 'text-white' : 'text-gray-700';
  const iconColor = isDark ? 'text-blue-400' : 'text-indigo-600';
  const modalBg = isDark ? 'bg-[#0f172a]' : 'bg-white';
  const modalOverlay = isDark ? 'bg-black/70' : 'bg-gray-900/70';

  const project = projects[activeIndex];
  const Icon = project?.icon || Building2;
  const projectName = project?.name || "";
  const projectDescription = project?.shortDescription || "";
  const projectTags = project?.tags || [];
  const projectStatus = project?.status || "";
  const projectImage = project?.image || "";

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

  // Slide animation variants
  const slideVariants:Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <section ref={sectionRef} className={`min-h-screen ${bgColor} overflow-hidden relative`}>
      
      {/* HEADER */}
      <div className="pt-8 max-w-3xl left-0 pl-4 sm:pl-6 md:pl-12 lg:pl-16 relative z-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20`}>
          <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic cursor-pointer">
            Our Products
          </span>
        </div>

        <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight ${textColor} leading-tight`}>
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Own Products
          </span>
        </h1>

        <p className={`mt-3 text-xs sm:text-sm md:text-base ${subTextColor} leading-relaxed font-light max-w-xl`}>
          Discover powerful in-house solutions crafted to solve real business challenges efficiently.
        </p>

       

      
        
       
      </div>

      {/* MAIN CONTENT - Centered */}
      <div className="h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={activeIndex}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            >
              {/* LEFT - PRODUCT DESCRIPTION CONTENT */}
              <div ref={leftRef} className="space-y-6 md:space-y-8">
                {/* Status Badge */}
                <span className={`px-3 py-1.5 text-xs sm:text-sm rounded-full ${statusBg} border ${statusText} w-fit cursor-pointer hover:bg-white/20 transition-all duration-300`}>
                  {projectStatus}
                </span>

                {/* Icon and Product Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`${iconColor} w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0`} />
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold break-words leading-tight ${textColor}`}>
                      {projectName}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-2">
                  <p className={`${subTextColor} text-base sm:text-lg md:text-xl leading-relaxed`}>
                    {projectDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {projectTags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 text-xs sm:text-sm ${tagBg} rounded-full border ${tagBorder} cursor-pointer hover:bg-white/20 hover:border-white/30 transition-all duration-300 ${subTextColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}
                <div className="pt-6">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-base sm:text-lg font-medium shadow-lg hover:shadow-[#6366F1]/25 text-white"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              {/* RIGHT - IMAGE SECTION */}
              <div ref={rightRef} className="space-y-4 mt-8 sm:mt-0">
                <div className="cursor-pointer transition-all duration-500 hover:scale-[1.02]">
                  <img
                    src={projectImage}
                    alt={projectName}
                    className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Product Indicator Dots */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx <= activeIndex || viewedProducts.includes(activeIndex)) {
                setActiveIndex(idx);
              }
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-8 h-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                : idx < activeIndex
                ? 'w-2 h-2 bg-[#6366F1]/60'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div> */}

      {/* Scroll Hint - Only show when both panes are visible and products not fully viewed */}
      {bothVisible && !allProductsViewed && activeIndex < projects.length - 1 && (
        <div className="absolute bottom-8 right-8 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/50">Scroll for next</span>
            <div className="w-4 h-6 rounded-full border border-white/30 flex justify-center">
              <div className="w-0.5 h-1.5 bg-white/50 rounded-full mt-1" />
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {openModal && (
        <div className={`fixed inset-0 ${modalOverlay} flex items-center justify-center z-50 p-4`}>
          <div className={`${modalBg} p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto`}>
            <h2 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>Request Demo</h2>

            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-[#6366F1] transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20 placeholder:${subTextColor}`}
            />

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-[#6366F1] transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20 placeholder:${subTextColor}`}
            />

            <input
              name="productInterest"
              placeholder="Product Interest"
              value={formData.productInterest}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-[#6366F1] transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20 placeholder:${subTextColor}`}
            />

            <textarea
              name="useCase"
              placeholder="Use Case"
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-[#6366F1] transition-colors text-base sm:text-lg resize-vertical cursor-pointer hover:border-white/20 placeholder:${subTextColor}`}
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-[#6366F1] transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20 placeholder:${subTextColor}`}
            />

            <button 
              onClick={handleSubmit}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-[1.02] font-medium text-base sm:text-lg text-white"
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