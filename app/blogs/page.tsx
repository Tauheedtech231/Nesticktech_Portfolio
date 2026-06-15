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
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
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

// HARDCODED CATEGORIES with Arabic translations
const categoriesData = [
  { en: 'All', ar: 'الكل' },
  { en: 'Technology', ar: 'التقنية' },
  { en: 'Development', ar: 'التطوير' },
  { en: 'AI/ML', ar: 'الذكاء الاصطناعي' },
  { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
  { en: 'Business', ar: 'الأعمال' },
  { en: 'Design', ar: 'التصميم' },
  { en: 'Marketing', ar: 'التسويق' },
];

// HARDCODED SORT OPTIONS with Arabic translations
const sortOptions = [
  { value: 'latest', labelEn: 'Latest First', labelAr: 'الأحدث أولاً' },
  { value: 'oldest', labelEn: 'Oldest First', labelAr: 'الأقدم أولاً' },
  { value: 'popular', labelEn: 'Most Popular', labelAr: 'الأكثر مشاهدة' }
];

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  // Content translations for UI text
  const content = {
    en: {
      badge: 'Our Blog',
      heading: 'Insights &',
      headingHighlight: 'Stories',
      description: 'Discover expert insights, industry trends, and innovative ideas from our team of creative minds.',
      searchArticles: 'Search Articles',
      searchPlaceholder: 'Search...',
      categories: 'Categories',
      sortBy: 'Sort By',
      found: 'Found',
      articles: 'articles',
      noArticles: 'No articles found',
      tryAdjusting: 'Try adjusting your search or filter',
      readMore: 'Read More',
      min: 'min',
    },
    ar: {
      badge: 'مدونتنا',
      heading: 'رؤى و',
      headingHighlight: 'قصص',
      description: 'اكتشف رؤى الخبراء واتجاهات الصناعة والأفكار المبتكرة من فريقنا من العقول المبدعة.',
      searchArticles: 'البحث في المقالات',
      searchPlaceholder: 'بحث...',
      categories: 'التصنيفات',
      sortBy: 'ترتيب حسب',
      found: 'تم العثور على',
      articles: 'مقال',
      noArticles: 'لا توجد مقالات',
      tryAdjusting: 'حاول تعديل بحثك أو التصفية',
      readMore: 'اقرأ المزيد',
      min: 'دقيقة',
    }
  };

  // Get category display name based on language
  const getCategoryDisplay = (categoryEn: string) => {
    const cat = categoriesData.find(c => c.en === categoryEn);
    if (!cat) return isRTL ? categoryEn : categoryEn;
    return isRTL ? cat.ar : cat.en;
  };

  // Get categories for filter display (HARDCODED)
  const displayCategories = categoriesData.map(cat => ({
    value: cat.en,
    label: isRTL ? cat.ar : cat.en
  }));

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
  }, [searchTerm, selectedCategory, sortBy, blogs, language]);

  const fetchBlogs = async () => {
    try {
      console.log('🟡 Fetching blogs from API...');
      const response = await fetch('/api/blog/posts?status=published');
      const data = await response.json();
      
      // 🔥 PRINT FULL API RESPONSE IN CONSOLE
      console.log('📦 API RESPONSE:', JSON.stringify(data, null, 2));
      
      if (data.success) {
        const publishedBlogs = data.data.filter((b: any) => b.status === 'published');
        
        // 🔥 PRINT EACH BLOG'S TITLE AND ARABIC TITLE
        console.log('📝 BLOGS DATA:');
        publishedBlogs.forEach((blog: any, index: number) => {
          console.log(`  Blog ${index + 1}:`);
          console.log(`    - ID: ${blog.id}`);
          console.log(`    - title: ${blog.title}`);
          console.log(`    - titleAr: ${blog.titleAr || '❌ MISSING'}`);
          console.log(`    - excerpt: ${blog.excerpt?.substring(0, 50)}...`);
          console.log(`    - excerptAr: ${blog.excerptAr || '❌ MISSING'}`);
          console.log(`    - category: ${blog.category}`);
        });
        
        setBlogs(publishedBlogs);
      } else {
        console.error('❌ API returned success: false', data);
      }
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBlogs = () => {
    let filtered = [...blogs];
    
    if (searchTerm) {
      filtered = filtered.filter(blog => {
        const titleToSearch = isRTL ? (blog.titleAr || blog.title) : blog.title;
        const excerptToSearch = isRTL ? (blog.excerptAr || blog.excerpt) : blog.excerpt;
        return titleToSearch.toLowerCase().includes(searchTerm.toLowerCase()) ||
               excerptToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      });
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

  const currentContent = content[language];

  // Get blog title with proper fallback
  const getBlogTitle = (blog: Blog) => {
    if (isRTL) {
      if (blog.titleAr && blog.titleAr.trim() !== '') {
        return blog.titleAr;
      }
      console.log(`⚠️ Missing Arabic title for blog ID ${blog.id}: "${blog.title}"`);
      return blog.title;
    }
    return blog.title;
  };

  const getBlogExcerpt = (blog: Blog) => {
    if (isRTL) {
      if (blog.excerptAr && blog.excerptAr.trim() !== '') {
        return blog.excerptAr;
      }
      return blog.excerpt;
    }
    return blog.excerpt;
  };

  // Theme-based class names
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
    <div className={`min-h-screen ${bgColor}`} dir={isRTL ? 'rtl' : 'ltr'}>
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
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${badgeBg} backdrop-blur-sm border ${cardBorder} animate-scale-in ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-[#6366F1]" />
              <span className="text-xs lg:text-sm font-medium font-sans tracking-wide bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent italic">
                {currentContent.badge}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#F8FAFC] mb-4 animate-slide-in-left">
              {isRTL ? (
                <>
                  <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                    {currentContent.headingHighlight}
                  </span>
                  {' '}{currentContent.heading}
                </>
              ) : (
                <>
                  {currentContent.heading}{' '}
                  <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                    {currentContent.headingHighlight}
                  </span>
                </>
              )}
            </h1>
            
            <p className={`text-sm sm:text-base ${isDark ? 'text-[#E2E8F0]' : 'text-gray-700'} max-w-2xl mx-auto font-light tracking-wide leading-relaxed ${badgeBg} backdrop-blur-sm px-6 py-3 rounded-xl animate-slide-in-right ${isRTL ? 'text-right' : ''}`}>
              {currentContent.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search Box */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Search size={18} className="text-[#6366F1]" />
                  {currentContent.searchArticles}
                </h3>
                <input
                  type="text"
                  placeholder={currentContent.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full px-4 py-2 ${inputBg} border ${inputBorder} rounded-lg ${isDark ? 'text-[#E2E8F0]' : 'text-gray-900'} ${placeholderColor} focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm font-sans tracking-wide ${isRTL ? 'text-right' : ''}`}
                />
              </div>

              {/* Categories Filter - HARDCODED */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Tag size={18} className="text-[#8B5CF6]" />
                  {currentContent.categories}
                </h3>
                <div className="space-y-2">
                  {displayCategories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm font-sans tracking-wide ${isRTL ? 'text-right' : ''} ${
                        selectedCategory === category.value
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
                          : `${subTextColor} hover:${textColor} ${isDark ? 'hover:bg-[#6366F1]/10' : 'hover:bg-indigo-50'}`
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By - HARDCODED */}
              <div className={`${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl p-5 ${hoverBorder} transition-all duration-300`}>
                <h3 className={`text-sm lg:text-base font-semibold font-sans tracking-wide ${textColor} mb-3 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Filter size={18} className="text-[#A855F7]" />
                  {currentContent.sortBy}
                </h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer text-sm font-sans tracking-wide ${isRTL ? 'text-right' : ''} ${
                        sortBy === option.value
                          ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
                          : `${subTextColor} hover:${textColor} ${isDark ? 'hover:bg-[#6366F1]/10' : 'hover:bg-indigo-50'}`
                      }`}
                    >
                      {isRTL ? option.labelAr : option.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 backdrop-blur-sm rounded-xl p-4 border border-[#6366F1]/30">
                <p className={`text-xs sm:text-sm ${subTextColor} text-center font-sans tracking-wide ${isRTL ? 'rtl' : ''}`}>
                  {currentContent.found} <span className="font-bold text-[#6366F1]">{filteredBlogs.length}</span> {currentContent.articles}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Blog Grid */}
          <div className="flex-1">
            {filteredBlogs.length === 0 ? (
              <div className={`text-center py-20 ${cardBg} backdrop-blur-sm border ${cardBorder} rounded-xl`}>
                <p className={`${subTextColor} text-lg font-sans tracking-wide ${isRTL ? 'text-right' : ''}`}>{currentContent.noArticles}</p>
                <p className={`${isDark ? 'text-[#64748B]' : 'text-gray-400'} text-sm mt-2 ${isRTL ? 'text-right' : ''}`}>{currentContent.tryAdjusting}</p>
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
                            alt={getBlogTitle(blog)} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div 
                            className="absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: `linear-gradient(to top, ${blog.theme_bg_color || '#000'}cc, transparent)` }}
                          />
                          {blog.category && (
                            <span 
                              className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} px-2 py-1 rounded-lg text-xs text-white font-sans tracking-wide`}
                              style={{ backgroundColor: blog.theme_accent_color || '#6366F1' }}
                            >
                              {getCategoryDisplay(blog.category)}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 
                          className="text-lg lg:text-xl font-semibold tracking-tight mb-2 line-clamp-2 group-hover:opacity-80 transition-all"
                          style={{ color: blog.theme_heading_color || '#000000' }}
                        >
                          {getBlogTitle(blog)}
                        </h2>
                        <p 
                          className="text-sm line-clamp-2 mb-4"
                          style={{ color: blog.theme_text_color || '#666666' }}
                        >
                          {getBlogExcerpt(blog)}
                        </p>
                        <div 
                          className={`flex items-center justify-between text-sm pt-3 border-t ${isRTL ? 'flex-row-reverse' : ''}`}
                          style={{ 
                            color: `${blog.theme_text_color}99`,
                            borderTopColor: `${blog.theme_text_color}30`
                          }}
                        >
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Calendar size={14} />
                            <span>{new Date(blog.created_at).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                          </div>
                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {blog.read_time && (
                              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Clock size={14} />
                                <span>{blog.read_time} {currentContent.min}</span>
                              </div>
                            )}
                            <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Eye size={14} />
                              <span>{blog.views}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Read More Button */}
                        <div className="mt-4">
                          <span 
                            className={`inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                            style={{ color: blog.theme_accent_color || '#6366F1' }}
                          >
                            {currentContent.readMore}
                            <ArrowRight size={14} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
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

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.7s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}