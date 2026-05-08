/* eslint-disable react/no-unescaped-entities */
// components/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, HelpCircle, Mail, Phone, Send, Sparkles, ArrowRight, MessageCircle, Clock, Award, Users } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const phoneNumber = "923193236529";
  const formattedPhoneNumber = `+${phoneNumber}`;

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What services does Nestick Tech offer?",
      answer: "We offer a comprehensive range of digital solutions including Web Development, POS Systems, LMS Platforms, Mobile Apps, AI Solutions, and IT/Cyber Security services. Our team specializes in creating custom, scalable solutions tailored to your business needs.",
    },
    {
      id: 2,
      question: "How long does it take to develop a project?",
      answer: "Project timelines vary depending on complexity and requirements. A typical web application can take 2-4 months, while more complex projects like AI systems or comprehensive POS solutions may take 4-6 months. We provide detailed timelines during the consultation phase.",
    },
    {
      id: 3,
      question: "What technologies do you use?",
      answer: "We use modern technologies including React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, and various cloud platforms. Our tech stack is chosen to ensure scalability, performance, and maintainability of your project.",
    },
    {
      id: 4,
      question: "Do you provide ongoing support after launch?",
      answer: "Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements. We have flexible support plans to suit different business needs.",
    },
    {
      id: 5,
      question: "How much does a typical project cost?",
      answer: "Project costs vary based on requirements, complexity, and timeline. We provide transparent pricing and detailed quotes after understanding your specific needs. Contact us for a free consultation and estimate.",
    },
    {
      id: 6,
      question: "Can you integrate with existing systems?",
      answer: "Absolutely! We specialize in integrating new solutions with your existing infrastructure. Whether it's legacy systems, third-party APIs, or existing databases, we ensure seamless integration and data flow.",
    },
    {
      id: 7,
      question: "What is your development process?",
      answer: "Our process includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development & Testing, 4) Deployment & Launch, and 5) Ongoing Support. We follow agile methodology with regular client updates.",
    },
    {
      id: 8,
      question: "Do you work with startups?",
      answer: "Yes, we love working with startups! We offer flexible engagement models and scalable solutions that grow with your business. Our team helps startups from MVP development to full-scale products.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Optimized animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants:Variants = {
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

  const contactOptions = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      action: "/contact",
      linkText: "Send Message",
      color: "from-blue-500 to-cyan-500",
      bgHover: "hover:bg-blue-500/10",
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
      color: "from-green-500 to-emerald-500",
      bgHover: "hover:bg-green-500/10",
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
      color: "from-purple-500 to-pink-500",
      bgHover: "hover:bg-purple-500/10",
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

  return (
    <section className="relative py-16 lg:py-20 bg-[#020617] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Services Section Font Styles */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mb-10 lg:mb-12 text-left"
        >
          {/* Badge - Italic */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300">
            <HelpCircle className="w-4 h-4 text-[#6366F1]" />
            <span className="text-sm font-medium font-sans tracking-wide text-[#6366F1] italic">
              FAQ
            </span>
          </div>
          
          {/* Heading - Services section style */}
          <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-3">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          {/* Description - Services section style */}
          <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl font-light tracking-wide">
            Find answers to common questions about our services and process.
          </p>
          
          <div className="mt-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
          </div>
        </motion.div>

        {/* FAQ Items - Services section font styles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full"
        >
          {faqData.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="mb-2 w-full"
            >
              <div
                className={`bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden transition-all duration-200 w-full ${
                  openItems.includes(faq.id) ? 'shadow-md shadow-[#6366F1]/10' : ''
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-5 h-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] text-[10px] font-bold">
                      {faq.id}
                    </span>
                    <span className="text-[#F8FAFC] text-sm lg:text-base font-medium font-sans tracking-wide group-hover:text-[#6366F1] transition-colors duration-200">
                      {faq.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex-shrink-0 ml-2"
                  >
                    <ChevronDown className={`w-4 h-4 ${
                      openItems.includes(faq.id) ? 'text-[#6366F1]' : 'text-[#94A3B8]'
                    }`} />
                  </motion.div>
                </button>

                {/* Answer Panel */}
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3.5 pt-2 border-t border-[#1E293B]">
                        <div className="flex gap-2">
                          <div className="w-5 flex-shrink-0" />
                          <p className="text-[#94A3B8] text-xs lg:text-sm leading-relaxed font-light tracking-wide flex-1">
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

        {/* Still Have Questions Section - Updated font styles */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full mt-12 lg:mt-16 relative"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/80 to-[#0F172A]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
          </div>

          {/* Content Container */}
          <div className="relative px-6 py-8 lg:px-10 lg:py-12">
            {/* Header - Services section font styles */}
            <div className="text-center mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F172A]/80 backdrop-blur-sm border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
                  WE&apos;RE HERE TO HELP
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent mb-3">
                Still Have Questions?
              </h3>
              
              <p className="text-[#94A3B8] text-sm lg:text-base max-w-md mx-auto font-light tracking-wide">
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
                    className="relative h-[280px] perspective-1000 cursor-pointer group"
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
                          <div className={`h-full bg-[#0F172A]/80 backdrop-blur-md border border-[#1E293B] rounded-xl p-6 text-center transition-all duration-300 ${option.bgHover} hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/10 cursor-pointer`}>
                            {/* Icon Container */}
                            <div className="relative mb-4">
                              <div className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                              <div className={`relative w-14 h-14 mx-auto bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center shadow-lg`}>
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                            
                            {/* Title - Services section font style */}
                            <h4 className="text-white font-semibold font-sans tracking-wide text-lg lg:text-xl mb-2">
                              {option.title}
                            </h4>
                            
                            {/* Description - Services section font style */}
                            <p className="text-[#94A3B8] text-sm mb-3 font-light tracking-wide">
                              {option.description}
                            </p>
                            
                            {/* Front Stats */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6366F1]/10 rounded-full mb-3">
                              <FrontStatIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                              <span className="text-[#6366F1] text-xs font-medium font-sans tracking-wide">
                                {option.frontInfo.stats}
                              </span>
                            </div>
                            
                            {/* Link */}
                            <div className="inline-flex items-center gap-1 text-[#6366F1] text-sm font-medium font-sans tracking-wide group-hover:gap-2 transition-all duration-300">
                              <span>{option.linkText}</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Back Side */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div className={`h-full bg-gradient-to-br ${option.color} rounded-xl p-6 text-center flex flex-col items-center justify-center border border-white/20 shadow-xl`}>
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