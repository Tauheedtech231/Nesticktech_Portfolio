/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Handshake, 
  Send,
  CheckCircle,
  XCircle,
  FileText,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  X,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Globe,
  Users,
  Briefcase,
  Star,
  Clock
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  links: string[];
  cvFile: File | null;
  cvFileName: string;
  
  companyName: string;
  partnerType: string;
  
  expertise: string;
  availability: string;
}

export default function PartnerCollaboratorPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState<'partner' | 'collaborator'>('partner');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    links: [''],
    cvFile: null,
    cvFileName: '',
    companyName: '',
    partnerType: '',
    expertise: '',
    availability: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isRTL = language === 'ar';

  // Content translations
  const content = {
    en: {
      badge: 'Join Our Network',
      heading1: 'Become a',
      headingHighlight: 'Partner or Collaborator',
      description: 'Join our ecosystem of partners and collaborators to revolutionize educational portfolio management together.',
      partnerTab: 'Partner',
      collaboratorTab: 'Collaborator',
      partnerFormTitle: 'Partner Application Form',
      collaboratorFormTitle: 'Collaborator Application Form',
      requiredFields: '* Required fields',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      country: 'Country',
      companyName: 'Company/Organization Name',
      partnerType: 'Partner Type',
      expertise: 'Area of Expertise',
      availability: 'Availability',
      linksLabel: 'Links (Portfolio/Website/Social) - Optional (Max 7)',
      addAnotherLink: 'Add another link',
      cvLabel: 'Upload CV/Resume (Optional - Max 20MB)',
      clickToUpload: 'Click to upload or drag and drop',
      fileTypes: 'PDF, DOC, DOCX, JPG, PNG up to 20MB',
      messageLabel: 'Message / Why do you want to join?',
      messagePlaceholder: 'Tell us about yourself and why you\'re interested in partnering/collaborating with us...',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      errorMessage: 'Failed to submit. Please try again.',
      successTitle: 'Application Submitted!',
      successMessage: 'application submitted successfully! Our team will contact you within 48 hours.',
      close: 'Close',
      linkPlaceholder: 'Link (https://...)',
    },
    ar: {
      badge: 'انضم إلى شبكتنا',
      heading1: 'كن',
      headingHighlight: 'شريكاً أو متعاوناً',
      description: 'انضم إلى نظامنا البيئي من الشركاء والمتعاونين لإحداث ثورة في إدارة المحافظ التعليمية معاً.',
      partnerTab: 'شريك',
      collaboratorTab: 'متعاون',
      partnerFormTitle: 'نموذج طلب الشراكة',
      collaboratorFormTitle: 'نموذج طلب التعاون',
      requiredFields: '* حقول مطلوبة',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      country: 'الدولة',
      companyName: 'اسم الشركة/المؤسسة',
      partnerType: 'نوع الشراكة',
      expertise: 'مجال الخبرة',
      availability: 'التوفر',
      linksLabel: 'الروابط (المحفظة/الموقع/وسائل التواصل) - اختياري (الحد الأقصى 7)',
      addAnotherLink: 'إضافة رابط آخر',
      cvLabel: 'تحميل السيرة الذاتية (اختياري - الحد الأقصى 20 ميغابايت)',
      clickToUpload: 'انقر للتحميل أو اسحب وأفلت',
      fileTypes: 'PDF, DOC, DOCX, JPG, PNG حتى 20 ميغابايت',
      messageLabel: 'الرسالة / لماذا تريد الانضمام؟',
      messagePlaceholder: 'أخبرنا عن نفسك ولماذا أنت مهتم بالشراكة/التعاون معنا...',
      submit: 'إرسال الطلب',
      submitting: 'جاري الإرسال...',
      errorMessage: 'فشل الإرسال. يرجى المحاولة مرة أخرى.',
      successTitle: 'تم إرسال الطلب!',
      successMessage: 'تم تقديم الطلب بنجاح! سيتواصل معك فريقنا خلال 48 ساعة.',
      close: 'إغلاق',
      linkPlaceholder: 'الرابط (https://...)',
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

  const countries = [
    'Pakistan', 'USA', 'UK', 'Canada', 'Australia', 'UAE', 'Saudi Arabia',
    'India', 'Bangladesh', 'Malaysia', 'Singapore', 'Germany', 'France',
    'Turkey', 'Egypt', 'South Africa', 'Other'
  ];

  const countriesAr = [
    'باكستان', 'الولايات المتحدة', 'المملكة المتحدة', 'كندا', 'أستراليا', 'الإمارات', 'المملكة العربية السعودية',
    'الهند', 'بنغلاديش', 'ماليزيا', 'سنغافورة', 'ألمانيا', 'فرنسا',
    'تركيا', 'مصر', 'جنوب أفريقيا', 'أخرى'
  ];

  const partnerTypes = [
    'Strategic Partner',
    'Technology Partner',
    'Channel Partner',
    'Implementation Partner',
    'Reseller Partner',
    'Other'
  ];

  const partnerTypesAr = [
    'شريك استراتيجي',
    'شريك تقني',
    'شريك قنوات',
    'شريك تنفيذ',
    'شريك إعادة بيع',
    'أخرى'
  ];

  const expertiseAreas = [
    'Educational Technology',
    'Software Development',
    'Digital Marketing',
    'Content Creation',
    'UI/UX Design',
    'Training & Consulting',
    'Event Management',
    'Community Building',
    'Other'
  ];

  const expertiseAreasAr = [
    'تكنولوجيا التعليم',
    'تطوير البرمجيات',
    'التسويق الرقمي',
    'إنشاء المحتوى',
    'تصميم واجهات المستخدم',
    'التدريب والاستشارات',
    'إدارة الفعاليات',
    'بناء المجتمعات',
    'أخرى'
  ];

  const availabilityOptions = [
    'Full-time (40+ hrs/week)',
    'Part-time (20-30 hrs/week)',
    'Project-based',
    'Weekends only',
    'Flexible'
  ];

  const availabilityOptionsAr = [
    'دوام كامل (40+ ساعة/أسبوع)',
    'دوام جزئي (20-30 ساعة/أسبوع)',
    'على أساس المشروع',
    'عطلات نهاية الأسبوع فقط',
    'مرن'
  ];

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-gray-50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900/50' : 'bg-white/80';
  const cardBorder = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? '#0F0F0F' : '#FFFFFF';
  const inputBorder = isDark ? '#1E293B' : '#E5E7EB';
  const inputTextColor = isDark ? '#FFFFFF' : '#111827';
  const buttonBg = isDark ? 'bg-blue-500' : 'bg-blue-600';
  const buttonHoverBg = isDark ? 'hover:bg-blue-600' : 'hover:bg-blue-700';
  const tabActiveBg = isDark ? 'bg-blue-500' : 'bg-blue-600';
  const tabInactiveBg = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const tabInactiveText = isDark ? 'text-gray-400' : 'text-gray-500';
  const modalBg = isDark ? 'bg-gray-900' : 'bg-white';
  const modalBorder = isDark ? 'border-blue-500/30' : 'border-blue-300/50';

  const currentContent = content[language];

  const getCountries = () => isRTL ? countriesAr : countries;
  const getPartnerTypes = () => isRTL ? partnerTypesAr : partnerTypes;
  const getExpertiseAreas = () => isRTL ? expertiseAreasAr : expertiseAreas;
  const getAvailabilityOptions = () => isRTL ? availabilityOptionsAr : availabilityOptions;

  const addLinkField = () => {
    if (formData.links.length < 7) {
      setFormData(prev => ({ ...prev, links: [...prev.links, ''] }));
    }
  };

  const removeLinkField = (index: number) => {
    if (formData.links.length > 1) {
      setFormData(prev => ({
        ...prev,
        links: prev.links.filter((_, i) => i !== index)
      }));
    }
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, links: newLinks }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('File size must be less than 20MB');
      return;
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload PDF, DOC, DOCX, JPG, or PNG files only');
      return;
    }

    setFormData(prev => ({ ...prev, cvFile: file, cvFileName: file.name }));
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, cvFile: null, cvFileName: '' }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    setTimeout(() => {
      const applicationType = activeTab === 'partner' 
        ? (isRTL ? 'الشراكة' : 'Partnership') 
        : (isRTL ? 'التعاون' : 'Collaborator');
      const successMsg = isRTL 
        ? `تم تقديم طلب ${applicationType} بنجاح! سيتواصل معك فريقنا خلال 48 ساعة.`
        : `${applicationType} application submitted successfully! Our team will contact you within 48 hours.`;
      
      setSuccessMessage(successMsg);
      setSubmitStatus('success');
      setShowSuccessModal(true);
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        links: [''],
        cvFile: null,
        cvFileName: '',
        companyName: '',
        partnerType: '',
        expertise: '',
        availability: ''
      });
      
      setIsSubmitting(false);
      setTimeout(() => setShowSuccessModal(false), 5000);
    }, 1500);
  };

  // FIXED: Input styles with proper RTL support
  const getInputStyle = () => ({
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
  });

  const getInputStyleLTR = () => ({
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
  });

  const getSelectStyle = () => ({
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
    appearance: 'none' as const,
    cursor: 'pointer',
  });

  const getSelectStyleLTR = () => ({
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
    appearance: 'none' as const,
    cursor: 'pointer',
  });

  const getTextareaStyle = () => ({
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
    resize: 'none' as const,
  });

  const getTextareaStyleLTR = () => ({
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.875rem',
    backgroundColor: inputBg,
    border: `1px solid ${inputBorder}`,
    color: inputTextColor,
    outline: 'none',
    transition: 'all 0.2s ease',
    resize: 'none' as const,
  });

  return (
    <section ref={sectionRef} className={`min-h-screen py-12 md:py-20 px-4 sm:px-6 relative overflow-hidden ${bgColor}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Theme Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl opacity-10 ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl opacity-10 ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-3xl opacity-5 ${isDark ? 'bg-blue-400' : 'bg-blue-200'}`} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-center mb-10 md:mb-12 ${isRTL ? 'rtl' : ''}`}
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 mx-auto w-fit ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-300'} border cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Handshake className={`w-4 h-4 md:w-5 md:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-sm md:text-base font-medium font-sans tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              {currentContent.badge}
            </span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 md:mb-6 font-serif tracking-tight ${textColor}`}>
            {isRTL ? (
              <>
                <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{currentContent.headingHighlight}</span>
                {' '}{currentContent.heading1}
              </>
            ) : (
              <>
                {currentContent.heading1} <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{currentContent.headingHighlight}</span>
              </>
            )}
          </h2>
          
          <p className={`text-base md:text-lg max-w-2xl mx-auto px-4 font-light tracking-wide ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
            {currentContent.description}
          </p>
        </motion.div>

        {/* Tab Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className={`flex justify-center gap-4 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <button
            onClick={() => setActiveTab('partner')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''} ${
              activeTab === 'partner'
                ? `${tabActiveBg} text-white shadow-lg shadow-blue-500/25 scale-105`
                : `${tabInactiveBg} ${tabInactiveText} hover:bg-gray-800 border border-gray-800`
            }`}
          >
            <Building2 className="w-5 h-5 md:w-6 md:h-6" />
            {currentContent.partnerTab}
          </button>
          <button
            onClick={() => setActiveTab('collaborator')}
            className={`px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''} ${
              activeTab === 'collaborator'
                ? `${tabActiveBg} text-white shadow-lg shadow-blue-500/25 scale-105`
                : `${tabInactiveBg} ${tabInactiveText} hover:bg-gray-800 border border-gray-800`
            }`}
          >
            <Users className="w-5 h-5 md:w-6 md:h-6" />
            {currentContent.collaboratorTab}
          </button>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`w-full rounded-2xl md:rounded-3xl p-6 md:p-10 ${cardBg} backdrop-blur-sm border ${cardBorder}`}
        >
          <div className={`flex items-center justify-between mb-6 md:mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-blue-500">
                {activeTab === 'partner' ? (
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                ) : (
                  <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
                )}
              </div>
              <h3 className={`text-xl md:text-2xl font-bold font-serif tracking-tight ${textColor} ${isRTL ? 'text-right' : ''}`}>
                {activeTab === 'partner' ? currentContent.partnerFormTitle : currentContent.collaboratorFormTitle}
              </h3>
            </div>
            <div className={`text-xs md:text-sm font-sans ${subTextColor} ${isRTL ? 'text-left' : 'text-right'}`}>
              {currentContent.requiredFields}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                  {currentContent.fullName} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder={currentContent.fullName}
                    className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text`}
                    style={isRTL ? getInputStyle() : getInputStyleLTR()}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                  {currentContent.email} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={currentContent.email}
                    className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text`}
                    style={isRTL ? getInputStyle() : getInputStyleLTR()}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                  {currentContent.phone} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+92 300 1234567"
                    className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text`}
                    style={isRTL ? getInputStyle() : getInputStyleLTR()}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                  {currentContent.country} <span className="text-blue-400">*</span>
                </label>
                <div className="relative">
                  <Globe className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none`} />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none`}
                    style={isRTL ? getSelectStyle() : getSelectStyleLTR()}
                  >
                    <option value="">{isRTL ? 'اختر الدولة' : 'Select country'}</option>
                    {getCountries().map((country, idx) => (
                      <option key={idx} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Partner Specific Fields */}
            {activeTab === 'partner' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.companyName} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10`} />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder={currentContent.companyName}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text`}
                      style={isRTL ? getInputStyle() : getInputStyleLTR()}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.partnerType} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none`} />
                    <select
                      name="partnerType"
                      value={formData.partnerType}
                      onChange={handleInputChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none`}
                      style={isRTL ? getSelectStyle() : getSelectStyleLTR()}
                    >
                      <option value="">{isRTL ? 'اختر نوع الشراكة' : 'Select partner type'}</option>
                      {getPartnerTypes().map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Collaborator Specific Fields */}
            {activeTab === 'collaborator' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.expertise} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Star className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none`} />
                    <select
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none`}
                      style={isRTL ? getSelectStyle() : getSelectStyleLTR()}
                    >
                      <option value="">{isRTL ? 'اختر مجال الخبرة' : 'Select expertise area'}</option>
                      {getExpertiseAreas().map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                    {currentContent.availability} <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Clock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none`} />
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      required
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none`}
                      style={isRTL ? getSelectStyle() : getSelectStyleLTR()}
                    >
                      <option value="">{isRTL ? 'اختر التوفر' : 'Select availability'}</option>
                      {getAvailabilityOptions().map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Links Section */}
            <div>
              <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                {currentContent.linksLabel}
              </label>
              {formData.links.map((link, index) => (
                <div key={index} className={`flex gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="relative flex-1">
                    <LinkIcon className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10`} />
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updateLink(index, e.target.value)}
                      placeholder={`${currentContent.linkPlaceholder}`}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-text`}
                      style={isRTL ? getInputStyle() : getInputStyleLTR()}
                    />
                  </div>
                  {formData.links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLinkField(index)}
                      className="px-3 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/30 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
              {formData.links.length < 7 && (
                <button
                  type="button"
                  onClick={addLinkField}
                  className={`flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                  {currentContent.addAnotherLink} ({formData.links.length}/7)
                </button>
              )}
            </div>

            {/* CV Upload */}
            <div>
              <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                {currentContent.cvLabel}
              </label>
              <div 
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors ${isDark ? 'border-gray-700 bg-black/30' : 'border-gray-300 bg-gray-50'}`}
                onClick={() => document.getElementById('cvUpload')?.click()}
              >
                <input
                  id="cvUpload"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {formData.cvFileName ? (
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 mx-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <FileText className="w-6 h-6 text-blue-400" />
                      <span className={`text-sm ${subTextColor}`}>{formData.cvFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(); }}
                      className="p-2 hover:bg-red-500/20 rounded-lg cursor-pointer"
                    >
                      <X className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className={`w-10 h-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${subTextColor}`}>{currentContent.clickToUpload}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{currentContent.fileTypes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm md:text-base font-medium mb-2 ${subTextColor} ${isRTL ? 'text-right' : ''}`}>
                {currentContent.messageLabel} <span className="text-blue-400">*</span>
              </label>
              <div className="relative">
                <MessageSquare className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-4 w-4 h-4 text-gray-500 z-10`} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder={currentContent.messagePlaceholder}
                  className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none cursor-text`}
                  style={isRTL ? getTextareaStyle() : getTextareaStyleLTR()}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-3 ${buttonBg} text-white ${buttonHoverBg} cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentContent.submitting}
                </>
              ) : (
                <>
                  {currentContent.submit}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {submitStatus === 'error' && (
            <div className="p-4 rounded-xl flex items-center gap-3 mt-4 bg-red-500/10 border border-red-500/30">
              <XCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{currentContent.errorMessage}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4`}>
          <div className={`rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-scaleIn ${modalBg} border ${modalBorder}`}>
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className={`text-xl font-bold mb-3 font-serif ${textColor}`}>
              {currentContent.successTitle}
            </h3>
            <p className={`text-sm mb-5 font-light ${subTextColor}`}>
              {successMessage}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              {currentContent.close}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}