"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  ShoppingBag,
  Building2,
  Rocket,
  Landmark,
  Heart,
} from "lucide-react";
import { useRef } from "react";

const industriesData = [
  { id: 1, name: "Education", icon: GraduationCap, desc: "LMS & e-learning solutions" },
  { id: 2, name: "E-commerce", icon: ShoppingBag, desc: "Online stores & payments" },
  { id: 3, name: "Construction", icon: Building2, desc: "Project & site management" },
  { id: 4, name: "Startups", icon: Rocket, desc: "MVP & scaling solutions" },
  { id: 5, name: "Finance", icon: Landmark, desc: "Secure transactions & compliance" },
  { id: 6, name: "Medical", icon: Heart, desc: "Healthcare & telemedicine" },
];

export default function Home() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const transforms = [
    { x: useTransform(scrollYProgress, [0, 1], [-250, 0]), y: useTransform(scrollYProgress, [0, 1], [-80, 0]), rotate: useTransform(scrollYProgress, [0, 1], [-15, 0]) },
    { x: useTransform(scrollYProgress, [0, 1], [0, 0]), y: useTransform(scrollYProgress, [0, 1], [-150, 0]), rotate: useTransform(scrollYProgress, [0, 1], [10, 0]) },
    { x: useTransform(scrollYProgress, [0, 1], [250, 0]), y: useTransform(scrollYProgress, [0, 1], [-60, 0]), rotate: useTransform(scrollYProgress, [0, 1], [15, 0]) },

    { x: useTransform(scrollYProgress, [0, 1], [-200, 0]), y: useTransform(scrollYProgress, [0, 1], [150, 0]), rotate: useTransform(scrollYProgress, [0, 1], [-12, 0]) },
    { x: useTransform(scrollYProgress, [0, 1], [0, 0]), y: useTransform(scrollYProgress, [0, 1], [180, 0]), rotate: useTransform(scrollYProgress, [0, 1], [8, 0]) },
    { x: useTransform(scrollYProgress, [0, 1], [220, 0]), y: useTransform(scrollYProgress, [0, 1], [140, 0]), rotate: useTransform(scrollYProgress, [0, 1], [12, 0]) },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-6 font-[Poppins] overflow-hidden">
      {/* Background decorative elements - matching services section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay - matching services section */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tight text-center mb-2">
          <span className="text-[#F8FAFC]">Industries </span>
          <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent animate-gradient">
            We Serve
          </span>
        </h1>
        
        {/* Decorative line under heading - matching services section */}
        <div className="flex justify-center mt-3 mb-6">
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
        </div>
      </div>

      <div ref={ref} className="w-[900px] relative z-10">

        <svg viewBox="0 0 900 360" className="w-full h-auto">

          <defs>
            {/* Updated texture pattern to match card backgrounds */}
            <pattern id="texture" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="#0F172A"/>
              <circle cx="20" cy="20" r="1" fill="#1E293B"/>
              <circle cx="60" cy="40" r="1" fill="#1E293B"/>
              <circle cx="80" cy="70" r="1" fill="#1E293B"/>
            </pattern>
            
            {/* Gradient for card borders on hover */}
            <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/>
            </linearGradient>
          </defs>

          {[
            { path: "M0 0 L260 0 A20 20 0 0 1 280 20 L260 180 L0 180 Z", x: 120, y: 70 },
            { path: "M300 0 A20 20 0 0 1 320 0 L580 0 A20 20 0 0 1 600 20 L640 180 L260 180 Z", x: 450, y: 70 },
            { path: "M620 0 L900 0 L900 180 L640 180 Z", x: 760, y: 70 },
            { path: "M0 180 L260 180 L280 340 A20 20 0 0 1 260 360 L20 360 A20 20 0 0 1 0 340 Z", x: 120, y: 250 },
            { path: "M260 180 Q450 140 640 180 L620 340 A20 20 0 0 1 600 360 L320 360 L290 330 Q270 300 260 180 Z", x: 450, y: 250 },
            { path: "M640 180 L900 180 L900 340 A20 20 0 0 1 880 360 L660 360 A20 20 0 0 1 640 340 Z", x: 760, y: 250 },
          ].map((shape, index) => {
            const item = industriesData[index];
            const Icon = item.icon;
            const t = transforms[index];

            return (
              <motion.g
                key={item.id}
                style={{
                  x: t.x,
                  y: t.y,
                  rotate: t.rotate,
                  opacity: opacity,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="cursor-pointer"
              >
                {/* Card shadow/glow on hover */}
                <path
                  d={shape.path}
                  fill="url(#texture)"
                  stroke="#1E293B"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                
                {/* Hover border glow effect */}
                <path
                  d={shape.path}
                  fill="none"
                  stroke="url(#cardGradient)"
                  strokeWidth="2"
                  opacity="0"
                  className="transition-opacity duration-300 group-hover:opacity-100"
                />

                <foreignObject x={shape.x - 20} y={shape.y - 40} width="40" height="40">
                  <div className="flex items-center justify-center">
                    <Icon size={26} className="text-[#6366F1]" />
                  </div>
                </foreignObject>

                <text x={shape.x} y={shape.y + 10} fill="#F8FAFC" fontSize="15" fontWeight="600" textAnchor="middle" className="font-sans tracking-wide">
                  {item.name}
                </text>

                <text x={shape.x} y={shape.y + 28} fill="#94A3B8" fontSize="11" textAnchor="middle" className="font-light tracking-wide">
                  {item.desc}
                </text>
              </motion.g>
            );
          })}

        </svg>

      </div>

      {/* Add gradient animation styles */}
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
    </div>
  );
}