"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background Video - unchanged */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -top-46 md:-top-54"
        style={{ transform: "scaleY(-1)" }}
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 -translate-y-10 pt-24 md:pt-0">

        {/* Heading - responsive margin to avoid navbar overlap on mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold font-serif tracking-tight mt-8 md:mt-0"
        >
          <span className="text-[#F8FAFC]">The Vision Behind </span>
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent animate-gradient">
             ARCHITECTS 
          </span>
          <span className="text-[#F8FAFC]"> OF TOMORROW</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#94A3B8] mt-4 text-base max-w-xl leading-relaxed font-light tracking-wide"
        >
          A futuristic experience powered by immersive visuals and motion design.
        </motion.p>

        {/* Mission Vision Cards */}
       <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl w-full">

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-2xl bg-[#0F172A] backdrop-blur-md border border-[#1E293B] hover:border-[#6366F1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/5"
  >
    <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-3">
      Mission
    </h3>

    <p className="text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-4">
      Create immersive digital experiences with modern UI and innovation.
    </p>

    <ul className="space-y-2 text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        Modern & scalable web solutions
      </li>

      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        High-performance user experiences
      </li>

      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        Creative UI with smooth animations
      </li>
    </ul>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-2xl bg-[#0F172A] backdrop-blur-md border border-[#1E293B] hover:border-[#6366F1]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6366F1]/5"
  >
    <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-3">
      Vision
    </h3>

    <p className="text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-4">
      Lead futuristic web experiences with AI-driven and interactive design.
    </p>

    <ul className="space-y-2 text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        AI-powered digital innovation
      </li>

      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        Interactive and futuristic interfaces
      </li>

      <li className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
        Global-quality product experiences
      </li>
    </ul>
  </motion.div>

</div>
      </div>

      {/* Animation styles */}
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
      `}</style>
    </section>
  );
}