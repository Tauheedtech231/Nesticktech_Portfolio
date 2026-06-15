/* eslint-disable react-hooks/set-state-in-effect */
// app/contact/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Sparkles,
  MessageSquare,
  Users,
  Globe,
  ArrowRight,
  Calendar,
  Star,
  Shield,
  Building2
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isRTL = language === 'ar';

  // Content translations
  const content = {
    en: {
      badge: 'Get in Touch',
      heading: 'Contact',
      headingHighlight: 'Us',
      description: 'Have a project in mind? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      getStarted: 'Get Started',
      callNow: 'Call Now',
      sendMessage: 'Send us a Message',
      formDesc: 'Fill out the form below and we\'ll get back to you shortly.',
      fullName: 'Full Name *',
      email: 'Email Address *',
      phone: 'Phone Number',
      subject: 'Subject *',
      yourMessage: 'Your Message *',
      fullNamePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: 'Enter your phone number',
      messagePlaceholder: 'Tell us about your project or inquiry...',
      sending: 'Sending...',
      sendButton: 'Send Message',
      successMessage: 'Message sent successfully! We\'ll get back to you soon.',
      errorMessage: 'Something went wrong. Please try again.',
      selectSubject: 'Select a subject',
      generalInquiry: 'General Inquiry',
      projectDiscussion: 'Project Discussion',
      support: 'Support',
      partnership: 'Partnership',
      other: 'Other',
      whyContact: 'Why Contact Us?',
      meetExperts: 'Meet Our Experts',
      ourLocation: 'Our Location',
      viewOnMaps: 'View on Maps',
      locationDesc: 'Located in the heart of Johar Town, easy access from main boulevard.',
      emailUs: 'Email Us',
      emailDesc: 'We\'ll respond within 24 hours',
      callPakistan: 'Call Us (Pakistan)',
      callKSA: 'Call Us (KSA)',
      visitUs: 'Visit Us',
      pakistan: 'Pakistan',
      responseTime: 'Fast Response Time',
      confidential: '100% Confidential',
      freeConsultation: 'Free Consultation',
      enterpriseReady: 'Enterprise Ready',
    },
    ar: {
      badge: 'تواصل معنا',
      heading: 'اتصل',
      headingHighlight: 'بنا',
      description: 'هل لديك مشروع في ذهنك؟ نحن نحب أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.',
      getStarted: 'ابدأ الآن',
      callNow: 'اتصل الآن',
      sendMessage: 'أرسل لنا رسالة',
      formDesc: 'املأ النموذج أدناه وسنعاود الاتصال بك قريباً.',
      fullName: 'الاسم الكامل *',
      email: 'البريد الإلكتروني *',
      phone: 'رقم الهاتف',
      subject: 'الموضوع *',
      yourMessage: 'رسالتك *',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'example@domain.com',
      phonePlaceholder: '+92 300 1234567',
      messagePlaceholder: 'أخبرنا عن مشروعك أو استفسارك...',
      sending: 'جاري الإرسال...',
      sendButton: 'إرسال الرسالة',
      successMessage: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      selectSubject: 'اختر موضوعاً',
      generalInquiry: 'استفسار عام',
      projectDiscussion: 'مناقشة مشروع',
      support: 'الدعم الفني',
      partnership: 'شراكة',
      other: 'أخرى',
      whyContact: 'لماذا تتواصل معنا؟',
      meetExperts: 'تعرف على خبرائنا',
      ourLocation: 'موقعنا',
      viewOnMaps: 'عرض على الخريطة',
      locationDesc: 'يقع في قلب جوهر تاون، مع سهولة الوصول من الجادة الرئيسية.',
      emailUs: 'راسلنا',
      emailDesc: 'سنرد خلال 24 ساعة',
      callPakistan: 'اتصل بنا (باكستان)',
      callKSA: 'اتصل بنا (السعودية)',
      visitUs: 'زورنا',
      pakistan: 'باكستان',
      responseTime: 'وقت استجابة سريع',
      confidential: 'سري بنسبة 100%',
      freeConsultation: 'استشارة مجانية',
      enterpriseReady: 'جاهز للمؤسسات',
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

  const currentContent = content[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const inputBg = isDark ? 'bg-[#020617]' : 'bg-gray-100';
  const inputBorder = isDark ? 'border-[#1E293B]' : 'border-gray-300';
  const inputTextColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const badgeBg = isDark ? 'bg-[#0F172A]/80' : 'bg-white/80';
  const badgeBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-600';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-600';
  const successBg = isDark ? 'bg-[#22C55E]/10 border-[#22C55E]/20' : 'bg-green-100 border-green-300';
  const successText = isDark ? 'text-[#22C55E]' : 'text-green-700';
  const errorBg = isDark ? 'bg-[#EF4444]/10 border-[#EF4444]/20' : 'bg-red-100 border-red-300';
  const errorText = isDark ? 'text-[#EF4444]' : 'text-red-700';
  const featureBg = isDark ? 'bg-[#020617]' : 'bg-gray-100';
  const featureBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';

  const contactInfo = [
    {
      icon: Mail,
      labelEn: 'Email Us',
      labelAr: 'راسلنا',
      value: 'nesticktech@gmail.com',
      href: 'mailto:nesticktech@gmail.com',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      descriptionEn: 'We\'ll respond within 24 hours',
      descriptionAr: 'سنرد خلال 24 ساعة',
    },
    {
      icon: Phone,
      labelEn: 'Call Us (Pakistan)',
      labelAr: 'اتصل بنا (باكستان)',
      value: '+92 320 8423427',
      href: 'tel:+923208423427',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      descriptionEn: 'Mon-Fri: 9AM - 6PM PKT',
      descriptionAr: 'الإثنين - الجمعة: 9 صباحاً - 6 مساءً',
    },
    {
      icon: Phone,
      labelEn: 'Call Us (KSA)',
      labelAr: 'اتصل بنا (السعودية)',
      value: '+966 50 190 8949',
      href: 'tel:+966501908949',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      descriptionEn: 'Sat-Wed: 9AM - 6PM AST',
      descriptionAr: 'السبت - الأربعاء: 9 صباحاً - 6 مساءً',
    },
    {
      icon: MapPin,
      labelEn: 'Visit Us',
      labelAr: 'زورنا',
      value: 'Johar Town, Lahore',
      href: 'https://maps.google.com/?q=Johar+Town+Lahore',
      gradient: 'from-[#EF4444] to-[#F87171]',
      descriptionEn: 'Pakistan',
      descriptionAr: 'باكستان',
    },
  ];

  const teamMembers = [
    {
      name: 'Abdullah Amin',
      nameAr: 'عبد الله أمين',
      role: 'Senior Business Analyst',
      roleAr: 'محلل أعمال أول',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      expertise: '10+ years experience',
      expertiseAr: 'أكثر من 10 سنوات خبرة',
    },
    {
      name: 'Haris Ashar',
      nameAr: 'حارث عشر',
      role: 'Business Developer',
      roleAr: 'مطور أعمال',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      expertise: 'Strategic planning',
      expertiseAr: 'تخطيط استراتيجي',
    },
    {
      name: 'Tauheed',
      nameAr: 'توحيد',
      role: 'Web Developer',
      roleAr: 'مطور ويب',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      expertise: 'Full-stack expert',
      expertiseAr: 'خبير ',
    },
  ];

  const features = [
    { icon: Star, textEn: 'Fast Response Time', textAr: 'وقت استجابة سريع', color: '#6366F1' },
    { icon: Shield, textEn: '100% Confidential', textAr: 'سري بنسبة 100%', color: '#22C55E' },
    { icon: Calendar, textEn: 'Free Consultation', textAr: 'استشارة مجانية', color: '#F59E0B' },
    { icon: Building2, textEn: 'Enterprise Ready', textAr: 'جاهز للمؤسسات', color: '#EF4444' },
  ];

  const subjectOptions = [
    { en: 'General Inquiry', ar: 'استفسار عام' },
    { en: 'Project Discussion', ar: 'مناقشة مشروع' },
    { en: 'Support', ar: 'الدعم الفني' },
    { en: 'Partnership', ar: 'شراكة' },
    { en: 'Other', ar: 'أخرى' },
  ];

  const getSubjectOptions = () => isRTL ? subjectOptions.map(opt => opt.ar) : subjectOptions.map(opt => opt.en);

  // Animation variants
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
      },
    },
  };

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

  const fromLeftVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const fromRightVariants: Variants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const getInfoLabel = (info: typeof contactInfo[0]) => isRTL ? info.labelAr : info.labelEn;
  const getInfoDesc = (info: typeof contactInfo[0]) => isRTL ? info.descriptionAr : info.descriptionEn;
  const getFeatureText = (feature: typeof features[0]) => isRTL ? feature.textAr : feature.textEn;
  const getMemberName = (member: typeof teamMembers[0]) => isRTL ? member.nameAr : member.name;
  const getMemberRole = (member: typeof teamMembers[0]) => isRTL ? member.roleAr : member.role;
  const getMemberExpertise = (member: typeof teamMembers[0]) => isRTL ? member.expertiseAr : member.expertise;

  return (
    <main className={`min-h-screen ${bgColor} pt-20 lg:pt-24 overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          >
            <source src="/contact.mp4" type="video/mp4" />
          </video>
          <div className={`absolute inset-0 bg-gradient-to-b from-${isDark ? '[#020617]/80' : 'gray-900/80'} via-${isDark ? '[#020617]/60' : 'gray-900/60'} to-${isDark ? '[#020617]' : 'gray-900'}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeBg} backdrop-blur-sm border ${badgeBorder} mb-6 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className={`text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic`}>
                {currentContent.badge}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-5xl lg:text-5xl font-bold font-serif tracking-tight text-white mb-4"
            >
              {currentContent.heading}{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {currentContent.headingHighlight}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
            >
              {currentContent.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`mt-8 flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Link
                href="#contact-form"
                className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                {currentContent.getStarted}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                href="tel:+923208423427"
                className={`px-6 py-3 ${cardBg} border ${cardBorder} ${textColor} font-semibold font-sans tracking-wide rounded-lg hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 flex items-center gap-2 cursor-pointer`}
              >
                <Phone className="w-4 h-4" />
                {currentContent.callNow}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100/30'} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-10 w-72 h-72 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100/30'} rounded-full blur-3xl`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${isDark ? 'bg-[#22C55E]/5' : 'bg-green-100/20'} rounded-full blur-3xl`} />
      </div>

      {/* Grid pattern overlay */}
      <div className={`fixed inset-0 bg-[url('/grid-pattern.svg')] ${isDark ? 'opacity-5' : 'opacity-10'} pointer-events-none`} />

      <div id="contact-form" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 lg:mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                <Link
                  href={info.href}
                  className={`relative block ${cardBg} border ${cardBorder} rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-sm font-medium font-sans tracking-wide ${subTextColor} mb-1`}>{getInfoLabel(info)}</h3>
                  <p className={`text-base lg:text-lg ${textColor} font-semibold font-sans tracking-wide mb-1`}>{info.value}</p>
                  <p className={`text-xs ${subTextColor} font-light tracking-wide`}>{getInfoDesc(info)}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Contact Form */}
          <motion.div
            variants={fromLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-xl opacity-20" />
            <div className={`relative ${cardBg} border ${cardBorder} rounded-2xl p-6 lg:p-8`}>
              <h2 className={`text-2xl font-bold font-serif tracking-tight ${textColor} mb-2 ${isRTL ? 'text-right' : ''}`}>{currentContent.sendMessage}</h2>
              <p className={`text-sm ${subTextColor} font-light tracking-wide mb-6 ${isRTL ? 'text-right' : ''}`}>{currentContent.formDesc}</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.fullName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.fullNamePlaceholder}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.emailPlaceholder}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.phonePlaceholder}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide cursor-pointer ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="">{currentContent.selectSubject}</option>
                    {getSubjectOptions().map((subject, idx) => (
                      <option key={idx} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.yourMessage}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 resize-none font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.messagePlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {currentContent.sending}
                    </>
                  ) : (
                    <>
                      {currentContent.sendButton}
                      <Send className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </>
                  )}
                </motion.button>

                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 ${successBg} rounded-lg ${successText} ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-light tracking-wide">{currentContent.successMessage}</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 ${errorBg} rounded-lg ${errorText} ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-light tracking-wide">{currentContent.errorMessage}</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column - Info & Team */}
          <motion.div
            variants={fromRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl p-6`}>
              <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor} mb-4 ${isRTL ? 'text-right' : ''}`}>{currentContent.whyContact}</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${featureBg} border ${featureBorder} cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <span className={`text-xs ${textColor} font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>{getFeatureText(feature)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Meet the Team */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl p-6`}>
              <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="w-5 h-5 text-[#6366F1]" />
                <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor}`}>{currentContent.meetExperts}</h3>
              </div>
              
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className={`flex items-center gap-3 group hover:${featureBg} p-2 rounded-lg transition-all duration-300 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#6366F1] transition-all duration-300 flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`} />
                      <Image
                        src={member.image}
                        alt={getMemberName(member)}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold font-sans tracking-wide ${textColor} group-hover:text-[#6366F1] transition-colors ${isRTL ? 'text-right' : ''}`}>
                        {getMemberName(member)}
                      </p>
                      <p className={`text-xs ${subTextColor} font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>{getMemberRole(member)}</p>
                      <p className="text-xs text-[#6366F1] mt-0.5 font-light tracking-wide">{getMemberExpertise(member)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl p-6 overflow-hidden`}>
              <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-5 h-5 text-[#6366F1]" />
                <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor}`}>{currentContent.ourLocation}</h3>
              </div>
              
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2070&auto=format&fit=crop"
                  alt="Johar Town Lahore"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${isDark ? '[#020617]' : 'gray-900'} to-transparent`} />
              </div>
              
              <p className={`text-sm ${textColor} font-semibold font-sans tracking-wide mb-1 ${isRTL ? 'text-right' : ''}`}>
  {isRTL ? 'جوهر تاون، لاهور' : 'Johar Town, Lahore'}
</p>
              <p className={`text-xs ${subTextColor} font-light tracking-wide leading-relaxed mb-3 ${isRTL ? 'text-right' : ''}`}>
                {currentContent.locationDesc}
              </p>
              
              <Link 
                href="https://maps.google.com/?q=Johar+Town+Lahore" 
                target="_blank"
                className={`inline-flex items-center gap-2 text-sm text-[#6366F1] font-medium font-sans tracking-wide hover:gap-3 transition-all duration-300 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span>{currentContent.viewOnMaps}</span>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;