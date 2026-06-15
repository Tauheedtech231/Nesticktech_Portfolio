/* eslint-disable react-hooks/set-state-in-effect */
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
    nameAr: "نظام نيزامية",
    shortDescription: "Complete educational management system for schools and universities",
    shortDescriptionAr: "نظام متكامل لإدارة التعليم للمدارس والجامعات",
    status: "Live",
    statusAr: "مباشر",
    tags: ["Education", "LMS", "School Management"],
    tagsAr: ["التعليم", "نظام إدارة التعلم", "إدارة المدارس"],
    icon: Building2,
    image: '/nlogo.png'
  },
  {
    id: 2,
    name: "Advance POS",
    nameAr: "نظام نقاط البيع المتقدم",
    shortDescription: "Smart point of sale system for retail businesses",
    shortDescriptionAr: "نظام نقاط بيع ذكي لأعمال التجزئة",
    status: "Live",
    statusAr: "مباشر",
    tags: ["Retail", "POS", "Inventory"],
    tagsAr: ["التجزئة", "نقاط البيع", "المخزون"],
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "MarX",
    nameAr: "ماركس",
    shortDescription: "Digital marketing suite for modern businesses",
    shortDescriptionAr: "حزمة تسويق رقمي للأعمال الحديثة",
    status: "In Development",
    statusAr: "قيد التطوير",
    tags: ["Marketing", "Automation", "CRM"],
    tagsAr: ["التسويق", "الأتمتة", "إدارة علاقات العملاء"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Build N",
    nameAr: "بناء ",
    shortDescription: "Construction project management software",
    shortDescriptionAr: "برنامج إدارة مشاريع البناء",
    status: "Concept",
    statusAr: "مفهوم",
    tags: ["Construction", "Project"],
    tagsAr: ["البناء", "المشاريع"],
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
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [viewedProducts, setViewedProducts] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    productInterest: "",
    useCase: "",
    contactNumber: "",
  });

  // Arabic and English content
  const content = {
    en: {
      badge: 'Our Products',
      heading: 'Explore Our',
      headingHighlight: 'Own Products',
      description: 'Discover powerful in-house solutions crafted to solve real business challenges efficiently.',
      requestDemo: 'Request Demo',
      previous: 'Previous',
      next: 'Next',
      modalTitle: 'Request Demo',
      namePlaceholder: 'Your Name',
      companyPlaceholder: 'Company Name',
      productPlaceholder: 'Product Interest',
      useCasePlaceholder: 'Use Case',
      contactPlaceholder: 'Contact Number',
      submit: 'Submit',
      close: 'Close',
    },
    ar: {
      badge: 'منتجاتنا',
      heading: 'استكشف',
      headingHighlight: 'منتجاتنا الخاصة',
      description: 'اكتشف حلولاً داخلية قوية صممت لحل تحديات الأعمال الحقيقية بكفاءة.',
      requestDemo: 'طلب تجربة',
      previous: 'السابق',
      next: 'التالي',
      modalTitle: 'طلب تجربة',
      namePlaceholder: 'الاسم',
      companyPlaceholder: 'اسم الشركة',
      productPlaceholder: 'المنتج المهتم به',
      useCasePlaceholder: 'حالة الاستخدام',
      contactPlaceholder: 'رقم الاتصال',
      submit: 'إرسال',
      close: 'إغلاق',
    }
  };

  const isRTL = language === 'ar';
  const currentContent = content[language];

  // Listen for language changes
  useEffect(() => {
    const checkLanguage = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      const htmlLang = document.documentElement.getAttribute('lang');
      if (htmlDir === 'rtl' || htmlLang === 'ar') {
        setLanguage('ar');
      } else {
        setLanguage('en');
      }
    };

    checkLanguage();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'dir' || mutation.attributeName === 'lang') {
          checkLanguage();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.language) {
        setLanguage(customEvent.detail.language);
      } else {
        checkLanguage();
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Mark all products as viewed when user scrolls past the section
  useEffect(() => {
    const checkIfScrolledPast = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        const allIndices = projects.map((_, idx) => idx);
        const newViewed = [...viewedProducts];
        allIndices.forEach(idx => {
          if (!newViewed.includes(idx)) {
            newViewed.push(idx);
          }
        });
        if (newViewed.length !== viewedProducts.length) {
          setViewedProducts(newViewed);
        }
      }
    };

    window.addEventListener('scroll', checkIfScrolledPast);
    return () => window.removeEventListener('scroll', checkIfScrolledPast);
  }, [viewedProducts]);

  // Mark current product as viewed
  useEffect(() => {
    if (activeIndex >= 0 && !viewedProducts.includes(activeIndex)) {
      setViewedProducts(prev => [...prev, activeIndex]);
    }
  }, [activeIndex]);

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

  // Handle scroll events
  useEffect(() => {
    if (!isContentVisible) return;

    const handleWheel = (e: WheelEvent) => {
      if (openModal) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 800) {
        e.preventDefault();
        return;
      }
      
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      if (!viewedProducts.includes(activeIndex)) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          isAnimating.current = true;
          lastScrollTime.current = now;
          setActiveIndex(prev => prev + 1);
          setTimeout(() => {
            isAnimating.current = false;
          }, 500);
        }
      } 
      else if (e.deltaY < 0) {
        if (activeIndex > 0) {
          e.preventDefault();
          isAnimating.current = true;
          lastScrollTime.current = now;
          setActiveIndex(prev => prev - 1);
          setTimeout(() => {
            isAnimating.current = false;
          }, 500);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (openModal) return;
      if (isAnimating.current) return;
      
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (openModal) return;
      if (isAnimating.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const deltaTime = Date.now() - touchStartTime.current;
      
      if (Math.abs(deltaY) < 50) return;
      if (deltaTime > 300) return;
      
      if (!viewedProducts.includes(activeIndex)) {
        e.preventDefault();
        return;
      }
      
      if (deltaY > 50 && activeIndex < projects.length - 1) {
        e.preventDefault();
        isAnimating.current = true;
        setActiveIndex(prev => prev + 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, 300);
      } 
      else if (deltaY < -50 && activeIndex > 0) {
        e.preventDefault();
        isAnimating.current = true;
        setActiveIndex(prev => prev - 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, isContentVisible, openModal, viewedProducts]);

  // Navigation functions
  const goToNext = () => {
    if (!viewedProducts.includes(activeIndex)) return;
    if (activeIndex < projects.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  // Smooth fade animation variants
  const fadeVariants:Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  // Get current project data based on language
  const project = projects[activeIndex];
  const currentProjectName = isRTL ? project.nameAr : project.name;
  const currentProjectDesc = isRTL ? project.shortDescriptionAr : project.shortDescription;
  const currentProjectStatus = isRTL ? project.statusAr : project.status;
  const currentProjectTags = isRTL ? project.tagsAr : project.tags;
  const Icon = project.icon;

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
    <section ref={sectionRef} className={`min-h-screen ${bgColor} ${textColor}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`pt-8 max-w-3xl ${isRTL ? 'mr-4 sm:mr-6 md:mr-12 ml-0' : 'ml-4 sm:ml-6 md:ml-12'}`}
      >
        <motion.div
          className={`inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic cursor-pointer">
            {currentContent.badge}
          </span>
        </motion.div>

        <motion.h1
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight ${textColor} leading-tight ${isRTL ? 'text-right' : ''}`}
        >
          {isRTL ? (
            <>
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {currentContent.headingHighlight}
              </span>
            </>
          ) : (
            <>
              {currentContent.heading}{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {currentContent.headingHighlight}
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          className={`mt-3 text-xs sm:text-sm md:text-base ${subTextColor} leading-relaxed font-light max-w-xl ${isRTL ? 'text-right' : ''}`}
        >
          {currentContent.description}
        </motion.p>

        {/* FIXED: Gradient line - HIDE in Arabic mode, SHOW in English mode */}
        {!isRTL && (
          <motion.div className={`mt-4 ${isRTL ? 'flex justify-end' : ''}`}>
            <div className="w-14 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
          </motion.div>
        )}
      </motion.div>

      {/* MAIN CONTENT - Sticky Section */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT CONTENT */}
            <div 
              ref={leftContentRef}
              className="space-y-5 md:space-y-6 lg:space-y-8"
            >
              {/* Mobile Card - With fade animation */}
              <div className="lg:hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={project.id}
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`${cardBg} backdrop-blur-sm rounded-2xl overflow-hidden border ${cardBorder}`}
                  >
                    <div className="relative w-full bg-black/20 rounded-t-2xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={currentProjectName}
                        className="w-full h-auto object-contain rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-2xl" />
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <span className={`inline-block px-3 py-1 text-xs rounded-full ${statusBg} ${statusText}`}>
                        {currentProjectStatus}
                      </span>

                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Icon className={`${iconColor} w-6 h-6 flex-shrink-0`} />
                        <h2 className={`text-xl sm:text-2xl font-bold break-words leading-tight ${textColor} ${isRTL ? 'text-right' : ''}`}>
                          {currentProjectName}
                        </h2>
                      </div>

                      <p className={`${descColor} text-sm leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                        {currentProjectDesc}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                        {currentProjectTags.map((tag, i) => (
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
                        {currentContent.requestDemo}
                      </button>

                      {/* Mobile Navigation Buttons */}
                      <div className={`flex gap-3 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={goToPrev}
                          disabled={activeIndex === 0}
                          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                            activeIndex === 0 
                              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                              : `bg-white/10 hover:bg-white/20 ${textColor}`
                          }`}
                        >
                          <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          <span className="text-sm font-medium">{currentContent.previous}</span>
                        </button>
                        
                        <button
                          onClick={goToNext}
                          disabled={!viewedProducts.includes(activeIndex) || activeIndex === projects.length - 1}
                          className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                            !viewedProducts.includes(activeIndex) || activeIndex === projects.length - 1
                              ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                              : `bg-gradient-to-r ${buttonGradient} text-white`
                          }`}
                        >
                          <span className="text-sm font-medium">{currentContent.next}</span>
                          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block space-y-6 md:space-y-8">
                <motion.div
                  key={`status-${project.id}`}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className={`px-3 py-1.5 text-xs sm:text-sm rounded-full ${tagBg} border ${tagBorder} w-fit cursor-pointer hover:bg-white/20 transition-all duration-300 ${tagText}`}>
                    {currentProjectStatus}
                  </span>
                </motion.div>

                <motion.div
                  key={`title-${project.id}`}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                  className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Icon className={`${iconColor} w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0`} />
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold break-words leading-tight ${textColor}`}>
                    {currentProjectName}
                  </h2>
                </motion.div>

                <motion.p
                  key={`desc-${project.id}`}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className={`${descColor} text-base sm:text-lg md:text-xl leading-relaxed ${isRTL ? 'text-right' : ''}`}
                >
                  {currentProjectDesc}
                </motion.p>

                <motion.div
                  key={`tags-${project.id}`}
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                  className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}
                >
                  {currentProjectTags.map((tag, i) => (
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
                  initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                >
                  <button
                    onClick={() => setOpenModal(true)}
                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r ${buttonGradient} hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-base sm:text-lg font-medium text-white`}
                  >
                    {currentContent.requestDemo}
                  </button>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT - Desktop only image */}
            <div 
              ref={rightContentRef}
              className="hidden lg:flex items-center justify-center"
            >
              <div className={`w-full mx-auto ${
                project.name === "Neezamiya" ? 'max-w-lg' : 'max-w-lg'
              }`}>
                <img
                  src={project.image}
                  alt={currentProjectName}
                  className="rounded-2xl w-full h-auto object-contain max-h-[70vh]"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          style={{ zIndex: 9999 }}
        >
          <div className={`${modalBg} p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto relative`}>
            <h2 className={`text-2xl sm:text-3xl font-bold sticky top-0 ${modalBg} py-2 z-10 ${modalText} ${isRTL ? 'text-right' : ''}`}>
              {currentContent.modalTitle}
            </h2>

            <input
              name="name"
              placeholder={currentContent.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500 ${isRTL ? 'text-right' : ''}`}
            />

            <input
              name="companyName"
              placeholder={currentContent.companyPlaceholder}
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500 ${isRTL ? 'text-right' : ''}`}
            />

            <input
              name="productInterest"
              placeholder={currentContent.productPlaceholder}
              value={formData.productInterest}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500 ${isRTL ? 'text-right' : ''}`}
            />

            <textarea
              name="useCase"
              placeholder={currentContent.useCasePlaceholder}
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg resize-vertical placeholder:text-gray-500 ${isRTL ? 'text-right' : ''}`}
            />

            <input
              name="contactNumber"
              placeholder={currentContent.contactPlaceholder}
              value={formData.contactNumber}
              onChange={handleChange}
              className={`w-full p-3 sm:p-4 rounded-lg ${inputBg} border ${inputBorder} ${inputText} focus:outline-none focus:border-blue-500 transition-colors text-base sm:text-lg placeholder:text-gray-500 ${isRTL ? 'text-right' : ''}`}
            />

            <button 
              onClick={handleSubmit}
              className={`w-full py-3 sm:py-4 bg-gradient-to-r ${buttonGradient} rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-[1.02] font-medium text-base sm:text-lg text-white`}
            >
              {currentContent.submit}
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className={`text-sm sm:text-base ${subTextColor} text-center w-full hover:${textColor} transition-colors cursor-pointer pt-2`}
            >
              {currentContent.close}
            </button>
          </div>
        </div>
      )}

    </section>
  );
}