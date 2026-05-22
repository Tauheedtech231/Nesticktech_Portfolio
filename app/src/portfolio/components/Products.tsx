"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ShoppingCart,
  TrendingUp,
  Store,
  X,
  Send,
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
    image: '/neezamiya.jpg'
  },
  {
    id: 2,
    name: "Advance POS",
    shortDescription: "Smart point of sale system for retail businesses",
    status: "Live",
    tags: ["Retail", "POS", "Inventory"],
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1586864030223-a918b07d357d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "MarX",
    shortDescription: "Digital marketing suite for modern businesses",
    status: "In Development",
    tags: ["Marketing", "Automation", "CRM"],
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Build N",
    shortDescription: "Construction project management software",
    status: "Concept",
    tags: ["Construction", "Project"],
    icon: Store,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const canScroll = useRef(true);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    companyName: "",
    productInterest: "",
    useCase: "",
    contactNumber: "",
  });

  // Check if both left and right content are fully visible
  useEffect(() => {
    const checkVisibility = () => {
      if (leftContentRef.current && rightContentRef.current) {
        const leftRect = leftContentRef.current.getBoundingClientRect();
        const rightRect = rightContentRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const isLeftFullyVisible = leftRect.top >= 0 && leftRect.bottom <= viewportHeight;
        const isRightFullyVisible = rightRect.top >= 0 && rightRect.bottom <= viewportHeight;
        
        setIsContentVisible(isLeftFullyVisible && isRightFullyVisible);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [activeIndex]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  // Function to reset scroll ability after 1 second
  const resetScrollAbility = () => {
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }
    
    scrollTimer.current = setTimeout(() => {
      canScroll.current = true;
      scrollTimer.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (!isContentVisible) return;

    const handleWheel = (e: WheelEvent) => {
      // If modal is open, don't change products
      if (openModal) {
        return;
      }

      if (!canScroll.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        if (activeIndex < projects.length - 1) {
          e.preventDefault();
          setActiveIndex(prev => prev + 1);
          canScroll.current = false;
          resetScrollAbility();
        }
      } 
      else if (e.deltaY < 0) {
        if (activeIndex > 0) {
          e.preventDefault();
          setActiveIndex(prev => prev - 1);
          canScroll.current = false;
          resetScrollAbility();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, isContentVisible, openModal]);

  const project = projects[activeIndex];
  const Icon = project.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    setOpenModal(false);
    setFormData({
      name: "",
      companyName: "",
      productInterest: "",
      useCase: "",
      contactNumber: "",
    });
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#020617] text-white">
      
      {/* HEADER */}
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

        <motion.h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white leading-tight"
        >
          Explore Our{" "}
          <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            Own Products
          </span>
        </motion.h1>

        <motion.p
          className="mt-3 text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed font-light max-w-xl"
        >
          Discover powerful in-house solutions crafted to solve real business challenges efficiently.
        </motion.p>

        <motion.div className="mt-4">
          <div className="w-14 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
        </motion.div>
      </motion.div>

      {/* MAIN CONTENT - Sticky Section */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Desktop: 2 columns | Mobile: Single Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT CONTENT */}
            <div 
              ref={leftContentRef}
              className="space-y-5 md:space-y-6 lg:space-y-8"
            >
              {/* Mobile Card - No animations, just direct render */}
              <div className="lg:hidden">
                <div 
                  key={project.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                >
                  {/* Fixed height with object-contain to show full image */}
                  <div className="relative w-full h-64 overflow-hidden bg-black/20">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content inside card */}
                  <div className="p-5 space-y-4">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">
                      {project.status}
                    </span>

                    <div className="flex items-center gap-3">
                      <Icon className="text-blue-400 w-6 h-6 flex-shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-bold break-words leading-tight">
                        {project.name}
                      </h2>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-white/10 rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setOpenModal(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition-all duration-300 font-medium text-sm"
                    >
                      Request Demo
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout - With animations */}
              <div className="hidden lg:block space-y-6 md:space-y-8">
                <motion.div
                  key={`status-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <span className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white/10 border border-white/20 w-fit cursor-pointer hover:bg-white/20 transition-all duration-300">
                    {project.status}
                  </span>
                </motion.div>

                <motion.div
                  key={`title-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                  className="flex items-center gap-3"
                >
                  <Icon className="text-blue-400 w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words leading-tight">
                    {project.name}
                  </h2>
                </motion.div>

                <motion.p
                  key={`desc-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed"
                >
                  {project.shortDescription}
                </motion.p>

                <motion.div
                  key={`tags-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs sm:text-sm bg-white/10 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  key={`button-${project.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                >
                  <button
                    onClick={() => setOpenModal(true)}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-base sm:text-lg font-medium shadow-lg hover:shadow-blue-500/25"
                  >
                    Request Demo
                  </button>
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT - Desktop only image with animations */}
            <div 
              ref={rightContentRef}
              className="hidden lg:flex items-center justify-center"
            >
              <motion.div
                key={`img-${project.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-lg mx-auto cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-2xl shadow-2xl w-full h-auto object-contain max-h-[70vh]"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Progress indicator */}
      {/* <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex 
                ? 'w-8 bg-blue-500' 
                : idx < activeIndex 
                ? 'w-4 bg-blue-500/50' 
                : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div> */}

      {/* MODAL - Fixed heading and scroll issue */}
      {openModal && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-[#0f172a] p-6 sm:p-8 rounded-2xl w-full max-w-md space-y-5 max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-2xl sm:text-3xl font-bold sticky top-0 bg-[#0f172a] py-2 z-10">
              Request Demo
            </h2>

            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg"
            />

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg"
            />

            <input
              name="productInterest"
              placeholder="Product Interest"
              value={formData.productInterest}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg"
            />

            <textarea
              name="useCase"
              placeholder="Use Case"
              value={formData.useCase}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg resize-vertical"
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-lg bg-black/30 border border-white/10 focus:border-blue-500 outline-none transition-colors text-base sm:text-lg"
            />

            <button 
              onClick={handleSubmit}
              className="w-full py-3 sm:py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer hover:scale-[1.02] font-medium text-base sm:text-lg"
            >
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