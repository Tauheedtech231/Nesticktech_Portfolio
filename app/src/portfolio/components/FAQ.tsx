/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
// components/FAQ.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HelpCircle, Mail, Phone, Send, Sparkles, ArrowRight, MessageCircle, Clock, Award, Users, Plus, Minus, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  display_order?: number;
}

// HARDCODED FAQ DATA
const hardcodedFaqs: FAQItem[] = [
  {
    id: 1,
    question: "What services does Nestick Tech offer?",
    answer: "Nestick Tech offers a wide range of digital services including web development, mobile app development, AI solutions, e-commerce platforms, IT & cybersecurity, API integration, and complete business guidance. We provide end-to-end digital solutions tailored to your business needs."
  },
  {
    id: 2,
    question: "How long does it take to build a website or application?",
    answer: "Project timelines vary depending on complexity and requirements. A basic website can take 2-4 weeks, while complex web applications or e-commerce platforms may take 8-12 weeks. We work closely with clients to provide realistic timelines and regular updates throughout the development process."
  },
  {
    id: 3,
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, absolutely! We offer comprehensive maintenance and support packages for all our projects. This includes security updates, bug fixes, performance optimization, and technical support. You can choose from monthly or yearly maintenance plans based on your needs."
  },
  {
    id: 4,
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. Each project is unique, so we provide customized quotes based on your specific requirements. Contact us for a free consultation and detailed proposal tailored to your budget and needs."
  }
];

