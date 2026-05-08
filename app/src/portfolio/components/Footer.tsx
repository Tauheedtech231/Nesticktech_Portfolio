// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  ArrowRight,
  Heart,
  Briefcase,
  ShoppingBag,
  Rocket,
  Code,
  Shield,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Services Links
  const services = [
    { name: 'Web Development', href: '/services' },
    { name: 'Mobile App Development', href: '/services' },
    { name: 'AI/ML Solutions', href: '/services' },
    { name: 'IT & Cybersecurity', href: '/services' },
    { name: 'E-commerce Solutions', href: '/services' },
    { name: 'Business Consulting', href: '/services' },
  ];

  // Products Links
  const products = [
    { name: 'Neezamiya (Education ERP)', href: '/products' },
    { name: 'Advance POS System', href: '/products' },
    { name: 'MarX (Marketing Suite)', href: '/products' },
    { name: 'Build N (Construction)', href: '/products' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/nesticktech', color: 'hover:text-[#6366F1]' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/abdullah-amin005', color: 'hover:text-[#0A66C2]' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/nesticktech', color: 'hover:text-[#1DA1F2]' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/nesticktech', color: 'hover:text-[#E4405F]' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'nesticktech@gmail.com', href: 'mailto:nesticktech@gmail.com' },
    { icon: Phone, text: '+92 320 8423427', href: 'tel:+923208423427' },
    { icon: MapPin, text: 'Johar Town, Lahore, Pakistan', href: 'https://maps.google.com/?q=Johar+Town+Lahore' },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 8,
        mass: 0.4,
      },
    },
  };

  return (
    <footer className="relative bg-[#020617] border-t border-[#1E293B] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6366F1]/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-6">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10"
        >
          {/* Company Info - Logo and CEO Message */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block group mb-4 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  <Image
                    src="/nesticklogo.jpg"
                    alt="Nestick Tech Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <span className="text-xl lg:text-2xl font-bold font-serif tracking-tight bg-gradient-to-r from-[#F8FAFC] to-[#94A3B8] bg-clip-text text-transparent">
                  Nestick Tech
                </span>
              </div>
            </Link>
            
            {/* CEO Message - Services section font styles */}
            <div className="mb-4 p-4 bg-[#0F172A]/50 rounded-xl border border-[#1E293B]">
              <p className="text-[#94A3B8] text-xs font-light tracking-wide italic leading-relaxed mb-2">
                &quot;We believe in building technology that empowers businesses and transforms ideas into reality. Our mission is to deliver excellence through innovation and dedication.&quot;
              </p>
              <p className="text-[#F8FAFC] text-xs font-semibold font-sans tracking-wide">— Mr. Hamza Hassan</p>
              <p className="text-[#6366F1] text-[10px] font-medium font-sans tracking-wide">CEO of Nestick Tech</p>
            </div>

            {/* Contact Info - Services section font styles */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    className="flex items-center gap-2 text-[#94A3B8] hover:text-[#6366F1] transition-colors duration-200 group cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-light tracking-wide">{item.text}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Services Links - Services section font styles */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-[#6366F1]" />
              <h3 className="text-[#F8FAFC] font-semibold font-sans tracking-wide text-base">Our Services</h3>
            </div>
            <ul className="space-y-1.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-[#94A3B8] hover:text-[#6366F1] text-xs font-light tracking-wide transition-colors duration-200 inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <ArrowRight className="w-2.5 h-2.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links - Services section font styles */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="w-4 h-4 text-[#22C55E]" />
              <h3 className="text-[#F8FAFC] font-semibold font-sans tracking-wide text-base">Our Products</h3>
            </div>
            <ul className="space-y-1.5">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className="text-[#94A3B8] hover:text-[#6366F1] text-xs font-light tracking-wide transition-colors duration-200 inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <ArrowRight className="w-2.5 h-2.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Connect - Services section font styles */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-[#F8FAFC] font-semibold font-sans tracking-wide text-base">Connect</h3>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center text-[#94A3B8] ${social.color} hover:border-[#6366F1] transition-all duration-200 group cursor-pointer`}
                    aria-label={social.name}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
            
            {/* Social handles - Services section font styles */}
            <p className="text-xs text-[#94A3B8] font-light tracking-wide">Follow us for updates</p>
            <p className="text-[10px] text-[#6366F1] font-medium tracking-wide mt-1">@nesticktech</p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar - Services section font styles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-10 pt-4 border-t border-[#1E293B]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            {/* Copyright */}
            <p className="text-[#94A3B8] text-xs font-light tracking-wide text-center md:text-left">
              © {currentYear} Nestick Tech. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-[#94A3B8] text-xs font-light tracking-wide flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#EF4444] fill-[#EF4444] animate-pulse" /> in Lahore, Pakistan
            </p>

            {/* Quick Contact */}
            <Link 
              href="/contact" 
              className="text-[#6366F1] text-xs font-medium tracking-wide hover:underline transition-colors cursor-pointer"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;