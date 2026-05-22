/* eslint-disable react-hooks/set-state-in-effect */
// app/consultation/page.tsx
'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Sparkles,
  Send,
  CheckCircle,
  Phone,
  Mail,
  User,
  Building,
  Briefcase,
  ArrowRight,
  Calendar,
  Clock,
  MessageSquare,
  Shield,
  Rocket
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  projectDescription: string;
  preferredTime: string;
  budget: string;
}

// Helper function to generate deterministic random positions
const generateParticlePositions = (count: number, seed: number = 0.5) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * seed;
    const theta = t;
    const phi = Math.acos(2 * (i / count) - 1);
    const r = 2.5 + (i % 3) * 0.5;
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

// 3D Scene Component for Background
const ConsultationScene = ({ isDark }: { isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 2.5;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 2) * 1.5, Math.sin(angle) * radius));
    }
    return points;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  const mainColor = isDark ? '#6366F1' : '#4F46E5';
  const secondaryColor = isDark ? '#8B5CF6' : '#7C3AED';
  const accentColor = isDark ? '#06B6D4' : '#0891B2';

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhongMaterial
          color={mainColor}
          emissive={secondaryColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.05, 64, 200]} />
        <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={0.5} />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.05, 64, 200]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.4} />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 2, Math.PI / 3]}>
        <torusGeometry args={[1.8, 0.05, 64, 200]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
      </mesh>

      <Line
        points={lines}
        color={mainColor}
        lineWidth={1}
        transparent
        opacity={0.5}
      />
    </group>
  );
};

