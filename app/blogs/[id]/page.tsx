/* eslint-disable react-hooks/exhaustive-deps */
// app/blog/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Eye, ArrowLeft, Clock, User, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  views: number;
  created_at: string;
  category?: string;
  author?: string;
  read_time?: number;
}

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        stiffness: 50,
        damping: 10,
        mass: 0.5,
      },
    },
  };

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to process content and add checkboxes and lists
  const processContent = (html: string) => {
    if (!html) return '';
    
    // Convert checklist items to styled checkboxes
    let processed = html.replace(
      /<li>\[ \]<\/li>/g,
      '<li class="checkbox-item"><input type="checkbox" class="checkbox-input" /><span class="checkbox-label"></span></li>'
    );
    
    processed = processed.replace(
      /<li>\[x\]<\/li>/g,
      '<li class="checkbox-item"><input type="checkbox" class="checkbox-input" checked disabled /><span class="checkbox-label"></span></li>'
    );
    
    // Add styling for lists
    processed = processed.replace(
      /<ul>/g,
      '<ul class="custom-list">'
    );
    
    processed = processed.replace(
      /<ol>/g,
      '<ol class="custom-list ordered">'
    );
    
    return processed;
  };

  // Theme-based class names
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]/40' : 'bg-white/80';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const metaBg = isDark ? 'bg-[#0F172A]/60' : 'bg-gray-100/80';
  const metaBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const buttonBg = isDark ? 'bg-[#0F172A]/60' : 'bg-white/80';
  const buttonBorder = isDark ? 'border-[#1E293B]' : 'border-gray-300';
  const overlayGradient = isDark ? 'from-[#020617]' : 'from-gray-900';
  
  // Background orb colors
  const orb1Color = isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-100/30';
  const orb2Color = isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-100/30';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 bg-[#6366F1] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
        <div className="text-center">
          <p className={`${subTextColor} text-lg font-sans tracking-wide`}>Blog not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate read time if not provided
  const readTime = blog.read_time || Math.ceil(blog.content.length / 1000);

  return (
    <main className={`min-h-screen ${bgColor} pt-20 lg:pt-24 overflow-hidden`}>
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-20 right-10 w-96 h-96 ${orb1Color} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s' }} />
        <div className={`absolute bottom-20 left-10 w-96 h-96 ${orb2Color} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 px-4 py-2 ${buttonBg} backdrop-blur-sm border ${buttonBorder} rounded-lg ${subTextColor} hover:text-[#6366F1] hover:border-[#6366F1] transition-all duration-300 cursor-pointer group`}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-sans tracking-wide">Back to Blogs</span>
          </button>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-2xl overflow-hidden`}
        >
          {/* Featured Image */}
          {blog.featured_image && (
            <motion.div variants={itemVariants} className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={blog.featured_image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} via-transparent to-transparent`} />
            </motion.div>
          )}

          {/* Content Wrapper */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Category Badge */}
            {blog.category && (
              <motion.div variants={itemVariants}>
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg text-xs text-white font-sans tracking-wide mb-4">
                  {blog.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight ${textColor} mb-4`}
            >
              {blog.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div 
              variants={itemVariants}
              className={`flex flex-wrap items-center gap-3 text-xs ${subTextColor} mb-8 pb-4 border-b ${metaBorder}`}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#6366F1]" />
                <span className="font-sans tracking-wide">{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={14} className="text-[#8B5CF6]" />
                <span className="font-sans tracking-wide">{blog.views} views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#A855F7]" />
                <span className="font-sans tracking-wide">{readTime} min read</span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-[#22C55E]" />
                  <span className="font-sans tracking-wide">{blog.author}</span>
                </div>
              )}
            </motion.div>

            {/* Blog Content with Styled Lists and Checkboxes */}
            <motion.div 
              variants={itemVariants}
              className={`prose prose-base max-w-none ${isDark ? 'prose-invert' : ''}`}
              dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
            />

            {/* Navigation Footer */}
            <motion.div 
              variants={itemVariants}
              className={`mt-8 pt-6 border-t ${metaBorder} flex justify-between items-center`}
            >
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg hover:shadow-lg hover:shadow-[#6366F1]/25 transition-all duration-300 cursor-pointer group text-sm"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold font-sans tracking-wide">Back to Blogs</span>
              </button>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#6366F1] transition-colors cursor-pointer group text-sm"
              >
                <span className="text-sm font-sans tracking-wide">View All Articles</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.article>
      </div>

      {/* Global Styles for Checkboxes and Lists - Theme aware */}
      <style jsx global>{`
        /* Custom List Styles */
        .custom-list {
          list-style: none;
          padding-left: 0;
          margin: 1rem 0;
        }
        
        .custom-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: ${isDark ? '#E2E8F0' : '#374151'};
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .custom-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #6366F1;
          font-weight: bold;
          font-size: 1rem;
        }
        
        .custom-list.ordered {
          counter-reset: item;
        }
        
        .custom-list.ordered li {
          counter-increment: item;
        }
        
        .custom-list.ordered li::before {
          content: counter(item) ".";
          color: #8B5CF6;
          font-weight: 600;
        }
        
        /* Checkbox Styles */
        .checkbox-item {
          position: relative;
          padding-left: 1.75rem !important;
          list-style: none !important;
          margin-bottom: 0.5rem !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        
        .checkbox-input {
          position: absolute;
          left: 0;
          width: 1rem;
          height: 1rem;
          cursor: pointer;
          accent-color: #6366F1;
          border-radius: 0.25rem;
          border: 2px solid ${isDark ? '#1E293B' : '#D1D5DB'};
          background-color: ${isDark ? '#0F172A' : '#FFFFFF'};
          transition: all 0.3s ease;
        }
        
        .checkbox-input:checked {
          background-color: #6366F1;
          border-color: #6366F1;
        }
        
        .checkbox-input:disabled {
          cursor: default;
          opacity: 0.6;
        }
        
        .checkbox-label {
          flex: 1;
          color: ${isDark ? '#E2E8F0' : '#374151'};
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        /* Prose custom styles */
        .prose {
          color: ${isDark ? '#E2E8F0' : '#374151'};
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: ${isDark ? '#F8FAFC' : '#111827'};
          font-family: 'Georgia', 'Times New Roman', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose h2 {
          font-size: 1.5rem;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .prose h3 {
          font-size: 1.25rem;
        }
        
        .prose p {
          color: ${isDark ? '#94A3B8' : '#6B7280'};
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .prose strong {
          color: ${isDark ? '#F8FAFC' : '#111827'};
          font-weight: 600;
        }
        
        .prose a {
          color: #6366F1;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .prose a:hover {
          color: #8B5CF6;
          text-decoration: underline;
        }
        
        .prose blockquote {
          border-left: 3px solid #6366F1;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: ${isDark ? '#94A3B8' : '#6B7280'};
          background: ${isDark ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.02)'};
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
        }
        
        .prose code {
          background: ${isDark ? '#0F172A' : '#F3F4F6'};
          padding: 0.2rem 0.3rem;
          border-radius: 0.375rem;
          font-size: 0.8rem;
          color: #A855F7;
          font-family: monospace;
        }
        
        .prose pre {
          background: ${isDark ? '#0F172A' : '#F9FAFB'};
          padding: 0.75rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid ${isDark ? '#1E293B' : '#E5E7EB'};
        }
        
        .prose pre code {
          background: none;
          color: ${isDark ? '#E2E8F0' : '#374151'};
        }
        
        .prose img {
          border-radius: 0.75rem;
          margin: 1rem 0;
        }
        
        /* Table styles */
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.85rem;
        }
        
        .prose th,
        .prose td {
          border: 1px solid ${isDark ? '#1E293B' : '#E5E7EB'};
          padding: 0.5rem;
          text-align: left;
        }
        
        .prose th {
          background: ${isDark ? '#0F172A' : '#F3F4F6'};
          color: ${isDark ? '#F8FAFC' : '#111827'};
          font-weight: 600;
        }
        
        .prose td {
          color: ${isDark ? '#94A3B8' : '#6B7280'};
        }
      `}</style>
    </main>
  );
}