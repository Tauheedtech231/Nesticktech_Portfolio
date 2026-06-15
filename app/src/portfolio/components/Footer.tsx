/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Footer.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Heart,
  Briefcase,
  ShoppingBag,
  Rocket,
  Code,
  Shield,
  Sparkles
} from 'lucide-react';

// Map icon names to components
const iconMap: Record<string, any> = {
  Github: Github,
  Linkedin: Linkedin,
  Instagram: Instagram,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin
};

interface Contact {
  id: number;
  type: 'phone' | 'email' | 'location';
  value: string;
  url: string | null;
  display_order: number;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_name: string;
  color: string;
  display_order: number;
}

// Shimmer Component
const FooterShimmer = ({ isDark }: { isDark: boolean }) => {
  return (
    <footer className={`relative ${isDark ? 'bg-[#020617] border-[#1E293B]' : 'bg-gray-50 border-gray-200'} border-t py-12`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`lg:col-span-${i === 1 ? 4 : i === 2 ? 3 : i === 3 ? 3 : 2} h-64 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-xl`} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  // HARDCODED CEO MESSAGE with Arabic translation
  const ceoMessage = {
    en: {
      text: "We believe in building technology that empowers businesses and transforms ideas into reality. Our mission is to deliver excellence through innovation and dedication.",
      name: "Mr. Hamza Hassan",
      title: "CEO of Nestick Tech"
    },
    ar: {
      text: "نؤمن ببناء التكنولوجيا التي تمكن الأعمال وتحول الأفكار إلى واقع. مهمتنا هي تقديم التميز من خلال الابتكار والتفاني.",
      name: "السيد حمزة حسن",
      title: "الرئيس التنفيذي لشركة نستيك تك"
    }
  };

  // HARDCODED SERVICES with Arabic translations
  const services = [
    { nameEn: 'Web Development', nameAr: 'تطوير المواقع', href: '/services' },
    { nameEn: 'Mobile App Development', nameAr: 'تطوير تطبيقات الجوال', href: '/services' },
    { nameEn: 'AI/ML Solutions', nameAr: 'حلول الذكاء الاصطناعي', href: '/services' },
    { nameEn: 'IT & Cybersecurity', nameAr: 'تكنولوجيا المعلومات والأمن السيبراني', href: '/services' },
    { nameEn: 'E-commerce Solutions', nameAr: 'حلول التجارة الإلكترونية', href: '/services' },
    { nameEn: 'Business Consulting', nameAr: 'الاستشارات التجارية', href: '/services' },
  ];

  // HARDCODED PRODUCTS with Arabic translations
  const products = [
    { nameEn: 'Neezamiya (Education ERP)', nameAr: 'نظام نيزامية (نظام إدارة التعليم)', href: '/products' },
    { nameEn: 'Advance POS System', nameAr: 'نظام نقاط البيع المتقدم', href: '/products' },
    { nameEn: 'MarX (Marketing Suite)', nameAr: 'ماركس (حزمة التسويق)', href: '/products' },
    { nameEn: 'Build N (Construction)', nameAr: 'بناء N (إدارة المقاولات)', href: '/products' },
  ];

  // HARDCODED SECTION TITLES with Arabic translations
  const sectionTitles = {
    en: {
      ourServices: 'Our Services',
      ourProducts: 'Our Products',
      connect: 'Connect',
      builtBy: 'Built By Tauheed',
      getInTouch: 'Get in Touch',
      rights: 'All rights reserved.'
    },
    ar: {
      ourServices: 'خدماتنا',
      ourProducts: 'منتجاتنا',
      connect: 'تواصل معنا',
      builtBy: 'تم التطوير بواسطة Tauheed',
      getInTouch: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة.'
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

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
        setSocialLinks(data.social);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter out Twitter from social links
  const filteredSocialLinks = socialLinks.filter(link => link.platform !== 'Twitter');

  // Get icon component for contact type
  const getContactIcon = (type: string) => {
    switch(type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'location': return MapPin;
      default: return MapPin;
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 8,
        mass: 0.4,
      },
    },
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const borderColor = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]/50' : 'bg-white/80';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-500';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-500';
  
  const currentSectionTitles = sectionTitles[language];
  const currentCeoMessage = ceoMessage[language];
  
  if (loading) {
    return <FooterShimmer isDark={isDark} />;
  }

  return (
    <footer className={`relative ${bgColor} border-t ${borderColor} overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100'} rounded-full blur-3xl opacity-50`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100'} rounded-full blur-3xl opacity-50`} />
      </div>

      {/* Grid pattern overlay - only for dark mode */}
      {isDark && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-6">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {/* Company Info - Logo and HARDCODED CEO Message */}
          <motion.div variants={itemVariants} className={`lg:col-span-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {/* Logo */}
            <Link href="/" className={`inline-block group mb-4 cursor-pointer w-full ${isRTL ? 'flex justify-end' : 'flex justify-center'}`}>
              <div className="flex items-center justify-center">
                <div className={`relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 duration-300`}>
                  <Image
                    src="/nesticklogo.jpg"
                    alt={isRTL ? "شعار نستيك تك" : "Nestick Tech Logo"}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
            
            {/* HARDCODED CEO Message - No API, fully bilingual */}
            <div className={`mb-4 p-4 ${cardBg} rounded-xl border ${cardBorder}`}>
              <p className={`${subTextColor} text-xs font-light tracking-wide italic leading-relaxed mb-2 ${isRTL ? 'text-right' : ''}`}>
                &quot;{currentCeoMessage.text}&quot;
              </p>
              <p className={`${textColor} text-xs font-semibold font-sans tracking-wide mb-1 ${isRTL ? 'text-right' : ''}`}>— {currentCeoMessage.name}</p>
              <p className={`text-[#6366F1] text-[10px] font-medium font-sans tracking-wide ${isRTL ? 'text-right' : ''}`}>{currentCeoMessage.title}</p>
            </div>
          </motion.div>

          {/* Services Links - HARDCODED with Arabic */}
          <motion.div variants={itemVariants} className={`lg:col-span-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Code className="w-4 h-4 text-[#6366F1]" />
              <h3 className={`${textColor} font-semibold font-sans tracking-wide text-base`}>
                {currentSectionTitles.ourServices}
              </h3>
            </div>
            <ul className={`space-y-1.5 ${isRTL ? 'pr-0' : ''}`}>
              {services.map((service) => (
                <li key={service.nameEn}>
                  <Link
                    href={service.href}
                    className={`${subTextColor} hover:text-[#6366F1] text-xs font-light tracking-wide transition-colors duration-200 inline-flex items-center gap-1 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <ArrowRight className={`w-2.5 h-2.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 ${isRTL ? 'rotate-180' : ''}`} />
                    {isRTL ? service.nameAr : service.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links - HARDCODED with Arabic */}
          <motion.div variants={itemVariants} className={`lg:col-span-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ShoppingBag className="w-4 h-4 text-[#22C55E]" />
              <h3 className={`${textColor} font-semibold font-sans tracking-wide text-base`}>
                {currentSectionTitles.ourProducts}
              </h3>
            </div>
            <ul className={`space-y-1.5 ${isRTL ? 'pr-0' : ''}`}>
              {products.map((product) => (
                <li key={product.nameEn}>
                  <Link
                    href={product.href}
                    className={`${subTextColor} hover:text-[#6366F1] text-xs font-light tracking-wide transition-colors duration-200 inline-flex items-center gap-1 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <ArrowRight className={`w-2.5 h-2.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 ${isRTL ? 'rotate-180' : ''}`} />
                    {isRTL ? product.nameAr : product.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect - API data with Arabic support */}
          <motion.div variants={itemVariants} className={`lg:col-span-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <h3 className={`${textColor} font-semibold font-sans tracking-wide text-base`}>
                {currentSectionTitles.connect}
              </h3>
            </div>
            
            {/* Social Links - from API */}
            <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'justify-end' : ''}`}>
              {filteredSocialLinks.map((social) => {
                const Icon = iconMap[social.icon_name] || Github;
                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg ${isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-gray-200'} border flex items-center justify-center ${subTextColor} hover:text-[${social.color}] hover:border-[#6366F1] transition-all duration-200 group cursor-pointer`}
                    aria-label={social.platform}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
            
            {/* Contact Info - from API */}
            {/* <div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
              {contacts.map((contact) => {
                const Icon = getContactIcon(contact.type);
                return (
                  <Link
                    key={contact.id}
                    href={contact.url || '#'}
                    target={contact.type === 'location' ? "_blank" : undefined}
                    className={`${subTextColor} hover:text-[#6366F1] transition-colors duration-200 group cursor-pointer flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-light tracking-wide">{contact.value}</span>
                  </Link>
                );
              })}
            </div> */}
            {/* Hardcoded Contact Info */}
<div className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>

  <a
    href="mailto:nesticktech@gmail.com"
    className={`${subTextColor} hover:text-[#6366F1] transition-colors duration-200 group cursor-pointer flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
  >
    <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
    <span
      className="text-xs font-light tracking-wide"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {isRTL
        ? 'نستيك تك آت جيميل دوت كوم'
        : 'nesticktech@gmail.com'}
    </span>
  </a>

  <a
    href="mailto:info@nesticktech.com"
    className={`${subTextColor} hover:text-[#6366F1] transition-colors duration-200 group cursor-pointer flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
  >
    <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
    <span
      className="text-xs font-light tracking-wide"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {isRTL
        ? 'إنفو آت نستيك تك دوت كوم'
        : 'info@nesticktech.com'}
    </span>
  </a>

  <div
    className={`${subTextColor} flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
  >
    <MapPin className="w-3.5 h-3.5" />
    <span className="text-xs font-light tracking-wide">
      {isRTL
        ? 'جوهر تاون، لاهور، باكستان'
        : 'Johar Town, Lahore, Pakistan'}
    </span>
  </div>

  <div
    className={`${subTextColor} flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
  >
    <MapPin className="w-3.5 h-3.5" />
    <span className="text-xs font-light tracking-wide">
      {isRTL
        ? 'منفوحة، الرياض، المملكة العربية السعودية'
        : 'Manfuha, Riyadh, Saudi Arabia'}
    </span>
  </div>

</div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar - HARDCODED with Arabic */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={`mt-10 pt-4 border-t ${borderColor}`}
        >
          <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} justify-between items-center gap-3`}>
            <p className={`${subTextColor} text-xs font-light tracking-wide text-center md:text-left ${isRTL ? 'md:text-right' : ''}`}>
              © {currentYear} Nestick Tech. {currentSectionTitles.rights}
            </p>
            <p className={`${subTextColor} text-xs font-light tracking-wide flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {currentSectionTitles.builtBy}
            </p>
            <Link 
              href="/contact" 
              className={`text-[#6366F1] text-xs font-medium tracking-wide hover:underline transition-colors cursor-pointer ${isRTL ? 'text-right' : ''}`}
            >
              {currentSectionTitles.getInTouch}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;