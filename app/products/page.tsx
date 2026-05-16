/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Building2, ShoppingCart, TrendingUp, Store } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Using real projects data as products
const products = [
  {
    title: "Neezamiya",
    desc: "Complete educational management system for schools and universities",
    image: "/neezamiya.jpg",
    tags: ["Education", "LMS", "School Management"],
    status: "Live",
  },
  {
    title: "Advance POS",
    desc: "Smart point of sale system for retail businesses",
    image: "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UE9TfGVufDB8fDB8fHww",
    tags: ["Retail", "POS", "Inventory"],
    status: "Live",
  },
  {
    title: "MarX",
    desc: "Digital marketing suite for modern businesses",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Marketing", "Automation", "CRM"],
    status: "In Development",
  },
  {
    title: "Build N",
    desc: "Construction project management software",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
    tags: ["Construction", "Project"],
    status: "Concept",
  },
];

export default function CinematicShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".panel");

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${products.length * 1200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              products.length - 1,
              Math.floor(self.progress * products.length)
            );
            setActive(index);

            items.forEach((el, i) => {
              const offset = i - index;
              gsap.to(el, {
                y: offset * 140,
                scale: i === index ? 1 : 0.85,
                opacity: i === index ? 1 : 0.25,
                duration: 0.6,
                ease: "power3.out",
                overwrite: true,
              });
            });
          },
        });

        scrollTriggerRef.current = st;
      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  const openModal = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section ref={sectionRef} className="relative h-screen overflow-hidden text-white">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop"
            alt="background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative flex h-full items-center justify-center">
          {products.map((p, i) => (
            <div
              key={i}
              className="panel absolute w-full max-w-6xl px-6"
              style={{ zIndex: products.length - i }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                {/* LEFT */}
                <div className="text-left">
                  <div className="text-sm text-indigo-400">
                    0{i + 1} — PRODUCT
                  </div>
                  <div className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
                    {p.status}
                  </div>
                  <h2 className="mt-3 text-4xl font-bold">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-white/60">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CENTER */}
             <div className="flex justify-center">
  <div className="group relative cursor-pointer">
    
    {/* Glow Effect */}
    <div className="absolute -inset-2 rounded-3xl bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <Image
      src={p.image}
      alt={p.title}
      width={420}
      height={320}
      className="
        relative
        h-[260px]
        w-[380px]
        rounded-2xl
        object-cover
        shadow-2xl
        border
        border-white/10
        transition-all
        duration-500
        ease-out
        group-hover:scale-105
        group-hover:-translate-y-2
        group-hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]
      "
    />
  </div>
</div>

                {/* RIGHT */}
                <div className="flex flex-col items-end gap-4">
                  <button 
                    onClick={() => openModal(p)}
                    className="rounded-xl bg-white cursor-pointer px-6 py-3 text-black font-medium hover:scale-105 transition"
                  >
                    Request Demo
                  </button>

                  <div className="mt-2 text-sm text-white/60">
                    📞 03237594869
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-[0.3em]">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* Modal */}
    {isModalOpen && selectedProduct && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={closeModal}
  >
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      onClick={closeModal}
    />

    {/* Modal Content */}
    <div
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl border border-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition cursor-pointer"
      >
        ✕
      </button>

      <div className="text-center">
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-indigo-500/20 flex items-center justify-center">
          {selectedProduct.title === "Neezamiya" && (
            <Building2 className="w-7 h-7 text-indigo-400" />
          )}

          {selectedProduct.title === "Advance POS" && (
            <ShoppingCart className="w-7 h-7 text-indigo-400" />
          )}

          {selectedProduct.title === "MarX" && (
            <TrendingUp className="w-7 h-7 text-indigo-400" />
          )}

          {selectedProduct.title === "Build N" && (
            <Store className="w-7 h-7 text-indigo-400" />
          )}
        </div>

        {/* Heading */}
        <h3 className="text-2xl font-bold text-white mb-2">
          Request Demo - {selectedProduct.title}
        </h3>

        <p className="text-white/60 mb-5 text-sm">
          Fill out the form below and our team will get back to you within 24
          hours.
        </p>

        {/* Form */}
        <form className="space-y-3 text-left">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              Message (Optional)
            </label>

            <textarea
              rows={3}
              placeholder="Any specific requirements?"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition duration-200 cursor-pointer"
          >
            Submit Request
          </button>
        </form>

        <p className="text-xs text-white/40 mt-4">
          We'll contact you shortly to schedule a personalized demo.
        </p>
      </div>
    </div>
  </div>
)}
    </>
  );
}