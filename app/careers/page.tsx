/* eslint-disable react/no-unescaped-entities */
// app/careers/page.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Briefcase, 
  Clock, 
  GraduationCap,
  Sparkles,
  Send,
  Mail,
  User,
  MessageSquare,
  Building,
  Shield,
  CheckCircle,
  Upload,
  X,
  HelpCircle,
  Phone,
  Calendar,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface Contact {
  id: number;
  type: 'phone' | 'email' | 'location';
  value: string;
  url: string | null;
  display_order: number;
}

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState<'job' | 'internship'>('job');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data from API - only contacts
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    message: '',
    category: 'job' as 'job' | 'internship'
  });

  // Fetch footer data from API
  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

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

  // Get contact info by type
  const getContactByType = (type: string) => {
    return contacts.find(contact => contact.type === type);
  };

  const emailContact = getContactByType('email');
  const phoneContact = getContactByType('phone');
  
  const emailValue = emailContact?.value || '';
  const phoneValue = phoneContact?.value || '';
  const formattedPhoneNumber = phoneValue ? `+${phoneValue.replace(/\D/g, '')}` : '';

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]/50' : 'bg-white/80';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const inputBg = isDark ? 'bg-[#020617]' : 'bg-white';
  const inputBorder = isDark ? 'border-[#1E293B]' : 'border-gray-300';
  const tabBg = isDark ? 'bg-[#0F172A]' : 'bg-gray-100';
  const tabBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const dropzoneBg = isDark ? 'bg-[#020617]/50' : 'bg-gray-50/50';
  
  // Contact options from API data (only email and phone)
  const contactOptions = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      action: emailValue ? `mailto:${emailValue}` : '#',
      linkText: "Send Message",
      color: "from-blue-500 to-cyan-500",
      bgHover: isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50",
      frontInfo: {
        stats: "24h Response",
        icon: Clock,
      },
      backInfo: {
        email: emailValue,
      },
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri, 9AM - 6PM",
      action: formattedPhoneNumber ? `tel:${formattedPhoneNumber}` : '#',
      linkText: formattedPhoneNumber || "Call Us",
      color: "from-green-500 to-emerald-500",
      bgHover: isDark ? "hover:bg-green-500/10" : "hover:bg-green-50",
      frontInfo: {
        stats: "Available Now",
        icon: Shield,
      },
      backInfo: {
        primary: formattedPhoneNumber,
      },
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSubmitError('');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setSubmitError('');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      let cvBase64 = null;
      if (selectedFile) {
        cvBase64 = await fileToBase64(selectedFile);
      }

      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        portfolio: formData.portfolio,
        message: formData.message,
        category: activeTab,
        cvFile: cvBase64,
        cvFilename: selectedFile?.name || '',
        cvFileSize: selectedFile?.size || 0
      };

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          portfolio: '',
          message: '',
          category: activeTab
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Hero Section with Image Background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/career.jpg"
            alt="Career Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b from-${isDark ? 'black/30' : 'gray-900/40'} via-transparent to-${isDark ? 'black/50' : 'gray-900/60'}`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-black/40' : 'bg-gray-900/40'} backdrop-blur-md rounded-full border ${isDark ? 'border-white/30' : 'border-white/30'} mb-6 cursor-pointer`}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Join Our Team</span>
            </motion.span>

            <h1 className="text-4xl sm:text-5xl font-bold font-serif text-white mb-6 tracking-tight">
              Shape the Future of
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8 font-light tracking-wide">
              Join a team of passionate innovators building cutting-edge digital solutions for businesses worldwide
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#apply-section"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-300 text-black font-sans rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer font-medium"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#why-join"
                className={`inline-flex items-center justify-center px-6 py-3 ${isDark ? 'bg-black/40' : 'bg-gray-900/40'} backdrop-blur-md border ${isDark ? 'border-white/30' : 'border-white/30'} text-white font-sans rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300 cursor-pointer`}
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="why-join" className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${bgColor}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative group">
            <div className={`absolute -inset-2 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
            <div className={`relative rounded-2xl overflow-hidden border ${cardBorder} group-hover:border-[#6366F1]/50 transition-all duration-500 group-hover:scale-[1.02]`}>
              <Image
                src="/car.jpg"
                alt="Why Join Nestick Tech"
                width={600}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-${isDark ? '[#020617]' : 'gray-900'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </div>
          </div>

          <div>
            <h2 className={`text-3xl sm:text-4xl font-bold font-serif ${textColor} mb-6`}>
              Why Join{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Nestick Tech?
              </span>
            </h2>
            
            <p className={`${subTextColor} mb-6 font-light leading-relaxed`}>
              At Nestick Tech, we're not just building software — we're building the future of digital business. 
              We believe that great products come from great teams, and we're committed to creating an environment 
              where innovation thrives, creativity is celebrated, and everyone has the opportunity to grow.
            </p>
            
            <p className={`${subTextColor} mb-6 font-light leading-relaxed`}>
              Join us and work on cutting-edge projects with modern technologies like React, Next.js, Node.js, 
              and cloud platforms. You'll collaborate with talented professionals who are passionate about 
              delivering exceptional digital solutions.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Work with latest technologies and tools",
                "Remote-first culture with flexible hours",
                "Competitive salary and performance bonuses",
                "Professional development and learning budget",
                "Health insurance and wellness benefits",
                "Quarterly team retreats and events"
              ].map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5 text-[#6366F1] group-hover:scale-110 transition-transform" />
                  <span className={`${isDark ? 'text-[#CBD5E1]' : 'text-gray-700'} group-hover:${textColor} transition-colors`}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section with Form - No validations */}
      <section id="apply-section" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-[#0A0F1A]' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl sm:text-4xl font-bold font-serif ${textColor} mb-4`}>
              Apply for{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className={subTextColor}>
              Choose between full-time jobs or internships and submit your application
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex ${tabBg} rounded-xl p-1 border ${tabBorder}`}>
              <button
                onClick={() => setActiveTab('job')}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === 'job' ? 'text-white' : subTextColor
                }`}
              >
                {activeTab === 'job' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Full-Time Jobs
                </span>
              </button>
              <button
                onClick={() => setActiveTab('internship')}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === 'internship' ? 'text-white' : subTextColor
                }`}
              >
                {activeTab === 'internship' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Internships
                </span>
              </button>
            </div>
          </div>

          {/* Application Form - No validation */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`${cardBg} backdrop-blur-sm rounded-2xl border ${cardBorder} p-6 sm:p-8`}
          >
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400">Application submitted successfully! We'll contact you soon.</p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer`}
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    {activeTab === 'job' ? 'Position Applying For' : 'Internship Role'}
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer`}
                      placeholder={activeTab === 'job' ? "e.g., Frontend Developer" : "e.g., Frontend Intern"}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    {activeTab === 'job' ? 'Years of Experience' : 'Current Year / Semester'}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors appearance-none cursor-pointer`}
                    >
                      <option value="">Select</option>
                      {activeTab === 'job' ? (
                        <>
                          <option value="0-1">Fresher (0-1 years)</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-8">5-8 years</option>
                          <option value="8+">8+ years</option>
                        </>
                      ) : (
                        <>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Graduated">Graduated</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                    Portfolio / GitHub / LinkedIn URL
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer`}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload Section - No validation */}
              <div>
                <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                  Upload CV/Resume
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-[#6366F1] bg-[#6366F1]/10' 
                      : `${cardBorder} ${dropzoneBg}`
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {!selectedFile ? (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-[#6366F1] mx-auto mb-3" />
                      <p className={subTextColor}>Drag & drop your resume here</p>
                      <p className={`${isDark ? 'text-[#64748B]' : 'text-gray-400'} text-sm`}>or click to browse</p>
                    </div>
                  ) : (
                    <div className={`flex items-center justify-between ${isDark ? 'bg-[#0F172A]' : 'bg-gray-100'} p-3 rounded-lg`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6366F1]/20 rounded-lg flex items-center justify-center">
                          <Upload className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${textColor}`}>{selectedFile.name}</p>
                          <p className={`${isDark ? 'text-[#64748B]' : 'text-gray-400'} text-xs`}>{(selectedFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className={`p-1 ${isDark ? 'hover:bg-[#1E293B]' : 'hover:bg-gray-200'} rounded-lg transition-colors cursor-pointer`}
                      >
                        <X className={`w-5 h-5 ${subTextColor} hover:text-red-400`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${subTextColor} mb-2`}>
                  Why should we hire you?
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#6366F1]" />
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2.5 ${inputBg} border ${inputBorder} rounded-lg ${textColor} focus:outline-none focus:border-[#6366F1] transition-colors resize-none cursor-pointer`}
                    placeholder="Tell us about your skills, experience, and why you'd be a great fit..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-sans rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Still Have Questions Section - Using API data only */}
     <section className={`py-20 px-4 sm:px-6 lg:px-8 ${bgColor}`}>
  <div className="max-w-4xl mx-auto">
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/car.jpg"
          alt="Still Have Questions"
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br from-${isDark ? '[#020617]/90' : 'gray-900/90'} via-${isDark ? '[#020617]/80' : 'gray-900/80'} to-${isDark ? '[#0F172A]/90' : 'gray-800/90'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
      </div>

      <div className="relative z-10 px-6 py-8 lg:px-10 lg:py-12">
        <div className="text-center mb-8 lg:mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-sm border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300`}>
            <HelpCircle className="w-4 h-4 text-[#6366F1]" />
            <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
              WE&apos;RE HERE TO HELP
            </span>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent mb-3">
            Still Have Questions?
          </h3>
          
          <p className="text-[#94A3B8] text-sm lg:text-base max-w-md mx-auto font-light tracking-wide">
            Can't find what you're looking for? Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className="relative h-[280px] perspective-1000 cursor-pointer group"
                onMouseEnter={() => setFlippedCard(option.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                    flippedCard === option.id ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT SIDE - Sirf Icon, Original Dark/Blur Background */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className={`h-full ${isDark ? 'bg-[#0F172A]/80' : 'bg-white/10'} backdrop-blur-md border ${isDark ? 'border-[#1E293B]' : 'border-gray-200'} rounded-xl p-6 text-center transition-all duration-300 hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/10 cursor-pointer flex flex-col items-center justify-center`}>
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                        <div className={`relative w-20 h-20 mx-auto bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE - Email/Call Info with Blue Background */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="h-full bg-blue-600 rounded-xl p-6 text-center flex flex-col items-center justify-center border border-blue-400/30 shadow-xl">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h4 className="text-white font-bold font-sans tracking-wide text-xl mb-4">
                        {option.title}
                      </h4>
                      
                      {option.id === 1 && (
                        <div className="space-y-2 text-center">
                          <p className="text-white text-base font-mono break-all">
                            {option.backInfo.email}
                          </p>
                          <p className="text-white/70 text-xs flex items-center gap-1 justify-center">
                            Click to copy
                          </p>
                        </div>
                      )}
                      
                      {option.id === 2 && (
                        <div className="space-y-2 text-center">
                          <p className="text-white text-2xl font-mono font-bold">
                            {option.backInfo.primary}
                          </p>
                          <p className="text-white/70 text-xs flex items-center gap-1 justify-center">
                            Click to call
                          </p>
                        </div>
                      )}
                      
                      <Link href={option.action}>
                        <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 cursor-pointer">
                          <span className="text-white text-sm font-medium">
                            {option.id === 2 ? 'Call Now' : 'Send Email'}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default CareersPage;