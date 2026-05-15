"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  Store,
} from "lucide-react";

interface FormData {
  name: string;
  companyName: string;
  productInterest: string;
  useCase: string;
  contactNumber: string;
}

const projects = [
  {
    id: 1,
    name: "Neezamiya",
    shortDescription:
      "Complete educational management system for schools and universities",
    status: "Live",
    tags: ["Education", "LMS", "School Management"],
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Advance POS",
    shortDescription: "Smart point of sale system for retail businesses",
    status: "Live",
    tags: ["Retail", "POS", "Inventory"],
    icon: ShoppingCart,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    name: "MarX",
    shortDescription: "Digital marketing suite for modern businesses",
    status: "In Development",
    tags: ["Marketing", "Automation", "CRM"],
    icon: TrendingUp,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Build N",
    shortDescription: "Construction project management software",
    status: "Concept",
    tags: ["Construction", "Project"],
    icon: Store,
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    productInterest: "",
    useCase: "",
    contactNumber: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const top = ref.current.offsetTop;
      const height = ref.current.offsetHeight;
      const scroll = window.scrollY + window.innerHeight;

      const progress = (scroll - top) / height;

      let step = Math.floor(progress * projects.length);
      if (step < 0) step = 0;
      if (step >= projects.length) step = projects.length - 1;

      setActiveIndex(step);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[activeIndex];
  const Icon = project.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} className="h-[400vh] bg-[#020617] text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-8 max-w-3xl ml-6 sm:ml-12"
      >

        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20"
        >
          <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic">
            Our Products
          </span>
        </motion.div>

        {/* 🔥 HEADING */}
        <motion.h1
          className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white leading-tight"
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Own Products
          </span>
        </motion.h1>

        {/* 🔥 SUBTEXT */}
        <motion.p
          className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light max-w-xl"
        >
          Discover powerful in-house solutions crafted to solve real business challenges efficiently.
        </motion.p>

        {/* 🔥 LINE */}
        <motion.div className="mt-4">
          <div className="w-14 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
        </motion.div>

      </motion.div>

      {/* CONTENT */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          
          {/* LEFT - PRODUCT DESCRIPTION CONTENT */}
          <div className="space-y-5">
            <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20">
              {project.status}
            </span>

            <div className="flex items-center gap-3">
              <Icon className="text-blue-400" />
              <h2 className="text-4xl font-bold">{project.name}</h2>
            </div>

            <p className="text-gray-400 text-lg">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.03] transition cursor-pointer"
            >
              Request Demo
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="space-y-4">
            <img
              src={project.image}
              alt={project.name}
              className="rounded-2xl shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

        </div>
      </div>

      {/* 🔥 MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-2xl w-[90%] max-w-md space-y-4">
            <h2 className="text-xl font-bold">Request Demo</h2>

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/30 border border-white/10"
            />

            <input
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/30 border border-white/10"
            />

            <input
              name="productInterest"
              placeholder="Product Interest"
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/30 border border-white/10"
            />

            <textarea
              name="useCase"
              placeholder="Use Case"
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/30 border border-white/10"
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              onChange={handleChange}
              className="w-full p-2 rounded bg-black/30 border border-white/10"
            />

            <button className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700">
              Submit
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="text-sm text-gray-400 text-center w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}