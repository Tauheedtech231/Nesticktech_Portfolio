// admin_blogs_portal/testimonials/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Save,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    image: '',
    text: '',
    rating: 5,
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'testimonials');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        alert(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async () => {
    if (formData.image && confirm('Remove this image?')) {
      try {
        const response = await fetch(`/api/upload?url=${encodeURIComponent(formData.image)}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setFormData(prev => ({ ...prev, image: '' }));
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingTestimonial 
        ? `/api/testimonials?id=${editingTestimonial.id}`
        : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchTestimonials();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setIsDeleting(true);
      setDeleteId(id);
      
      try {
        const response = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          await fetchTestimonials();
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      } finally {
        setIsDeleting(false);
        setDeleteId(null);
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      if (response.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        image: testimonial.image || '',
        text: testimonial.text,
        rating: testimonial.rating,
        display_order: testimonial.display_order,
        is_active: testimonial.is_active
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        role: '',
        company: '',
        image: '',
        text: '',
        rating: 5,
        display_order: testimonials.length + 1,
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage client testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Review</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedTestimonials.map((testimonial, idx) => (
                <motion.tr
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {testimonial.text}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(testimonial.id, testimonial.is_active)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${
                        testimonial.is_active
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {testimonial.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.display_order}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(testimonial)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
                        title="Edit Testimonial"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={isDeleting && deleteId === testimonial.id}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Testimonial"
                      >
                        {isDeleting && deleteId === testimonial.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g., CEO, CTO"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image (Upload)
                    </label>
                    <div className="flex items-center gap-3">
                      {formData.image ? (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-bl-lg hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <ImageIcon size={24} className="text-gray-400" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer text-sm"
                        >
                          {uploadingImage ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Upload size={16} />
                          )}
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Max 5MB. JPG, PNG, WEBP</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Testimonial Text *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="What did the client say?"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rating (1-5)
                    </label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: r })}
                          className="p-1 cursor-pointer hover:scale-110 transition-transform"
                        >
                          <Star
                            size={24}
                            className={r <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, is_active: true })}
                        className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 cursor-pointer hover:scale-105 ${
                          formData.is_active
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, is_active: false })}
                        className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 cursor-pointer hover:scale-105 ${
                          !formData.is_active
                            ? 'bg-red-500 text-white shadow-md'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{editingTestimonial ? 'Updating...' : 'Creating...'}</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>{editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}