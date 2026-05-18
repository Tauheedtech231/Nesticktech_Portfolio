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
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl w-full mx-auto">
          
          {/* Mission Card */}
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -2,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              relative
              overflow-hidden
              pt-12 md:pt-20
              px-3 md:px-5
              pb-4 md:pb-8
              w-full
              max-w-[280px] md:max-w-[320px]
              mx-auto
              rounded-b-none
              border border-[#1E293B]
              bg-[#0F172A]/90
              backdrop-blur-md
              hover:border-[#6366F1]/30
              hover:shadow-xl
              hover:shadow-[#6366F1]/5
              transition-all
              duration-500
              cursor-pointer
              will-change-transform
            "
            style={{
              borderTopLeftRadius: "120px",
              borderTopRightRadius: "120px",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 md:w-44 md:h-44 bg-[#6366F1]/10 blur-3xl rounded-full" />

            <h3 className="relative text-lg md:text-2xl font-semibold tracking-wide text-[#F8FAFC] mb-2 md:mb-4 text-center">
              Mission
            </h3>

            <p className="relative text-[11px] md:text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-3 md:mb-6 text-center px-1">
              Create immersive digital experiences with modern UI and innovation.
            </p>

            <ul className="relative space-y-1.5 md:space-y-3 text-[11px] md:text-sm text-[#CBD5E1]">
              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">Modern & scalable web solutions</span>
              </li>

              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">High-performance user experiences</span>
              </li>

              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">Creative UI with smooth animations</span>
              </li>
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -2,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              relative
              overflow-hidden
              pt-12 md:pt-20
              px-3 md:px-5
              pb-4 md:pb-8
              w-full
              max-w-[280px] md:max-w-[320px]
              mx-auto
              rounded-b-none
              border border-[#1E293B]
              bg-[#0F172A]/90
              backdrop-blur-md
              hover:border-[#6366F1]/30
              hover:shadow-xl
              hover:shadow-[#6366F1]/5
              transition-all
              duration-500
              cursor-pointer
              will-change-transform
            "
            style={{
              borderTopLeftRadius: "120px",
              borderTopRightRadius: "120px",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 md:w-44 md:h-44 bg-[#6366F1]/10 blur-3xl rounded-full" />

            <h3 className="relative text-lg md:text-2xl font-semibold tracking-wide text-[#F8FAFC] mb-2 md:mb-4 text-center">
              Vision
            </h3>

            <p className="relative text-[11px] md:text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-3 md:mb-6 text-center px-1">
              Lead futuristic web experiences with AI-driven and interactive design.
            </p>

            <ul className="relative space-y-1.5 md:space-y-3 text-[11px] md:text-sm text-[#CBD5E1]">
              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">AI-powered digital innovation</span>
              </li>

              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">Interactive and futuristic interfaces</span>
              </li>

              <li className="flex items-center gap-1.5 md:gap-3">
                <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#6366F1] flex-shrink-0" />
                <span className="text-left">Global-quality product experiences</span>
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