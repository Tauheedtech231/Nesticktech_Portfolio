// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigation = [
    { 
      name: 'Home', 
      href: '/',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Products', href: '/products' }
      ]
    },
    { name: 'Blogs', href: '/blogs', hasDropdown: false },
    { name: 'Careers', href: '/careers', hasDropdown: false },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`w-full max-w-5xl transition-all duration-300 rounded-2xl ${
            hasScrolled 
              ? 'bg-[#020617]/90 backdrop-blur-lg shadow-lg shadow-[#6366F1]/10 border border-[#1E293B]' 
              : 'bg-[#020617] border border-[#1E293B]'
          }`}
        >
          <div className="px-5 sm:px-6 lg:px-7">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* Company Logo - White */}
              <Link href="/" className="flex-shrink-0 group cursor-pointer">
                <span className="text-xl sm:text-2xl lg:text-2xl font-bold font-serif tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
                  Nestick Tech
                </span>
              </Link>

              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:gap-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative dropdown-container">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className="flex items-center gap-1.5 px-3.5 py-2 text-[#94A3B8] hover:text-white text-sm lg:text-base font-medium font-sans tracking-wide rounded-lg transition-all duration-300 hover:bg-[#6366F1]/10 group cursor-pointer"
                        >
                          {item.name}
                          <ChevronDown 
                            size={15} 
                            className={`transition-transform duration-300 ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdown === item.name && (
                          <div className="absolute top-full left-0 mt-2 w-44 bg-[#020617] border border-[#1E293B] rounded-xl shadow-lg shadow-[#6366F1]/10 overflow-hidden">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block px-4 py-2.5 text-[#94A3B8] hover:text-white text-sm font-medium font-sans transition-all duration-300 hover:bg-[#6366F1]/10"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="px-3.5 py-2 text-[#94A3B8] hover:text-white text-sm lg:text-base font-medium font-sans tracking-wide rounded-lg transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Buttons Container */}
              <div className="hidden lg:flex lg:items-center lg:space-x-3">
                {/* Login Button */}
                <Link
                  href="/login"
                  className="relative px-5 py-2 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-sm lg:text-base font-semibold font-sans tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LogIn size={17} />
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                {/* Contact CTA Button */}
                <Link
                  href="/contact"
                  className="relative px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm lg:text-base font-semibold font-sans tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 hover:scale-105 active:scale-95 cursor-pointer"
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
                  <X className="h-5.5 w-5.5" />
                ) : (
                  <Menu className="h-5.5 w-5.5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[76px] z-40 transition-all duration-500 ease-in-out transform flex justify-center px-4 ${
          isOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="w-full max-w-5xl bg-[#020617] border-t border-b border-[#1E293B] shadow-xl rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-4">
            {/* Mobile Menu Header with White Logo */}
            <div className="px-3 py-2.5 mb-3 border-b border-[#1E293B]">
              <span className="text-xl font-bold font-serif tracking-tight text-white">
                Nestick Tech
              </span>
            </div>
            
            <div className="flex flex-col space-y-1">
              {navigation.map((item, index) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-3 py-3 text-[#94A3B8] hover:text-white text-base font-medium font-sans tracking-wide rounded-xl transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer"
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          size={17} 
                          className={`transition-transform duration-300 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="ml-3 mt-1 space-y-1 border-l border-[#1E293B] pl-3">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={() => {
                                setIsOpen(false);
                                setOpenDropdown(null);
                              }}
                              className="block px-3 py-2.5 text-[#94A3B8] hover:text-white text-sm font-medium font-sans rounded-xl transition-all duration-300 hover:bg-[#6366F1]/10"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-3 text-[#94A3B8] hover:text-white text-base font-medium font-sans tracking-wide rounded-xl transition-all duration-300 hover:bg-[#6366F1]/10 cursor-pointer ${
                        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Buttons Container */}
            <div
              className={`mt-4 space-y-2 px-3 transition-all duration-500 ${
                isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
            >
              {/* Login Button - Mobile */}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-transparent border border-[#6366F1] text-[#6366F1] hover:text-white text-center text-base font-semibold font-sans tracking-wide rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/25 group overflow-hidden relative cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn size={17} />
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Contact CTA Button - Mobile */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full px-5 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-center text-base font-semibold font-sans tracking-wide rounded-xl hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer"
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