/* eslint-disable react-hooks/exhaustive-deps */
// app/blog/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Eye, ArrowLeft, Clock, User, ChevronRight, Palette } from 'lucide-react';
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
  // Theme fields
  theme_heading_color: string;
  theme_font_family: string;
  theme_bg_color: string;
  theme_text_color: string;
  theme_accent_color: string;
}

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Process content with theme-aware styling
  const processContent = (html: string) => {
    if (!html) return '';
    
    let processed = html.replace(
      /<li>\[ \]<\/li>/g,
      '<li class="checkbox-item"><input type="checkbox" class="checkbox-input" /><span class="checkbox-label"></span></li>'
    );
    
    processed = processed.replace(
      /<li>\[x\]<\/li>/g,
      '<li class="checkbox-item"><input type="checkbox" class="checkbox-input" checked disabled /><span class="checkbox-label"></span></li>'
    );
    
    processed = processed.replace(/<ul>/g, '<ul class="custom-list">');
    processed = processed.replace(/<ol>/g, '<ol class="custom-list ordered">');
    
    return processed;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Blog not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate read time
  const readTime = blog.read_time || Math.ceil(blog.content?.length / 1000) || 3;

  // Theme CSS variables
  const themeStyles = {
    '--heading-color': blog.theme_heading_color || '#000000',
    '--text-color': blog.theme_text_color || '#333333',
    '--bg-color': blog.theme_bg_color || '#ffffff',
    '--accent-color': blog.theme_accent_color || '#8b5cf6',
    '--font-family': blog.theme_font_family || 'Arial, sans-serif',
  } as React.CSSProperties;

  return (
    <main 
      className="min-h-screen pt-20 lg:pt-24 overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: blog.theme_bg_color || '#ffffff',
        color: blog.theme_text_color || '#333333',
        fontFamily: blog.theme_font_family || 'Arial, sans-serif',
      }}
    >
      {/* Background subtle pattern based on theme */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${blog.theme_accent_color || '#8b5cf6'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer group border"
            style={{
              backgroundColor: `${blog.theme_bg_color}cc`,
              borderColor: `${blog.theme_text_color}33`,
              color: blog.theme_text_color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = blog.theme_accent_color;
              e.currentTarget.style.color = blog.theme_accent_color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${blog.theme_text_color}33`;
              e.currentTarget.style.color = blog.theme_text_color;
            }}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Blogs</span>
          </button>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
          style={{
            backgroundColor: `${blog.theme_bg_color}dd`,
            border: `1px solid ${blog.theme_text_color}20`,
          }}
        >
          {/* Featured Image with theme accent overlay */}
          {blog.featured_image && (
            <motion.div variants={itemVariants} className="relative h-48 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={blog.featured_image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t to-transparent"
                style={{
                  background: `linear-gradient(to top, ${blog.theme_bg_color}, transparent)`,
                }}
              />
            </motion.div>
          )}

          {/* Content Wrapper */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Category Badge */}
            {blog.category && (
              <motion.div variants={itemVariants}>
                <span 
                  className="inline-block px-3 py-1 rounded-lg text-xs font-medium mb-4"
                  style={{
                    backgroundColor: `${blog.theme_accent_color}20`,
                    color: blog.theme_accent_color,
                  }}
                >
                  {blog.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: blog.theme_heading_color }}
            >
              {blog.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-xs mb-8 pb-6"
              style={{
                borderBottom: `1px solid ${blog.theme_text_color}20`,
                color: `${blog.theme_text_color}cc`,
              }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={14} style={{ color: blog.theme_accent_color }} />
                <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={14} style={{ color: blog.theme_accent_color }} />
                <span>{blog.views} views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} style={{ color: blog.theme_accent_color }} />
                <span>{readTime} min read</span>
              </div>
              {blog.author && (
                <div className="flex items-center gap-1.5">
                  <User size={14} style={{ color: blog.theme_accent_color }} />
                  <span>{blog.author}</span>
                </div>
              )}
            </motion.div>

            {/* Blog Content with Theme Styling */}
            <motion.div 
              variants={itemVariants}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
            />

            {/* Navigation Footer */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
              style={{
                borderTop: `1px solid ${blog.theme_text_color}20`,
              }}
            >
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: blog.theme_accent_color,
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blogs</span>
              </button>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 transition-colors duration-300 cursor-pointer group text-sm"
                style={{ color: blog.theme_text_color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = blog.theme_accent_color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = blog.theme_text_color;
                }}
              >
                <span>View All Articles</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.article>
      </div>

      {/* Theme-Aware Global Styles */}
      <style jsx global>{`
        /* Blog Content Styles - Theme Aware */
        .blog-content {
          color: ${blog.theme_text_color};
          font-family: ${blog.theme_font_family};
          line-height: 1.7;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: ${blog.theme_heading_color};
          font-family: ${blog.theme_font_family};
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          letter-spacing: -0.02em;
        }
        
        .blog-content h1 { font-size: 2em; }
        .blog-content h2 { font-size: 1.75em; border-left: 4px solid ${blog.theme_accent_color}; padding-left: 1rem; }
        .blog-content h3 { font-size: 1.5em; }
        .blog-content h4 { font-size: 1.25em; }
        
        .blog-content p {
          margin-bottom: 1.25em;
          line-height: 1.7;
          color: ${blog.theme_text_color};
        }
        
        .blog-content a {
          color: ${blog.theme_accent_color};
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }
        
        .blog-content a:hover {
          border-bottom-color: ${blog.theme_accent_color};
          opacity: 0.8;
        }
        
        .blog-content strong,
        .blog-content b {
          color: ${blog.theme_heading_color};
          font-weight: 700;
        }
        
        .blog-content blockquote {
          border-left: 3px solid ${blog.theme_accent_color};
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          opacity: 0.8;
        }
        
        .blog-content code {
          background: ${blog.theme_text_color}10;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.85em;
          font-family: monospace;
          color: ${blog.theme_accent_color};
        }
        
        .blog-content pre {
          background: ${blog.theme_text_color}10;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid ${blog.theme_text_color}20;
        }
        
        .blog-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
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
        }
        
        .custom-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: ${blog.theme_accent_color};
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
          color: ${blog.theme_accent_color};
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
          accent-color: ${blog.theme_accent_color};
          border-radius: 0.25rem;
          transition: all 0.3s ease;
        }
        
        .checkbox-input:checked {
          background-color: ${blog.theme_accent_color};
        }
        
        .checkbox-input:disabled {
          cursor: default;
          opacity: 0.6;
        }
        
        .checkbox-label {
          flex: 1;
        }
        
        /* Table Styles */
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        
        .blog-content th,
        .blog-content td {
          border: 1px solid ${blog.theme_text_color}30;
          padding: 0.75rem;
          text-align: left;
        }
        
        .blog-content th {
          background: ${blog.theme_text_color}10;
          font-weight: 600;
          color: ${blog.theme_heading_color};
        }
        
        .blog-content hr {
          border: none;
          height: 1px;
          background: ${blog.theme_text_color}20;
          margin: 2rem 0;
        }
        
        /* Selection Color */
        ::selection {
          background: ${blog.theme_accent_color}40;
          color: ${blog.theme_text_color};
        }
      `}</style>
    </main>
  );
}