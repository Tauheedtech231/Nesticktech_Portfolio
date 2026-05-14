// app/hero/page.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const HeroPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Text animations - left/right entry
  const titleX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  const subtitleX = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  const storyX = useTransform(scrollYProgress, [0.2, 0.5], [-80, 0]);
  const storyOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  
  const missionX = useTransform(scrollYProgress, [0.3, 0.6], [80, 0]);
  const missionOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Stats data - dynamic
  const stats = [
    { label: 'PROJECTS', value: '50+', icon: '🚀' },
    { label: 'CLIENTS', value: '100+', icon: '🤝' },
    { label: 'TEAM', value: '7 Experts', icon: '👨‍💻' },
    { label: 'SINCE', value: '2022', icon: '📅' },
  ];

  return (
    <main className="min-h-screen bg-[#020617] overflow-hidden">
      {/* Cinematic Hero Section */}
      <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4ukB-oFFQCQlS_--KiDPWKYlAkbEdRxojFAz3V1B07KZQlt3kaV2rFrt4gZ5TBF8QAkhuW-YR7Udl2Y77MYszRcAEmd_apEOcDFTCgaTcrg2oabjeajzmk2FC5xcAwBBzD1Y5Zg59R9UsbjcOShDyfSVUdKrOsSpYZ8uY7MJdIdiu1tZpaFw3w8QNT1euQBVJsQe21qYW6Kl1jtU02DpWZRi7AjGc9c1-6sz8BOyAqLC4WWPQFiMEF2kFvrus5chpMaaJVwbQQVBo"
              alt="Black Hole Singularity"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-0 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-2.5 rounded-full transition-all duration-300 ${
                    i < 4 ? 'bg-[#6366F1] shadow-[0_0_8px_#6366F1]' : 'bg-[#1A1A1A]'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1
            style={{ x: titleX, opacity: titleOpacity }}
            className="text-2xl md:text-4xl  font-bold font-serif tracking-tight text-[#F8FAFC] mb-4"
          >
            The{' '}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              Masterminds
            </span>
            <span className="text-[#F8FAFC]"> Behind Innovation</span>
          </motion.h1>

          <motion.p
            style={{ x: subtitleX, opacity: subtitleOpacity }}
            className="text-sm md:text-base text-[#94A3B8] max-w-2xl mx-auto border-l border-[#6366F1]/40 pl-4 text-left"
          >
            Expert developers and creative designers crafting innovative digital solutions.
          </motion.p>
        </div>

        {/* Coordinates - Bottom Left */}
        <div className="absolute bottom-12 left-4 md:left-12 hidden md:block">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#6366F1]">Founded</span>
            <span className="text-xs text-[#e2e2e2]">2022</span>
          </div>
        </div>
      </section>

      {/* Stats Section - Dynamic */}
      <section ref={statsRef} className="py-10 bg-[#0e0e0e] border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 justify-between items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-[10px] text-[#6366F1] border border-[#6366F1]/40 px-2 py-0.5">{stat.label}</span>
              <span className="text-xs text-[#e2e2e2]">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section - Story & Mission with Scroll Animation */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqYHBMweDx_aZd__rPFqMq7giBMRS8BGLkLXEkAWYGSVg4SnaWlrRcMoB_yKRDePrkL93hQZ8FUdxoAALnZY8Zr_3IR2Zjl5KjNuajT1xnX0dqPszuvYYDIOk14Xg7lrJkbZ4VdtYLciVt5WKAHMRQqltzc4Nsl3OVyNSCVZlvrQFXh5nEvIBNfA6qzqpxeosANyMxKYFUUDKmtaicY8tQ7lF2hanHS4chwrzMaTVhDwvLGY-yMs9yv1mNmEM8KCULgTYi334G5GOn"
              alt="Galaxy"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.span
              style={{ x: storyX, opacity: storyOpacity }}
              className="text-[10px] uppercase tracking-[0.2em] text-[#6366F1] mb-3 block"
            >
              Our Journey
            </motion.span>
            
            <motion.h2
              style={{ x: storyX, opacity: storyOpacity }}
              className="text-2xl md:text-4xl  font-bold font-serif text-[#F8FAFC] mb-8"
            >
              FROM VISION TO REALITY
            </motion.h2>
            
            <div className="space-y-10 border-l border-[#6366F1]/50 pl-8">
              <motion.div
                style={{ x: storyX, opacity: storyOpacity }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-1.5 h-1.5 bg-[#6366F1] rounded-full shadow-[0_0_6px_#6366F1]" />
                <h4 className="text-base font-semibold text-[#6366F1] mb-1">Our Story</h4>
                <p className="text-sm text-[#94A3B8]">
                  Founded in 2022, Nestick Tech started with a simple mission: to help businesses leverage technology for growth and innovation. What began as a small team of passionate developers has grown into a full-service digital agency serving clients worldwide.
                </p>
                <p className="text-sm text-[#94A3B8] mt-2">
                  Today, we&apos;re proud to have delivered 50+ successful projects across various industries, from e-commerce and education to healthcare and finance.
                </p>
              </motion.div>
              
              <motion.div
                style={{ x: missionX, opacity: missionOpacity }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-1.5 h-1.5 bg-[#5c4037] rounded-full" />
                <h4 className="text-base font-semibold text-[#F8FAFC] mb-1">Our Mission</h4>
                <p className="text-sm text-[#94A3B8]">
                  To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in building long-term partnerships with our clients, understanding their unique challenges, and delivering solutions that exceed expectations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroPage;