// app/admin_blogs_portal/blogs/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Save, Eye, X, Image as ImageIcon, Loader2, 
  AlertCircle, CheckCircle, ArrowLeft, Trash2,
  FolderOpen, Palette
} from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  categories?: Category[];
  // Theme fields
  theme_heading_color: string;
  theme_font_family: string;
  theme_bg_color: string;
  theme_text_color: string;
  theme_accent_color: string;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState<Blog>({
    id: 0,
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    status: 'draft',
    categories: [],
    // Default theme values
    theme_heading_color: '#000000',
    theme_font_family: 'Arial, sans-serif',
    theme_bg_color: '#ffffff',
    theme_text_color: '#333333',
    theme_accent_color: '#8b5cf6',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchBlog();
  }, [blogId]);

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

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${blogId}`);
      const data = await response.json();
      if (data.success) {
        setFormData({
          ...data.data,
          // Ensure theme fields have values (fallback to defaults if null)
          theme_heading_color: data.data.theme_heading_color || '#000000',
          theme_font_family: data.data.theme_font_family || 'Arial, sans-serif',
          theme_bg_color: data.data.theme_bg_color || '#ffffff',
          theme_text_color: data.data.theme_text_color || '#333333',
          theme_accent_color: data.data.theme_accent_color || '#8b5cf6',
        });
        setImagePreview(data.data.featured_image);
        
        if (data.data.categories && data.data.categories.length > 0) {
          setSelectedCategory(data.data.categories[0].id.toString());
        }
      } else {
        setError('Blog not found');
        setTimeout(() => router.push('/admin_blogs_portal/blogs'), 2000);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, WEBP images are allowed');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      let featuredImage = formData.featured_image;
      if (imageFile) {
        const reader = new FileReader();
        featuredImage = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      const response = await fetch(`/api/blog/posts/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          featured_image: featuredImage,
          status: formData.status,
          category_id: selectedCategory || null,
          // Theme fields
          theme_heading_color: formData.theme_heading_color,
          theme_font_family: formData.theme_font_family,
          theme_bg_color: formData.theme_bg_color,
          theme_text_color: formData.theme_text_color,
          theme_accent_color: formData.theme_accent_color,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Blog updated successfully!');
        setTimeout(() => {
          router.push('/admin_blogs_portal/blogs');
        }, 1500);
      } else {
        setError(data.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/blog/posts/${blogId}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        alert('Blog deleted successfully');
        router.push('/admin_blogs_portal/blogs');
      } else {
        alert(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin_blogs_portal/blogs"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Blog</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Update your blog post and theme</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all cursor-pointer"
        >
          <Trash2 size={18} /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none font-mono"
              />
              <p className="text-xs text-gray-500 mt-2">HTML tags supported (h1, h2, p, ul, li, etc.)</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Dropdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="relative">
                <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {formData.categories && formData.categories.length > 0 && (
                <p className="text-xs text-green-500 mt-2">
                  Current category: {formData.categories[0].name}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image
              </label>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition-colors"
                onClick={() => document.getElementById('imageUpload')?.click()}
              >
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto rounded-lg cursor-pointer" />
                ) : (
                  <>
                    <ImageIcon size={40} className="mx-auto text-gray-400 mb-2 cursor-pointer" />
                    <p className="text-sm text-gray-500 cursor-pointer">Click to upload image</p>
                    <p className="text-xs text-gray-400">JPG, PNG, WEBP up to 5MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt / Summary
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Short summary of your blog..."
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none"
              />
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
                    className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white cursor-pointer"
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
                  </select>
                </div>

                {/* Live Preview Box */}
                <div className="mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-300" style={{
                  backgroundColor: formData.theme_bg_color,
                  color: formData.theme_text_color,
                  fontFamily: formData.theme_font_family
                }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: formData.theme_heading_color }}>Live Preview:</p>
                  <p className="text-sm">This is how your text will look</p>
                  <a href="#" className="text-sm inline-block mt-1 hover:opacity-80 transition-opacity" style={{ color: formData.theme_accent_color }}>Sample Link</a>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye size={18} /> Preview
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Blog Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-8" style={{
              backgroundColor: formData.theme_bg_color,
              color: formData.theme_text_color,
              fontFamily: formData.theme_font_family
            }}>
              {imagePreview && (
                <img src={imagePreview} alt="Featured" className="w-full h-64 object-cover rounded-lg mb-6" />
              )}
              <h1 className="text-4xl font-bold mb-4" style={{ color: formData.theme_heading_color }}>
                {formData.title || "Your Blog Title"}
              </h1>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
                __html: formData.content || "<p>Your blog content will appear here...</p>" 
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}