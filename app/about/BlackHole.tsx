"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">

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
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 -translate-y-10 pt-24 md:pt-0">

        {/* Mission Vision Cards - removed heading and description */}
<div className="mt-10 grid md:grid-cols-2 gap-6 max-w-3xl w-full">

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
      pt-20
      px-5
      pb-8
      w-full
      max-w-[320px]
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
      borderTopLeftRadius: "180px",
      borderTopRightRadius: "180px",
    }}
  >

    {/* Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#6366F1]/10 blur-3xl rounded-full" />

    <h3 className="relative text-2xl font-semibold tracking-wide text-[#F8FAFC] mb-4 text-center">
      Mission
    </h3>

    <p className="relative text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-6 text-center">
      Create immersive digital experiences with modern UI and innovation.
    </p>

    <ul className="relative space-y-3 text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
        Modern & scalable web solutions
      </li>

      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
        High-performance user experiences
      </li>

      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
        Creative UI with smooth animations
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
      pt-20
      px-5
      pb-8
      w-full
      max-w-[320px]
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
      borderTopLeftRadius: "180px",
      borderTopRightRadius: "180px",
    }}
  >

    {/* Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#6366F1]/10 blur-3xl rounded-full" />

    <h3 className="relative text-2xl font-semibold tracking-wide text-[#F8FAFC] mb-4 text-center">
      Vision
    </h3>

    <p className="relative text-sm text-[#94A3B8] font-light tracking-wide leading-relaxed mb-6 text-center">
      Lead futuristic web experiences with AI-driven and interactive design.
    </p>

    <ul className="relative space-y-3 text-sm text-[#CBD5E1]">
      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
        AI-powered digital innovation
      </li>

      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
        Interactive and futuristic interfaces
      </li>

      <li className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
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