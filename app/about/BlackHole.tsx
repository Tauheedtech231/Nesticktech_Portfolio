"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">

      {/* Background Video - Mobile: pushed extreme up, Desktop: normal */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -top-46 md:-top-54"
        style={{ 
          transform: "scaleY(-1)",
        }}
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 pt-32 md:pt-0">
        
        {/* Mission Vision Cards */}
<div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-10  lg:gap-16 max-w-4xl w-full mx-auto px-4">
  
  {/* Mission Card */}
  <motion.div
    whileHover={{
      scale: 1.03,
      y: -5,
    }}
    transition={{
      duration: 0.4,
      ease: "easeOut",
    }}
    className="
      relative
      overflow-hidden
      pt-12 md:pt-20
      px-4 md:px-6
      pb-6 md:pb-8
      w-full
      max-w-[320px] md:max-w-[380px]
      mx-auto
      rounded-[32px] md:rounded-[40px]
      border border-[#1E293B]
      bg-gradient-to-br from-[#0F172A]/90 to-[#0F172A]/70
      backdrop-blur-xl
      hover:border-[#6366F1]/50
      hover:shadow-2xl
      hover:shadow-[#6366F1]/10
      hover:bg-gradient-to-br
      hover:from-[#0F172A] hover:to-[#1E1B4B]/30
      transition-all
      duration-500
      cursor-pointer
      will-change-transform
      group
    "
  >
    {/* Animated gradient border effect */}
    <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] p-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/0 to-transparent group-hover:via-[#6366F1]/30 transition-all duration-700" />
    
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#6366F1]/10 blur-3xl rounded-full group-hover:bg-[#6366F1]/20 transition-all duration-500" />

    <h3 className="relative text-xl md:text-2xl font-bold tracking-wide text-[#F8FAFC] mb-2 md:mb-4 text-center bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent">
      Mission
    </h3>

    <p className="relative text-[12px] md:text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-4 md:mb-6 text-center px-2">
      Create immersive digital experiences with modern UI and innovation.
    </p>

    <ul className="relative space-y-2 md:space-y-3 text-[12px] md:text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">Modern & scalable web solutions</span>
      </li>

      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">High-performance user experiences</span>
      </li>

      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">Creative UI with smooth animations</span>
      </li>
    </ul>
  </motion.div>

  {/* Vision Card */}
  <motion.div
    whileHover={{
      scale: 1.03,
      y: -5,
    }}
    transition={{
      duration: 0.4,
      ease: "easeOut",
    }}
    className="
      relative
      overflow-hidden
      pt-12 md:pt-20
      px-4 md:px-6
      pb-6 md:pb-8
      w-full
      max-w-[320px] md:max-w-[380px]
      mx-auto
      rounded-[32px] md:rounded-[40px]
      border border-[#1E293B]
      bg-gradient-to-br from-[#0F172A]/90 to-[#0F172A]/70
      backdrop-blur-xl
      hover:border-[#6366F1]/50
      hover:shadow-2xl
      hover:shadow-[#6366F1]/10
      hover:bg-gradient-to-br
      hover:from-[#0F172A] hover:to-[#1E1B4B]/30
      transition-all
      duration-500
      cursor-pointer
      will-change-transform
      group
    "
  >
    <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] p-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/0 to-transparent group-hover:via-[#6366F1]/30 transition-all duration-700" />
    
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#6366F1]/10 blur-3xl rounded-full group-hover:bg-[#6366F1]/20 transition-all duration-500" />

    <h3 className="relative text-xl md:text-2xl font-bold tracking-wide text-[#F8FAFC] mb-2 md:mb-4 text-center bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent">
      Vision
    </h3>

    <p className="relative text-[12px] md:text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-4 md:mb-6 text-center px-2">
      Lead futuristic web experiences with AI-driven and interactive design.
    </p>

    <ul className="relative space-y-2 md:space-y-3 text-[12px] md:text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">AI-powered digital innovation</span>
      </li>

      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">Interactive and futuristic interfaces</span>
      </li>

      <li className="flex items-center gap-2 md:gap-3 group/item">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#6366F1] flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300" />
        <span className="text-left group-hover/item:text-[#E2E8F0] transition-colors duration-300">Global-quality product experiences</span>
      </li>
    </ul>
  </motion.div>
</div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        /* Mobile specific - video pushed EXTREME up */
        @media (max-width: 768px) {
          video {
            object-position: 50% -40% !important;
          }
        }
      `}</style>
    </section>
  );
}