/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr: string;
  image: string;
  text: string;
  textAr: string;
  rating: number;
  is_active: boolean;
};

// HARDCODED TESTIMONIALS DATA (as per database table)
const hardcodedTestimonials: Testimonial[] = [
  {
    id: 6,
    name: "Muhammad Imran",
    nameAr: "محمد عمران",
    role: "Owner",
    roleAr: "مالك",
    company: "Sheikh brothers (Whole sellers)",
    companyAr: "شيخ براذرز",
    image: "",
    text: "Sir honestly the system you design is exactly what we are looking for, and it's working smooth and now it take 10 days but now all the worker are able to use it easily. Great service brother, Inshallah i'll recomend you other",
    textAr: "بصراحة النظام الذي صممتموه هو بالضبط ما كنا نبحث عنه، ويعمل بسلاسة. كان يستغرق 10 أيام ولكن الآن جميع العمال قادرون على استخدامه بسهولة. خدمة رائعة يا أخي، إن شاء الله سأوصي بكم للآخرين.",
    rating: 5,
    is_active: true
  },
  {
    id: 7,
    name: "Mr Muaaz",
    nameAr: "السيد معاذ",
    role: "CEO",
    roleAr: "الرئيس التنفيذي",
    company: "Fit******",
    companyAr: "فتنس برو",
    image: "",
    text: "Too good you guys are doing very well. (Delivered a wordpress based 3d wordpress site)",
    textAr: "عمل رائع يا شباب. لقد قدموا موقع ووردبريس ثلاثي الأبعاد.",
    rating: 5,
    is_active: true
  },
  {
    id: 8,
    name: "Mr. Sarwar Mehmood",
    nameAr: "السيد سروار محمود",
    role: "Manager",
    roleAr: "مدير",
    company: "****** (educational institute lahore)",
    companyAr: "مؤسسة تعليمية لاهور",
    image: "",
    text: "Sir everthing is working so smooth itni zayada animations ka bad b website ki speed bohat achi ha. Baki Abdullah brother time bs thora zayada laga project deliver hona ma. Lakin site ka interface worth it ha. (Allahamdulllillah, Branding and system deployment complete now working on marketing)",
    textAr: "كل شيء يعمل بسلاسة. على الرغم من كثرة الرسوم المتحركة، سرعة الموقع ممتازة. باقي أن المشروع تأخر قليلاً في التسليم. ولكن واجهة الموقع تستحق العناء. الحمد لله، اكتملت العلامة التجارية ونشر النظام والآن نعمل على التسويق.",
    rating: 5,
    is_active: true
  },
  {
    id: 9,
    name: "Rabia Waseem",
    nameAr: "رابية وسيم",
    role: "Owner and Founder",
    roleAr: "مالكة ومؤسسة",
    company: "****** (Beauty brand)",
    companyAr: "علامة تجارية للتجميل",
    image: "",
    text: "The Shopify store is working perfectly. Speed, design, and mobile responsiveness are all excellent. Your digital marketing service helped us increase engagement and inquiries within a few weeks. Great experience overall. (A sharja based Pakistani beautician started her own beauty brand, Nestick Tech is digital partner of Miss Rabia)",
    textAr: "متجر Shopify يعمل بشكل مثالي. السرعة والتصميم والتوافق مع الجوال ممتازة جميعها. خدمة التسويق الرقمي الخاصة بكم ساعدتنا في زيادة التفاعل والاستفسارات في غضون بضعة أسابيع. تجربة رائعة بشكل عام.",
    rating: 5,
    is_active: true
  },
  {
    id: 10,
    name: "Sir shakir Abbas",
    nameAr: "السيد شاكر عباس",
    role: "Owner",
    roleAr: "مالك",
    company: "******* (Leather jacket export factory)",
    companyAr: "مصنع تصدير الجلود",
    image: "",
    text: "Abdullah beta honestly i work burden was just burring me like i increaded my worker count but still work burden was a lot but after you deployed the system most of the transaction are goes on automatic mode and now i have time to think about how can i expand my factory, honestly i have now this much of time that i can open new branch.",
    textAr: "عبد الله يا بني، بصراحة عبء العمل كان يحرقني. زدت عدد العمال لكن لا يزال عبء العمل كبيراً. ولكن بعد أن قمت بنشر النظام، أصبحت معظم المعاملات تتم بشكل آلي والآن لدي وقت للتفكير في كيفية توسيع مصنعي. بصراحة لدي الآن الكثير من الوقت لدرجة أنني أستطيع فتح فرع جديد.",
    rating: 5,
    is_active: true
  }
];

