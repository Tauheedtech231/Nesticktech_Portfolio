'use client';

import { useRouter } from 'next/navigation';
import { Calendar, Eye, ArrowLeft, Clock, User, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Blog {
  id: number;
  title: string;
  titleAr?: string;
  content: string;
  contentAr?: string;
  featured_image: string;
  views: number;
  created_at: string;
  category?: string;
  author?: string;
  read_time?: number;
  theme_heading_color: string;
  theme_font_family: string;
  theme_bg_color: string;
  theme_text_color: string;
  theme_accent_color: string;
}

export default function BlogClient({ blog }: { blog: Blog }) {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  // Content translations
  const content = {
    en: {
      backToBlogs: 'Back to Blogs',
      views: 'views',
      minRead: 'min read',
      viewAllArticles: 'View All Articles',
    },
    ar: {
      backToBlogs: 'العودة إلى المدونات',
      views: 'مشاهدة',
      minRead: 'دقيقة قراءة',
      viewAllArticles: 'عرض جميع المقالات',
    }
  };

  // Listen for language changes
  useEffect(() => {
    const checkLanguage = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      const htmlLang = document.documentElement.getAttribute('lang');
      if (htmlDir === 'rtl' || htmlLang === 'ar') {
        setLanguage('ar');
      } else {
        setLanguage('en');
      }
    };

    checkLanguage();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'dir' || mutation.attributeName === 'lang') {
          checkLanguage();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.language) {
        setLanguage(customEvent.detail.language);
      } else {
        checkLanguage();
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const currentContent = content[language];

  const getBlogTitle = () => isRTL ? (blog.titleAr || blog.title) : blog.title;
  const getBlogContent = () => isRTL ? (blog.contentAr || blog.content) : blog.content;

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

  const readTime = blog.read_time || Math.ceil((getBlogContent()?.length || 0) / 1000) || 3;

  return (
    <main 
      className="min-h-screen pt-20 lg:pt-24 overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: blog.theme_bg_color || '#ffffff',
        color: blog.theme_text_color || '#333333',
        fontFamily: blog.theme_font_family || 'Arial, sans-serif',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${blog.theme_accent_color || '#8b5cf6'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer group border ${isRTL ? 'flex-row-reverse' : ''}`}
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
            <ArrowLeft size={18} className={`transition-transform ${isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
            <span className="text-sm font-medium">{currentContent.backToBlogs}</span>
          </button>
        </motion.div>

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
          {blog.featured_image && (
            <motion.div variants={itemVariants} className="relative h-48 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={blog.featured_image} 
                alt={getBlogTitle()} 
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

          <div className="p-6 md:p-8 lg:p-10">
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

            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: blog.theme_heading_color }}
            >
              {getBlogTitle()}
            </motion.h1>

            <motion.div 
              variants={itemVariants}
              className={`flex flex-wrap items-center gap-4 text-xs mb-8 pb-6 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
              style={{
                borderBottom: `1px solid ${blog.theme_text_color}20`,
                color: `${blog.theme_text_color}cc`,
              }}
            >
              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Calendar size={14} style={{ color: blog.theme_accent_color }} />
                <span>{new Date(blog.created_at).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Eye size={14} style={{ color: blog.theme_accent_color }} />
                <span>{blog.views} {currentContent.views}</span>
              </div>
              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock size={14} style={{ color: blog.theme_accent_color }} />
                <span>{readTime} {currentContent.minRead}</span>
              </div>
              {blog.author && (
                <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User size={14} style={{ color: blog.theme_accent_color }} />
                  <span>{blog.author}</span>
                </div>
              )}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: processContent(getBlogContent()) }}
            />

            <motion.div 
              variants={itemVariants}
              className={`mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              style={{
                borderTop: `1px solid ${blog.theme_text_color}20`,
              }}
            >
              <button
                onClick={() => router.back()}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer group ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{
                  backgroundColor: blog.theme_accent_color,
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = isRTL ? 'translateX(4px)' : 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <ArrowLeft size={16} className={`transition-transform ${isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
                <span>{currentContent.backToBlogs}</span>
              </button>
              <Link
                href="/blogs"
                className={`inline-flex items-center gap-2 transition-colors duration-300 cursor-pointer group text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                style={{ color: blog.theme_text_color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = blog.theme_accent_color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = blog.theme_text_color;
                }}
              >
                <span>{currentContent.viewAllArticles}</span>
                <ChevronRight size={14} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </Link>
            </motion.div>
          </div>
        </motion.article>
      </div>

      <style jsx global>{`
        .blog-content {
          color: ${blog.theme_text_color};
          font-family: ${blog.theme_font_family};
          line-height: 1.7;
        }
        
        ${isRTL ? `
        .blog-content {
          direction: rtl;
          text-align: right;
        }
        
        .blog-content h2 {
          border-left: none;
          border-right: 4px solid ${blog.theme_accent_color};
          padding-right: 1rem;
          padding-left: 0;
        }
        
        .blog-content blockquote {
          border-left: none;
          border-right: 3px solid ${blog.theme_accent_color};
          padding-right: 1.25rem;
          padding-left: 0;
        }
        
        .custom-list li {
          padding-right: 1.5rem;
          padding-left: 0;
        }
        
        .custom-list li::before {
          left: auto;
          right: 0;
        }
        
        .checkbox-item {
          padding-right: 1.75rem !important;
          padding-left: 0 !important;
        }
        
        .checkbox-input {
          left: auto;
          right: 0;
        }
        
        .blog-content th,
        .blog-content td {
          text-align: right;
        }
        ` : ''}
        
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
        
        .blog-content ul,
        .blog-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
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
        
        ::selection {
          background: ${blog.theme_accent_color}40;
          color: ${blog.theme_text_color};
        }
      `}</style>
    </main>
  );
}