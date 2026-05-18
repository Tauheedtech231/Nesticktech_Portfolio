/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Building2, ShoppingCart, TrendingUp, Store, ChevronRight, ChevronLeft, X } from "lucide-react";
import PartnerCollaboratorPage from "./PartnerSection";

interface Product {
  title: string;
  desc: string;
  images: string[];
  tags: string[];
  status: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    title: "Neezamiya",
    desc: "Complete educational management system for schools and universities",
    images: [
      "/neezamiya.jpg",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    ],
    tags: ["Education", "LMS", "School Management"],
    status: "Live",
    icon: <Building2 className="w-7 h-7 text-indigo-400" />,
  },
  {
    title: "Advance POS",
    desc: "Smart point of sale system for retail businesses",
    images: [
      "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    ],
    tags: ["Retail", "POS", "Inventory"],
    status: "Live",
    icon: <ShoppingCart className="w-7 h-7 text-indigo-400" />,
  },
  {
    title: "MarX",
    desc: "Digital marketing suite for modern businesses",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    ],
    tags: ["Marketing", "Automation", "CRM"],
    status: "In Development",
    icon: <TrendingUp className="w-7 h-7 text-indigo-400" />,
  },
  {
    title: "Build N",
    desc: "Construction project management software",
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      "https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=600&auto=format&fit=crop&q=60",
    ],
    tags: ["Construction", "Project"],
    status: "Concept",
    icon: <Store className="w-7 h-7 text-indigo-400" />,
  },
];

const IMAGES_PER_PRODUCT = 4;
const TOTAL_STEPS = products.length * IMAGES_PER_PRODUCT;

