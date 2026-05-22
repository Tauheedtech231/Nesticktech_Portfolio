/* eslint-disable react/no-unescaped-entities */
// components/FAQ.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HelpCircle, Mail, Phone, Send, Sparkles, ArrowRight, MessageCircle, Clock, Award, Users, Plus, Minus, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  display_order?: number;
}

// Shimmer Component with theme support
const FAQShimmer = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-3 w-full animate-pulse">
          <div className={`${isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
            <div className="w-full px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-64`} />
              </div>
              <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const phoneNumber = "923193236529";
  const formattedPhoneNumber = `+${phoneNumber}`;

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

  // Fetch FAQ from API
  useEffect(() => {
    fetchFAQ();
  }, []);

  const fetchFAQ = async () => {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      if (data.success && data.faq.length > 0) {
        setFaqData(data.faq);
        if (data.faq.length > 0) {
          setOpenItems([data.faq[0].id]);
        }
      }
    } catch (error) {
      console.error('Error fetching FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 8,
        mass: 0.4,
        duration: 0.3,
      },
    },
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]' : 'bg-white';
  const borderColor = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-500';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-500';
  const badgeBg = isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-50';
  const badgeBorder = isDark ? 'border-[#6366F1]/20' : 'border-indigo-200';
  const badgeText = isDark ? 'text-[#6366F1]' : 'text-indigo-600';
  const overlayGradient = isDark 
    ? 'from-[#020617]/90 via-[#020617]/80 to-[#0F172A]/90'
    : 'from-gray-900/90 via-gray-900/80 to-gray-800/90';

  const contactOptions = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      action: "/contact",
      linkText: "Send Message",
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        stats: "24h Response",
        icon: Clock,
      },
      backInfo: {
        email: "nesticktech@gmail.com",
        support: "support@nesticktech.com",
      },
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri, 9AM - 6PM",
      action: `tel:${formattedPhoneNumber}`,
      linkText: formattedPhoneNumber,
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        stats: "Available Now",
        icon: Award,
      },
      backInfo: {
        primary: formattedPhoneNumber,
        whatsapp: "Click to call",
      },
    },
    {
      id: 3,
      icon: Users,
      title: "Schedule Meeting",
      description: "Book a consultation call",
      action: "/contact",
      linkText: "Book Now",
      color: `from-[#6366F1] to-[#8B5CF6]`,
      bgHover: isDark ? "hover:bg-[#6366F1]/10" : "hover:bg-indigo-50",
      frontInfo: {
        stats: "Free Consultation",
        icon: Sparkles,
      },
      backInfo: {
        duration: "30 min session",
        availability: "Flexible timing",
      },
    },
  ];

  // Show shimmer while loading
  if (loading) {
    return (
      <section className={`relative py-16 lg:py-20 ${bgColor} overflow-hidden`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 lg:mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${badgeBg} border ${badgeBorder} rounded-full mb-4`}>
              <div className={`w-4 h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
              <div className={`w-16 h-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            </div>
            <div className={`h-8 w-80 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded mb-3`} />
            <div className={`h-5 w-96 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            <div className="mt-4">
              <div className={`w-16 h-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} rounded`} />
            </div>
          </div>
          <FAQShimmer isDark={isDark} />
        </div>
      </section>
    );
  }

  return (
    <section className={`relative py-16 lg:py-20 ${bgColor} overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100'} rounded-full blur-3xl opacity-40`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100'} rounded-full blur-3xl opacity-40`} />
      </div>

      {/* Grid pattern overlay - only for dark mode */}
      {isDark && (
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mb-10 lg:mb-12 text-left"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${badgeBg} border ${badgeBorder} rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300`}>
            <HelpCircle className="w-4 h-4 text-[#6366F1]" />
            <span className={`text-sm font-medium font-sans tracking-wide ${badgeText} italic`}>
              FAQ
            </span>
          </div>
          
          <h2 className={`text-2xl md:text-3xl font-bold font-serif tracking-tight ${textColor} mb-3`}>
            Frequently Asked{' '}
            <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              Questions
            </span>
          </h2>
          
          <p className={`text-base md:text-lg ${subTextColor} max-w-2xl font-light tracking-wide`}>
            Find answers to common questions about our services and process.
          </p>
          
          <div className="mt-4">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`} />
          </div>
        </motion.div>

        {/* FAQ Items - Dynamic from Database */}
        {faqData.length === 0 ? (
          <div className="text-center py-12">
            <p className={subTextColor}>No FAQs available at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-3xl mx-auto"
          >
            {faqData.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="mb-3 w-full"
              >
                <div
                  className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden transition-all duration-200 w-full ${
                    openItems.includes(faq.id) ? `shadow-md shadow-[#6366F1]/10 ${isDark ? 'border-[#6366F1]/30' : 'border-indigo-300'}` : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`w-6 h-6 rounded-full ${isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-100'} flex items-center justify-center text-[#6366F1] text-xs font-bold flex-shrink-0`}>
                        {faq.id}
                      </span>
                      <span className={`${textColor} text-sm lg:text-base font-medium font-sans tracking-wide group-hover:text-[#6366F1] transition-colors duration-200`}>
                        {faq.question}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openItems.includes(faq.id) ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 ml-2 w-6 h-6 rounded-full ${isDark ? 'bg-[#6366F1]/10' : 'bg-indigo-100'} flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-all duration-200`}
                    >
                      {openItems.includes(faq.id) ? (
                        <Minus className="w-3.5 h-3.5 text-[#6366F1]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#6366F1]" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className={`px-5 pb-4 pt-2 border-t ${borderColor}`}>
                          <div className="flex gap-3">
                            <div className="w-6 flex-shrink-0" />
                            <p className={`${subTextColor} text-xs lg:text-sm leading-relaxed font-light tracking-wide flex-1`}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full mt-12 lg:mt-16 relative"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
          </div>

          {/* Content Container */}
          <div className="relative px-6 py-8 lg:px-10 lg:py-12">
            <div className="text-center mb-8 lg:mb-10">
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-sm border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300`}>
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
                  WE&apos;RE HERE TO HELP
                </span>
              </div>
              
              <h3 className={`text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent mb-3`}>
                Want to Talk to Us?
              </h3>
              
              <p className={`text-[#94A3B8] text-sm lg:text-base max-w-md mx-auto font-light tracking-wide`}>
                Can't find what you're looking for? Our team is ready to assist you.
              </p>
            </div>

            {/* Contact Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
              {contactOptions.map((option) => {
                const Icon = option.icon;
                const FrontStatIcon = option.frontInfo.icon;
                return (
                  <div
                    key={option.id}
                    className="relative min-h-[280px] perspective-1000 cursor-pointer group"
                    onMouseEnter={() => setFlippedCard(option.id)}
                    onMouseLeave={() => setFlippedCard(null)}
                  >
                    <div
                      className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                        flippedCard === option.id ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front Side */}
                      <div className="absolute w-full h-full backface-hidden">
                        <Link href={option.action} className="block h-full">
                          <div className={`h-full ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-md border border-[#1E293B] rounded-[2.5rem] p-6 text-center transition-all duration-300 ${option.bgHover} hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/10 cursor-pointer flex flex-col items-center justify-center`}>
                            <div className="relative mb-4">
                              <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                              <div className={`relative w-20 h-20 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center shadow-lg`}>
                                <Icon className="w-10 h-10 text-white" />
                              </div>
                            </div>
                            <p className="text-[#94A3B8] text-sm mt-2 font-light tracking-wide">
                              Hover to see details
                            </p>
                          </div>
                        </Link>
                      </div>

                      {/* Back Side */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div className={`h-full bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-[2.5rem] p-6 text-center flex flex-col items-center justify-center border border-white/20 shadow-xl`}>
                          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          
                          <h4 className="text-white font-bold font-sans tracking-wide text-xl mb-3">
                            {option.title}
                          </h4>
                          
                          {option.id === 1 && (
                            <div className="space-y-2">
                              <p className="text-white/90 text-sm font-light tracking-wide">
                                {option.backInfo.email}
                              </p>
                              <p className="text-white/80 text-xs font-light tracking-wide">
                                {option.backInfo.support}
                              </p>
                            </div>
                          )}
                          
                          {option.id === 2 && (
                            <div className="space-y-2">
                              <p className="text-white text-lg font-mono font-bold">
                                {option.backInfo.primary}
                              </p>
                              <p className="text-white/80 text-xs flex items-center gap-1 justify-center font-light tracking-wide">
                                <MessageCircle className="w-3 h-3" />
                                {option.backInfo.whatsapp}
                              </p>
                              <p className="text-white/70 text-xs mt-2 font-light tracking-wide">
                                Available on WhatsApp
                              </p>
                            </div>
                          )}
                          
                          {option.id === 3 && (
                            <div className="space-y-2">
                              <p className="text-white/90 text-sm font-light tracking-wide">
                                {option.backInfo.duration}
                              </p>
                              <p className="text-white/80 text-xs font-light tracking-wide">
                                {option.backInfo.availability}
                              </p>
                            </div>
                          )}
                          
                          <Link href={option.action}>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 cursor-pointer">
                              <span className="text-white text-sm font-medium font-sans tracking-wide">
                                {option.id === 2 ? 'Call Now' : 'Get Started'}
                              </span>
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default FAQ;