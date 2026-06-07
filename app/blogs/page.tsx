/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blogs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Eye, Search, Filter, Tag, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
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

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [sortBy, setSortBy] = useState('latest');
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

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterAndSortBlogs();
  }, [searchTerm, selectedCategory, sortBy, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog/posts?status=published');
      const data = await response.json();
      if (data.success) {
        const publishedBlogs = data.data.filter((b: any) => b.status === 'published');
        setBlogs(publishedBlogs);
        
        // Extract unique categories
        const categorySet = new Set<string>();
        categorySet.add('All');
        publishedBlogs.forEach((b: any) => {
          categorySet.add(b.category || 'Uncategorized');
        });
        const uniqueCategories = Array.from(categorySet);
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBlogs = () => {
    let filtered = [...blogs];
    
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => (blog.category || 'Uncategorized') === selectedCategory);
    }
    
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    }
    
    setFilteredBlogs(filtered);
  };

  // Theme-based class names for overall page
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-gray-50';
  const textColor = isDark ? 'text-[#F8FAFC]' : 'text-gray-900';
  const subTextColor = isDark ? 'text-[#94A3B8]' : 'text-gray-600';
  const cardBg = isDark ? 'bg-[#0F172A]/60' : 'bg-white/80';
  const cardBorder = isDark ? 'border-[#1E293B]' : 'border-gray-200';
  const overlayBg = isDark ? 'bg-[#020617]/80' : 'bg-gray-900/80';
  const badgeBg = isDark ? 'bg-[#0F172A]/60' : 'bg-gray-100/80';
  const inputBg = isDark ? 'bg-[#020617]' : 'bg-white';
  const inputBorder = isDark ? 'border-[#1E293B]' : 'border-gray-300';
  const placeholderColor = isDark ? 'text-[#64748B]' : 'text-gray-400';
  const hoverBorder = isDark ? 'hover:border-[#6366F1]/50' : 'hover:border-indigo-400/50';

  const heroImage = isDark
    ? 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
    : 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop")';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#6366F1] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Hero Section */}
      <div 
        className="relative h-[300px] mt-[1rem] md:h-[450px] bg-cover bg-center bg-fixed flex items-center overflow-hidden"
        style={{ backgroundImage: heroImage }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayBg} via-${overlayBg} to-${isDark ? '[#0F172A]/80' : 'gray-800/80'}`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-10 w-96 h-96 ${isDark ? 'bg-[#6366F1]/5' : 'bg-indigo-200/20'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s' }} />
          <div className={`absolute bottom-20 left-10 w-96 h-96 ${isDark ? 'bg-[#8B5CF6]/5' : 'bg-purple-200/20'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '10s', animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full text-center px-4 animate-fade-in-up">
          <div className="animate-slide-down">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${badgeBg} backdrop-blur-sm border ${cardBorder} animate-scale-in`}>
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs lg:text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                Our Blog
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4 animate-slide-in-left">
              Insights &{' '}
              <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            
            <p className={`text-sm sm:text-base ${isDark ? 'text-[#E2E8F0]' : 'text-gray-700'} max-w-2xl mx-auto font-light tracking-wide leading-relaxed ${badgeBg} backdrop-blur-sm px-6 py-3 rounded-xl animate-slide-in-right`}>
              Discover expert insights, industry trends, and innovative ideas from our team of creative minds.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search Box */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2`}>
                  <Search size={18} className="text-[#6366F1]" />
                  Search Articles
                </h3>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-2 ${inputBg} border ${inputBorder} rounded-lg ${isDark ? 'text-[#E2E8F0]' : 'text-gray-900'} ${placeholderColor} focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm font-sans tracking-wide`}
                />
              </div>

              {/* Categories Filter */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2`}>
                  <Tag size={18} className="text-[#8B5CF6]" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm font-sans tracking-wide ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
                          : `${subTextColor} hover:${textColor} ${isDark ? 'hover:bg-[#6366F1]/10' : 'hover:bg-indigo-50'}`
                      }`}
                    >
                      {category}
                      {category !== 'All' && (
                        <span className="float-right text-xs opacity-75">
                          {blogs.filter(b => (b.category || 'Uncategorized') === category).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2`}>
                  <Filter size={18} className="text-[#A855F7]" />
                  Sort By
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'latest', label: 'Latest First' },
                    { value: 'oldest', label: 'Oldest First' },
                    { value: 'popular', label: 'Most Popular' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm font-sans tracking-wide ${
                        sortBy === option.value
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
                          : `${subTextColor} hover:${textColor} ${isDark ? 'hover:bg-[#6366F1]/10' : 'hover:bg-indigo-50'}`
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 backdrop-blur-sm rounded-xl p-4 border border-[#6366F1]/30">
                <p className={`text-xs sm:text-sm ${subTextColor} text-center font-sans tracking-wide`}>
                  Found <span className="font-bold text-[#6366F1]">{filteredBlogs.length}</span> articles
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Blog Grid with Individual Blog Themes */}
          <div className="flex-1">
            {filteredBlogs.length === 0 ? (
              <div className={`text-center py-20 ${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl`}>
                <p className={`${subTextColor} text-lg font-sans tracking-wide`}>No articles found</p>
                <p className={`${isDark ? 'text-[#64748B]' : 'text-gray-400'} text-sm mt-2`}>Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`}>
                    <div 
                      className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full animate-fade-in-up hover:shadow-xl"
                      style={{
                        backgroundColor: blog.theme_bg_color || (isDark ? '#0F172A' : '#ffffff'),
                        border: `1px solid ${blog.theme_accent_color || '#6366F1'}30`,
                        fontFamily: blog.theme_font_family || 'inherit',
                        animationDelay: `${index * 0.1}s`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = blog.theme_accent_color || '#6366F1';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${blog.theme_accent_color || '#6366F1'}30`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {blog.featured_image && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={blog.featured_image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div 
                            className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(to top, ${blog.theme_bg_color || '#000'}cc, transparent)` }}
                          />
                          {blog.category && (
                            <span 
                              className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs text-white font-sans tracking-wide"
                              style={{ backgroundColor: blog.theme_accent_color || '#6366F1' }}
                            >
                              {blog.category}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 
                          className="text-lg lg:text-xl font-semibold tracking-tight mb-2 line-clamp-2 group-hover:opacity-80 transition-all"
                          style={{ color: blog.theme_heading_color || '#000000' }}
                        >
                          {blog.title}
                        </h2>
                        <p 
                          className="text-sm line-clamp-2 mb-4"
                          style={{ color: blog.theme_text_color || '#666666' }}
                        >
                          {blog.excerpt}
                        </p>
                        <div 
                          className="flex items-center justify-between text-sm pt-3 border-t"
                          style={{ 
                            color: `${blog.theme_text_color}99`,
                            borderTopColor: `${blog.theme_text_color}30`
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {blog.read_time && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{blog.read_time} min</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{blog.views}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Read More Button */}
                        <div className="mt-4">
                          <span 
                            className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                            style={{ color: blog.theme_accent_color || '#6366F1' }}
                          >
                            Read More
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for smooth animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slide-down {
          animation: slideDown 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}