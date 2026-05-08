// app/contact/page.tsx
'use client';

import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Sparkles,
  MessageSquare,
  Users,
  Globe,
  ArrowRight,
  Calendar,
  Star,
  Shield,
  Building2
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'nesticktech@gmail.com',
      href: 'mailto:nesticktech@gmail.com',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      description: 'We\'ll respond within 24 hours',
    },
    {
      icon: Phone,
      label: 'Call Us (Pakistan)',
      value: '+92 320 8423427',
      href: 'tel:+923208423427',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      description: 'Mon-Fri: 9AM - 6PM PKT',
    },
    {
      icon: Phone,
      label: 'Call Us (KSA)',
      value: '+966 50 190 8949',
      href: 'tel:+966501908949',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      description: 'Sat-Wed: 9AM - 6PM AST',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Johar Town, Lahore',
      href: 'https://maps.google.com/?q=Johar+Town+Lahore',
      gradient: 'from-[#EF4444] to-[#F87171]',
      description: 'Pakistan',
    },
  ];

  const teamMembers = [
    {
      name: 'Abdullah Amin',
      role: 'Senior Business Analyst',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#6366F1] to-[#8B5CF6]',
      expertise: '10+ years experience',
    },
    {
      name: 'Haris Ashar',
      role: 'Business Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#22C55E] to-[#86EFAC]',
      expertise: 'Strategic planning',
    },
    {
      name: 'Tauheed',
      role: 'Web Developer',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      expertise: 'Full-stack expert',
    },
  ];

  const features = [
    { icon: Star, text: 'Fast Response Time', color: '#6366F1' },
    { icon: Shield, text: '100% Confidential', color: '#22C55E' },
    { icon: Calendar, text: 'Free Consultation', color: '#F59E0B' },
    { icon: Building2, text: 'Enterprise Ready', color: '#EF4444' },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
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

  const fromLeftVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  const fromRightVariants: Variants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#020617] pt-20 lg:pt-24 overflow-hidden">
      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          >
            <source src="/contact.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/60 to-[#020617]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F172A]/80 backdrop-blur-sm border border-[#1E293B] mb-6 cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className="text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                Get in Touch
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-5xl lg:text-5xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4"
            >
              Contact{' '}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="#contact-form"
                className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="tel:+923208423427"
                className="px-6 py-3 bg-[#0F172A] border border-[#1E293B] text-white font-semibold font-sans tracking-wide rounded-lg hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
            </motion.div>
          </div>
        </div>

    
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22C55E]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

      <div id="contact-form" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 lg:mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm`} />
                <Link
                  href={info.href}
                  className="relative block bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 hover:border-[#6366F1]/30 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-1">{info.label}</h3>
                  <p className="text-base lg:text-lg text-[#F8FAFC] font-semibold font-sans tracking-wide mb-1">{info.value}</p>
                  <p className="text-xs text-[#94A3B8] font-light tracking-wide">{info.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form - Services Section Font Styles */}
          <motion.div
            variants={fromLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-2">Send us a Message</h2>
              <p className="text-sm text-[#94A3B8] font-light tracking-wide mb-6">Fill out the form below and we&apos;ll get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 font-light tracking-wide cursor-pointer"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Discussion">Project Discussion</option>
                    <option value="Support">Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium font-sans tracking-wide text-[#94A3B8] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-lg text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20 transition-all duration-300 resize-none font-light tracking-wide"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold font-sans tracking-wide rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-lg text-[#22C55E]"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-light tracking-wide">Message sent successfully! We&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-[#EF4444]"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-light tracking-wide">Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Column - Info & Team - Services Section Font Styles */}
          <motion.div
            variants={fromRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
              <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC] mb-4">Why Contact Us?</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-[#020617] border border-[#1E293B] cursor-pointer hover:border-[#6366F1]/30 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#6366F1]" />
                      </div>
                      <span className="text-xs text-[#F8FAFC] font-light tracking-wide">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Meet the Team */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#6366F1]" />
                <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC]">Meet Our Experts</h3>
              </div>
              
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 group hover:bg-[#020617] p-2 rounded-lg transition-all duration-300 cursor-pointer">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#6366F1] transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`} />
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC] group-hover:text-[#6366F1] transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#94A3B8] font-light tracking-wide">{member.role}</p>
                      <p className="text-xs text-[#6366F1] mt-0.5 font-light tracking-wide">{member.expertise}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#6366F1]" />
                <h3 className="text-lg font-semibold font-sans tracking-wide text-[#F8FAFC]">Our Location</h3>
              </div>
              
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2070&auto=format&fit=crop"
                  alt="Johar Town Lahore"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
              </div>
              
              <p className="text-sm text-[#F8FAFC] font-semibold font-sans tracking-wide mb-1">Johar Town, Lahore</p>
              <p className="text-xs text-[#94A3B8] font-light tracking-wide leading-relaxed mb-3">
                Located in the heart of Johar Town, easy access from main boulevard.
              </p>
              
              <Link 
                href="https://maps.google.com/?q=Johar+Town+Lahore" 
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-[#6366F1] font-medium font-sans tracking-wide hover:gap-3 transition-all duration-300 group cursor-pointer"
              >
                <span>View on Maps</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;