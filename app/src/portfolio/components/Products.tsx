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
     '/neezamiya.jpg'
  },
  {
    id: 2,
    name: "Advance POS",
    shortDescription: "Smart point of sale system for retail businesses",
    status: "Live",
    tags: ["Retail", "POS", "Inventory"],
    icon: ShoppingCart,
    image:
      "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UE9TfGVufDB8fDB8fHww"
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

      // Calculate progress from 0 to 1
      let progress = (scroll - top) / height;
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Add pause at start (0 to 0.15 = first product)
      // Add pause at end (0.85 to 1 = last product)
      let adjustedProgress;
      if (progress <= 0.15) {
        // First product zone - pause zone
        adjustedProgress = 0;
      } else if (progress >= 0.85) {
        // Last product zone - pause zone
        adjustedProgress = 1;
      } else {
        // Normal transition zone (0.15 to 0.85)
        adjustedProgress = (progress - 0.15) / 0.7;
      }
      
      // Calculate step based on adjusted progress
      let step = Math.floor(adjustedProgress * projects.length);
      
      // Ensure step is within bounds
      if (step < 0) step = 0;
      if (step >= projects.length) step = projects.length - 1;
      
      setActiveIndex(step);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[activeIndex];
  const Icon = project.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
    <section ref={ref} className="h-[500vh] md:h-[500vh] bg-[#020617] text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-8 max-w-3xl ml-4 sm:ml-6 md:ml-12"
      >

        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full mb-3 cursor-pointer transition-all duration-300 hover:border-[#6366F1] hover:bg-[#6366F1]/20"
        >
          <span className="text-xs font-medium font-sans tracking-wide text-[#6366F1] italic cursor-pointer">
            Our Products
          </span>
        </motion.div>

        {/* HEADING - Fixed responsiveness */}
        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white leading-tight"
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Own Products
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          className="mt-3 text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed font-light max-w-xl"
        >
          Discover powerful in-house solutions crafted to solve real business challenges efficiently.
        </motion.p>

        {/* LINE */}
        <motion.div className="mt-4">
          <div className="w-14 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
        </motion.div>

      </motion.div>

      {/* CONTENT - Increased mobile height container */}
      <div className="sticky top-0 h-auto min-h-screen lg:h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:py-0">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Single container for description and image - Responsive grid with increased mobile spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* LEFT - PRODUCT DESCRIPTION CONTENT - Increased mobile spacing */}
            <div className="space-y-6 md:space-y-8">
              {/* Status Badge */}
              <span className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white/10 border border-white/20 w-fit cursor-pointer hover:bg-white/20 transition-all duration-300">
                {project.status}
              </span>

              {/* Icon and Product Name Container - Fixed mobile overlap */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Icon className="text-blue-400 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold break-words leading-tight">
                    {project.name}
                  </h2>
                </div>
              </div>

              {/* Description with more space */}
              <div className="pt-2">
                <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Tags with better spacing */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-white/10 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* BUTTON with more padding */}
              <div className="pt-6">
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-base sm:text-lg font-medium shadow-lg hover:shadow-blue-500/25"
                >
                  Request Demo
                </button>
              </div>
            </div>

            {/* RIGHT - IMAGE SECTION with better spacing */}
            <div className="space-y-4 mt-8 sm:mt-0">
              <div className="cursor-pointer transition-all duration-500 hover:scale-[1.02]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL - Fixed responsiveness */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl font-bold">Request Demo</h2>

            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20"
            />

            <input
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20"
            />

            <input
              name="productInterest"
              placeholder="Product Interest"
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20"
            />

            <textarea
              name="useCase"
              placeholder="Use Case"
              onChange={handleChange}
              rows={3}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg resize-vertical cursor-pointer hover:border-white/20"
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg cursor-pointer hover:border-white/20"
            />

            <button className="w-full py-3 sm:py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer hover:scale-[1.02] font-medium text-base sm:text-lg">
              Submit
            </button>

            <button
              onClick={() => setOpenModal(false)}
              className="text-sm sm:text-base text-gray-400 text-center w-full hover:text-gray-300 transition-colors cursor-pointer pt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}