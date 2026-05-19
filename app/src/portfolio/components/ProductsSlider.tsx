/* eslint-disable react-hooks/set-state-in-effect */
// components/PartnersSlider.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Calendar, Users, Star } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  image: string;
  description: string;
  established: string;
  projects: number;
  rating: number;
}

const partnersData: Partner[] = [
  { 
    id: 1, 
    name: "Saqfiyat", 
    image: "/p1.jpg", 
    description: "Saqfiyat is a leading educational technology company specializing in innovative learning management systems and digital education solutions. They have transformed over 500+ schools with their cutting-edge platforms.", 
    established: "2018", 
    projects: 500, 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: "Skeler Security", 
    image: "/p2.jpg", 
    description: "Skeler Security provides enterprise-grade cybersecurity solutions, protecting businesses from digital threats with advanced AI-powered security systems and 24/7 monitoring.", 
    established: "2019", 
    projects: 300, 
    rating: 4.9 
  },
  { 
    id: 3, 
    name: "Futurizm", 
    image: "/p3.jpg", 
    description: "Futurizm is a digital innovation hub helping startups and businesses transform their ideas into scalable digital products with cutting-edge technology.", 
    established: "2020", 
    projects: 200, 
    rating: 4.7 
  },
  { 
    id: 4, 
    name: "Pixsy Studio", 
    image: "/p4.jpg", 
    description: "Pixsy Studio is a creative design agency delivering stunning visual identities, UI/UX designs, and brand experiences for modern businesses worldwide.", 
    established: "2017", 
    projects: 800, 
    rating: 4.9 
  },
];

const PartnersSlider = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duplicatedPartners, setDuplicatedPartners] = useState<Partner[]>([]);

  // Create seamless infinite loop - enough copies to fill the screen and beyond
  useEffect(() => {
    // Create 8-10 copies for seamless infinite loop (ensures no gaps)
    const copies = [...partnersData, ...partnersData, ...partnersData, ...partnersData, ...partnersData, ...partnersData, ...partnersData, ...partnersData];
    setDuplicatedPartners(copies);
  }, []);

  // Scroll parallax effect for the slider
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Continuous infinite scroll - uses modulo logic to create seamless loop
  // Range from -800 to 800 to accommodate many copies
  const sliderX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, -200, -400, -600, -800]);
  
  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  // Animation variants
  const fromBottomVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  // Modal escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-8 sm:py-10 bg-gradient-to-b from-[#0A0F1E] to-[#020617] overflow-x-clip"
      >
        {/* Parallax Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute inset-0"
            style={{ y: bgY }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.03)_25%,rgba(99,102,241,0.03)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.03)_75%)] bg-[size:40px_40px] animate-[shift_20s_linear_infinite]" />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#6366F1]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl animate-pulse delay-500" />
          </motion.div>
        </div>

        <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-x-clip">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-5 md:mb-6"
            style={{ opacity: sectionOpacity }}
          >
            <motion.h2 
              variants={fromBottomVariants}
              className="text-xl md:text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent"
            >
              Trusted By Industry Leaders
            </motion.h2>
          </motion.div>

          {/* Container with scroll-based slider - Seamless infinite loop */}
          <div className="relative w-full overflow-x-clip">
            <motion.div 
              variants={fromBottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative w-full"
              style={{
                x: sliderX,
              }}
            >
              {/* Slider - Seamless loop with no gaps */}
              <div className="flex gap-8 md:gap-12 lg:gap-16 items-center py-4 w-max">
                {duplicatedPartners.map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 group cursor-pointer"
                    onClick={() => handlePartnerClick(partner)}
                  >
                    <div className="flex flex-col items-center justify-center transition-all duration-300">
                      {/* Image Container */}
                      <div className="relative mb-1 md:mb-2">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                        <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center border border-[#334155] group-hover:border-[#6366F1] transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#6366F1]/20 overflow-hidden">
                          <Image
                            src={partner.image}
                            alt={partner.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                          />
                        </div>
                      </div>
                      
                      {/* Partner Name */}
                      <span className="text-[10px] sm:text-xs md:text-sm font-medium font-sans tracking-wide text-[#E2E8F0] group-hover:text-[#6366F1] transition-colors duration-300 text-center whitespace-nowrap">
                        {partner.name}
                      </span>
                      
                      {/* Subtle underline effect */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] group-hover:w-full transition-all duration-300 mt-0.5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shift {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 80px 80px;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.05);
            }
          }
          
          .animate-pulse {
            animation: pulse 4s ease-in-out infinite;
          }
          
          .delay-1000 {
            animation-delay: 1000ms;
          }
          
          .delay-500 {
            animation-delay: 500ms;
          }
        `}</style>
      </section>

      {/* Partner Details Modal */}
      {isModalOpen && selectedPartner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-32 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute -bottom-10 left-6">
                <div className="relative w-20 h-20 rounded-full border-4 border-[#0F172A] overflow-hidden bg-[#1E293B]">
                  <Image
                    src={selectedPartner.image}
                    alt={selectedPartner.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-12">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold font-serif tracking-tight text-white">
                    {selectedPartner.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span className="text-xs text-[#94A3B8]">Est. {selectedPartner.established}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#6366F1]" />
                      <span className="text-xs text-[#94A3B8]">{selectedPartner.projects}+ Projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-[#94A3B8]">{selectedPartner.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[#94A3B8] leading-relaxed font-light tracking-wide mb-6">
                {selectedPartner.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1.5 bg-[#1E293B] text-[#6366F1] rounded-full border border-[#6366F1]/30">
                  Trusted Partner
                </span>
                <span className="text-xs px-3 py-1.5 bg-[#1E293B] text-[#22C55E] rounded-full border border-[#22C55E]/30">
                  Verified
                </span>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PartnersSlider;