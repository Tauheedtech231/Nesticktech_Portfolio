/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  // Content translations
  const content = {
    en: {
      mission: "Mission",
      vision: "Vision",
      missionDesc: "Create immersive digital experiences with modern UI and innovation.",
      visionDesc: "Lead futuristic web experiences with AI-driven and interactive design.",
      missionPoints: [
        "Modern & scalable web solutions",
        "High-performance user experiences",
        "Creative UI with smooth animations"
      ],
      visionPoints: [
        "AI-powered digital innovation",
        "Interactive and futuristic interfaces",
        "Global-quality product experiences"
      ]
    },
    ar: {
      mission: "الرسالة",
      vision: "الرؤية",
      missionDesc: "نصنع تجارب رقمية غامرة بواجهات مستخدم حديثة وابتكار.",
      visionDesc: "نقود تجارب الويب المستقبلية بتصاميم تفاعلية ومدعومة بالذكاء الاصطناعي.",
      missionPoints: [
        "حلول ويب حديثة وقابلة للتطوير",
        "تجارب مستخدم عالية الأداء",
        "واجهات إبداعية مع رسوم متحركة سلسة"
      ],
      visionPoints: [
        "ابتكار رقمي مدعوم بالذكاء الاصطناعي",
        "واجهات تفاعلية ومستقبلية",
        "تجارب منتج بجودة عالمية"
      ]
    }
  };

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

  const isDark = theme === 'dark';
  const currentContent = content[language];
  
  // Card backgrounds
  const cardBg = isDark 
    ? 'bg-gradient-to-br from-[#0F172A]/90 to-[#0F172A]/70'
    : 'bg-white/90 backdrop-blur-sm';
  
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const listTextColor = isDark ? 'text-[#CBD5E1]' : 'text-gray-700';
  
  const gradientText = isDark 
    ? 'from-[#F8FAFC] to-[#94A3B8]'
    : 'from-gray-900 to-gray-600';
  
  const hoverCardBg = isDark
    ? 'hover:from-[#0F172A] hover:to-[#1E1B4B]/30'
    : 'hover:bg-white';
  
  const hoverBorder = isDark ? 'hover:border-[#6366F1]/50' : 'hover:border-indigo-400/50';
  const hoverShadow = isDark ? 'hover:shadow-[#6366F1]/10' : 'hover:shadow-indigo-200/50';
  const glowColor = isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-200/30';
  const glowHoverColor = isDark ? 'group-hover:bg-[#6366F1]/20' : 'group-hover:bg-indigo-300/40';

  return (
    <section className={`relative w-full min-h-screen overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -top-46 md:-top-54"
        style={{ 
          transform: "scaleY(-1)",
        }}
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-black/10" />
      )}
      {!isDark && (
        <div className="absolute inset-0 bg-black-10" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 pt-32 md:pt-0">
        
        {/* Mission Vision Cards */}
        <div className={`mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-4xl w-full mx-auto px-4 ${isRTL ? 'rtl' : ''}`}>
          
          {/* Mission Card */}
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`
              relative
              overflow-hidden
              pt-12 md:pt-20
              px-4 md:px-6
              pb-6 md:pb-8
              w-full
              max-w-[320px] md:max-w-[380px]
              mx-auto
              rounded-[32px] md:rounded-[40px]
              border ${cardBorder}
              ${cardBg}
              backdrop-blur-md
              ${hoverBorder}
              hover:shadow-2xl
              ${hoverShadow}
              ${hoverCardBg}
              transition-all
              duration-500
              cursor-pointer
              will-change-transform
              group
            `}
          >
            {/* Animated gradient border effect */}
            <div className={`absolute inset-0 rounded-[32px] md:rounded-[40px] p-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/0 to-transparent group-hover:via-[#6366F1]/30 transition-all duration-700`} />
            
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 ${glowColor} blur-3xl rounded-full ${glowHoverColor} transition-all duration-500`} />

            <h3 className={`relative text-xl md:text-2xl font-bold tracking-wide ${textColor} mb-2 md:mb-4 text-center bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>
              {currentContent.mission}
            </h3>

            <p className={`relative text-[12px] md:text-sm ${subTextColor} font-light tracking-wide leading-relaxed mb-4 md:mb-6 text-center px-2 ${isRTL ? 'text-right' : ''}`}>
              {currentContent.missionDesc}
            </p>

            <ul className={`relative space-y-2 md:space-y-3 text-[12px] md:text-sm ${listTextColor}`}>
              {currentContent.missionPoints.map((point, idx) => (
                <li key={idx} className={`flex items-center gap-2 md:gap-3 group/item ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                  <span className={`text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`
              relative
              overflow-hidden
              pt-12 md:pt-20
              px-4 md:px-6
              pb-6 md:pb-8
              w-full
              max-w-[320px] md:max-w-[380px]
              mx-auto
              rounded-[32px] md:rounded-[40px]
              border ${cardBorder}
              ${cardBg}
              backdrop-blur-md
              ${hoverBorder}
              hover:shadow-2xl
              ${hoverShadow}
              ${hoverCardBg}
              transition-all
              duration-500
              cursor-pointer
              will-change-transform
              group
            `}
          >
            <div className={`absolute inset-0 rounded-[32px] md:rounded-[40px] p-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/0 to-transparent group-hover:via-[#6366F1]/30 transition-all duration-700`} />
            
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 ${glowColor} blur-3xl rounded-full ${glowHoverColor} transition-all duration-500`} />

            <h3 className={`relative text-xl md:text-2xl font-bold tracking-wide ${textColor} mb-2 md:mb-4 text-center bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}>
              {currentContent.vision}
            </h3>

            <p className={`relative text-[12px] md:text-sm ${subTextColor} font-light tracking-wide leading-relaxed mb-4 md:mb-6 text-center px-2 ${isRTL ? 'text-right' : ''}`}>
              {currentContent.visionDesc}
            </p>

            <ul className={`relative space-y-2 md:space-y-3 text-[12px] md:text-sm ${listTextColor}`}>
              {currentContent.visionPoints.map((point, idx) => (
                <li key={idx} className={`flex items-center gap-2 md:gap-3 group/item ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
                  <span className={`text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @media (max-width: 768px) {
          video {
            transform: translateY(-120px);
          }
        }
      `}</style>
    </section>
  );
}