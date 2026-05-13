// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Careers', href: '/careers' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`w-full max-w-6xl transition-all duration-300 rounded-[28px] ${
            hasScrolled 
              ? 'bg-[#020617]/90 backdrop-blur-lg shadow-lg shadow-[#6366F1]/10 border border-[#1E293B]' 
              : 'bg-[#020617] border border-[#1E293B]'
          }`}
        >
          <div className="px-5 sm:px-6 lg:px-7">
            <div className="flex items-center justify-between h-12 lg:h-14">
              {/* Company Logo - White */}
              <Link href="/" className="flex-shrink-0 group cursor-pointer">
                <span className="text-lg sm:text-xl lg:text-xl font-bold font-serif tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                  Nestick Tech
                </span>
              </Link>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3.5 py-1.5 text-[#94A3B8] hover:text-white text-sm lg:text-base font-medium font-sans tracking-wide rounded-lg transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Login Button Only */}
              <div className="hidden lg:flex lg:items-center">
                <Link
                  href="/login"
                  className="relative px-5 py-1.5 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-sm lg:text-base font-semibold font-sans tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LogIn size={16} />
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 rounded-xl text-[#94A3B8] hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 focus:outline-none z-50 cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] z-40 transition-all duration-500 ease-in-out transform flex justify-center px-4 ${
          isOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="w-full max-w-6xl bg-[#020617] border-t border-b border-[#1E293B] shadow-xl rounded-[28px] overflow-hidden">
          <div className="px-5 sm:px-6 py-3">
            {/* Mobile Menu Header with White Logo */}
            <div className="px-3 py-2 mb-2 border-b border-[#1E293B]">
              <span className="text-lg font-bold font-serif tracking-tight text-white">
                Nestick Tech
              </span>
            </div>
            
            <div className="flex flex-col space-y-0.5">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 text-[#94A3B8] hover:text-white text-base font-medium font-sans tracking-wide rounded-xl transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Login Button Only */}
            <div
              className={`mt-3 px-3 transition-all duration-500 ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
            >
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-center text-base font-semibold font-sans tracking-wide rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 group overflow-hidden relative cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn size={16} />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;