// Arabic and English static content
const staticContent = {
  en: {
    badge: 'Client Testimonials',
    heading: 'What Our',
    headingHighlight: 'Clients Say',
    description: 'Don\'t just take our word for it — hear from some of our satisfied clients',
    joinText: 'Join',
    satisfiedText: 'satisfied clients who trust Nestick Tech',
    ratedText: 'Rated 4.9/5 on Trustpilot',
    noTestimonials: 'No testimonials available yet. Check back soon!',
  },
  ar: {
    badge: 'شهادات العملاء',
    heading: 'ماذا يقول',
    headingHighlight: 'عملاؤنا',
    description: 'لا تأخذ كلمتنا فقط — استمع إلى بعض عملائنا الراضين',
    joinText: 'انضم إلى',
    satisfiedText: 'عميل راضٍ يثقون في نستيك تك',
    ratedText: 'تم التقييم 4.9/5 على Trustpilot',
    noTestimonials: 'لا توجد شهادات حالياً. تابعنا قريباً!',
  }
};

// Shimmer Card Component
const ShimmerCard = ({ theme, language }: { theme: 'dark' | 'light', language: 'en' | 'ar' }) => {
  const isDark = theme === 'dark';
  const isRTL = language === 'ar';
  
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-6 animate-pulse ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
      <div className="relative w-[280px]">
        <div className={`${isDark ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A]' : 'bg-gradient-to-br from-gray-100 to-gray-50'} p-3 rounded-2xl border ${isDark ? 'border-[#1E293B]' : 'border-gray-200'}`}>
          <div className={`relative h-[280px] w-full overflow-hidden rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="mt-3 text-center">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded w-24 mx-auto mb-2`} />
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-32 mx-auto`} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className={`${isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-gray-200'} border rounded-xl shadow-xl p-5`}>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-8 h-8 rounded-full mb-3`} />
          <div className="space-y-2">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded w-full`} />
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded w-11/12`} />
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded w-10/12`} />
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-3.5 h-3.5 rounded`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileShimmer = ({ theme, language }: { theme: 'dark' | 'light', language: 'en' | 'ar' }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="lg:hidden animate-pulse">
      <div className="max-w-[200px] mx-auto">
        <div className={`${isDark ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A]' : 'bg-gradient-to-br from-gray-100 to-gray-50'} p-3 rounded-2xl border ${isDark ? 'border-[#1E293B]' : 'border-gray-200'}`}>
          <div className={`relative h-[200px] w-full overflow-hidden rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className="mt-2 text-center">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded w-24 mx-auto mb-1`} />
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-32 mx-auto`} />
          </div>
        </div>
      </div>
      <div className={`${isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-gray-200'} border rounded-xl p-4 mt-3`}>
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-7 h-7 rounded-full mb-2`} />
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-full mb-2`} />
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-11/12 mb-2`} />
        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-3 rounded w-10/12`} />
        <div className="flex gap-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-2.5 h-2.5 rounded`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';
  const currentContent = staticContent[language];

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

  // ONLY fetch images from API, text is hardcoded
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        
        if (data.success && data.testimonials.length > 0) {
          // Only update images from API, keep hardcoded text
          const updatedTestimonials = hardcodedTestimonials.map(hardcoded => {
            const apiItem = data.testimonials.find((api: any) => api.id === hardcoded.id);
            return {
              ...hardcoded,
              image: apiItem?.image || "" // Only take image from API
            };
          }).filter(t => t.is_active);
          
          setTestimonials(updatedTestimonials);
        } else {
          // If API fails, show hardcoded data without images
          setTestimonials(hardcodedTestimonials.filter(t => t.is_active));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        // Fallback to hardcoded data without images
        setTestimonials(hardcodedTestimonials.filter(t => t.is_active));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const imageVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    }),
  };

  const textVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-white';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const borderColor = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-500';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-500';
  const badgeBg = isDark ? 'bg-[#0F172A]' : 'bg-gray-100';
  const starActiveColor = 'text-[#F59E0B] fill-[#F59E0B]';
  const starInactiveColor = isDark ? 'text-[#1E293B]' : 'text-gray-300';

  const currentTestimonial = testimonials[active];
  
  const currentName = isRTL ? currentTestimonial?.nameAr : currentTestimonial?.name;
  const currentRole = isRTL ? currentTestimonial?.roleAr : currentTestimonial?.role;
  const currentCompany = isRTL ? currentTestimonial?.companyAr : currentTestimonial?.company;
  const currentText = isRTL ? currentTestimonial?.textAr : currentTestimonial?.text;

  // Show shimmer while loading
  if (loading) {
    return (
      <section className={`w-full py-10 lg:py-12 ${bgColor} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-6 lg:mb-8 ${isRTL ? 'rtl' : ''}`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 ${badgeBg} border ${borderColor} ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-3.5 h-3.5 rounded`} />
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-24 h-3 rounded`} />
            </div>
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-8 w-64 rounded mx-auto mb-2`} />
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} h-4 w-96 rounded mx-auto`} />
            <div className="mt-3 flex justify-center">
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} w-12 h-0.5 rounded`} />
            </div>
          </div>
          <div className="hidden lg:block">
            <ShimmerCard theme={theme} language={language} />
          </div>
          <MobileShimmer theme={theme} language={language} />
        </div>
      </section>
    );
  }

  // Show message if no testimonials
  if (testimonials.length === 0 || !currentTestimonial) {
    return (
      <section className={`w-full lg:py-12 ${bgColor} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isRTL ? 'rtl' : ''}`}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 ${badgeBg} border ${borderColor} ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Quote className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className={`text-xs font-medium font-sans tracking-wide ${subTextColor}`}>
                {currentContent.badge}
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold font-serif tracking-tight ${textColor} mb-2`}>
              {currentContent.heading}{' '}
              <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
                {currentContent.headingHighlight}
              </span>
            </h2>
            <p className={`text-sm ${subTextColor} mt-4`}>
              {currentContent.noTestimonials}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-10 lg:py-12 ${bgColor} overflow-hidden relative`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100'} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-10 w-72 h-72 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100'} rounded-full blur-3xl`} />
      </div>

      {isDark && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`text-center mb-6 lg:mb-8 ${isRTL ? 'rtl' : ''}`}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 ${badgeBg} border ${borderColor} cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Quote className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className={`text-xs font-medium font-sans tracking-wide ${subTextColor}`}>
              {currentContent.badge}
            </span>
          </div>
          
          <h2 className={`text-2xl md:text-3xl font-bold font-serif tracking-tight ${textColor} mb-2`}>
            {currentContent.heading}{' '}
            <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              {currentContent.headingHighlight}
            </span>
          </h2>
          
          <p className={`text-xs md:text-sm ${subTextColor} max-w-2xl mx-auto font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>
            {currentContent.description}
          </p>
          
          <div className="mt-3 flex justify-center">
            <div className={`w-12 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`} />
          </div>
        </motion.div>

        {/* Main Content - Desktop Layout */}
        <div className={`hidden lg:flex flex-row items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative w-[280px] mt-[1rem]">
            <div className={`bg-gradient-to-br ${isDark ? 'from-[#1E293B] to-[#0F172A]' : 'from-gray-100 to-gray-50'} p-3 rounded-2xl border ${borderColor} shadow-xl`}>
              <div className="relative h-[280px] w-full overflow-hidden rounded-xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`image-${active}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    {currentTestimonial.image ? (
                      <Image
                        src={currentTestimonial.image}
                        alt={currentName || ''}
                        fill
                        className="object-cover object-center"
                        sizes="280px"
                        priority
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-4xl font-bold`}>
                        {(currentName || '?').charAt(0)}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-3 text-center">
                <h3 className={`text-sm font-semibold font-sans tracking-wide ${textColor}`}>{currentName}</h3>
                <p className={`text-xs ${subTextColor} font-light tracking-wide`}>{currentRole}, {currentCompany}</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className={`relative ${cardBg} border ${borderColor} rounded-xl shadow-xl p-5`}>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center mb-3 shadow-lg`}>
                <Quote className="w-4 h-4 text-white" />
              </div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={`text-${active}`} custom={direction} variants={textVariants} initial="enter" animate="center" exit="exit">
                  <p className={`text-sm ${textColor} leading-relaxed font-light tracking-wide mb-3 ${isRTL ? 'text-right' : ''}`}>
                    {currentText}
                  </p>
                  <div className={`flex gap-1 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < (currentTestimonial?.rating || 0) ? starActiveColor : starInactiveColor}`} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full mt-3`} />
            </div>

            <div className={`flex items-center justify-between gap-4 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {testimonials.map((t, i) => {
                  const thumbName = isRTL ? t.nameAr : t.name;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                      className={`rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${active === i ? "border-[#6366F1] shadow-lg shadow-[#6366F1]/20" : `${isDark ? 'border-[#1E293B]' : 'border-gray-200'} hover:border-[#6366F1]/50`}`}
                    >
                      <div className="relative w-8 h-8">
                        {t.image ? (
                          <Image src={t.image} alt={thumbName} fill className="object-cover object-center" sizes="32px" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-xs font-bold`}>
                            {thumbName.charAt(0)}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={prevTestimonial} className={`w-8 h-8 rounded-full ${cardBg} border ${borderColor} flex items-center justify-center hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 cursor-pointer group`}>
                  <ChevronLeft className={`w-3.5 h-3.5 ${subTextColor} group-hover:text-[#6366F1] ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={nextTestimonial} className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer group`}>
                  <ChevronRight className={`w-3.5 h-3.5 text-white ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <span className={`text-xs ${subTextColor} font-light tracking-wide`}>{active + 1}/{testimonials.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slider View */}
        <div className="lg:hidden">
          <div className="relative mt-8">
            <div className={`bg-gradient-to-br ${isDark ? 'from-[#1E293B] to-[#0F172A]' : 'from-gray-100 to-gray-50'} p-3 rounded-2xl border ${borderColor} max-w-[200px] mx-auto`}>
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
                {currentTestimonial.image ? (
                  <Image src={currentTestimonial.image} alt={currentName || ''} fill className="object-cover object-center" sizes="200px" priority />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-3xl font-bold`}>
                    {(currentName || '?').charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <h3 className={`text-sm font-semibold font-sans tracking-wide ${textColor}`}>{currentName}</h3>
                <p className={`text-xs ${subTextColor} font-light tracking-wide`}>{currentRole}, {currentCompany}</p>
              </div>
            </div>

            <div className={`${cardBg} border ${borderColor} rounded-xl p-4 mt-4`}>
              <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center mb-2`}>
                <Quote className="w-3 h-3 text-white" />
              </div>
              <p className={`text-xs ${textColor} leading-relaxed font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>{currentText}</p>
              <div className={`flex gap-0.5 mt-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i < (currentTestimonial?.rating || 0) ? starActiveColor : starInactiveColor}`} />
                ))}
              </div>
            </div>

            <div className={`flex items-center justify-between gap-3 mt-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex gap-1.5 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                {testimonials.slice(0, 5).map((t, i) => {
                  const thumbName = isRTL ? t.nameAr : t.name;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                      className={`rounded-lg overflow-hidden border-2 transition ${active === i ? "border-[#6366F1]" : borderColor}`}
                    >
                      <div className="relative w-7 h-7">
                        {t.image ? (
                          <Image src={t.image} alt={thumbName} fill className="object-cover object-center" sizes="28px" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {thumbName.charAt(0)}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
                {testimonials.length > 5 && (
                  <div className={`w-7 h-7 rounded-lg ${cardBg} border ${borderColor} flex items-center justify-center`}>
                    <span className={`text-[10px] ${subTextColor}`}>+{testimonials.length - 5}</span>
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={prevTestimonial} className={`w-7 h-7 rounded-full ${cardBg} border ${borderColor} flex items-center justify-center hover:border-[#6366F1] transition-all`}>
                  <ChevronLeft className={`w-3 h-3 text-[#6366F1] ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={nextTestimonial} className={`w-7 h-7 rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white flex items-center justify-center hover:shadow-lg transition-all`}>
                  <ChevronRight className={`w-3 h-3 text-white ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <span className={`text-xs ${subTextColor} font-light`}>{active + 1}/{testimonials.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`mt-8 lg:mt-6 text-center ${isRTL ? 'rtl' : ''}`}
        >
          <div className={`flex items-center justify-center -space-x-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {testimonials.slice(0, 4).map((t, idx) => {
              const thumbName = isRTL ? t.nameAr : t.name;
              return (
                <div key={idx} className={`relative w-6 h-6 rounded-full border-2 ${isDark ? 'border-[#020617]' : 'border-white'} overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A]' : 'bg-gray-100'} shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300`}>
                  {t.image ? (
                    <Image src={t.image} alt={thumbName} fill className="object-cover object-center" sizes="24px" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-[10px] font-bold`}>
                      {thumbName.charAt(0)}
                    </div>
                  )}
                </div>
              );
            })}
            <div className={`relative w-6 h-6 rounded-full border-2 ${isDark ? 'border-[#020617]' : 'border-white'} bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300`}>
              <span className="text-[8px] font-bold text-white">50+</span>
            </div>
          </div>
          <p className={`text-[10px] ${subTextColor} font-light tracking-wide mt-2`}>
            {currentContent.joinText} <span className="text-[#6366F1] font-semibold">120+</span> {currentContent.satisfiedText}
          </p>
          <div className={`flex items-center justify-center gap-0.5 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <span className={`text-[9px] ${subTextColor} ml-1 font-light tracking-wide`}>{currentContent.ratedText}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}