// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
  ];

  // SYSTEM THEME DETECTION - SELF-CONTAINED
  useEffect(() => {
    // Function to detect system theme
    const detectSystemTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
    };

    // Initial detection
    detectSystemTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Use addEventListener for modern browsers
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Safari and older browsers fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    // Cleanup
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
  };

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`w-full max-w-6xl transition-all duration-300 rounded-[28px] ${themeClasses.navBg} border`}
        >
          <div className="px-5 sm:px-6 lg:px-7">
            <div className="flex items-center justify-between h-12 lg:h-14">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 group">
                <span className={`text-lg sm:text-xl font-bold font-serif tracking-tight transition-transform duration-300 ${themeClasses.logoText}`}>
                  Nestick Tech
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-1.5 ${themeClasses.textMuted} ${themeClasses.textHover} text-sm font-medium rounded-lg transition-all duration-300 ${themeClasses.buttonBg}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Login Button */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className={`px-5 py-1.5 border ${themeClasses.loginBorder} ${themeClasses.loginText} rounded-xl transition-all duration-300 ${themeClasses.loginHover}`}
                >
                  <span className="flex items-center gap-2">
                    <LogIn size={16} />
                    Login
                  </span>
                </Link>
              </div>

              {/* Mobile button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 ${themeClasses.text} ${themeClasses.buttonBg} rounded-xl transition-all duration-300`}
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
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 ${themeClasses.textMuted} ${themeClasses.textHover} ${themeClasses.mobileLinkHover} rounded-lg transition-all duration-300`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 w-full mt-3 px-4 py-2 text-center border ${themeClasses.loginBorder} ${themeClasses.loginText} rounded-xl transition-all duration-300 ${themeClasses.loginHover}`}
            >
              <LogIn size={16} />
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 ${themeClasses.overlay} z-30 backdrop-blur-sm transition-all duration-300`}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;