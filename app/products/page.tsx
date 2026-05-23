/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Building2, ShoppingCart, TrendingUp, Store, ChevronRight, ChevronLeft, X } from "lucide-react";
import PartnerCollaboratorPage from "./PartnerSection";

interface Product {
  title: string;
  desc: string;
  images: string[];
  tags: string[];
  status: string;
  icon: React.ReactNode;
  bgColor: string;
}

const products: Product[] = [
  {
    title: "Neezamiya",
    desc: "Complete educational management system for schools and universities",
    images: [
      "/nlogo.png",
"https://images.unsplash.com/photo-1642132652860-603f4e3c19b7?q=80&w=1460&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "/d2.png",
      "/d3.png",
    ],
    tags: ["Education", "LMS", "School Management"],
    status: "Live",
    icon: <Building2 className="w-7 h-7 text-indigo-400" />,
    bgColor: "from-indigo-900/50 via-purple-900/40 to-blue-900/50",
  },
  {
    title: "Advance POS",
    desc: "Smart point of sale system for retail businesses",
    images: [
      "https://images.unsplash.com/photo-1726065235239-b20b88d43eea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715635845679-f44947f29383?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1779278617909-f29b6064ca1f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tags: ["Retail", "POS", "Inventory"],
    status: "Live",
    icon: <ShoppingCart className="w-7 h-7 text-indigo-400" />,
    bgColor: "from-emerald-900/50 via-teal-900/40 to-cyan-900/50",
  },
  {
    title: "MarX",
    desc: "Digital marketing suite for modern businesses",
    images: [
      "https://images.unsplash.com/photo-1758270705290-62b6294dd044?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1565688280018-b7893e3c9175?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1393&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1758520144424-2e04f4ad7f60?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    tags: ["Marketing", "Automation", "CRM"],
    status: "In Development",
    icon: <TrendingUp className="w-7 h-7 text-indigo-400" />,
    bgColor: "from-orange-900/50 via-amber-900/40 to-yellow-900/50",
  },
  {
    title: "Build N",
    desc: "Construction project management software",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
      "https://plus.unsplash.com/premium_photo-1661376741563-56e907c3ec0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwcHJvamVjdCUyMHBsYW5uaW5nJTIwYmx1ZXByaW50JTIwbGFwdG9wfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1681992176275-a1a591dbec58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uc3RydWN0aW9uJTIwd29ya2VycyUyMHRlYW13b3JrJTIwYnVpbGRpbmclMjBzaXRlJTIwY3JhbmVzfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/2259531216/photo/smiling-male-industrial-worker-operating-control-room-system.webp?a=1&b=1&s=612x612&w=0&k=20&c=DGf0GRs1NqjjGqU-SWGSMUul9bTeX2vvm_yXEWP1ptc="
    ],
    tags: ["Construction", "Project"],
    status: "Concept",
    icon: <Store className="w-7 h-7 text-indigo-400" />,
    bgColor: "from-slate-900/50 via-gray-900/40 to-zinc-900/50",
  },
];

const IMAGES_PER_PRODUCT = 4;
const TOTAL_STEPS = products.length * IMAGES_PER_PRODUCT;

export default function CinematicShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // EXISTING SCROLL LOGIC - COMPLETELY UNCHANGED
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentBgColor, setCurrentBgColor] = useState(products[0].bgColor);
  const [cinematicComplete, setCinematicComplete] = useState(false);
  
  const isMountedRef = useRef(true);
  const rafRef = useRef<number | null>(null);

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

  // Theme-based class names
  const isDark = theme === 'dark';
  const overlayBg = isDark ? 'bg-black/50' : 'bg-white/20';
  const indicatorBg = isDark ? 'bg-black/40' : 'bg-black';
  const indicatorText = isDark ? 'text-white/50' : 'text-white/70';
  const modalBg = isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200';
  const modalBorder = isDark ? 'border-white/10' : 'border-gray-300';
  const modalText = isDark ? 'text-white' : 'text-gray-900';
  const modalSubText = isDark ? 'text-white/60' : 'text-gray-600';
  const inputBg = isDark ? 'bg-white/10' : 'bg-gray-200';
  const inputBorder = isDark ? 'border-white/20' : 'border-gray-400';
  const inputText = isDark ? 'text-white' : 'text-gray-900';
  const placeholderColor = isDark ? 'placeholder-white/40' : 'placeholder-gray-500';
  
  // Badge styling - BLACK background with WHITE text for both modes
  const badgeBg = 'bg-black';
  const badgeText = 'text-white/70';

  // Update background color when product changes
  useEffect(() => {
    if (cinematicComplete) {
      setCurrentBgColor(products[activeProductIndex].bgColor);
    }
  }, [activeProductIndex, cinematicComplete]);

  // EXISTING SCROLL HANDLER - PRESERVED EXACTLY
  useEffect(() => {
    isMountedRef.current = true;
    
    const handleScroll = () => {
      if (!sectionRef.current || !isMountedRef.current) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !isMountedRef.current) return;
        
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const sectionTop = rect.top + scrollTop;
        const scrollPosition = window.scrollY - sectionTop;
        const sectionHeight = rect.height;
        
        let progress = scrollPosition / sectionHeight;
        progress = Math.min(0.99, Math.max(0, progress));
        
        const currentStep = Math.floor(progress * TOTAL_STEPS);
        const productIdx = Math.min(
          products.length - 1,
          Math.floor(currentStep / IMAGES_PER_PRODUCT)
        );
        const imageIdx = currentStep % IMAGES_PER_PRODUCT;
        
        setActiveProductIndex(productIdx);
        setActiveImageIndex(imageIdx);
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      isMountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // PREMIUM CINEMATIC INTRO ANIMATION - COMPLETELY UNCHANGED
  useEffect(() => {
    if (!contentRef.current) return;
    
    const element = contentRef.current;
    
    // Start position: VERY FAR above (deep off-screen top)
    element.style.transform = "translateY(-150vh)";
    element.style.transition = "none";
    element.style.opacity = "0";
    
    // Force reflow
    element.getBoundingClientRect();
    
    // Fade in smoothly
    element.style.transition = "opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
    element.style.opacity = "1";
    
    // Apple-style cinematic spring animation sequence
    setTimeout(() => {
      element.style.transition = "transform 1.6s cubic-bezier(0.2, 0.8, 0.25, 1.05)";
      element.style.transform = "translateY(12vh)";
      
      const onFirstPhaseEnd = () => {
        element.style.transition = "transform 1s cubic-bezier(0.2, 0.65, 0.3, 1.1)";
        element.style.transform = "translateY(0)";
        
        element.addEventListener("transitionend", () => {
          element.style.transition = "";
          element.style.transform = "";
          setCinematicComplete(true);
        }, { once: true });
        
        element.removeEventListener("transitionend", onFirstPhaseEnd);
      };
      
      element.addEventListener("transitionend", onFirstPhaseEnd, { once: true });
    }, 80);
    
    return () => {
      element.style.transition = "";
    };
  }, []);

  // Navigation functions - unchanged
  const goToNextStep = () => {
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const targetScroll = currentScroll + windowHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const goToPrevStep = () => {
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    const targetScroll = currentScroll - windowHeight;
    
    window.scrollTo({
      top: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const currentProduct = products[activeProductIndex];
  const currentImageUrl = currentProduct?.images[activeImageIndex] || currentProduct?.images[0];
  
  return (
    <>
      <section ref={sectionRef} className="relative h-[1600vh] text-white">
        <div className="sticky top-0 h-screen overflow-hidden pt-16 md:pt-0">
          
          {/* BACKGROUND - DURING INTRO: PURE BLACK ONLY, NOTHING ELSE */}
          {/* AFTER INTRO: GRADIENT + BLURRED IMAGE */}
          <div className="absolute inset-0 -z-10">
            {/* Base background - theme aware */}
            <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-gray-100'}`} />
            
            {/* Gradient background - only visible after cinematic completes */}
            {cinematicComplete && (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${currentBgColor} transition-opacity duration-1000 opacity-100`} />
                <div className={`absolute inset-0 ${overlayBg}`} />
              </>
            )}
          </div>

          {/* Blurred background product image - ONLY after intro completes */}
          {cinematicComplete && (
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-3xl`} />
              <Image
                src={currentImageUrl}
                alt="background"
                fill
                className="object-cover scale-110 blur-2xl opacity-20"
                aria-hidden="true"
              />
            </div>
          )}

          {/* CINEMATIC CONTENT WRAPPER - animated as a whole */}
          <div 
            ref={contentRef}
            className="relative h-full will-change-transform"
            style={{ opacity: 0 }}
          >
            {/* Step Indicators with Connecting Lines - Desktop Version */}
            <div className="absolute top-20 left-0 right-0 z-30 hidden md:block">
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-center">
                  {products.map((product, pIdx) => {
                    const isActiveProduct = pIdx === activeProductIndex;
                    const isPassedProduct = pIdx < activeProductIndex;
                    return (
                      <div key={product.title} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center">
                            <div className={`relative flex items-center justify-center transition-all duration-500 ${
                              isActiveProduct ? 'w-8 h-8 md:w-12 md:h-12' : 'w-6 h-6 md:w-8 md:h-8'
                            }`}>
                              {isActiveProduct && cinematicComplete && (
                                <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
                              )}
                              <div className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                                isActiveProduct ? 'bg-indigo-500 w-full h-full' : 
                                isPassedProduct ? 'bg-indigo-400/60 w-full h-full' : 'bg-white/20 w-full h-full'
                              }`}>
                                <span className={`text-xs font-bold ${isActiveProduct ? 'text-white' : 'text-white/70'}`}>
                                  {pIdx + 1}
                                </span>
                              </div>
                            </div>
                            <span className={`hidden md:block ml-2 text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                              isActiveProduct ? 'text-indigo-400' : isPassedProduct ? 'text-white/60' : 'text-white/30'
                            }`}>
                              {product.title}
                            </span>
                          </div>
                        </div>
                        {pIdx < products.length - 1 && (
                          <div className={`w-6 md:w-10 h-0.5 mx-1 md:mx-2 rounded-full transition-all duration-300 ${
                            pIdx < activeProductIndex
                              ? 'bg-gradient-to-r from-indigo-500 to-indigo-400'
                              : 'bg-white/20'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Badge - BLACK background with WHITE text */}
                <div className={`mt-6 text-xs ${badgeText} ${badgeBg} px-3 py-1 rounded-full backdrop-blur-sm border ${isDark ? 'border-white/10' : 'border-white/20'}`}>
                  {!cinematicComplete ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                      CINEMATIC ENTRANCE
                    </span>
                  ) : (
                    `Image ${activeImageIndex + 1} / ${IMAGES_PER_PRODUCT} • Product ${activeProductIndex + 1} / ${products.length}`
                  )}
                </div>
              </div>
            </div>

            {/* DESKTOP UI */}
            <div className="hidden md:block relative h-full">
              <div className="relative h-full flex items-start justify-center pt-24 md:pt-32">
                {products.map((product, pIdx) => {
                  const isActive = pIdx === activeProductIndex;
                  const offset = pIdx - activeProductIndex;
                  
                  return (
                    <div
                      key={product.title}
                      className="absolute w-full max-w-7xl px-6 transition-all duration-500"
                      style={{
                        transform: `translateY(${offset * 140}px) scale(${isActive ? 1 : 0.85})`,
                        opacity: isActive ? 1 : 0.25,
                        zIndex: isActive ? 10 : 1,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-6">
                        {/* Left side description */}
                        <div className="md:col-span-1 text-left">
                          <div className="text-sm text-indigo-400">
                            0{pIdx + 1} — PRODUCT
                          </div>
                       <div className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-black text-white border border-white/20">
  {product.status}
</div>
                          <h2 className={`mt-3 text-3xl md:text-4xl font-bold transition-all duration-500 text-white ${
                            !isActive && 'blur-[2px] opacity-50'
                          }`}>
                            {product.title}
                          </h2>
                          <p className={`mt-4 text-white/60 text-sm md:text-base transition-all duration-500 ${
                            !isActive && 'blur-[2px] opacity-30'
                          }`}>
                            {product.desc}
                          </p>
                          <div className={`mt-4 flex flex-wrap gap-2 transition-all duration-500 ${
                            !isActive && 'blur-[2px] opacity-30'
                          }`}>
                            {product.tags.map((tag, tagIdx) => (
                              <span key={tagIdx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {isActive && cinematicComplete && (
                            <div className="text-xs text-indigo-300/70 flex items-center gap-1 mt-4">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                              Scroll to explore • Image {activeImageIndex + 1} of {IMAGES_PER_PRODUCT}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-3 flex justify-center">
                          <div className="group mt-[1rem] relative cursor-pointer">
                            <Image
                              src={isActive ? currentImageUrl : product.images[0]}
                              alt={`${product.title} view`}
                              width={640}
                              height={480}
                              className={`relative h-[540px] w-[540px] md:h-[440px] md:w-[600px] rounded-2xl object-cover shadow-2xl border border-white/20 transition-all duration-500 ${
                                cinematicComplete ? 'group-hover:scale-105 group-hover:-translate-y-2' : ''
                              } ${!isActive && 'opacity-50 blur-[2px]'}`}
                              priority={isActive && activeImageIndex === 0}
                            />
                          </div>
                        </div>

                        <div className="md:col-span-1 flex flex-col items-end gap-4">
                          <button 
                            onClick={() => openModal(product)}
                            className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                              cinematicComplete 
                                ? `bg-white ${isDark ? 'text-black' : 'text-gray-900'} cursor-pointer hover:scale-105 hover:shadow-xl` 
                                : 'bg-white/40 text-white/40 cursor-not-allowed'
                            }`}
                            disabled={!cinematicComplete}
                          >
                            Request Demo
                          </button>
                          <div className="mt-2 text-sm text-white/60 text-right">
                            📞 03237594869
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE UI - Fixed steps indicator position */}
            <div className="block md:hidden relative h-full">
              {/* Mobile Steps Indicator - At the TOP, separate from content */}
              <div className="absolute top-4 left-0 right-0 z-20 px-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 flex-wrap justify-center">
                    {products.map((product, pIdx) => {
                      const isActiveProduct = pIdx === activeProductIndex;
                      const isPassedProduct = pIdx < activeProductIndex;
                      return (
                        <div key={product.title} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center">
                              <div className={`relative flex items-center justify-center transition-all duration-500 ${
                                isActiveProduct ? 'w-6 h-6' : 'w-5 h-5'
                              }`}>
                                {isActiveProduct && cinematicComplete && (
                                  <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
                                )}
                                <div className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                                  isActiveProduct ? 'bg-indigo-500 w-full h-full' : 
                                  isPassedProduct ? 'bg-indigo-400/60 w-full h-full' : 'bg-white/20 w-full h-full'
                                }`}>
                                  <span className={`text-[10px] font-bold ${isActiveProduct ? 'text-white' : 'text-white/70'}`}>
                                    {pIdx + 1}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {pIdx < products.length - 1 && (
                            <div className={`w-3 h-0.5 mx-0.5 rounded-full transition-all duration-300 ${
                              pIdx < activeProductIndex
                                ? 'bg-gradient-to-r from-indigo-500 to-indigo-400'
                                : 'bg-white/20'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Mobile Badge - BLACK background with WHITE text */}
                  <div className={`mt-2 text-[10px] ${badgeText} ${badgeBg} px-2 py-0.5 rounded-full backdrop-blur-sm border ${isDark ? 'border-white/10' : 'border-white/20'}`}>
                    {!cinematicComplete ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                        CINEMATIC ENTRANCE
                      </span>
                    ) : (
                      `${activeImageIndex + 1}/${IMAGES_PER_PRODUCT} • ${activeProductIndex + 1}/${products.length}`
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Content - Centered with proper spacing */}
              <div className="relative h-full flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 mt-12">
                    <div className="relative w-full h-64 bg-black/30">
                      <Image
                        src={currentImageUrl}
                        alt={currentProduct?.title || "Product"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] text-white/80">
                        {activeImageIndex + 1}/{IMAGES_PER_PRODUCT}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {currentProduct?.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                          {currentProduct?.status}
                        </span>
                      </div>
                      
                      <p className="text-white/60 text-xs mb-3 line-clamp-2">
                        {currentProduct?.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {currentProduct?.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => cinematicComplete && openModal(currentProduct!)}
                        disabled={!cinematicComplete}
                        className={`w-full font-medium py-2.5 rounded-xl text-sm transition-all duration-200 ${
                          cinematicComplete 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer' 
                            : 'bg-indigo-600/40 text-white/60 cursor-not-allowed'
                        }`}
                      >
                        Request Demo
                      </button>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {cinematicComplete && (
                    <div className="flex justify-between gap-4 mt-6">
                      <button
                        onClick={goToPrevStep}
                        className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                        <span className="text-white text-sm font-medium">Previous</span>
                      </button>
                      
                      <button
                        onClick={goToNextStep}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <span className="text-white text-sm font-medium">Next</span>
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Next Button */}
            {cinematicComplete && (
              <button
                onClick={goToNextStep}
                className="fixed bottom-8 mb-[4rem] right-10 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-full px-6 py-3 transition-all duration-300 cursor-pointer group flex items-center gap-2 shadow-lg shadow-indigo-500/25 hidden md:flex"
              >
                <span className="text-sm text-white font-semibold">
                  Next image
                </span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Modal - Theme aware */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-gray-900/80'} backdrop-blur-sm`}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className={`relative ${modalBg} rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl border ${modalBorder}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={closeModal}
                className={`absolute top-4 right-4 ${modalSubText} hover:${modalText} transition cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  {selectedProduct.icon}
                </div>
                <h3 className={`text-2xl font-bold ${modalText} mb-2`}>
                  Request Demo - {selectedProduct.title}
                </h3>
                <p className={`${modalSubText} mb-5 text-sm`}>
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
                <form className="space-y-3 text-left" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className={`block text-sm ${modalSubText} mb-1`}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 py-2.5 rounded-lg ${inputBg} border ${inputBorder} ${inputText} ${placeholderColor} focus:outline-none focus:border-indigo-400 transition`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${modalSubText} mb-1`}>Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2.5 rounded-lg ${inputBg} border ${inputBorder} ${inputText} ${placeholderColor} focus:outline-none focus:border-indigo-400 transition`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${modalSubText} mb-1`}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-2.5 rounded-lg ${inputBg} border ${inputBorder} ${inputText} ${placeholderColor} focus:outline-none focus:border-indigo-400 transition`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${modalSubText} mb-1`}>Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific requirements?"
                      className={`w-full px-4 py-2.5 rounded-lg ${inputBg} border ${inputBorder} ${inputText} ${placeholderColor} focus:outline-none focus:border-indigo-400 transition resize-none`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition duration-200 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Request
                  </motion.button>
                </form>
                <p className={`text-xs ${modalSubText} mt-4`}>
                  We'll contact you shortly to schedule a personalized demo.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PartnerCollaboratorPage />
    </>
  );
}