// FAQ Shimmer Component
const FAQShimmer = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="mb-3 w-full animate-pulse">
          <div className={`${isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
            <div className="w-full px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-64`} />
              </div>
              <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const phoneNumber = "923193236529";
  const formattedPhoneNumber = `+${phoneNumber}`;

  const isRTL = language === 'ar';

  // Arabic translations for FAQ
  const arabicFaqs: FAQItem[] = [
    {
      id: 1,
      question: "ما هي الخدمات التي تقدمها شركة نستيك تك؟",
      answer: "تقدم شركة نستيك تك مجموعة واسعة من الخدمات الرقمية بما في ذلك تطوير الويب وتطوير تطبيقات الهاتف المحمول وحلول الذكاء الاصطناعي ومنصات التجارة الإلكترونية وتكنولوجيا المعلومات والأمن السيبراني وتكامل واجهات برمجة التطبيقات والتوجيه التجاري الكامل. نحن نقدم حلولاً رقمية شاملة مصممة خصيصاً لاحتياجات عملك."
    },
    {
      id: 2,
      question: "كم من الوقت يستغرق بناء موقع ويب أو تطبيق؟",
      answer: "تختلف الجداول الزمنية للمشروع حسب التعقيد والمتطلبات. يمكن أن يستغرق الموقع الأساسي من 2 إلى 4 أسابيع، بينما قد تستغرق تطبيقات الويب المعقدة أو منصات التجارة الإلكترونية من 8 إلى 12 أسبوعاً. نحن نعمل عن كثب مع العملاء لتقديم جداول زمنية واقعية وتحديثات منتظمة طوال عملية التطوير."
    },
    {
      id: 3,
      question: "هل تقدمون دعماً وصيانة مستمرة؟",
      answer: "نعم بالتأكيد! نحن نقدم حزم صيانة ودعم شاملة لجميع مشاريعنا. يتضمن ذلك التحديثات الأمنية وإصلاح الأخطاء وتحسين الأداء والدعم الفني. يمكنك الاختيار من بين خطط الصيانة الشهرية أو السنوية حسب احتياجاتك."
    },
    {
      id: 4,
      question: "ما هو نموذج التسعير الخاص بكم؟",
      answer: "نحن نقدم نماذج تسعير مرنة تشمل مشاريع الأسعار الثابتة والأسعار بالساعة والدفعات الشهرية. كل مشروع فريد من نوعه، لذلك نقدم عروض أسعار مخصصة بناءً على متطلباتك الخاصة. اتصل بنا للحصول على استشارة مجانية وعرض تفصيلي مصمم حسب ميزانيتك واحتياجاتك."
    }
  ];

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

  // Set hardcoded FAQ data based on language
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const currentFaqs = isRTL ? arabicFaqs : hardcodedFaqs;
      setFaqData(currentFaqs);
      if (currentFaqs.length > 0) {
        setOpenItems([currentFaqs[0].id]);
      }
      setLoading(false);
    }, 100);
  }, [isRTL]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 8,
        mass: 0.4,
        duration: 0.3,
      },
    },
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const borderColor = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-500';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-500';
  const badgeBg = isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-50';
  const badgeBorder = isDark ? 'border-[#6366F1]/20' : 'border-indigo-200';
  const badgeText = isDark ? 'text-[#6366F1]' : 'text-indigo-600';
  const overlayGradient = isDark 
    ? 'from-[#020617]/90 via-[#020617]/80 to-[#0F172A]/90'
    : 'from-gray-900/90 via-gray-900/80 to-gray-800/90';

  // Static content for section header
  const sectionContent = {
    en: {
      badge: 'FAQ',
      heading: 'Frequently Asked',
      headingHighlight: 'Questions',
      description: 'Find answers to common questions about our services and process.',
      stillHaveTitle: 'Want to Talk to Us?',
      stillHaveDesc: "Can't find what you're looking for? Our team is ready to assist you.",
      helpBadge: "WE'RE HERE TO HELP",
    },
    ar: {
      badge: 'الأسئلة الشائعة',
      heading: 'الأسئلة',
      headingHighlight: 'الشائعة',
      description: 'ابحث عن إجابات للأسئلة الشائعة حول خدماتنا وعملياتنا.',
      stillHaveTitle: 'هل تريد التحدث معنا؟',
      stillHaveDesc: 'لا تجد ما تبحث عنه؟ فريقنا جاهز لمساعدتك.',
      helpBadge: 'نحن هنا للمساعدة',
    }
  };

  const currentSectionContent = sectionContent[language];

  const contactOptions = [
    {
      id: 1,
      icon: Mail,
      titleEn: "Email Us",
      titleAr: "راسلنا بالبريد",
      descriptionEn: "Get a response within 24 hours",
      descriptionAr: "احصل على رد خلال 24 ساعة",
      action: "/contact",
      linkTextEn: "Send Message",
      linkTextAr: "إرسال رسالة",
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        statsEn: "24h Response",
        statsAr: "رد خلال 24 ساعة",
        icon: Clock,
      },
      backInfo: {
        email: "nesticktech@gmail.com",
        support: "support@nesticktech.com",
      },
    },
    {
      id: 2,
      icon: Phone,
      titleEn: "Call Us",
      titleAr: "اتصل بنا",
      descriptionEn: "Mon-Fri, 9AM - 6PM",
      descriptionAr: "الإثنين - الجمعة، 9 صباحاً - 6 مساءً",
      action: `tel:${formattedPhoneNumber}`,
      linkTextEn: formattedPhoneNumber,
      linkTextAr: formattedPhoneNumber,
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        statsEn: "Available Now",
        statsAr: "متاح الآن",
        icon: Award,
      },
      backInfo: {
        primary: formattedPhoneNumber,
        whatsappEn: "Click to call",
        whatsappAr: "انقر للاتصال",
      },
    },
    {
      id: 3,
      icon: Users,
      titleEn: "Schedule Meeting",
      titleAr: "جدولة اجتماع",
      descriptionEn: "Book a consultation call",
      descriptionAr: "احجز مكالمة استشارية",
      action: "/contact",
      linkTextEn: "Book Now",
      linkTextAr: "احجز الآن",
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        statsEn: "Free Consultation",
        statsAr: "استشارة مجانية",
        icon: Sparkles,
      },
      backInfo: {
        durationEn: "30 min session",
        durationAr: "جلسة 30 دقيقة",
        availabilityEn: "Flexible timing",
        availabilityAr: "مواعيد مرنة",
      },
    },
  ];

  // Show shimmer while loading
  if (loading) {
    return (
      <section className={`relative py-16 lg:py-20 ${bgColor} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 lg:mb-12 text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${badgeBg} border ${badgeBorder} rounded-full mb-4`}>
              <div className={`w-4 h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
              <div className={`w-16 h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            </div>
            <div className={`h-8 w-80 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-3`} />
            <div className={`h-5 w-96 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            <div className="mt-4">
              <div className={`w-16 h-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            </div>
          </div>
          <FAQShimmer isDark={isDark} />
        </div>
      </section>
    );
  }

  return (
    <section className={`relative py-16 lg:py-20 ${bgColor} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100'} rounded-full blur-3xl opacity-40`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100'} rounded-full blur-3xl opacity-40`} />
      </div>

      {/* Grid pattern overlay - only for dark mode */}
      {isDark && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ x: isRTL ? 10 : -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className={`max-w-3xl mb-10 lg:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${badgeBg} border ${badgeBorder} rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <HelpCircle className="w-4 h-4 text-[#6366F1]" />
            <span className={`text-sm font-medium font-sans tracking-wide ${badgeText} italic`}>
              {currentSectionContent.badge}
            </span>
          </div>
          
          <h2 className={`text-2xl md:text-3xl font-bold font-serif tracking-tight ${textColor} mb-3 ${isRTL ? 'text-right' : ''}`}>
            {currentSectionContent.heading}{' '}
            <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              {currentSectionContent.headingHighlight}
            </span>
          </h2>
          
          <p className={`text-base md:text-lg ${subTextColor} max-w-2xl font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>
            {currentSectionContent.description}
          </p>
          
          {/* FIXED: Blue gradient line - HIDE in Arabic mode, SHOW in English mode */}
          {!isRTL && (
            <div className={`mt-4 ${isRTL ? 'flex justify-end' : ''}`}>
              <div className={`w-16 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`} />
            </div>
          )}
        </motion.div>

        {/* FAQ Items - Hardcoded */}
        {faqData.length === 0 ? (
          <div className="text-center py-12">
            <p className={subTextColor}>No FAQs available at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-3xl mx-auto"
          >
            {faqData.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="mb-3 w-full"
              >
                <div
                  className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden transition-all duration-200 w-full ${
                    openItems.includes(faq.id) ? `shadow-md shadow-[#6366F1]/10 ${isDark ? 'border-[#6366F1]/30' : 'border-indigo-300'}` : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className={`flex items-center gap-3 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`w-6 h-6 rounded-full ${isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-100'} flex items-center justify-center text-[#6366F1] text-xs font-bold flex-shrink-0`}>
                        {faq.id}
                      </span>
                      <span className={`${textColor} text-sm lg:text-base font-medium font-sans tracking-wide group-hover:text-[#6366F1] transition-colors duration-200 ${isRTL ? 'text-right' : ''}`}>
                        {faq.question}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 ml-2 w-6 h-6 rounded-full ${isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-100'} flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-all duration-200`}
                    >
                      {openItems.includes(faq.id) ? (
                        <Minus className="w-3.5 h-3.5 text-[#6366F1]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#6366F1]" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-5 pb-4 pt-2 border-t ${borderColor}`}>
                          <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-6 flex-shrink-0" />
                            <p className={`${subTextColor} text-xs lg:text-sm leading-relaxed font-light tracking-wide flex-1 ${isRTL ? 'text-right' : ''}`}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full mt-12 lg:mt-16 relative"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
          </div>

          {/* Content Container */}
          <div className="relative px-6 py-8 lg:px-10 lg:py-12">
            <div className={`text-center mb-8 lg:mb-10 ${isRTL ? 'rtl' : ''}`}>
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-sm border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
                  {currentSectionContent.helpBadge}
                </span>
              </div>
              
              <h3 className={`text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent mb-3`}>
                {currentSectionContent.stillHaveTitle}
              </h3>
              
              <p className={`text-[#94A3B8] text-sm lg:text-base max-w-md mx-auto font-light tracking-wide`}>
                {currentSectionContent.stillHaveDesc}
              </p>
            </div>

            {/* Contact Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                const title = isRTL ? option.titleAr : option.titleEn;
                const description = isRTL ? option.descriptionAr : option.descriptionEn;
                const linkText = isRTL ? option.linkTextAr : option.linkTextEn;
                const statsText = isRTL ? option.frontInfo.statsAr : option.frontInfo.statsEn;
                const whatsappText = option.id === 2 && (isRTL ? option.backInfo.whatsappAr : option.backInfo.whatsappEn);
                const durationText = option.id === 3 && (isRTL ? option.backInfo.durationAr : option.backInfo.durationEn);
                const availabilityText = option.id === 3 && (isRTL ? option.backInfo.availabilityAr : option.backInfo.availabilityEn);
                
                return (
                  <div
                    key={option.id}
                    className="relative min-h-[280px] perspective-1000 cursor-pointer group"
                    onMouseEnter={() => setFlippedCard(option.id)}
                    onMouseLeave={() => setFlippedCard(null)}
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                        flippedCard === option.id ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front Side */}
                      <div className="absolute w-full h-full backface-hidden">
                        <Link href={option.action} className="block h-full">
                          <div className={`h-full ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-md border border-[#1E293B] rounded-[2.5rem] p-6 text-center transition-all duration-300 ${option.bgHover} hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/10 cursor-pointer flex flex-col items-center justify-center`}>
                            <div className="relative mb-4">
                              <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                              <div className={`relative w-20 h-20 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center shadow-lg`}>
                                <Icon className="w-10 h-10 text-white" />
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-white font-medium font-sans tracking-wide text-lg">
                                {title}
                              </p>
                              <p className="text-white/70 text-sm mt-1 font-light tracking-wide">
                                {description}
                              </p>
                              <p className="text-[#94A3B8] text-sm mt-2 font-light tracking-wide">
                                {isRTL ? 'مرر لرؤية التفاصيل' : 'Hover to see details'}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Back Side */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div className={`h-full bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-[2.5rem] p-6 text-center flex flex-col items-center justify-center border border-white/20 shadow-xl`}>
                          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          
                          <h4 className="text-white font-bold font-sans tracking-wide text-xl mb-3">
                            {title}
                          </h4>
                          
                          {option.id === 1 && (
                            <div className="space-y-2">
                              <p className="text-white/90 text-sm font-light tracking-wide">
                                {option.backInfo.email}
                              </p>
                              <p className="text-white/80 text-xs font-light tracking-wide">
                                {option.backInfo.support}
                              </p>
                            </div>
                          )}
                          
                          {option.id === 2 && (
                            <div className="space-y-2">
                              <p className="text-white text-lg font-mono font-bold">
                                {option.backInfo.primary}
                              </p>
                              <p className="text-white/80 text-xs flex items-center gap-1 justify-center font-light tracking-wide">
                                <MessageCircle className="w-3 h-3" />
                                {whatsappText}
                              </p>
                              <p className="text-white/70 text-xs mt-2 font-light tracking-wide">
                                {isRTL ? 'متاح على واتساب' : 'Available on WhatsApp'}
                              </p>
                            </div>
                          )}
                          
                          {option.id === 3 && (
                            <div className="space-y-2">
                              <p className="text-white/90 text-sm font-light tracking-wide">
                                {durationText}
                              </p>
                              <p className="text-white/80 text-xs font-light tracking-wide">
                                {availabilityText}
                              </p>
                            </div>
                          )}
                          
                          <Link href={option.action}>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 cursor-pointer">
                              <span className="text-white text-sm font-medium font-sans tracking-wide">
                                {linkText}
                              </span>
                              <ArrowRight className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default FAQ;