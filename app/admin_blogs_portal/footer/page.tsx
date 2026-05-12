/* eslint-disable @typescript-eslint/no-explicit-any */
// admin_blogs_portal/footer/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Plus, Edit, Trash2, Save, X, Loader2,
  Github, Linkedin, Twitter, Instagram, Globe, ChevronUp, ChevronDown
} from 'lucide-react';

interface Contact {
  id: number;
  type: string;
  value: string;
  url: string | null;
  display_order: number;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_name: string;
  color: string;
  display_order: number;
}

export default function FooterManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'contact' | 'social'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'phone',
    value: '',
    url: '',
    platform: '',
    icon_name: 'Github',
    color: '#6366F1'
  });

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/footer');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
        setSocialLinks(data.social);
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (type: 'contact' | 'social') => {
    setModalType(type);
    setEditingItem(null);
    setFormData({
      type: 'phone',
      value: '',
      url: '',
      platform: '',
      icon_name: 'Github',
      color: '#6366F1'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any, type: 'contact' | 'social') => {
    setModalType(type);
    setEditingItem(item);
    if (type === 'contact') {
      setFormData({
        type: item.type,
        value: item.value,
        url: item.url || '',
        platform: '',
        icon_name: '',
        color: ''
      });
    } else {
      setFormData({
        type: '',
        value: '',
        url: item.url,
        platform: item.platform,
        icon_name: item.icon_name,
        color: item.color
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, type: 'contact' | 'social') => {
    if (confirm('Are you sure you want to delete this?')) {
      setIsDeleting(true);
      setDeleteId(id);
      
      try {
        const response = await fetch(`/api/footer?id=${id}&category=${type}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          await fetchFooterData();
        }
      } catch (error) {
        console.error('Error deleting:', error);
      } finally {
        setIsDeleting(false);
        setDeleteId(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingItem ? `/api/footer?id=${editingItem.id}` : '/api/footer';
      const method = editingItem ? 'PUT' : 'POST';
      
      const payload = modalType === 'contact' ? {
        category: 'contact',
        type: formData.type,
        value: formData.value,
        url: formData.url
      } : {
        category: 'social',
        platform: formData.platform,
        url: formData.url,
        icon_name: formData.icon_name,
        color: formData.color
      };
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        await fetchFooterData();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'phone': return <Phone size={14} />;
      case 'email': return <Mail size={14} />;
      case 'location': return <MapPin size={14} />;
      default: return <Globe size={14} />;
    }
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Footer Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage contacts, social links, and footer settings
          </p>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
          <button
            onClick={() => handleAdd('contact')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
          >
            <Plus size={16} />
            Add Contact
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {contacts.map((contact, idx) => (
                  <motion.tr 
                    key={contact.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm">
                        {getTypeIcon(contact.type)}
                        <span className="capitalize">{contact.type}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{contact.value}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{contact.url || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{contact.display_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(contact, 'contact')}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
                          title="Edit Contact"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id, 'contact')}
                          disabled={isDeleting && deleteId === contact.id}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Contact"
                        >
                          {isDeleting && deleteId === contact.id ? (
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
      </div>

      {/* Social Links Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h2>
          <button
            onClick={() => handleAdd('social')}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm cursor-pointer"
          >
            <Plus size={16} />
            Add Social Link
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {socialLinks.map((social, idx) => (
                  <motion.tr 
                    key={social.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{social.platform}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{social.url}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{social.icon_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: social.color }} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{social.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{social.display_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(social, 'social')}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
                          title="Edit Social Link"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(social.id, 'social')}
                          disabled={isDeleting && deleteId === social.id}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Social Link"
                        >
                          {isDeleting && deleteId === social.id ? (
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
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingItem ? 'Edit' : 'Add'} {modalType === 'contact' ? 'Contact' : 'Social Link'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {modalType === 'contact' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                      >
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="location">Location</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Value *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Platform *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="GitHub, LinkedIn, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL *
                      </label>
                      <input
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Icon Name *
                        </label>
                        <select
                          value={formData.icon_name}
                          onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <option value="Github">Github</option>
                          <option value="Linkedin">LinkedIn</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Instagram">Instagram</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Color
                        </label>
                        <input
                          type="color"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-full h-10 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingItem ? 'Updating...' : 'Saving...'}</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>{editingItem ? 'Update' : 'Save'}</span>
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