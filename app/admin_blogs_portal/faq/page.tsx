// admin_blogs_portal/faq/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Loader2 } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      if (data.success) {
        setFaqs(data.faq);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingFaq ? `/api/faq?id=${editingFaq.id}` : '/api/faq';
      const method = editingFaq ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await fetchFAQs();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setIsDeleting(true);
      setDeleteId(id);
      
      try {
        const response = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          await fetchFAQs();
        }
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      } finally {
        setIsDeleting(false);
        setDeleteId(null);
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/faq?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      if (response.ok) {
        await fetchFAQs();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        display_order: faq.display_order,
        is_active: faq.is_active
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        display_order: faqs.length + 1,
        is_active: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FAQ Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage frequently asked questions
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Plus size={18} />
          Add FAQ
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Question</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {faqs.map((faq) => (
                <motion.tr 
                  key={faq.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{faq.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{faq.answer}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{faq.display_order}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(faq.id, faq.is_active)}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${
                        faq.is_active
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {faq.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(faq)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
                        title="Edit FAQ"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        disabled={isDeleting && deleteId === faq.id}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete FAQ"
                      >
                        {isDeleting && deleteId === faq.id ? (
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
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <button 
                  onClick={closeModal} 
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter question..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Answer *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Enter answer..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                    <div className="flex items-center gap-3 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.is_active === true}
                          onChange={() => setFormData({ ...formData, is_active: true })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm cursor-pointer">Active</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.is_active === false}
                          onChange={() => setFormData({ ...formData, is_active: false })}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm cursor-pointer">Inactive</span>
                      </label>
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
                        <span>{editingFaq ? 'Updating...' : 'Creating...'}</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>{editingFaq ? 'Update FAQ' : 'Create FAQ'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}