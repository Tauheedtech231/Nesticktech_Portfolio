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
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' },
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
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          hasScrolled 
            ? 'bg-[#020617]/80 backdrop-blur-lg shadow-lg shadow-[#6366F1]/5 border-b border-[#1E293B]' 
            : 'bg-[#020617]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Company Logo with Multi-Color Gradient (No Orange) */}
            <Link href="/" className="flex-shrink-0 group cursor-pointer">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#0F52BA] via-[#00C2FF] via-[#8A2BE2] to-[#FF2D55] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Nestick Tech
              </span>
            </Link>

            {/* Desktop Navigation - Hero section font styles */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-[#94A3B8] hover:text-[#6366F1] text-sm lg:text-base font-medium font-sans tracking-wide rounded-lg transition-all duration-300 hover:bg-[#6366F1]/10 relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Buttons Container */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              {/* Login Button */}
              <Link
                href="/login"
                className="relative px-5 py-2.5 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-sm lg:text-base font-semibold font-sans tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn size={18} />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Contact CTA Button */}
              <Link
                href="/contact"
                className="relative px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm lg:text-base font-semibold font-sans tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-[#94A3B8] hover:text-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 focus:outline-none z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 z-40 transition-all duration-500 ease-in-out transform ${
          isOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="bg-[#020617] border-t border-b border-[#1E293B] shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {/* Mobile Menu Header with Gradient (No Orange) */}
            <div className="px-4 py-3 mb-3 border-b border-[#1E293B]">
              <span className="text-xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#0F52BA] via-[#00C2FF] via-[#8A2BE2] to-[#FF2D55] bg-clip-text text-transparent">
                Nestick Tech
              </span>
            </div>
            
            <div className="flex flex-col space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3.5 text-[#94A3B8] hover:text-[#6366F1] text-base font-medium font-sans tracking-wide rounded-xl transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer ${
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
            
            {/* Mobile Buttons Container */}
            <div
              className={`mt-4 space-y-2 px-4 transition-all duration-500 ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
            >
              {/* Login Button - Mobile */}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-center text-base font-semibold font-sans tracking-wide rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 group overflow-hidden relative cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn size={18} />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Contact CTA Button - Mobile */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full px-6 py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-center text-base font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer"
              >
                Contact Us
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