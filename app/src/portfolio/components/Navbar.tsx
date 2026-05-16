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
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className={`w-full max-w-6xl transition-all duration-300 rounded-[28px] ${
            hasScrolled
              ? 'bg-black/40 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/30'
              : 'bg-black/25 backdrop-blur-md border border-white/10'
          }`}
        >
          <div className="px-5 sm:px-6 lg:px-7">
            <div className="flex items-center justify-between h-12 lg:h-14">

              {/* Logo */}
              <Link href="/" className="flex-shrink-0 group">
                <span className="text-lg sm:text-xl font-bold font-serif tracking-tight text-white group-hover:scale-105 transition-transform">
                  Nestick Tech
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-1.5 text-white/80 hover:text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/10"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Login */}
              <div className="hidden lg:flex">
                <Link
                  href="/login"
                  className="px-5 py-1.5 border border-indigo-400 text-indigo-300 hover:text-white rounded-xl transition-all hover:bg-indigo-500/20"
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
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl"
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
        <div className="mx-auto max-w-6xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-[28px] overflow-hidden">

          <div className="px-6 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block mt-3 px-4 py-2 text-center border border-indigo-400 text-indigo-300 rounded-xl hover:bg-indigo-500/20 hover:text-white"
            >
              Login
            </Link>
          </div>

        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;