"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    text: "Nestick Tech transformed our business with their innovative POS system. The team's expertise and dedication to quality are unmatched.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "EduFuture Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    text: "The LMS platform they built for us is exceptional. Our students love the intuitive interface, and the analytics dashboard gives us valuable insights.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Product Manager",
    company: "HealthPlus Solutions",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop",
    text: "Working with Nestick Tech on our healthcare app was a game-changer. Their attention to security and user experience is remarkable.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "Founder",
    company: "RetailPro",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    text: "The inventory management system they developed streamlined our entire operation. We've seen a 40% increase in efficiency.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const imageVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    }),
  };

  const textVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  return (
    <section className="w-full py-10 lg:py-12 bg-[#020617] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Services Section Font Styles */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6 lg:mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300">
            <Quote className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="text-xs font-medium font-sans tracking-wide text-[#94A3B8]">
              Client Testimonials
            </span>
          </div>
          
          {/* Heading - Services section style */}
          <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-2">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          
          {/* Description - Services section style */}
          <p className="text-xs md:text-sm text-[#94A3B8] max-w-2xl mx-auto font-light tracking-wide">
            Don&apos;t just take our word for it — hear from some of our satisfied clients
          </p>
          
          {/* Decorative line */}
          <div className="mt-3 flex justify-center">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
          </div>
        </motion.div>

        {/* Main Content - Desktop Layout */}
        <div className="hidden lg:flex flex-row items-center gap-6">
          {/* LEFT SIDE - IMAGE CARD (Smaller Width) */}
          <div className="relative w-[280px]">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-3 rounded-2xl border border-[#1E293B] shadow-xl">
              <div className="relative h-[280px] w-full overflow-hidden rounded-xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`image-${active}`}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={testimonials[active].image}
                      alt={testimonials[active].name}
                      fill
                      className="object-cover object-center"
                      sizes="280px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC]">
                  {testimonials[active].name}
                </h3>
                <p className="text-xs text-[#94A3B8] font-light tracking-wide">
                  {testimonials[active].role}, {testimonials[active].company}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - TEXT CONTENT (Smaller) */}
          <div className="flex-1">
            <div className="relative bg-[#0F172A] border border-[#1E293B] rounded-xl shadow-xl p-5">
              {/* Quote Icon */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-3 shadow-lg">
                <Quote className="w-4 h-4 text-white" />
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`text-${active}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="text-sm text-[#F8FAFC] leading-relaxed font-light tracking-wide mb-3">
                    {testimonials[active].text}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonials[active].rating
                            ? 'text-[#F59E0B] fill-[#F59E0B]'
                            : 'text-[#1E293B]'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative line */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full mt-3" />
            </div>

            {/* NAVIGATION BUTTONS + THUMBNAILS */}
            <div className="flex items-center justify-between gap-4 mt-4">
              {/* Thumbnails */}
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > active ? 1 : -1);
                      setActive(i);
                    }}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      active === i
                        ? "border-[#6366F1] shadow-lg shadow-[#6366F1]/20"
                        : "border-[#1E293B] hover:border-[#6366F1]/50"
                    }`}
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover object-center"
                        sizes="32px"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-8 h-8 rounded-full bg-[#0F172A] border border-[#1E293B] flex items-center justify-center hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300 cursor-pointer group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#6366F1]" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </button>

                {/* Counter */}
                <span className="text-xs text-[#94A3B8] font-light tracking-wide">
                  {active + 1}/{testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slider View */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Image - Smaller */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-3 rounded-2xl border border-[#1E293B] mb-3 max-w-[200px] mx-auto">
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl">
                <Image
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  fill
                  className="object-cover object-center"
                  sizes="200px"
                  priority
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="text-sm font-semibold font-sans tracking-wide text-[#F8FAFC]">
                  {testimonials[active].name}
                </h3>
                <p className="text-xs text-[#94A3B8] font-light tracking-wide">
                  {testimonials[active].role}, {testimonials[active].company}
                </p>
              </div>
            </div>

            {/* Text Content - Smaller */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center mb-2">
                <Quote className="w-3 h-3 text-white" />
              </div>
              <p className="text-xs text-[#F8FAFC] leading-relaxed font-light tracking-wide">
                {testimonials[active].text}
              </p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < testimonials[active].rating
                        ? 'text-[#F59E0B] fill-[#F59E0B]'
                        : 'text-[#1E293B]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation + Thumbnails */}
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="flex gap-1.5">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > active ? 1 : -1);
                      setActive(i);
                    }}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      active === i ? "border-[#6366F1]" : "border-[#1E293B]"
                    }`}
                  >
                    <div className="relative w-7 h-7">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover object-center"
                        sizes="28px"
                      />
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-7 h-7 rounded-full bg-[#0F172A] border border-[#1E293B] flex items-center justify-center"
                >
                  <ChevronLeft className="w-3 h-3 text-[#6366F1]" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-7 h-7 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center"
                >
                  <ChevronRight className="w-3 h-3 text-white" />
                </button>
                <span className="text-xs text-[#94A3B8]">
                  {active + 1}/{testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Stats - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center -space-x-2">
            {testimonials.slice(0, 4).map((t, idx) => (
              <div
                key={idx}
                className="relative w-6 h-6 rounded-full border-2 border-[#020617] overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover object-center"
                  sizes="24px"
                />
              </div>
            ))}
            <div className="relative w-6 h-6 rounded-full border-2 border-[#020617] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
              <span className="text-[8px] font-bold text-white">50+</span>
            </div>
          </div>
          <p className="text-[10px] text-[#94A3B8] font-light tracking-wide mt-2">
            Join <span className="text-[#6366F1] font-semibold">120+</span> satisfied clients who trust Nestick Tech
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <span className="text-[9px] text-[#94A3B8] ml-1 font-light tracking-wide">
              Rated 4.9/5 on Trustpilot
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}