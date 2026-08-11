// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn, Globe, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // --- LANGUAGE STATE (ENGLISH / ARABIC) ---
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
  ];

  // Arabic navigation names
  const arabicNavigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'منتجاتنا', href: '/products' },
    { name: 'المدونة', href: '/blogs' },
    { name: 'وظائف', href: '/careers' },
  ];

  // Language options for dropdown
  const languageOptions = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  // --- APPLY RTL (RIGHT-TO-LEFT) FOR ARABIC ---
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (language === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
      document.body.classList.add('rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', 'en');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SYSTEM THEME DETECTION - SELF-CONTAINED
  useEffect(() => {
    const detectSystemTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
    };

    detectSystemTheme();

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
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Change language function
  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  // Get current navigation items based on language
  const currentNavigation = language === 'en' ? navigation : arabicNavigation;
  
  // Get login text based on language
  const loginText = language === 'en' ? 'Login' : 'تسجيل الدخول';
  
  // Get company name
  const companyName = language === 'en' ? 'Nestick Tech' : 'نستيك تك';

  // Get current language display
  const currentLanguageLabel = language === 'en' ? 'EN' : 'عربي';
  const currentLanguageFlag = language === 'en' ? '🇬🇧' : '🇸🇦';

  // Theme-based classes
  const themeClasses = {
    navBg: hasScrolled
      ? theme === 'dark'
        ? 'bg-black/40 backdrop-blur-xl border-white/15 shadow-black/30'
        : 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-gray-200/30'
      : theme === 'dark'
        ? 'bg-black/25 backdrop-blur-md border-white/10'
        : 'bg-white/60 backdrop-blur-md border-gray-200/40',
    
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textMuted: theme === 'dark' ? 'text-white/80' : 'text-gray-700',
    textHover: theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900',
    buttonBg: theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100',
    
    loginBorder: theme === 'dark' ? 'border-indigo-400' : 'border-indigo-500',
    loginText: theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600',
    loginHover: theme === 'dark' ? 'hover:bg-indigo-500/20 hover:text-white' : 'hover:bg-indigo-500/10 hover:text-indigo-700',
    
    mobileMenuBg: theme === 'dark' 
      ? 'bg-black/60 backdrop-blur-xl border-white/10' 
      : 'bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-lg',
    
    mobileLinkHover: theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100',
    overlay: theme === 'dark' ? 'bg-black/50' : 'bg-black/30',
    
    logoText: theme === 'dark' 
      ? 'text-white group-hover:scale-105' 
      : 'text-gray-900 group-hover:scale-105',
    
    // Language dropdown styles
    langBtn: theme === 'dark'
      ? 'border-white/20 hover:border-white/40 text-white/80 hover:text-white'
      : 'border-gray-300 hover:border-gray-500 text-gray-700 hover:text-gray-900',
    
    dropdownBg: theme === 'dark'
      ? 'bg-black/80 backdrop-blur-xl border-white/15'
      : 'bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-lg',
    
    dropdownItemHover: theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100',
  };

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`w-full max-w-6xl transition-all duration-300 rounded-[28px] ${themeClasses.navBg} border`}
        >
          <div className="px-5 sm:px-6 lg:px-7">
            <div className="flex items-center justify-between h-12 lg:h-14">

              {/* Logo - cursor pointer */}
              <Link href="/" className="flex-shrink-0 group cursor-pointer">
                <span className={`text-lg sm:text-xl font-bold font-serif tracking-tight transition-transform duration-300 ${themeClasses.logoText} cursor-pointer`}>
                  {companyName}
                </span>
              </Link>

              {/* Desktop Navigation - cursor pointer on all links */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-2">
                {currentNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-1.5 ${themeClasses.textMuted} ${themeClasses.textHover} text-sm font-medium rounded-lg transition-all duration-300 ${themeClasses.buttonBg} cursor-pointer`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Language Switcher (Dropdown) + Login Button */}
              <div className="hidden lg:flex items-center gap-3">
                {/* 🌐 Language Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl transition-all duration-300 ${themeClasses.langBtn} ${themeClasses.buttonBg} cursor-pointer`}
                    aria-label="Select language / اختر اللغة"
                  >
                    <Globe size={16} />
                    <span className="text-sm font-medium">{currentLanguageLabel}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isLangDropdownOpen && (
                    <div className={`absolute top-full mt-2 right-0 w-40 rounded-xl border overflow-hidden shadow-lg ${themeClasses.dropdownBg} z-50`}>
                      {languageOptions.map((option) => (
                        <button
                          key={option.code}
                          onClick={() => changeLanguage(option.code as 'en' | 'ar')}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all duration-200 ${themeClasses.textMuted} ${themeClasses.dropdownItemHover} cursor-pointer ${language === option.code ? (theme === 'dark' ? 'bg-white/10' : 'bg-gray-100') : ''}`}
                        >
                          <span className="text-lg">{option.flag}</span>
                          <span>{option.label}</span>
                          {language === option.code && (
                            <span className="ml-auto text-indigo-500">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Login Button - cursor pointer */}
                <Link
                  href="/login"
                  className={`px-5 py-1.5 border ${themeClasses.loginBorder} ${themeClasses.loginText} rounded-xl transition-all duration-300 ${themeClasses.loginHover} cursor-pointer`}
                >
                  <span className="flex items-center gap-2 cursor-pointer">
                    <LogIn size={16} />
                    {loginText}
                  </span>
                </Link>
              </div>

              {/* Mobile button - cursor pointer */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 ${themeClasses.text} ${themeClasses.buttonBg} rounded-xl transition-all duration-300 cursor-pointer`}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <div className={`mx-auto max-w-6xl border rounded-[28px] overflow-hidden ${themeClasses.mobileMenuBg}`}>
          <div className="px-6 py-4 space-y-2">
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 ${themeClasses.textMuted} ${themeClasses.textHover} ${themeClasses.mobileLinkHover} rounded-lg transition-all duration-300 cursor-pointer`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language Selection (Dropdown style on mobile) */}
            <div className="mt-3 space-y-2">
              <div className={`text-xs uppercase tracking-wider px-4 pt-2 ${themeClasses.textMuted} opacity-60`}>
                {language === 'en' ? 'Language' : 'اللغة'}
              </div>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => {
                    changeLanguage(option.code as 'en' | 'ar');
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200 ${themeClasses.textMuted} ${themeClasses.mobileLinkHover} cursor-pointer ${language === option.code ? (theme === 'dark' ? 'bg-white/10' : 'bg-gray-100') : ''}`}
                >
                  <span className="text-lg">{option.flag}</span>
                  <span>{option.label}</span>
                  {language === option.code && (
                    <span className="ml-auto text-indigo-500">✓</span>
                  )}
                </button>
              ))}
            </div>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 w-full mt-3 px-4 py-2 text-center border ${themeClasses.loginBorder} ${themeClasses.loginText} rounded-xl transition-all duration-300 ${themeClasses.loginHover} cursor-pointer`}
            >
              <LogIn size={16} />
              {loginText}
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 ${themeClasses.overlay} z-30 backdrop-blur-sm transition-all duration-300 cursor-pointer`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;