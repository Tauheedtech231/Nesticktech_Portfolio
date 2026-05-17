/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Building2, ShoppingCart, TrendingUp, Store, ChevronRight } from "lucide-react";
import PartnerCollaboratorPage from "./PartnerSection";

gsap.registerPlugin(ScrollTrigger);

// Product data with 4 images per product (scroll steps = 4 per product)
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
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBvcnRmb2xpb3xlbnwwfHwwfHx8MA%3D%3D",
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
     "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UE9TfGVufDB8fDB8fHww",
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
      "https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q29uc3RydWN0aW9ufGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".product-panel");

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${TOTAL_STEPS * 400}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawStep = self.progress * TOTAL_STEPS;
            const currentStep = Math.min(TOTAL_STEPS - 1, Math.floor(rawStep));
            
            const productIdx = Math.min(
              products.length - 1,
              Math.floor(currentStep / IMAGES_PER_PRODUCT)
            );
            const imageIdx = currentStep % IMAGES_PER_PRODUCT;
            
            setActiveProductIndex(productIdx);
            setActiveImageIndex(imageIdx);

            items.forEach((el, i) => {
              const offset = i - productIdx;
              gsap.to(el, {
                y: offset * 140,
                scale: i === productIdx ? 1 : 0.85,
                opacity: i === productIdx ? 1 : 0.25,
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              });
            });
          },
        });

        scrollTriggerRef.current = st;
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

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
      <section ref={sectionRef} className="relative h-screen overflow-hidden text-white mt-16 md:mt-20">
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

        {/* Step Indicator */}
        <div className="absolute top-20 left-0 right-0 z-30">
          <div className="flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              {products.map((product, pIdx) => {
                const isActiveProduct = pIdx === activeProductIndex;
                const isPassedProduct = pIdx < activeProductIndex;
                return (
                  <div key={pIdx} className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center">
                        <div 
                          className={`relative flex items-center justify-center transition-all duration-500 ${
                            isActiveProduct ? 'w-10 h-10 md:w-12 md:h-12' : 'w-6 h-6 md:w-8 md:h-8'
                          }`}
                        >
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
                      
                      {/* Image Dots */}
                      {/* <div className="flex gap-1.5 mt-2">
                        {Array.from({ length: IMAGES_PER_PRODUCT }).map((_, imgIdx) => {
                          const isActiveImage = isActiveProduct && imgIdx === activeImageIndex;
                          const isCompletedImage = isPassedProduct || (isActiveProduct && imgIdx < activeImageIndex);
                          return (
                            <div
                              key={imgIdx}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                isActiveImage ? 'w-4 bg-indigo-400' : 
                                isCompletedImage ? 'w-2 bg-indigo-400/60' : 'w-2 bg-white/20'
                              }`}
                            />
                          );
                        })}
                      </div> */}
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

        {/* Main Content */}
        <div className="relative mt-[5rem] flex h-full items-center justify-center">
          {products.map((product, pIdx) => (
            <div
              key={pIdx}
              className="product-panel absolute w-full max-w-7xl px-6"
              style={{ zIndex: products.length - pIdx }}
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
                  
                  {pIdx === activeProductIndex && (
                    <div className="mt-4 text-xs text-indigo-300/70 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                      Image {activeImageIndex + 1} of {IMAGES_PER_PRODUCT}
                    </div>
                  )}
                </div>

                {/* CENTER - Dynamic Image */}
                <div className="md:col-span-3 flex justify-center">
                  <div className="group relative cursor-pointer">
                    <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {pIdx === activeProductIndex ? (
                      <div className="relative transition-all duration-700 ease-out">
                        <Image
                          src={currentImageUrl}
                          alt={`${product.title} view ${activeImageIndex + 1}`}
                          width={560}
                          height={420}
                          className="
                            relative
                            h-[320px]
                            w-[500px]
                            md:h-[380px]
                            md:w-[560px]
                            rounded-2xl
                            object-cover
                            shadow-2xl
                            border
                            border-white/10
                            transition-all
                            duration-700
                            ease-out
                            group-hover:scale-105
                            group-hover:-translate-y-2
                            group-hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]
                          "
                          priority={activeImageIndex === 0}
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] text-white/80">
                          {activeImageIndex + 1}/{IMAGES_PER_PRODUCT}
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={560}
                        height={420}
                        className="
                          relative
                          h-[320px]
                          w-[500px]
                          md:h-[380px]
                          md:w-[560px]
                          rounded-2xl
                          object-cover
                          shadow-2xl
                          border
                          border-white/10
                          opacity-70
                          transition-all
                          duration-500
                        "
                      />
                    )}
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
          ))}
        </div>

        {/* Next Button */}
        {currentGlobalStep < TOTAL_STEPS - 1 && (
          <button
            onClick={goToNextStep}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-full px-6 py-3 transition-all duration-300 cursor-pointer group flex items-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            <span className="text-sm text-white font-semibold">
              Next Image ({activeImageIndex + 1}/{IMAGES_PER_PRODUCT})
            </span>
            <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        )}

       
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
              ✕
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
              <form className="space-y-3 text-left">
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