/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blogs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Eye, Search, Filter, Tag, Clock, Sparkles } from 'lucide-react';

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
}

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [sortBy, setSortBy] = useState('latest');

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
        
        // Extract unique categories - Fixed type issue
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
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => (blog.category || 'Uncategorized') === selectedCategory);
    }
    
    // Sort blogs
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    }
    
    setFilteredBlogs(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-2 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Section with Smooth Animation */}
      <div 
        className="relative h-[300px] mt-[1rem] md:h-[450px] bg-cover bg-center bg-fixed flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        {/* Gradient Overlay - Blue/Purple themed like about page */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/80 via-[#020617]/80 to-[#0F172A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 via-transparent to-[#8B5CF6]/20" />
        
        {/* Background animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full text-center px-4 animate-fade-in-up">
          <div className="animate-slide-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] animate-scale-in">
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
            
            <p className="text-sm sm:text-base text-[#E2E8F0] max-w-2xl mx-auto font-light tracking-wide leading-relaxed bg-[#0F172A]/40 backdrop-blur-sm px-6 py-3 rounded-xl animate-slide-in-right">
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
              <div className="bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl p-5 hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-sm lg:text-base font-semibold font-sans tracking-wide text-[#F8FAFC] mb-3 flex items-center gap-2">
                  <Search size={18} className="text-[#6366F1]" />
                  Search Articles
                </h3>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-[#020617] border border-[#1E293B] rounded-lg text-[#E2E8F0] placeholder:text-[#64748B] focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm font-sans tracking-wide"
                />
              </div>

              {/* Categories Filter */}
              <div className="bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl p-5 hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-sm lg:text-base font-semibold font-sans tracking-wide text-[#F8FAFC] mb-3 flex items-center gap-2">
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
                          : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#6366F1]/10'
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
              <div className="bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl p-5 hover:border-[#6366F1]/50 transition-all duration-300">
                <h3 className="text-sm lg:text-base font-semibold font-sans tracking-wide text-[#F8FAFC] mb-3 flex items-center gap-2">
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
                          : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#6366F1]/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 backdrop-blur-sm rounded-xl p-4 border border-[#6366F1]/30">
                <p className="text-xs sm:text-sm text-[#94A3B8] text-center font-sans tracking-wide">
                  Found <span className="font-bold text-[#6366F1]">{filteredBlogs.length}</span> articles
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Blog Grid */}
          <div className="flex-1">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-20 bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl">
                <p className="text-[#94A3B8] text-lg font-sans tracking-wide">No articles found</p>
                <p className="text-[#64748B] text-sm mt-2">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog, index) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`}>
                    <div 
                      className="group bg-[#0F172A]/60 backdrop-blur-sm border border-[#1E293B] rounded-xl overflow-hidden hover:border-[#6366F1]/50 transition-all duration-300 cursor-pointer h-full animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {blog.featured_image && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={blog.featured_image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {blog.category && (
                            <span className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-lg text-xs text-white font-sans tracking-wide">
                              {blog.category}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="text-lg lg:text-xl font-semibold font-serif tracking-tight text-[#F8FAFC] mb-2 line-clamp-2 group-hover:text-[#6366F1] transition-colors">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-[#94A3B8] font-light tracking-wide line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-[#94A3B8] pt-3 border-t border-[#1E293B]">
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