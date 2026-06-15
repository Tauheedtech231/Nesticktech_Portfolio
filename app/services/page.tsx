/* eslint-disable react-hooks/set-state-in-effect */
// app/services/page.tsx
'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import {
  Globe2,
  Smartphone,
  Apple,
  Briefcase,
  Palette,
  Server,
  ShieldCheck,
  Bot,
  Zap,
  Brain,
  MessageSquare,
  Eye,
  BarChart3,
  Sparkles,
  Shield,
  Network,
  Lock,
  Swords,
  Radar,
  Cloud,
  ShoppingBag,
  Layout,
  CreditCard,
  Package,
  Store,
  TrendingUp,
  Compass,
  LineChart,
  Calculator,
  Users,
  Headphones,
  Search,
  Code2,
  ArrowRight,
  X,
  Send,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  longDescription: string;
  longDescriptionAr: string;
  category: string;
  categoryAr: string;
  technologies: string[];
  technologiesAr: string[];
  gradient: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessDetails: string;
  serviceRequired: string;
  projectDescription: string;
}

// Categories with Arabic translations
const categoriesList = [
  { en: 'All', ar: 'الكل' },
  { en: 'Development', ar: 'التطوير' },
  { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي' },
  { en: 'IT & Cybersecurity', ar: 'تكنولوجيا المعلومات والأمن السيبراني' },
  { en: 'E-commerce Solutions', ar: 'حلول التجارة الإلكترونية' },
  { en: 'Business Guidance', ar: 'التوجيه التجاري' },
];

const ServicesPage = () => {
  const sectionRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const searchRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    businessDetails: '',
    serviceRequired: '',
    projectDescription: '',
  });

  const isRTL = language === 'ar';

  // Content translations
  const content = {
    en: {
      badge: 'Our Services',
      heading: 'Digital',
      headingHighlight: 'Solutions',
      headingSuffix: 'For Modern Business',
      searchPlaceholder: 'Search services by name, description, or technology...',
      showing: 'Showing',
      of: 'of',
      services: 'services',
      noServices: 'No services found',
      noServicesDesc: 'Try adjusting your search or filter to find what you\'re looking for.',
      clearFilters: 'Clear Filters',
      ctaTitle: 'Ready to Transform Your Business?',
      ctaDesc: 'Let\'s discuss how our services can help you achieve your business goals and drive innovation.',
      contactNow: 'Contact Now',
      modalTitle: 'Request Consultation',
      fullName: 'Full Name *',
      emailAddress: 'Email Address *',
      phoneNumber: 'Phone Number *',
      businessDetails: 'Business Details *',
      serviceRequired: 'Service Required *',
      projectDescription: 'Project Description *',
      fullNamePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      phonePlaceholder: 'Enter your phone number',
      businessPlaceholder: 'Company name & industry',
      projectPlaceholder: 'Tell us about your project requirements...',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      submittedTitle: 'Request Submitted!',
      submittedDesc: 'Thank you for your interest. Our team will contact you within 24 hours.',
      learnMore: 'Learn More',
    },
    ar: {
      badge: 'خدماتنا',
      heading: 'الحلول',
      headingHighlight: 'الرقمية',
      headingSuffix: 'للأعمال الحديثة',
      searchPlaceholder: 'ابحث عن الخدمات بالاسم أو الوصف أو التقنية...',
      showing: 'عرض',
      of: 'من',
      services: 'خدمة',
      noServices: 'لا توجد خدمات',
      noServicesDesc: 'حاول تعديل بحثك أو التصفية للعثور على ما تبحث عنه.',
      clearFilters: 'مسح التصفية',
      ctaTitle: 'هل أنت مستعد لتحويل أعمالك؟',
      ctaDesc: 'دعنا نناقش كيف يمكن لخدماتنا مساعدتك في تحقيق أهداف عملك ودفع عجلة الابتكار.',
      contactNow: 'اتصل بنا الآن',
      modalTitle: 'طلب استشارة',
      fullName: 'الاسم الكامل *',
      emailAddress: 'البريد الإلكتروني *',
      phoneNumber: 'رقم الهاتف *',
      businessDetails: 'تفاصيل العمل *',
      serviceRequired: 'الخدمة المطلوبة *',
      projectDescription: 'وصف المشروع *',
      fullNamePlaceholder: 'أدخل اسمك الكامل',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      phonePlaceholder: 'أدخل رقم هاتفك',
      businessPlaceholder: 'اسم الشركة والمجال',
      projectPlaceholder: 'أخبرنا عن متطلبات مشروعك...',
      submit: 'إرسال الطلب',
      submitting: 'جاري الإرسال...',
      submittedTitle: 'تم إرسال الطلب!',
      submittedDesc: 'شكراً لاهتمامك. سيتواصل معك فريقنا خلال 24 ساعة.',
      learnMore: 'اعرف المزيد',
    }
  };

  // Memoized services data with Arabic translations
  const allServices: Service[] = useMemo(() => [
    // Development Services
    {
      id: 1,
      icon: Globe2,
      title: 'Web Development',
      titleAr: 'تطوير الويب',
      description: 'Custom web applications with modern frameworks.',
      descriptionAr: 'تطبيقات ويب مخصصة بأطر عمل حديثة.',
      longDescription: 'We build responsive, high-performance web applications using Next.js, React, and Node.js. Our solutions are scalable, secure, and optimized for search engines.',
      longDescriptionAr: 'نحن نبني تطبيقات ويب سريعة الاستجابة وعالية الأداء باستخدام Next.js و React و Node.js. حلولنا قابلة للتطوير وآمنة ومحسنة لمحركات البحث.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript'],
      technologiesAr: ['نكست.جي إس', 'رياكت', 'نود.جي إس', 'تايپ‌اسكريبت'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 2,
      icon: Smartphone,
      title: 'Mobile App Development',
      titleAr: 'تطوير تطبيقات الجوال',
      description: 'Cross-platform mobile applications.',
      descriptionAr: 'تطبيقات جوال متعددة المنصات.',
      longDescription: 'We develop cross-platform mobile applications for Android and iOS using React Native and Flutter, ensuring smooth performance on all devices.',
      longDescriptionAr: 'نقوم بتطوير تطبيقات جوال متعددة المنصات لنظامي Android و iOS باستخدام React Native و Flutter، مما يضمن أداء سلساً على جميع الأجهزة.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['React Native', 'Flutter', 'Firebase', 'iOS/Android'],
      technologiesAr: ['رياكت نيتيف', 'فلتر', 'فايربيز', 'آي أو إس/أندرويد'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 3,
      icon: Apple,
      title: 'iOS Development',
      titleAr: 'تطوير آي أو إس',
      description: 'Native iOS applications with Swift.',
      descriptionAr: 'تطبيقات آي أو إس أصلية باستخدام سويفت.',
      longDescription: 'Native iOS applications built with Swift and SwiftUI for premium Apple ecosystem experiences with exceptional performance.',
      longDescriptionAr: 'تطبيقات آي أو إس أصلية تم بناؤها باستخدام Swift و SwiftUI لتجارب متميزة في نظام آبل البيئي بأداء استثنائي.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['Swift', 'SwiftUI', 'UIKit', 'iOS'],
      technologiesAr: ['سويفت', 'سويفت يو آي', 'يو آي كيت', 'آي أو إس'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 4,
      icon: Briefcase,
      title: 'Enterprise Software (CRM/ERP)',
      titleAr: 'برامج المؤسسات (CRM/ERP)',
      description: 'Custom CRM and ERP solutions.',
      descriptionAr: 'حلول CRM و ERP مخصصة.',
      longDescription: 'Custom CRM and ERP solutions to streamline business operations, manage clients, optimize workflows, and drive growth.',
      longDescriptionAr: 'حلول CRM و ERP مخصصة لتبسيط العمليات التجارية وإدارة العملاء وتحسين سير العمل ودفع عجلة النمو.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
      technologiesAr: ['رياكت', 'نود.جي إس', 'بوستجري إس كيو إل', 'مونجو دي بي'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 5,
      icon: Palette,
      title: 'UI/UX Design & Prototyping',
      titleAr: 'تصميم واجهات المستخدم والنماذج الأولية',
      description: 'User-centered design solutions.',
      descriptionAr: 'حلول تصميم تركز على المستخدم.',
      longDescription: 'User-centered design solutions with interactive prototypes for seamless digital experiences that delight users.',
      longDescriptionAr: 'حلول تصميم تركز على المستخدم مع نماذج أولية تفاعلية لتجارب رقمية سلسة تسعد المستخدمين.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Testing'],
      technologiesAr: ['فيجما', 'أدوبي إكس دي', 'النماذج الأولية', 'اختبار المستخدم'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 6,
      icon: Server,
      title: 'API Integration & Backend',
      titleAr: 'تكامل API والواجهة الخلفية',
      description: 'Robust backend systems and APIs.',
      descriptionAr: 'أنظمة خلفية قوية وواجهات برمجة تطبيقات.',
      longDescription: 'Robust backend systems and API integrations for scalable, secure, and high-performance applications with seamless data flow.',
      longDescriptionAr: 'أنظمة خلفية قوية وتكاملات API لتطبيقات قابلة للتطوير وآمنة وعالية الأداء مع تدفق بيانات سلس.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['Node.js', 'Python', 'REST API', 'GraphQL'],
      technologiesAr: ['نود.جي إس', 'بايثون', 'نود.جي إس', 'جراف كيو إل'],
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      id: 7,
      icon: ShieldCheck,
      title: 'QA & Testing Services',
      titleAr: 'خدمات ضمان الجودة والاختبار',
      description: 'Comprehensive quality assurance.',
      descriptionAr: 'ضمان جودة شامل.',
      longDescription: 'Comprehensive quality assurance, automated testing, and manual testing for bug-free applications with 100% coverage.',
      longDescriptionAr: 'ضمان جودة شامل واختبار آلي واختبار يدوي لتطبيقات خالية من الأخطاء بتغطية 100%.',
      category: 'Development',
      categoryAr: 'التطوير',
      technologies: ['Selenium', 'Jest', 'Cypress', 'Manual Testing'],
      technologiesAr: ['سيلينيوم', 'جست', 'سايبرس', 'الاختبار اليدوي'],
      gradient: 'from-[#EC489A] to-[#F472B6]',
    },
    
    // AI Solutions
    {
      id: 8,
      icon: Bot,
      title: 'AI Agents',
      titleAr: 'وكلاء الذكاء الاصطناعي',
      description: 'Intelligent autonomous agents.',
      descriptionAr: 'وكلاء أذكياء مستقلون.',
      longDescription: 'Intelligent autonomous agents that automate complex tasks, make decisions, and learn from interactions to improve business processes.',
      longDescriptionAr: 'وكلاء أذكياء مستقلون يقومون بأتمتة المهام المعقدة واتخاذ القرارات والتعلم من التفاعلات لتحسين العمليات التجارية.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['Python', 'LangChain', 'OpenAI', 'AutoGPT'],
      technologiesAr: ['بايثون', 'لانج تشين', 'أوبن إيه آي', 'أوتو جي بي تي'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    {
      id: 9,
      icon: Zap,
      title: 'Complete Automation Solutions',
      titleAr: 'حلول الأتمتة الكاملة',
      description: 'End-to-end business automation.',
      descriptionAr: 'أتمتة الأعمال الشاملة.',
      longDescription: 'End-to-end business automation solutions that streamline workflows, reduce manual effort, and increase operational efficiency.',
      longDescriptionAr: 'حلول أتمتة أعمال شاملة تعمل على تبسيط سير العمل وتقليل الجهد اليدوي وزيادة الكفاءة التشغيلية.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['Python', 'RPA', 'Zapier', 'Custom APIs'],
      technologiesAr: ['بايثون', 'أتمتة العمليات الروبوتية', 'زابير', 'واجهات برمجة تطبيقات مخصصة'],
      gradient: 'from-[#8B5CF6] to-[#6366F1]',
    },
    {
      id: 10,
      icon: Brain,
      title: 'Machine Learning Models',
      titleAr: 'نماذج التعلم الآلي',
      description: 'Predictive & recommendation systems.',
      descriptionAr: 'أنظمة التنبؤ والتوصية.',
      longDescription: 'Predictive analytics and recommendation systems that leverage machine learning to provide actionable insights and personalized experiences.',
      longDescriptionAr: 'تحليلات تنبؤية وأنظمة توصية تستفيد من التعلم الآلي لتوفير رؤى قابلة للتنفيذ وتجارب مخصصة.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'MLflow'],
      technologiesAr: ['تينسرفلو', 'بايتورش', 'سايكيت-ليرن', 'إم إل فلو'],
      gradient: 'from-[#22C55E] to-[#86EFAC]',
    },
    {
      id: 11,
      icon: MessageSquare,
      title: 'AI Chatbots & Virtual Assistants',
      titleAr: 'روبوتات المحادثة والمساعدون الافتراضيون',
      description: 'Intelligent conversation agents.',
      descriptionAr: 'وكلاء محادثة أذكياء.',
      longDescription: 'Intelligent chatbots and virtual assistants that provide 24/7 customer support, answer queries, and automate conversations.',
      longDescriptionAr: 'روبوتات محادثة ومساعدون افتراضيون أذكياء يوفرون دعم العملاء على مدار الساعة والإجابة على الاستفسارات وأتمتة المحادثات.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['OpenAI', 'Dialogflow', 'Rasa', 'LLMs'],
      technologiesAr: ['أوبن إيه آي', 'ديالوغ فلو', 'راسا', 'نماذج اللغة الكبيرة'],
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      id: 12,
      icon: Eye,
      title: 'Computer Vision & NLP',
      titleAr: 'رؤية الكمبيوتر ومعالجة اللغة الطبيعية',
      description: 'Advanced image and text processing.',
      descriptionAr: 'معالجة متقدمة للصور والنصوص.',
      longDescription: 'Advanced computer vision and natural language processing solutions for image recognition, text analysis, and document processing.',
      longDescriptionAr: 'حلول متقدمة لرؤية الكمبيوتر ومعالجة اللغة الطبيعية للتعرف على الصور وتحليل النصوص ومعالجة المستندات.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['OpenCV', 'YOLO', 'Hugging Face', 'Transformers'],
      technologiesAr: ['أوبن سي في', 'يولو', 'هاجينغ فيس', 'ترانسفورمرز'],
      gradient: 'from-[#EF4444] to-[#F87171]',
    },
    {
      id: 13,
      icon: BarChart3,
      title: 'AI Data Analytics & Automation',
      titleAr: 'تحليلات البيانات والأتمتة بالذكاء الاصطناعي',
      description: 'Smart analytics with automation.',
      descriptionAr: 'تحليلات ذكية مع أتمتة.',
      longDescription: 'AI-powered data analytics with automated insights, trend detection, and intelligent reporting for data-driven decisions.',
      longDescriptionAr: 'تحليلات بيانات مدعومة بالذكاء الاصطناعي مع رؤى آلية وكشف الاتجاهات وتقارير ذكية لقرارات مبنية على البيانات.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['Python', 'Pandas', 'Tableau', 'AutoML'],
      technologiesAr: ['بايثون', 'بانداس', 'تابلو', 'أوتو إم إل'],
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      id: 14,
      icon: Sparkles,
      title: 'AI Personalization',
      titleAr: 'التخصيص بالذكاء الاصطناعي',
      description: 'Personalized user experiences.',
      descriptionAr: 'تجارب مستخدم مخصصة.',
      longDescription: 'AI-driven personalization engines that deliver tailored content, product recommendations, and user experiences at scale.',
      longDescriptionAr: 'محركات تخصيص مدعومة بالذكاء الاصطناعي تقدم محتوى مخصص وتوصيات منتجات وتجارب مستخدم على نطاق واسع.',
      category: 'AI Solutions',
      categoryAr: 'حلول الذكاء الاصطناعي',
      technologies: ['Recommender Systems', 'User Analytics', 'A/B Testing'],
      technologiesAr: ['أنظمة التوصية', 'تحليلات المستخدم', 'الاختبار '],
      gradient: 'from-[#EC489A] to-[#F472B6]',
    },
    
    // IT & Cybersecurity
    {
      id: 15,
      icon: Shield,
      title: 'SOC Services',
      titleAr: 'خدمات مركز العمليات الأمنية',
      description: '24/7 security operations center.',
      descriptionAr: 'مركز عمليات أمني على مدار الساعة.',
      longDescription: '24/7 Security Operations Center (SOC) services with real-time threat monitoring, detection, and rapid incident response.',
      longDescriptionAr: 'خدمات مركز العمليات الأمنية (SOC) على مدار الساعة مع مراقبة التهديدات في الوقت الفعلي واكتشافها والاستجابة السريعة للحوادث.',
      category: 'IT & Cybersecurity',
      categoryAr: 'تكنولوجيا المعلومات والأمن السيبراني',
      technologies: ['SIEM', 'EDR', 'Threat Intelligence', 'SOAR'],
      technologiesAr: ['إدارة معلومات وأحداث الأمان', 'كشف والاستجابة للنقاط الطرفية', 'استخبارات التهديدات', 'تنسيق وأتمتة والاستجابة للأمان'],
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
    },
    // ... (remaining services with similar bilingual structure)
  ], []);

  // Get category display name based on language
  const getCategoryDisplay = (categoryEn: string) => {
    const cat = categoriesList.find(c => c.en === categoryEn);
    return isRTL ? cat?.ar : cat?.en;
  };

  // Get current categories for filters
  const categories = useMemo(() => {
    return categoriesList.map(c => ({ value: c.en, label: isRTL ? c.ar : c.en }));
  }, [isRTL]);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const searchTerm = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        (isRTL ? service.titleAr.toLowerCase().includes(searchTerm) : service.title.toLowerCase().includes(searchTerm)) ||
        (isRTL ? service.descriptionAr.toLowerCase().includes(searchTerm) : service.description.toLowerCase().includes(searchTerm)) ||
        (isRTL ? service.longDescriptionAr.toLowerCase().includes(searchTerm) : service.longDescription.toLowerCase().includes(searchTerm)) ||
        (isRTL ? service.technologiesAr.some(tech => tech.toLowerCase().includes(searchTerm)) : service.technologies.some(tech => tech.toLowerCase().includes(searchTerm)));
      
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allServices, searchQuery, selectedCategory, isRTL]);

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

  const currentContent = content[language];

  const handleServiceClick = useCallback((serviceTitle: string, serviceTitleAr: string) => {
    setSelectedService(isRTL ? serviceTitleAr : serviceTitle);
    setFormData(prev => ({ ...prev, serviceRequired: isRTL ? serviceTitleAr : serviceTitle }));
    setIsModalOpen(true);
  }, [isRTL]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        businessDetails: '',
        serviceRequired: '',
        projectDescription: '',
      });
    }, 3000);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Focus search input on mount
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const borderColor = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const cardBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const inputBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const modalBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const modalOverlay = isDark ? 'bg-black/80' : 'bg-gray-900/80';
  const badgeBg = isDark ? 'bg-[#0F172A]' : 'bg-gray-100';
  const badgeBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';

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
        mass: 0.5,
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

  if (isLoading) {
    return (
      <div className={`min-h-screen ${bgColor} flex items-center justify-center`}>
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#6366F1] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className={`min-h-screen ${bgColor} pt-20 lg:pt-24`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className={`relative overflow-hidden border-b ${borderColor}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100'} rounded-full blur-3xl`} />
            <div className={`absolute bottom-20 right-10 w-72 h-72 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100'} rounded-full blur-3xl`} />
          </div>

          {isDark && (
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          )}
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <motion.div
              variants={introContainerVariants}
              initial="hidden"
              animate="visible"
              className={`text-center max-w-3xl mx-auto ${isRTL ? 'rtl' : ''}`}
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
                className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-4"
              >
                {isRTL ? (
                  <>
                    <span className={textColor}>{currentContent.heading} </span>
                    <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent animate-gradient">
                      {currentContent.headingHighlight}
                    </span>
                    <span className={textColor}> {currentContent.headingSuffix}</span>
                  </>
                ) : (
                  <>
                    <span className={textColor}>{currentContent.heading} </span>
                    <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent animate-gradient">
                      {currentContent.headingHighlight}
                    </span>
                    <span className={textColor}> {currentContent.headingSuffix}</span>
                  </>
                )}
              </motion.h1>

              <motion.p 
                variants={fromTopVariants}
                className={`text-base ${subTextColor} leading-relaxed max-w-2xl mx-auto mb-8 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
              >
                Transform your business with cutting-edge technology solutions tailored to your unique needs
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                variants={fromBottomVariants}
                className="max-w-2xl mx-auto relative"
              >
                <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 ${subTextColor}`} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={currentContent.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-3 ${inputBg} border ${borderColor} rounded-xl ${textColor} placeholder:${subTextColor} focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${subTextColor} hover:text-[#6366F1] transition-colors duration-300 cursor-pointer`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>

              {/* Category Filters */}
              <motion.div 
                variants={fromBottomVariants}
                className={`flex flex-wrap justify-center gap-2 mt-6 ${isRTL ? 'rtl' : ''}`}
              >
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedCategory === category.value
                        ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25'
                        : `${badgeBg} border ${borderColor} ${subTextColor} hover:border-[#6366F1] hover:text-[#6366F1]`
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </motion.div>

              <motion.p 
                variants={fromBottomVariants}
                className={`text-sm ${subTextColor} mt-6 font-light tracking-wide`}
              >
                {currentContent.showing} {filteredServices.length} {currentContent.of} {allServices.length} {currentContent.services}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredServices.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              >
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  const currentTitle = isRTL ? service.titleAr : service.title;
                  const currentDescription = isRTL ? service.longDescriptionAr : service.longDescription;
                  const currentCategory = isRTL ? service.categoryAr : service.category;
                  const currentTechnologies = isRTL ? service.technologiesAr : service.technologies;
                  
                  return (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      className="group relative cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm`} />
                      
                      <div className={`relative ${cardBg} border ${borderColor} rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/5 h-full flex flex-col hover:-translate-y-1 cursor-pointer`}>
                        <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className={`text-xs px-2 py-1 ${isDark ? 'bg-[#1E293B]' : 'bg-gray-200'} ${subTextColor} rounded-lg border border-transparent group-hover:border-[#6366F1]/30 transition-colors duration-300 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>
                            {currentCategory}
                          </span>
                        </div>

                        <h3 className={`text-lg font-semibold font-sans tracking-wide ${textColor} mb-2 group-hover:text-[#6366F1] transition-colors duration-300 ${isRTL ? 'text-right' : ''}`}>
                          {currentTitle}
                        </h3>
                        <p className={`text-sm ${subTextColor} mb-4 line-clamp-2 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>
                          {currentDescription}
                        </p>

                        <div className="mt-auto">
                          <div className={`flex flex-wrap gap-1.5 mb-4 ${isRTL ? 'justify-end' : ''}`}>
                            {currentTechnologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className={`text-xs px-2 py-1 ${isDark ? 'bg-[#1E293B]' : 'bg-gray-200'} ${subTextColor} rounded-lg transition-all duration-300 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] font-light tracking-wide`}
                              >
                                {tech}
                              </span>
                            ))}
                            {currentTechnologies.length > 3 && (
                              <span className={`text-xs px-2 py-1 ${isDark ? 'bg-[#1E293B]' : 'bg-gray-200'} ${subTextColor} rounded-lg transition-all duration-300 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] font-light tracking-wide`}>
                                +{currentTechnologies.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleServiceClick(service.title, service.titleAr)}
                            className={`inline-flex items-center gap-2 text-sm font-medium font-sans tracking-wide text-[#6366F1] hover:gap-3 transition-all duration-300 group/btn cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                          >
                            {currentContent.learnMore}
                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover/btn:${isRTL ? '-translate-x-1' : 'translate-x-1'} ${isRTL ? 'rotate-180' : ''}`} />
                          </button>
                        </div>

                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform rotate-12 translate-x-6 -translate-y-6`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className={`w-20 h-20 mx-auto mb-4 ${cardBg} rounded-full flex items-center justify-center border ${borderColor}`}>
                  <Search className={`w-8 h-8 ${subTextColor}`} />
                </div>
                <h3 className={`text-xl font-semibold font-sans tracking-wide ${textColor} mb-2`}>{currentContent.noServices}</h3>
                <p className={`${subTextColor} mb-6 font-light tracking-wide`}>{currentContent.noServicesDesc}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-[#6366F1] text-white font-semibold font-sans tracking-wide rounded-xl hover:bg-[#8B5CF6] transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  {currentContent.clearFilters}
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`border-t ${borderColor} py-16 lg:py-20`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className={`text-2xl md:text-3xl font-bold font-serif tracking-tight ${textColor} mb-4 ${isRTL ? 'text-right' : ''}`}>
                {currentContent.ctaTitle}
              </h2>
              <p className={`${subTextColor} mb-8 font-light tracking-wide ${isRTL ? 'text-right' : ''}`}>
                {currentContent.ctaDesc}
              </p>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {currentContent.contactNow}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalOverlay} backdrop-blur-sm animate-fade-in`}>
          <div
            ref={modalRef}
            className={`relative w-full max-w-2xl ${modalBg} border ${borderColor} rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in`}
          >
            <div className={`sticky top-0 ${modalBg} border-b ${borderColor} px-4 sm:px-6 py-4 flex items-center justify-between z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-lg sm:text-xl font-semibold font-sans tracking-wide ${textColor} ${isRTL ? 'text-right' : ''}`}>
                {currentContent.modalTitle}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1 ${subTextColor} hover:${textColor} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.fullName}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-[#020617]' : 'bg-gray-100'} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.fullNamePlaceholder}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.emailAddress}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-[#020617]' : 'bg-gray-100'} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.emailPlaceholder}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.phoneNumber}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-[#020617]' : 'bg-gray-100'} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.phonePlaceholder}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.businessDetails}
                  </label>
                  <input
                    type="text"
                    name="businessDetails"
                    required
                    value={formData.businessDetails}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-[#020617]' : 'bg-gray-100'} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.businessPlaceholder}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.serviceRequired}
                  </label>
                  <input
                    type="text"
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    readOnly
                    className="w-full px-4 py-3 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-lg text-[#6366F1] font-medium font-sans tracking-wide cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium font-sans tracking-wide ${subTextColor} mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.projectDescription}
                  </label>
                  <textarea
                    name="projectDescription"
                    required
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-[#020617]' : 'bg-gray-100'} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors resize-none font-light tracking-wide ${isRTL ? 'text-right' : ''}`}
                    placeholder={currentContent.projectPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {currentContent.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {currentContent.submit}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className={`text-xl font-semibold font-sans tracking-wide ${textColor} mb-2`}>{currentContent.submittedTitle}</h4>
                <p className={`${subTextColor} font-light tracking-wide`}>{currentContent.submittedDesc}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ServicesPage;