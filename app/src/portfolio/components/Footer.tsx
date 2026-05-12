/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Footer.tsx
'use client';

import { useState, useEffect } from 'react';
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

// Map icon names to components
const iconMap: Record<string, any> = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin
};

interface Contact {
  id: number;
  type: 'phone' | 'email' | 'location';
  value: string;
  url: string | null;
  display_order: number;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_name: string;
  color: string;
  display_order: number;
}

interface FooterSettings {
  ceo_name: string;
  ceo_message: string;
  ceo_title: string;
  social_handle: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<FooterSettings>({
    ceo_name: 'Mr. Hamza Hassan',
    ceo_message: 'We believe in building technology that empowers businesses and transforms ideas into reality. Our mission is to deliver excellence through innovation and dedication.',
    ceo_title: 'CEO of Nestick Tech',
    social_handle: 'nesticktech'
  });
  const [loading, setLoading] = useState(true);

  // Services Links (Can also be made dynamic)
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

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
        setSocialLinks(data.social);
        setSettings(prev => ({ ...prev, ...data.settings }));
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get icon component for contact type
  const getContactIcon = (type: string) => {
    switch(type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'location': return MapPin;
      default: return MapPin;
    }
  };

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

  if (loading) {
    return (
      <footer className="relative bg-[#020617] border-t border-[#1E293B] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-800 rounded-xl" />
          </div>
        </div>
      </footer>
    );
  }

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
            
            {/* CEO Message - Dynamic */}
            <div className="mb-4 p-4 bg-[#0F172A]/50 rounded-xl border border-[#1E293B]">
              <p className="text-[#94A3B8] text-xs font-light tracking-wide italic leading-relaxed mb-2">
                &quot;{settings.ceo_message}&quot;
              </p>
              <p className="text-[#F8FAFC] text-xs font-semibold font-sans tracking-wide">— {settings.ceo_name}</p>
              <p className="text-[#6366F1] text-[10px] font-medium font-sans tracking-wide mt-1">{settings.ceo_title}</p>
            </div>

            {/* Contact Info - Dynamic from database */}
            <div className="space-y-2">
              {contacts.map((contact) => {
                const Icon = getContactIcon(contact.type);
                return (
                  <Link
                    key={contact.id}
                    href={contact.url || '#'}
                    target={contact.type === 'location' ? "_blank" : undefined}
                    className="flex items-center gap-2 text-[#94A3B8] hover:text-[#6366F1] transition-colors duration-200 group cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-light tracking-wide">{contact.value}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Services Links */}
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

          {/* Products Links */}
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

          {/* Social & Connect */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-[#F8FAFC] font-semibold font-sans tracking-wide text-base">Connect</h3>
            </div>
            
            {/* Social Links - Dynamic from database */}
            <div className="flex flex-wrap gap-2 mb-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon_name] || Github;
                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[${social.color}] hover:border-[#6366F1] transition-all duration-200 group cursor-pointer`}
                    aria-label={social.platform}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
            
            {/* Social handles */}
            <p className="text-xs text-[#94A3B8] font-light tracking-wide">Follow us for updates</p>
            <p className="text-[10px] text-[#6366F1] font-medium tracking-wide mt-1">@{settings.social_handle}</p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-10 pt-4 border-t border-[#1E293B]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[#94A3B8] text-xs font-light tracking-wide text-center md:text-left">
              © {currentYear} Nestick Tech. All rights reserved.
            </p>
            <p className="text-[#94A3B8] text-xs font-light tracking-wide flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#EF4444] fill-[#EF4444] animate-pulse" /> in Lahore, Pakistan
            </p>
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