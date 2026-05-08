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

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState<'job' | 'internship'>('job');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const phoneNumber = "923193236529";
  const formattedPhoneNumber = `+${phoneNumber}`;

  const contactOptions = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      action: "mailto:nesticktech@gmail.com",
      linkText: "Send Message",
      color: "from-blue-500 to-cyan-500",
      bgHover: "hover:bg-blue-500/10",
      frontInfo: {
        stats: "24h Response",
        icon: Clock,
      },
      backInfo: {
        email: "nesticktech@gmail.com",
        support: "support@nesticktech.com",
      },
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri, 9AM - 6PM",
      action: `tel:${formattedPhoneNumber}`,
      linkText: formattedPhoneNumber,
      color: "from-green-500 to-emerald-500",
      bgHover: "hover:bg-green-500/10",
      frontInfo: {
        stats: "Available Now",
        icon: Shield,
      },
      backInfo: {
        primary: formattedPhoneNumber,
        whatsapp: "Click to call",
      },
    },
    {
      id: 3,
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a consultation call",
      action: "/contact",
      linkText: "Book Now",
      color: "from-purple-500 to-pink-500",
      bgHover: "hover:bg-purple-500/10",
      frontInfo: {
        stats: "Free Consultation",
        icon: Sparkles,
      },
      backInfo: {
        duration: "30 min session",
        availability: "Flexible timing",
      },
    },
  ];

  // Check if mobile for video background
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
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setSubmitError('');
      } else {
        alert('Please upload PDF or DOC/DOCX file only');
      }
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
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setSubmitError('');
      } else {
        alert('Please upload PDF or DOC/DOCX file only');
      }
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
    
    if (!selectedFile) {
      setSubmitError('Please upload your resume/CV');
      return;
    }
    
    if (!formData.fullName || !formData.email || !formData.position || !formData.message) {
      setSubmitError('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Convert file to base64
      const cvBase64 = await fileToBase64(selectedFile);

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
        cvFilename: selectedFile.name,
        cvFileSize: selectedFile.size
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
        
        // Hide success message after 5 seconds
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 12 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Section with Video Background */}
     <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/career.jpg"
      alt="Career Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
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
        className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/30 mb-6 cursor-pointer"
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
          className="inline-flex items-center justify-center px-6 py-3 bg-black/40 backdrop-blur-md border border-white/30 text-white font-sans rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
        >
          Learn More
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Why Join Us Section */}
      <section id="why-join" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-[#1E293B] group-hover:border-[#6366F1]/50 transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="/car.jpg"
                alt="Why Join Nestick Tech"
                width={600}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-6">
              Why Join{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Nestick Tech?
              </span>
            </h2>
            
            <p className="text-[#94A3B8] mb-6 font-light leading-relaxed">
              At Nestick Tech, we're not just building software — we're building the future of digital business. 
              We believe that great products come from great teams, and we're committed to creating an environment 
              where innovation thrives, creativity is celebrated, and everyone has the opportunity to grow.
            </p>
            
            <p className="text-[#94A3B8] mb-6 font-light leading-relaxed">
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
                  <span className="text-[#CBD5E1] group-hover:text-white transition-colors">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#0F172A]/50 rounded-xl border border-[#1E293B] hover:border-[#6366F1]/50 transition-all duration-300 cursor-pointer group">
              <Mail className="w-5 h-5 text-[#6366F1] group-hover:scale-110 transition-transform" />
              <span className="text-[#94A3B8] group-hover:text-white transition-colors">Contact us:</span>
              <a href="mailto:nesticktech@gmail.com" className="text-[#6366F1] hover:underline font-medium">
                nesticktech@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section with Form */}
      <section id="apply-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0F1A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white mb-4">
              Apply for{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Choose between full-time jobs or internships and submit your application
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[#0F172A] rounded-xl p-1 border border-[#1E293B]">
              <button
                onClick={() => setActiveTab('job')}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === 'job' ? 'text-white' : 'text-[#94A3B8] hover:text-white'
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
                  activeTab === 'internship' ? 'text-white' : 'text-[#94A3B8] hover:text-white'
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

          {/* Application Form */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0F172A]/50 backdrop-blur-sm rounded-2xl border border-[#1E293B] p-6 sm:p-8"
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
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    {activeTab === 'job' ? 'Position Applying For *' : 'Internship Role *'}
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="text"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer"
                      placeholder={activeTab === 'job' ? "e.g., Frontend Developer" : "e.g., Frontend Intern"}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    {activeTab === 'job' ? 'Years of Experience *' : 'Current Year / Semester *'}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors appearance-none cursor-pointer"
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
                  <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                    Portfolio / GitHub / LinkedIn URL
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6366F1]" />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors cursor-pointer"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload Section */}
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Upload CV/Resume * (PDF, DOC, DOCX, Max 5MB)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-[#6366F1] bg-[#6366F1]/10' 
                      : 'border-[#1E293B] hover:border-[#6366F1] bg-[#020617]/50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {!selectedFile ? (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-[#6366F1] mx-auto mb-3" />
                      <p className="text-[#94A3B8] mb-1">Drag & drop your resume here</p>
                      <p className="text-[#64748B] text-sm">or click to browse</p>
                      <p className="text-[#64748B] text-xs mt-2">Supports PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-[#0F172A] p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6366F1]/20 rounded-lg flex items-center justify-center">
                          <Upload className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-[#64748B] text-xs">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1 hover:bg-[#1E293B] rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5 text-[#94A3B8] hover:text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Why should we hire you? *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#6366F1]" />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#020617] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none cursor-pointer"
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

      {/* Still Have Questions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/car.jpg"
                alt="Still Have Questions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/80 to-[#0F172A]/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
            </div>

            <div className="relative z-10 px-6 py-8 lg:px-10 lg:py-12">
              <div className="text-center mb-8 lg:mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F172A]/80 backdrop-blur-sm border border-[#6366F1]/20 rounded-full mb-4 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/20 transition-all duration-300">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {contactOptions.map((option) => {
                  const Icon = option.icon;
                  const FrontStatIcon = option.frontInfo.icon;
                  return (
                    <div
                      key={option.id}
                      className="relative h-[280px] perspective-1000 cursor-pointer group"
                      onMouseEnter={() => setFlippedCard(option.id)}
                      onMouseLeave={() => setFlippedCard(null)}
                    >
                      <div
                        className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                          flippedCard === option.id ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* Front Side */}
                        <div className="absolute w-full h-full backface-hidden">
                          <Link href={option.action} className="block h-full">
                            <div className={`h-full bg-[#0F172A]/80 backdrop-blur-md border border-[#1E293B] rounded-xl p-6 text-center transition-all duration-300 ${option.bgHover} hover:border-[#6366F1]/50 hover:shadow-lg hover:shadow-[#6366F1]/10 cursor-pointer`}>
                              <div className="relative mb-4">
                                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                                <div className={`relative w-14 h-14 mx-auto bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center shadow-lg`}>
                                  <Icon className="w-7 h-7 text-white" />
                                </div>
                              </div>
                              
                              <h4 className="text-white font-semibold font-sans tracking-wide text-lg lg:text-xl mb-2">
                                {option.title}
                              </h4>
                              
                              <p className="text-[#94A3B8] text-sm mb-3 font-light tracking-wide">
                                {option.description}
                              </p>
                              
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6366F1]/10 rounded-full mb-3">
                                <FrontStatIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                                <span className="text-[#6366F1] text-xs font-medium font-sans tracking-wide">
                                  {option.frontInfo.stats}
                                </span>
                              </div>
                              
                              <div className="inline-flex items-center gap-1 text-[#6366F1] text-sm font-medium font-sans tracking-wide group-hover:gap-2 transition-all duration-300">
                                <span>{option.linkText}</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </Link>
                        </div>

                        {/* Back Side */}
                        <div className="absolute w-full h-full backface-hidden rotate-y-180">
                          <div className={`h-full bg-gradient-to-br ${option.color} rounded-xl p-6 text-center flex flex-col items-center justify-center border border-white/20 shadow-xl`}>
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            
                            <h4 className="text-white font-bold font-sans tracking-wide text-xl mb-3">
                              {option.title}
                            </h4>
                            
                            {option.id === 1 && (
                              <div className="space-y-2">
                                <p className="text-white/90 text-sm font-light tracking-wide">
                                  {option.backInfo.email}
                                </p>
                                <p className="text-white/80 text-xs font-light tracking-wide">
                                  {option.backInfo.support}
                                </p>
                              </div>
                            )}
                            
                            {option.id === 2 && (
                              <div className="space-y-2">
                                <p className="text-white text-lg font-mono font-bold">
                                  {option.backInfo.primary}
                                </p>
                                <p className="text-white/80 text-xs flex items-center gap-1 justify-center font-light tracking-wide">
                                  Click to call
                                </p>
                                <p className="text-white/70 text-xs mt-2 font-light tracking-wide">
                                  Available on WhatsApp
                                </p>
                              </div>
                            )}
                            
                            {option.id === 3 && (
                              <div className="space-y-2">
                                <p className="text-white/90 text-sm font-light tracking-wide">
                                  {option.backInfo.duration}
                                </p>
                                <p className="text-white/80 text-xs font-light tracking-wide">
                                  {option.backInfo.availability}
                                </p>
                              </div>
                            )}
                            
                            <Link href={option.action}>
                              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 cursor-pointer">
                                <span className="text-white text-sm font-medium font-sans tracking-wide">
                                  {option.id === 2 ? 'Call Now' : 'Get Started'}
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