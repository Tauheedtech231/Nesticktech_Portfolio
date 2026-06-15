/* eslint-disable react/no-unescaped-entities */
// admin_blogs_portal/blogs/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Eye, X, Image as ImageIcon, FolderOpen, Palette, Languages } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  nameAr: string;
  description: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    titleAr: '',
    content: '',
    contentAr: '',
    excerpt: '',
    excerptAr: '',
    featured_image: '',
    status: 'draft',
    category_id: '',
    // Theme fields
    theme_heading_color: '#000000',
    theme_font_family: 'Arial, sans-serif',
    theme_bg_color: '#ffffff',
    theme_text_color: '#333333',
    theme_accent_color: '#8b5cf6',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, featured_image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        router.push('/admin_blogs_portal/blogs');
      } else {
        setError(data.error || 'Failed to create blog');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Blog</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Write and publish a new blog post with bilingual support (English & Arabic)</p>
        </div>
        <Link
          href="/admin_blogs_portal/blogs"
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          <X size={18} /> Cancel
        </Link>
      </div>

      {/* Bilingual Info Banner */}
      <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2">
          <Languages size={18} className="text-purple-500" />
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Fill in both English and Arabic fields. Your blog will be displayed in the user's preferred language.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Title - English & Arabic side by side */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇬🇧 Blog Title (English) *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter blog title in English"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {/* Arabic Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇸🇦 عنوان المدونة (عربي) *
                  </label>
                  <input
                    type="text"
                    name="titleAr"
                    value={formData.titleAr}
                    onChange={handleChange}
                    required
                    placeholder="أدخل عنوان المدونة بالعربية"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Content - English & Arabic side by side */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* English Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇬🇧 Content (English) *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={12}
                    placeholder="Write your blog content in English... (HTML tags supported)"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-2">HTML tags: h1, h2, p, ul, li, etc.</p>
                </div>
                {/* Arabic Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇸🇦 المحتوى (عربي) *
                  </label>
                  <textarea
                    name="contentAr"
                    value={formData.contentAr}
                    onChange={handleChange}
                    required
                    rows={12}
                    placeholder="اكتب محتوى مدونتك بالعربية... (HTML tags supported)"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none font-mono text-right"
                    dir="rtl"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-right">علامات HTML مدعومة: h1, h2, p, ul, li، إلخ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Category Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} / {category.nameAr}
                    </option>
                  ))}
                </select>
              </div>
              {categories.length === 0 && (
                <p className="text-xs text-yellow-500 mt-2">
                  No categories found. Please add categories first.
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition-colors"
                onClick={() => document.getElementById('imageUpload')?.click()}
              >
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.featured_image ? (
                  <img src={formData.featured_image} alt="Preview" className="max-h-32 mx-auto rounded-lg" />
                ) : (
                  <>
                    <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Excerpt - English & Arabic */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-4">
                {/* English Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇬🇧 Excerpt / Summary (English)
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Short summary of your blog in English..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none"
                  />
                </div>
                {/* Arabic Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    🇸🇦 الملخص / النبذة (عربي)
                  </label>
                  <textarea
                    name="excerptAr"
                    value={formData.excerptAr}
                    onChange={handleChange}
                    rows={3}
                    placeholder="ملخص قصير لمدونتك بالعربية..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Theme Customization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={20} className="text-purple-500" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Theme Customization</h3>
              </div>
              
              <div className="space-y-4">
                {/* Heading Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Heading Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      name="theme_heading_color"
                      value={formData.theme_heading_color}
                      onChange={handleChange}
                      className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="theme_heading_color"
                      value={formData.theme_heading_color}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-mono"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      name="theme_bg_color"
                      value={formData.theme_bg_color}
                      onChange={handleChange}
                      className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="theme_bg_color"
                      value={formData.theme_bg_color}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Body Text Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      name="theme_text_color"
                      value={formData.theme_text_color}
                      onChange={handleChange}
                      className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="theme_text_color"
                      value={formData.theme_text_color}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accent Color (Links/Buttons)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      name="theme_accent_color"
                      value={formData.theme_accent_color}
                      onChange={handleChange}
                      className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="theme_accent_color"
                      value={formData.theme_accent_color}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Family
                  </label>
                  <select
                    name="theme_font_family"
                    value={formData.theme_font_family}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Verdana', sans-serif">Verdana</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Lora', serif">Lora</option>
                    <option value="'Cairo', sans-serif">Cairo (Arabic)</option>
                    <option value="'Tajawal', sans-serif">Tajawal (Arabic)</option>
                  </select>
                </div>

                {/* Live Preview Box */}
                <div className="mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600" style={{
                  backgroundColor: formData.theme_bg_color,
                  color: formData.theme_text_color,
                  fontFamily: formData.theme_font_family
                }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: formData.theme_heading_color }}>Live Preview:</p>
                  <p className="text-sm">This is how your text will look</p>
                  <a href="#" className="text-sm" style={{ color: formData.theme_accent_color }}>Sample Link</a>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Publish Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Now</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} /> {formData.status === 'published' ? 'Publish' : 'Save Draft'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                <Eye size={18} /> Preview
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Preview Modal - With Language Selector */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-gray-900 dark:text-white">Blog Preview</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewLang('en')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      previewLang === 'en'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewLang('ar')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      previewLang === 'ar'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-8" style={{
              backgroundColor: formData.theme_bg_color,
              color: formData.theme_text_color,
              fontFamily: formData.theme_font_family
            }} dir={previewLang === 'ar' ? 'rtl' : 'ltr'}>
              {formData.featured_image && (
                <img src={formData.featured_image} alt="Featured" className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              <h1 className="text-4xl font-bold mb-4" style={{ color: formData.theme_heading_color }}>
                {previewLang === 'en' ? (formData.title || "Your Blog Title") : (formData.titleAr || "عنوان مدونتك")}
              </h1>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
                __html: previewLang === 'en' 
                  ? (formData.content || "<p>Your blog content will appear here...</p>")
                  : (formData.contentAr || "<p>محتوى مدونتك سيظهر هنا...</p>")
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}