export default function CinematicShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const isMountedRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<{ start: number; end: number } | null>(null);

  // Handle scroll-based animation
  useEffect(() => {
    isMountedRef.current = true;
    
    const handleScroll = () => {
      if (!sectionRef.current || !isMountedRef.current) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !isMountedRef.current) return;
        
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const sectionTop = rect.top + scrollTop;
        const scrollPosition = window.scrollY - sectionTop;
        const sectionHeight = rect.height;
        
        let progress = scrollPosition / sectionHeight;
        progress = Math.min(0.99, Math.max(0, progress));
        
        const currentStep = Math.floor(progress * TOTAL_STEPS);
        const productIdx = Math.min(
          products.length - 1,
          Math.floor(currentStep / IMAGES_PER_PRODUCT)
        );
        const imageIdx = currentStep % IMAGES_PER_PRODUCT;
        
        setActiveProductIndex(productIdx);
        setActiveImageIndex(imageIdx);
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      scrollTriggerRef.current = {
        start: rect.top + window.scrollY,
        end: rect.top + window.scrollY + rect.height
      };
    }
    
    return () => {
      isMountedRef.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateScrollTrigger = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        scrollTriggerRef.current = {
          start: rect.top + window.scrollY,
          end: rect.top + window.scrollY + rect.height
        };
      }
    };
    
    window.addEventListener('resize', updateScrollTrigger);
    return () => window.removeEventListener('resize', updateScrollTrigger);
  }, []);

  // Next button click - ek scroll automatic
  const goToNextStep = () => {
    if (!scrollTriggerRef.current) return;
    
    const currentStep = activeProductIndex * IMAGES_PER_PRODUCT + activeImageIndex;
    if (currentStep < TOTAL_STEPS - 1) {
      const nextStep = currentStep + 1;
      const newProgress = nextStep / TOTAL_STEPS;
      const start = scrollTriggerRef.current.start;
      const end = scrollTriggerRef.current.end;
      const scrollDistance = end - start;
      const targetScroll = start + scrollDistance * newProgress;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Previous button click
  const goToPrevStep = () => {
    if (!scrollTriggerRef.current) return;
    
    const currentStep = activeProductIndex * IMAGES_PER_PRODUCT + activeImageIndex;
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const newProgress = prevStep / TOTAL_STEPS;
      const start = scrollTriggerRef.current.start;
      const end = scrollTriggerRef.current.end;
      const scrollDistance = end - start;
      const targetScroll = start + scrollDistance * newProgress;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const currentProduct = products[activeProductIndex];
  const currentImageUrl = currentProduct?.images[activeImageIndex] || currentProduct?.images[0];
  const currentGlobalStep = activeProductIndex * IMAGES_PER_PRODUCT + activeImageIndex;
  
  return (
    <>
      <section ref={sectionRef} className="relative h-[1600vh] text-white">
        <div className="sticky top-0 h-screen overflow-hidden">
          
          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop"
              alt="background"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* DESKTOP UI - Shows full layout */}
          <div className="hidden md:block relative h-full">
            {/* Step Indicator */}
            <div className="absolute top-20 left-0 right-0 z-30">
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                  {products.map((product, pIdx) => {
                    const isActiveProduct = pIdx === activeProductIndex;
                    const isPassedProduct = pIdx < activeProductIndex;
                    return (
                      <div key={product.title} className="flex flex-col items-center">
                        <div className="flex items-center">
                          <div className={`relative flex items-center justify-center transition-all duration-500 ${
                            isActiveProduct ? 'w-10 h-10 md:w-12 md:h-12' : 'w-6 h-6 md:w-8 md:h-8'
                          }`}>
                            {isActiveProduct && (
                              <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
                            )}
                            <div className={`rounded-full transition-all duration-300 flex items-center justify-center ${
                              isActiveProduct ? 'bg-indigo-500 w-full h-full' : 
                              isPassedProduct ? 'bg-indigo-400/60 w-full h-full' : 'bg-white/20 w-full h-full'
                            }`}>
                              <span className={`text-xs font-bold ${isActiveProduct ? 'text-white' : 'text-white/70'}`}>
                                {pIdx + 1}
                              </span>
                            </div>
                          </div>
                          <span className={`ml-2 text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                            isActiveProduct ? 'text-indigo-400' : isPassedProduct ? 'text-white/60' : 'text-white/30'
                          }`}>
                            {product.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 text-xs text-white/50 bg-black/40 px-3 py-1 rounded-full">
                  Image {activeImageIndex + 1} / {IMAGES_PER_PRODUCT} • Product {activeProductIndex + 1} / {products.length}
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="relative h-full flex items-start justify-center pt-24 md:pt-32">
              {products.map((product, pIdx) => {
                const isActive = pIdx === activeProductIndex;
                const offset = pIdx - activeProductIndex;
                
                return (
                  <div
                    key={product.title}
                    className="absolute w-full max-w-7xl px-6 transition-all duration-500"
                    style={{
                      transform: `translateY(${offset * 140}px) scale(${isActive ? 1 : 0.85})`,
                      opacity: isActive ? 1 : 0.25,
                      zIndex: isActive ? 10 : 1,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-6">
                      {/* LEFT */}
                      <div className="md:col-span-1 text-left">
                        <div className="text-sm text-indigo-400">
                          0{pIdx + 1} — PRODUCT
                        </div>
                        <div className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                          {product.status}
                        </div>
                        <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                          {product.title}
                        </h2>
                        <p className="mt-4 text-white/60 text-sm md:text-base">
                          {product.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {isActive && (
                          <div className="mt-4 text-xs text-indigo-300/70 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                            Image {activeImageIndex + 1} of {IMAGES_PER_PRODUCT}
                          </div>
                        )}
                      </div>

                      {/* CENTER - Image */}
                      <div className="md:col-span-3 flex justify-center">
                        <div className="group relative cursor-pointer">
                          <Image
                            src={isActive ? currentImageUrl : product.images[0]}
                            alt={`${product.title} view`}
                            width={640}
                            height={480}
                            className={`relative h-[360px] w-[540px] md:h-[440px] md:w-[600px] rounded-2xl object-cover shadow-2xl border border-white/20 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 ${
                              !isActive && 'opacity-50 blur-[2px]'
                            }`}
                            priority={isActive && activeImageIndex === 0}
                          />
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="md:col-span-1 flex flex-col items-end gap-4">
                        <button 
                          onClick={() => openModal(product)}
                          className="rounded-xl bg-white cursor-pointer px-6 py-3 text-black font-medium hover:scale-105 transition"
                        >
                          Request Demo
                        </button>
                        <div className="mt-2 text-sm text-white/60 text-right">
                          📞 03237594869
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE UI - Fixed margin, card with demo button, image, and 2 arrows */}
          <div className="block md:hidden relative h-full flex items-center justify-center px-4">
            <div className="w-full max-w-sm mt-[-40px]">
              {/* Card Container */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
                {/* Image Section */}
                <div className="relative w-full h-64 bg-black/30">
                  <Image
                    src={currentImageUrl}
                    alt={currentProduct?.title || "Product"}
                    fill
                    className="object-cover"
                  />
                  {/* Image Counter Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] text-white/80">
                    {activeImageIndex + 1}/{IMAGES_PER_PRODUCT}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {currentProduct?.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                      {currentProduct?.status}
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-xs mb-3 line-clamp-2">
                    {currentProduct?.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {currentProduct?.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Demo Button */}
                  <button
                    onClick={() => openModal(currentProduct!)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all duration-200"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  onClick={goToPrevStep}
                  disabled={currentGlobalStep === 0}
                  className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-30 disabled:active:scale-100"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">Previous</span>
                </button>
                
                <button
                  onClick={goToNextStep}
                  disabled={currentGlobalStep >= TOTAL_STEPS - 1}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-30 disabled:active:scale-100"
                >
                  <span className="text-white text-sm font-medium">Next</span>
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Product Progress */}
              <div className="mt-4 text-center">
                <div className="flex justify-center gap-1">
                  {products.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === activeProductIndex
                          ? 'w-6 bg-indigo-400'
                          : idx < activeProductIndex
                          ? 'w-2 bg-indigo-400/60'
                          : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-white/40 mt-2">
                  Product {activeProductIndex + 1} of {products.length}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Next Button */}
          {currentGlobalStep < TOTAL_STEPS - 1 && (
            <button
              onClick={goToNextStep}
              className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-full px-6 py-3 transition-all duration-300 cursor-pointer group flex items-center gap-2 shadow-lg shadow-indigo-500/25 hidden md:flex"
            >
              <span className="text-sm text-white font-semibold">
                Next Image ({activeImageIndex + 1}/{IMAGES_PER_PRODUCT})
              </span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-indigo-500/20 flex items-center justify-center">
                {selectedProduct.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Request Demo - {selectedProduct.title}
              </h3>
              <p className="text-white/60 mb-5 text-sm">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <form className="space-y-3 text-left" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requirements?"
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition duration-200 cursor-pointer"
                >
                  Submit Request
                </button>
              </form>
              <p className="text-xs text-white/40 mt-4">
                We'll contact you shortly to schedule a personalized demo.
              </p>
            </div>
          </div>
        </div>
      )}
      <PartnerCollaboratorPage />
    </>
  );
}