/* eslint-disable react-hooks/set-state-in-effect */
// app/get-quote/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Code,
  Rocket,
  ArrowRight,
  FileText,
  Building2,
  Mail,
  Phone,
  User,
  MessageSquare,
  Star,
  Shield,
  Zap,
  ChevronRight,
  TrendingUp,
  Settings,
  GitBranch,
  Target,
  Lock,
  BarChart,
  Layers
} from 'lucide-react';
import Image from 'next/image';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  requirements: string;
}

interface ServicePackage {
  id: number;
  name: string;
  nameAr: string;
  price: string;
  priceAr: string;
  features: string[];
  featuresAr: string[];
  popular: boolean;
  gradient: string;
}

const GetQuotePage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    requirements: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const sectionRef = useRef(null);

  const isRTL = language === 'ar';

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

  // Content translations
  const content = {
    en: {
      badge: 'Get a Quote',
      heading: 'Get Your',
      headingHighlight: 'Custom Quote',
      headingSuffix: '',
      description: 'Tell us about your project and we\'ll provide a tailored quote within 24 hours. No obligation, just expert advice.',
      choosePackage: 'Choose a Package That Fits Your Needs',
      mostPopular: 'Most Popular',
      selected: 'Selected',
      projectDetails: 'Project Details',
      formDesc: 'Fill out the form below to get your custom quote',
      fullName: 'Full Name *',
      email: 'Email Address *',
      phone: 'Phone Number *',
      companyName: 'Company Name',
      projectType: 'Project Type *',
      budget: 'Budget Range *',
      timeline: 'Expected Timeline *',
      projectDescription: 'Project Description *',
      additionalRequirements: 'Additional Requirements (Optional)',
      projectDescPlaceholder: 'Describe your project, goals, and requirements...',
      requirementsPlaceholder: 'Any specific technologies, integrations, or features you need?',
      submitButton: 'Get Your Quote',
      submitting: 'Submitting...',
      successMessage: 'Quote request submitted! We\'ll get back to you within 24 hours.',
      errorMessage: 'Something went wrong. Please try again.',
      whyQuote: 'Why Get a Quote?',
      quickResponse: 'Quick turnaround time - 24 hour response',
      noObligation: 'No obligation, completely free',
      expertConsultation: 'Expert consultation included',
      detailedBreakdown: 'Detailed project breakdown',
      needAssistance: 'Need Assistance?',
      teamReady: 'Our team is ready to help you',
      contactSupport: 'Contact Support',
      ourProcess: 'Our Process',
      submitRequest: 'Submit Request',
      reviewAnalysis: 'Review & Analysis',
      customQuote: 'Custom Quote',
      consultationCall: 'Consultation Call',
      submitDesc: 'Fill out the quote form with your project details',
      reviewDesc: 'Our experts review your requirements',
      quoteDesc: 'Receive detailed quote within 24 hours',
      consultationDesc: 'Discuss details and next steps',
      trustedBy: 'Trusted by 200+ businesses',
      satisfactionRate: '98% client satisfaction rate',
      selectOption: 'Select',
      fullNamePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: 'Enter your phone number',
      companyPlaceholder: 'Enter your company name',
    },
    ar: {
      badge: 'احصل على عرض سعر',
      heading: 'احصل على',
      headingHighlight: 'عرض سعر مخصص',
      headingSuffix: '',
      description: 'أخبرنا عن مشروعك وسنقدم لك عرض سعر مخصص خلال 24 ساعة. بدون التزام، مجرد استشارة خبراء.',
      choosePackage: 'اختر الباقة التي تناسب احتياجاتك',
      mostPopular: 'الأكثر طلباً',
      selected: 'تم الاختيار',
      projectDetails: 'تفاصيل المشروع',
      formDesc: 'املأ النموذج أدناه للحصول على عرض السعر المخصص',
      fullName: 'الاسم الكامل *',
      email: 'البريد الإلكتروني *',
      phone: 'رقم الهاتف *',
      companyName: 'اسم الشركة',
      projectType: 'نوع المشروع *',
      budget: 'النطاق السعري *',
      timeline: 'الجدول الزمني المتوقع *',
      projectDescription: 'وصف المشروع *',
      additionalRequirements: 'متطلبات إضافية (اختياري)',
      projectDescPlaceholder: 'صف مشروعك وأهدافك ومتطلباتك...',
      requirementsPlaceholder: 'أي تقنيات أو تكاملات أو ميزات محددة تحتاجها؟',
      submitButton: 'احصل على عرض السعر',
      submitting: 'جاري الإرسال...',
      successMessage: 'تم إرسال طلب عرض السعر! سنتواصل معك خلال 24 ساعة.',
      errorMessage: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      whyQuote: 'لماذا تحصل على عرض سعر؟',
      quickResponse: 'وقت استجابة سريع - رد خلال 24 ساعة',
      noObligation: 'بدون التزام، مجاني بالكامل',
      expertConsultation: 'استشارة خبراء مشمولة',
      detailedBreakdown: 'تحليل مفصل للمشروع',
      needAssistance: 'بحاجة إلى مساعدة؟',
      teamReady: 'فريقنا جاهز لمساعدتك',
      contactSupport: 'اتصل بالدعم',
      ourProcess: 'عمليتنا',
      submitRequest: 'تقديم الطلب',
      reviewAnalysis: 'المراجعة والتحليل',
      customQuote: 'عرض السعر المخصص',
      consultationCall: 'مكالمة استشارية',
      submitDesc: 'املأ نموذج عرض السعر بتفاصيل مشروعك',
      reviewDesc: 'خبراؤنا يراجعون متطلباتك',
      quoteDesc: 'احصل على عرض سعر مفصل خلال 24 ساعة',
      consultationDesc: 'ناقش التفاصيل والخطوات التالية',
      trustedBy: 'موثوق من قبل أكثر من 200 شركة',
      satisfactionRate: 'معدل رضا العملاء 98%',
      selectOption: 'اختر',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'example@domain.com',
      phonePlaceholder: '+92 300 1234567',
      companyPlaceholder: 'أدخل اسم شركتك',
    }
  };

  const projectTypes = isRTL ? [
    'تطوير المواقع',
    'تطوير تطبيقات الجوال',
    'حلول الذكاء الاصطناعي',
    'تطوير التجارة الإلكترونية',
    'برمجيات مخصصة',
    'تصميم واجهات المستخدم',
    'التسويق الرقمي',
    'استشارات تقنية المعلومات',
    'أخرى'
  ] : [
    'Web Development',
    'Mobile App Development',
    'AI/ML Solutions',
    'E-commerce Development',
    'Custom Software',
    'UI/UX Design',
    'Digital Marketing',
    'IT Consulting',
    'Other'
  ];

  const budgetRanges = isRTL ? [
    '١,٠٠٠ - ٥,٠٠٠ دولار',
    '٥,٠٠٠ - ١٠,٠٠٠ دولار',
    '١٠,٠٠٠ - ٢٥,٠٠٠ دولار',
    '٢٥,٠٠٠ - ٥٠,٠٠٠ دولار',
    '٥٠,٠٠٠+ دولار',
    'غير متأكد بعد'
  ] : [
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure yet'
  ];

  const timelines = isRTL ? [
    'أقل من شهر',
    '١-٣ أشهر',
    '٣-٦ أشهر',
    '٦+ أشهر',
    'غير متأكد'
  ] : [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months',
    'Not sure'
  ];

 const servicePackages: ServicePackage[] = [
  {
    id: 1,
    name: 'Basic Package',
    nameAr: 'الباقة الأساسية',
    price: 'Starting from $1,000',
    priceAr: 'ابتداءً من 1,000 دولار',
    features: [
      'Basic Website or Mobile App',
      'Responsive Design',
      'Basic UI/UX Design',
      '3 Months Technical Support',
      'Basic SEO Setup',
      '1 Revision Round'
    ],
    featuresAr: [
      'موقع إلكتروني أو تطبيق جوال أساسي',
      'تصميم متجاوب مع جميع الأجهزة',
      'تصميم واجهة وتجربة مستخدم أساسي',
      'دعم فني لمدة 3 أشهر',
      'إعداد أساسي لمحركات البحث (SEO)',
      'جولة مراجعة واحدة'
    ],
    popular: false,
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
  },

  {
    id: 2,
    name: 'Professional Package',
    nameAr: 'الباقة الاحترافية',
    price: 'Starting from $5,000',
    priceAr: 'ابتداءً من 5,000 دولار',
    features: [
      'Advanced Website or Mobile App',
      'Custom UI/UX Design',
      '6 Months Technical Support',
      'Advanced SEO Optimization',
      '3 Revision Rounds',
      'Analytics Integration',
      'Priority Support'
    ],
    featuresAr: [
      'موقع إلكتروني أو تطبيق متقدم',
      'تصميم واجهة وتجربة مستخدم مخصص',
      'دعم فني لمدة 6 أشهر',
      'تحسين متقدم لمحركات البحث (SEO)',
      '3 جولات مراجعة',
      'تكامل أدوات التحليلات',
      'دعم ذو أولوية'
    ],
    popular: true,
    gradient: 'from-[#22C55E] to-[#86EFAC]',
  },

  {
    id: 3,
    name: 'Enterprise Package',
    nameAr: 'باقة المؤسسات',
    price: 'Starting from $15,000',
    priceAr: 'ابتداءً من 15,000 دولار',
    features: [
      'Enterprise-Grade Solution',
      'Custom System Architecture',
      '12 Months Technical Support',
      'Complete SEO & Marketing Suite',
      'Unlimited Revisions',
      '24/7 Dedicated Support',
      'Scalable Infrastructure',
      'Security Audit & Testing'
    ],
    featuresAr: [
      'حلول احترافية على مستوى المؤسسات',
      'بنية نظام مخصصة',
      'دعم فني لمدة 12 شهراً',
      'حزمة متكاملة للتسويق وتحسين محركات البحث',
      'مراجعات غير محدودة',
      'دعم مخصص على مدار الساعة',
      'بنية تحتية قابلة للتوسع',
      'تدقيق واختبار أمني شامل'
    ],
    popular: false,
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
  },
];

  const currentContent = content[language];

  const getPackageName = (pkg: ServicePackage) => isRTL ? pkg.nameAr : pkg.name;
  const getPackagePrice = (pkg: ServicePackage) => isRTL ? pkg.priceAr : pkg.price;
  const getPackageFeatures = (pkg: ServicePackage) => isRTL ? pkg.featuresAr : pkg.features;

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
  const badgeBg = isDark ? 'bg-[#0F172A]' : 'bg-gray-100';
  const badgeBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-600';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-600';
  const ringOffsetColor = isDark ? 'ring-offset-[#020617]' : 'ring-offset-gray-50';
  const successBg = isDark ? 'bg-[#22C55E]/10 border-[#22C55E]/20' : 'bg-green-100 border-green-300';
  const successText = isDark ? 'text-[#22C55E]' : 'text-green-700';
  const errorBg = isDark ? 'bg-[#EF4444]/10 border-[#EF4444]/20' : 'bg-red-100 border-red-300';
  const errorText = isDark ? 'text-[#EF4444]' : 'text-red-700';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePackageSelect = (id: number) => {
    setSelectedPackage(id);
    const packageName = servicePackages.find(p => p.id === id);
    if (packageName) {
      setFormData(prev => ({ ...prev, projectType: isRTL ? packageName.nameAr : packageName.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        projectType: '',
        budget: '',
        timeline: '',
        projectDescription: '',
        requirements: '',
      });
      setSelectedPackage(null);
      
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

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

  return (
    <main className={`min-h-screen ${bgColor} pt-20 lg:pt-24 overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100/30'} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-10 w-72 h-72 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100/30'} rounded-full blur-3xl`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${isDark ? 'bg-[#22C55E]/5' : 'bg-green-100/20'} rounded-full blur-3xl`} />
      </div>

      {/* Grid pattern overlay */}
      <div className={`fixed inset-0 bg-[url('/grid-pattern.svg')] ${isDark ? 'opacity-5' : 'opacity-10'}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header Section */}
        <motion.div
          variants={introContainerVariants}
          initial="hidden"
          animate="visible"
          className={`text-center max-w-3xl mx-auto mb-12 lg:mb-16 ${isRTL ? 'rtl' : ''}`}
        >
          <motion.div 
            variants={fromTopVariants}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeBg} border ${badgeBorder} mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span className={`text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic`}>
              {currentContent.badge}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fromTopVariants}
            className={`text-3xl md:text-4xl font-bold font-serif tracking-tight ${textColor} mb-4`}
          >
            {isRTL ? (
              <>
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  {currentContent.headingHighlight}
                </span>
              </>
            ) : (
              <>
                {currentContent.heading}{' '}
                <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                  {currentContent.headingHighlight}
                </span>
              </>
            )}
          </motion.h1>
          
          <motion.p 
            variants={fromTopVariants}
            className={`text-base lg:text-lg ${subTextColor} max-w-2xl mx-auto leading-relaxed font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
          >
            {currentContent.description}
          </motion.p>
        </motion.div>

        {/* Packages Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 lg:mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className={`text-2xl font-bold font-serif tracking-tight ${textColor} text-center mb-8 ${isRTL ? 'rtl' : ''}`}
          >
            {currentContent.choosePackage}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id ? `ring-2 ring-[#6366F1] ring-offset-2 ${ringOffsetColor}` : ''
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-xs font-medium font-sans tracking-wide rounded-full">
                      {currentContent.mostPopular}
                    </span>
                  </div>
                )}
                
                <div className={`${cardBg} border ${selectedPackage === pkg.id ? 'border-[#6366F1]' : cardBorder} rounded-2xl p-6 hover:border-[#6366F1]/50 transition-all duration-300 h-full`}>
                  <h3 className={`text-xl font-semibold font-sans tracking-wide ${textColor} mb-2 ${isRTL ? 'text-right' : ''}`}>{getPackageName(pkg)}</h3>
                  {/* FIXED: Price now shows Arabic in RTL mode */}
                  <p className="text-2xl font-bold text-[#6366F1] mb-4">{getPackagePrice(pkg)}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {getPackageFeatures(pkg).map((feature, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-sm font-light tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                        <span className={subTextColor}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`mt-auto pt-4 border-t ${cardBorder} ${selectedPackage === pkg.id ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs text-[#6366F1] font-medium">{currentContent.selected}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Form */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Form Section */}
          <motion.div
            variants={fromLeftVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-xl opacity-20" />
            <div className={`relative ${cardBg} border ${cardBorder} rounded-2xl p-6 lg:p-8`}>
              <h2 className={`text-2xl font-bold font-serif tracking-tight ${textColor} mb-2 ${isRTL ? 'text-right' : ''}`}>{currentContent.projectDetails}</h2>
              <p className={`text-sm ${subTextColor} font-light tracking-wide mb-6 ${isRTL ? 'text-right' : ''}`}>{currentContent.formDesc}</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.fullName}
                  </label>
                  <div className="relative">
                    <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide`}
                      placeholder={currentContent.fullNamePlaceholder}
                    />
                  </div>
                </div>

                {/* Email - FIXED: Arabic placeholder */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.email}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide`}
                    placeholder={
  isRTL
    ? "أدخل بريدك الإلكتروني"
    : "Enter your email"
}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.phone}
                  </label>
                  <div className="relative">
                    <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide`}
                      placeholder={currentContent.phonePlaceholder}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.companyName}
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 font-light tracking-wide`}
                      placeholder={currentContent.companyPlaceholder}
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.projectType}
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer`}
                    >
                      <option value="">{currentContent.selectOption}</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.budget}
                  </label>
                  <div className="relative">
                    <DollarSign className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer`}
                    >
                      <option value="">{currentContent.selectOption}</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.timeline}
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 appearance-none font-light tracking-wide cursor-pointer`}
                    >
                      <option value="">{currentContent.selectOption}</option>
                      {timelines.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.projectDescription}
                  </label>
                  <div className="relative">
                    <FileText className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 w-4 h-4 ${subTextColor}`} />
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 resize-none font-light tracking-wide`}
                      placeholder={currentContent.projectDescPlaceholder}
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.additionalRequirements}
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] transition-all duration-300 resize-none font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.requirementsPlaceholder}
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
                      {currentContent.submitting}
                    </>
                  ) : (
                    <>
                      {currentContent.submitButton}
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

          {/* Right Column - Info & Benefits */}
          <motion.div
            variants={fromRightVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Why Get Quote */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl p-6`}>
              <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor} mb-4 ${isRTL ? 'text-right' : ''}`}>{currentContent.whyQuote}</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: currentContent.quickResponse, color: '#6366F1' },
                  { icon: Shield, text: currentContent.noObligation, color: '#22C55E' },
                  { icon: Users, text: currentContent.expertConsultation, color: '#F59E0B' },
                  { icon: Code, text: currentContent.detailedBreakdown, color: '#EF4444' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 ${inputBg} rounded-lg border ${cardBorder} cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <span className={`text-sm ${textColor} font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What's Included - Expanded Content */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl overflow-hidden group cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300`}>
              <Link href="/contact" className="block">
                <div className="relative w-full h-80 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                    <source src="/contact.mp4" type="video/mp4" />
                  </video>
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-${isDark ? '[#020617]' : 'gray-900'} via-${isDark ? '[#020617]/30' : 'gray-900/30'} to-transparent`} />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-4 shadow-xl">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-bold font-serif tracking-tight mb-2">{currentContent.needAssistance}</h3>
                    <p className="text-[#94A3B8] text-sm font-light tracking-wide mb-4">{currentContent.teamReady}</p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300">
                      <span>{currentContent.contactSupport}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Our Process */}
            <div className={`${cardBg} border ${cardBorder} rounded-2xl p-6`}>
              <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor} mb-4 ${isRTL ? 'text-right' : ''}`}>{currentContent.ourProcess}</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: currentContent.submitRequest, desc: currentContent.submitDesc },
                  { step: '2', title: currentContent.reviewAnalysis, desc: currentContent.reviewDesc },
                  { step: '3', title: currentContent.customQuote, desc: currentContent.quoteDesc },
                  { step: '4', title: currentContent.consultationCall, desc: currentContent.consultationDesc },
                ].map((item, index) => (
                  <div key={index} className={`flex gap-3 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold font-sans tracking-wide ${textColor} ${isRTL ? 'text-right' : ''}`}>{item.title}</h4>
                      <p className={`text-xs ${subTextColor} font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className={`bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/20 rounded-2xl p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300`}>
              <div className={`flex items-center justify-center gap-1 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <p className={`text-sm ${textColor} font-semibold font-sans tracking-wide mb-1 ${isRTL ? 'text-right text-center' : ''}`}>{currentContent.trustedBy}</p>
              <p className={`text-xs ${subTextColor} font-light tracking-wide ${isRTL ? 'text-right text-center' : ''}`}>{currentContent.satisfactionRate}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default GetQuotePage;