/* eslint-disable prefer-const */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Neezamiya",
    subtitle: "Complete Educational Management System",
    price: "Custom Pricing",
    description:
      "All-in-one platform for schools, colleges, and universities. Manage students, teachers, attendance, grades, fees, examinations, and parent portals with real-time analytics.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&h=600&auto=format&fit=crop",
    status: "Live",
    tags: ["Education", "LMS", "Analytics"],
  },
  {
    id: 2,
    title: "Advance POS",
    subtitle: "Smart Point of Sale System",
    price: "Custom Pricing",
    description:
      "Complete retail management solution with inventory tracking, sales analytics, customer management, employee management, and seamless payment integration.",
    image:
      "https://images.unsplash.com/photo-1586864030223-a918b07d357d?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Live",
    tags: ["Retail", "POS", "Inventory"],
  },
  {
    id: 3,
    title: "MarX",
    subtitle: "Digital Marketing Suite",
    price: "Custom Pricing",
    description:
      "Powerful marketing automation platform for businesses to manage campaigns, track leads, optimize conversions, and analyze performance across all channels.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=600&auto=format&fit=crop",
    status: "In Development",
    tags: ["Marketing", "Automation", "CRM"],
  },
  {
    id: 4,
    title: "Build N",
    subtitle: "Construction Project Management",
    price: "Custom Pricing",
    description:
      "Comprehensive solution for construction companies to manage projects, resources, budgets, timelines, teams, and client communications efficiently.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&h=600&auto=format&fit=crop",
    status: "Concept",
    tags: ["Construction", "Project Management"],
  },
];

function RotatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </Float>
  );
}

// Circular Ring Component - Shows all product images in a ring
function CircularRing({ currentIndex, onImageClick }: { currentIndex: number; onImageClick: (index: number) => void }) {
  const [rotation, setRotation] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    let startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      // Continuous rotation - one full rotation every 15 seconds
      const newRotation = (elapsed * 0.024) % 360;
      setRotation(newRotation);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Responsive radius based on screen size
  const getRadius = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 120;
      if (window.innerWidth < 768) return 150;
      if (window.innerWidth < 1024) return 180;
    }
    return 200;
  };

  const radius = getRadius();
  const angleStep = 360 / products.length;

  return (
    <div 
      ref={ringRef}
      className="absolute inset-0"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.016s linear'
      }}
    >
      {products.map((product, idx) => {
        const angle = (idx * angleStep) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const isCurrent = idx === currentIndex;
        
        return (
          <motion.button
            key={idx}
            className="absolute cursor-pointer group"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              zIndex: isCurrent ? 15 : 5,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onImageClick(idx)}
          >
            <div className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              isCurrent 
                ? 'border-[#6366F1] shadow-lg shadow-[#6366F1]/50' 
                : 'border-white/30 hover:border-white/60'
            }`}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              {isCurrent && (
                <div className="absolute inset-0 ring-2 ring-[#6366F1] rounded-full animate-ping opacity-50" />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function ProductShowcase3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // SCROLL-BASED ANIMATION - Same as your original code
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const top = sectionRef.current.offsetTop;
      const height = sectionRef.current.offsetHeight;
      const scroll = window.scrollY + window.innerHeight;

      const progress = (scroll - top) / height;

      let step = Math.floor(progress * products.length);
      if (step < 0) step = 0;
      if (step >= products.length) step = products.length - 1;

      if (step !== index && !isTransitioning) {
        setIndex(step);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index, isTransitioning]);

  // Handle manual image click from ring
  const handleImageClick = (clickedIndex: number) => {
    if (clickedIndex !== index && !isTransitioning) {
      setIndex(clickedIndex);
    }
  };

  // Set transitioning state when index changes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [index]);

  const product = products[index];

  const handleRequestDemo = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Our team will contact you shortly.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    handleCloseForm();
  };

  return (
    <div ref={sectionRef} className="h-[400vh] bg-black">
      <main className="sticky top-0 h-screen overflow-hidden bg-black text-white relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1669839137069-4166d6ea11f4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* 3D Background - Very Subtle */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <RotatingSphere />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10 h-screen flex flex-col items-center justify-between py-4 sm:py-6 md:py-8 px-3 sm:px-4">
          
          {/* IMAGE SECTION - TOP for mobile, RIGHT for desktop */}
          <div className="flex items-center justify-center w-full mt-2 sm:mt-4 md:mt-0 lg:justify-end">
            {/* Container for animation */}
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center">
              
              {/* Circular Ring with all product images */}
              <CircularRing currentIndex={index} onImageClick={handleImageClick} />
              
              {/* Background gradient ring for wheel effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6366F1]/20 via-[#8B5CF6]/20 to-transparent blur-2xl" />
              
              {/* Current image with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id}
                  initial={{ 
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.3,
                    rotate: -15,
                     x: (typeof window !== 'undefined' && window.innerWidth < 768) ? -80 : -250,
                     y: (typeof window !== 'undefined' && window.innerWidth < 768) ? 100 : 180,
                    transition: { 
                      duration: 0.9,
                      ease: [0.4, 0, 0.2, 1],
                      delay: 0.1
                    }
                  }}
                  transition={{ 
                    duration: 0.9,
                    ease: [0.4, 0, 0.2, 1],
                    type: "tween"
                  }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden bg-transparent">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={700}
                      height={400}
                      priority
                      className="w-full h-full object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next image animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`next-${product.id}`}
                  initial={{ 
                    opacity: 0,
                    scale: 0.3,
                    rotate: 15,
                       x: (typeof window !== 'undefined' && window.innerWidth < 768) ? 80 : 200,
                       y: (typeof window !== 'undefined' && window.innerWidth < 768) ? -80 : -150,
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: 0,
                    y: 0,
                    transition: { 
                      duration: 0.9,
                      delay: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden bg-transparent">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={400}
                      priority
                      className="w-full h-full object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* DESCRIPTION SECTION - BOTTOM for mobile, LEFT for desktop */}
          <div className="w-full max-w-2xl lg:max-w-xl mx-auto lg:mx-0 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-center lg:text-left"
              >
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                  <span className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full border ${
                    product.status === 'Live' ? 'text-green-500 bg-green-500/10 border-green-500/30' :
                    product.status === 'In Development' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30' :
                    'text-blue-500 bg-blue-500/10 border-blue-500/30'
                  }`}>
                    {product.status}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  {product.title}
                </h1>

                <h2 className="text-base sm:text-lg md:text-xl text-gray-300 mt-1 font-semibold">
                  {product.subtitle}
                </h2>

                <p className="mt-2 sm:mt-3 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 justify-center lg:justify-start">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 backdrop-blur-md text-gray-300 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-bold text-gray-300">
                  {product.price}
                </div>

                <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-5 justify-center lg:justify-start">
                  <button
                    onClick={handleRequestDemo}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold text-xs sm:text-sm hover:scale-105 transition duration-300 cursor-pointer"
                  >
                    Request Demo
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Request Demo Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              onClick={handleCloseForm}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-5 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Request Demo</h2>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-400 hover:text-white transition text-xl sm:text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition text-sm sm:text-base"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition resize-none text-sm sm:text-base"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold hover:scale-105 transition duration-300 text-sm sm:text-base"
                  >
                    Submit Request
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}