// 3D Model for Left Column with Feature Representations
const ConsultationModel = ({ isDark }: { isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particleCount = isMobile ? 150 : 300;
  const particlePositions = useMemo(() => generateParticlePositions(particleCount, 0.3), [particleCount]);

  const featureNodes = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: any[] = [];
    const features = [
      { name: '30-Minute Session', color: '#6366F1', angle: 0 },
      { name: 'Expert Advice', color: '#22C55E', angle: Math.PI / 2 },
      { name: 'Flexible Scheduling', color: '#F59E0B', angle: Math.PI },
      { name: '100% Confidential', color: '#EF4444', angle: Math.PI * 1.5 }
    ];
    
    features.forEach((feature) => {
      const radius = 2.2;
      const x = Math.cos(feature.angle) * radius;
      const z = Math.sin(feature.angle) * radius;
      const y = Math.sin(feature.angle * 2) * 0.8;
      
      nodes.push({
        position: new THREE.Vector3(x, y, z),
        color: feature.color,
        name: feature.name
      });
    });
    return nodes;
  }, []);

  const connectionLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < featureNodes.length; i++) {
      for (let j = i + 1; j < featureNodes.length; j++) {
        lines.push([featureNodes[i].position, featureNodes[j].position]);
      }
    }
    return lines;
  }, [featureNodes]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;
    }
  });

  const mainColor = isDark ? '#6366F1' : '#4F46E5';
  const secondaryColor = isDark ? '#8B5CF6' : '#7C3AED';

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.0, 48, 48]} />
        <meshPhongMaterial
          color={mainColor}
          emissive={secondaryColor}
          emissiveIntensity={0.7}
          transparent
          opacity={0.8}
          shininess={60}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.04, 64, 200]} />
        <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={0.5} />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, Math.PI / 2, 0]}>
        <torusGeometry args={[1.9, 0.04, 64, 200]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={0.4} />
      </mesh>

      {featureNodes.map((node, i) => (
        <mesh key={i} position={[node.position.x, node.position.y, node.position.z]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.6} />
        </mesh>
      ))}

      {connectionLines.map((line, i) => (
        <Line
          key={i}
          points={line}
          color={mainColor}
          lineWidth={0.8}
          transparent
          opacity={0.4}
        />
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.06}
          color="#A78BFA"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {featureNodes.map((node, i) => (
        <mesh key={`arrow-${i}`} position={[node.position.x * 0.7, node.position.y * 0.7, node.position.z * 0.7]}>
          <coneGeometry args={[0.05, 0.15, 8]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const ConsultationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // System theme detection
  useEffect(() => {
    const getSystemTheme = (): 'dark' | 'light' => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    };

    setTheme(getSystemTheme());

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleThemeChange);
    } else {
      mediaQuery.addListener(handleThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleThemeChange);
      } else {
        mediaQuery.removeListener(handleThemeChange);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    projectDescription: '',
    preferredTime: '',
    budget: '',
  });

  const industries = [
    'Education',
    'E-commerce',
    'Construction',
    'Startups',
    'Banking & Finance',
    'Travel',
    'Medical',
    'Other'
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
  ];

  const budgetRanges = [
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure yet',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        projectDescription: '',
        preferredTime: '',
        budget: '',
      });
    }, 5000);
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]/80' : 'bg-white/80';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const inputBg = isDark ? 'bg-[#020617]' : 'bg-white';
  const inputBorder = isDark ? 'border-[#1E293B]' : 'border-gray-300';
  const inputTextColor = isDark ? 'text-white' : 'text-gray-900';
  const badgeBg = isDark ? 'bg-[#0F172A]' : 'bg-gray-100';
  const badgeBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const gradientFrom = isDark ? 'from-[#6366F1]' : 'from-indigo-600';
  const gradientTo = isDark ? 'to-[#8B5CF6]' : 'to-purple-600';
  const overlayGradient = isDark 
    ? 'from-[#6366F1]/5 via-transparent to-[#8B5CF6]/5'
    : 'from-indigo-100/30 via-transparent to-purple-100/30';

  // Features data with theme-aware colors
  const features = [
    { icon: Clock, text: "30-Minute Session", color: "#6366F1", iconBg: isDark ? "bg-[#6366F1]/10" : "bg-indigo-100" },
    { icon: MessageSquare, text: "Expert Advice", color: "#22C55E", iconBg: isDark ? "bg-green-500/10" : "bg-green-100" },
    { icon: Calendar, text: "Flexible Scheduling", color: "#F59E0B", iconBg: isDark ? "bg-orange-500/10" : "bg-orange-100" },
    { icon: Shield, text: "100% Confidential", color: "#EF4444", iconBg: isDark ? "bg-red-500/10" : "bg-red-100" },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 12,
      },
    },
  };

  const introContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fromTopVariants: Variants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const fromBottomVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  return (
    <main className={`min-h-screen ${bgColor} pt-20 lg:pt-24 relative overflow-hidden`}>
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-30 md:opacity-40">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={isMobile ? [1, 1] : [1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? "#8B5CF6" : "#7C3AED"} />
          <ConsultationScene isDark={isDark} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <section ref={sectionRef} className="relative z-10 py-12 lg:py-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100/30'} rounded-full blur-3xl`} />
          <div className={`absolute bottom-20 right-10 w-72 h-72 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100/30'} rounded-full blur-3xl`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100/20'} rounded-full blur-3xl`} />
        </div>

        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 bg-[url('/grid-pattern.svg')] ${isDark ? 'opacity-5' : 'opacity-10'}`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info with 3D Model */}
            <motion.div
              variants={introContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div 
                variants={fromTopVariants}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeBg} border ${badgeBorder}`}
              >
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                <span className={`text-sm font-medium bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent`}>
                  Free Consultation
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 
                variants={fromTopVariants}
                className="text-4xl md:text-5xl lg:text-5xl font-bold"
              >
                <span className={textColor}>Let&apos;s Build Your</span>
                <br />
                <span className={`bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent`}>
                  Digital Future
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                variants={fromTopVariants}
                className={`text-lg ${subTextColor} leading-relaxed`}
              >
                Schedule a free consultation with our experts. We&apos;ll discuss your business needs, 
                explore opportunities, and create a tailored roadmap for your digital transformation.
              </motion.p>

              {/* Features Grid */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 gap-4 pt-4"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-3 p-2"
                    >
                      <div className={`w-8 h-8 rounded-full ${feature.iconBg} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" style={{ color: feature.color }} />
                      </div>
                      <span className={`text-sm ${textColor}`}>{feature.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* 3D Model Container */}
              <motion.div 
                variants={fromBottomVariants}
                className="relative h-[320px] md:h-[380px] lg:h-[420px] w-full rounded-2xl overflow-hidden mt-4"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient} rounded-2xl`} />
                <Canvas
                  camera={{ position: [0, 0, 5.5], fov: 45 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={isMobile ? [1, 1] : [1, 1.5]}
                  className="rounded-2xl"
                >
                  <ambientLight intensity={0.6} />
                  <pointLight position={[5, 5, 5]} intensity={1.2} color={isDark ? "#6366F1" : "#4F46E5"} />
                  <pointLight position={[-5, -3, 4]} intensity={0.8} color={isDark ? "#8B5CF6" : "#7C3AED"} />
                  <pointLight position={[0, 5, 3]} intensity={0.5} color="#06B6D4" />
                  <ConsultationModel isDark={isDark} />
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={false}
                    rotateSpeed={0.8}
                  />
                </Canvas>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-xl opacity-20`} />
              
              <div className={`relative ${cardBg} backdrop-blur-md border ${cardBorder} rounded-2xl p-6 sm:p-8`}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className={`text-2xl font-bold ${textColor} mb-6`}>
                      Request Your Free Consultation
                    </h2>

                    {/* Full Name */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors`}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Company Name *
                      </label>
                      <div className="relative">
                        <Building className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors`}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Industry *
                      </label>
                      <div className="relative">
                        <Briefcase className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <select
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors appearance-none`}
                        >
                          <option value="">Select your industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Time Slot */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Preferred Time Slot *
                      </label>
                      <div className="relative">
                        <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <select
                          name="preferredTime"
                          required
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors appearance-none`}
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Budget Range *
                      </label>
                      <div className="relative">
                        <Rocket className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${subTextColor}`} />
                        <select
                          name="budget"
                          required
                          value={formData.budget}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors appearance-none`}
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                        Project Description *
                      </label>
                      <textarea
                        name="projectDescription"
                        required
                        rows={4}
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-lg ${inputTextColor} focus:outline-none focus:border-[#6366F1] transition-colors resize-none`}
                        placeholder="Tell us about your project, goals, and requirements..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Schedule Free Consultation
                        </>
                      )}
                    </motion.button>

                    <p className={`text-xs text-center ${subTextColor}`}>
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" className="text-[#6366F1] hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </form>
                ) : (
                  // Success Message
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className={`text-2xl font-bold ${textColor} mb-3`}>
                      Consultation Scheduled!
                    </h3>
                    <p className={`${subTextColor} mb-4`}>
                      Thank you for booking a consultation with us. Our team will contact you shortly to confirm the details.
                    </p>
                    <p className="text-sm text-[#6366F1]">
                      A confirmation email has been sent to {formData.email}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className={`mt-6 inline-flex items-center gap-2 px-6 py-2 ${badgeBg} border ${cardBorder} ${textColor} rounded-lg hover:border-[#6366F1] transition-colors`}
                    >
                      <ArrowRight className="w-4 h-4" />
                      Book Another Consultation
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConsultationPage;