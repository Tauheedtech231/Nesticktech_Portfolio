// app/admin_blogs_portal/careers/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Search,
  RefreshCw,
  User,
  FileText,
  MessageSquare,
  ExternalLink,
  GraduationCap,
  AlertCircle,
  Send,
  X,
  FileArchive
} from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
  category: 'job' | 'internship';
  cv_filename: string;
  cv_file: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  notes: string;
  created_at: string;
}

type StatusFilter = 'all' | 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
type CategoryFilter = 'all' | 'job' | 'internship';

export default function CareersPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    jobs: 0,
    internships: 0
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, categoryFilter, applications]);

  const fetchApplications = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/careers/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(app => app.category === categoryFilter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredApps(filtered);
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/careers/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes: notes || null })
      });
      const data = await response.json();
      if (data.success) {
        await fetchApplications();
        setShowDetailModal(false);
        setNotes('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const viewCV = (app: Application) => {
    if (app.cv_file) {
      let fileUrl = app.cv_file;
      if (fileUrl.startsWith('/uploads/')) {
        fileUrl = window.location.origin + fileUrl;
      }
      window.open(fileUrl, '_blank');
    } else {
      alert('No CV file available');
    }
  };

  const downloadCV = (app: Application) => {
    if (app.cv_file) {
      let fileUrl = app.cv_file;
      if (fileUrl.startsWith('/uploads/')) {
        fileUrl = window.location.origin + fileUrl;
      }
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = app.cv_filename || 'cv_file';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No CV file available');
    }
  };

  const sendEmailToStudent = async () => {
    if (!selectedApp) return;
    
    if (!emailSubject || !emailMessage) {
      alert('Please fill both subject and message');
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch('/api/careers/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedApp.email,
          name: selectedApp.full_name,
          subject: emailSubject,
          message: emailMessage,
          position: selectedApp.position
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Email sent successfully!');
        setShowEmailModal(false);
        setEmailSubject('');
        setEmailMessage('');
      } else {
        alert(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs flex items-center gap-1 cursor-default"><Clock size={12} /> Pending</span>;
      case 'reviewed':
        return <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center gap-1 cursor-default"><Eye size={12} /> Reviewed</span>;
      case 'shortlisted':
        return <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center gap-1 cursor-default"><CheckCircle size={12} /> Shortlisted</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center gap-1 cursor-default"><XCircle size={12} /> Rejected</span>;
      default:
        return <span className="text-xs text-gray-400 cursor-default">{status}</span>;
    }
  };

  const getCategoryBadge = (category: string) => {
    return category === 'job' 
      ? <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center gap-1 cursor-default"><Briefcase size={12} /> Full-Time</span>
      : <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center gap-1 cursor-default"><GraduationCap size={12} /> Internship</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="cursor-default">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Applications</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage job and internship applications</p>
          </div>
          <button
            onClick={fetchApplications}
            disabled={refreshing}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all cursor-pointer disabled:opacity-50"
          >
            {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700 cursor-default">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-3 text-center border border-yellow-500/30 cursor-default">
          <p className="text-xl font-bold text-yellow-500">{stats.pending}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-3 text-center border border-blue-500/30 cursor-default">
          <p className="text-xl font-bold text-blue-500">{stats.reviewed}</p>
          <p className="text-xs text-gray-500">Reviewed</p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-3 text-center border border-green-500/30 cursor-default">
          <p className="text-xl font-bold text-green-500">{stats.shortlisted}</p>
          <p className="text-xs text-gray-500">Shortlisted</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-3 text-center border border-red-500/30 cursor-default">
          <p className="text-xl font-bold text-red-500">{stats.rejected}</p>
          <p className="text-xs text-gray-500">Rejected</p>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-3 text-center border border-purple-500/30 cursor-default">
          <p className="text-xl font-bold text-purple-500">{stats.jobs}</p>
          <p className="text-xs text-gray-500">Jobs</p>
        </div>
        <div className="bg-cyan-500/10 rounded-xl p-3 text-center border border-cyan-500/30 cursor-default">
          <p className="text-xl font-bold text-cyan-500">{stats.internships}</p>
          <p className="text-xs text-gray-500">Internships</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="job">Full-Time Jobs</option>
          <option value="internship">Internships</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Applied On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredApps.map((app, index) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{app.full_name}</p>
                        <p className="text-sm text-gray-500">{app.email}</p>
                        <p className="text-xs text-gray-400">{app.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">{app.position}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryBadge(app.category)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{app.experience}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setNotes(app.notes || '');
                            setShowDetailModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={16} className="text-blue-500" />
                        </button>
                        {app.cv_file && (
                          <button
                            onClick={() => downloadCV(app)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            title="Download CV"
                          >
                            <Download size={16} className="text-green-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No applications found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Application Details</h2>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedApp.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${selectedApp.email}`} className="text-blue-500 hover:underline cursor-pointer">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 dark:text-white">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedApp.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Job Info */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Job Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Position</p>
                      <p className="text-gray-900 dark:text-white">{selectedApp.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      {getCategoryBadge(selectedApp.category)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="text-gray-900 dark:text-white">{selectedApp.experience}</p>
                    </div>
                    {selectedApp.portfolio && (
                      <div>
                        <p className="text-sm text-gray-500">Portfolio</p>
                        <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1 cursor-pointer">
                          View Portfolio <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* CV Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">CV/Resume</h3>
                  {selectedApp.cv_file ? (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => viewCV(selectedApp)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                      >
                        <Eye size={16} /> View CV
                      </button>
                      <button
                        onClick={() => downloadCV(selectedApp)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                      >
                        <Download size={16} /> Download CV ({selectedApp.cv_filename})
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">No CV uploaded</p>
                  )}
                </div>

                {/* Message */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cover Letter / Message</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedApp.message}</p>
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add notes about this application..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text"
                  />
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEmailSubject(`Update on your application for ${selectedApp.position}`);
                      setEmailMessage(`Dear ${selectedApp.full_name},\n\nThank you for applying for the ${selectedApp.position} position at Nestick Tech.\n\nWe have received your application and our team is reviewing it. We will get back to you soon.\n\nBest regards,\nNestick Tech HR Team`);
                      setShowEmailModal(true);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail size={16} /> Send Email
                  </button>

                  {selectedApp.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'reviewed')}
                        disabled={updatingId === selectedApp.id}
                        className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {updatingId === selectedApp.id ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                        Mark as Reviewed
                      </button>
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'rejected')}
                        disabled={updatingId === selectedApp.id}
                        className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {updatingId === selectedApp.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                        Reject
                      </button>
                    </>
                  )}
                  {selectedApp.status === 'reviewed' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'shortlisted')}
                        disabled={updatingId === selectedApp.id}
                        className="flex-1 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {updatingId === selectedApp.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateStatus(selectedApp.id, 'rejected')}
                        disabled={updatingId === selectedApp.id}
                        className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {updatingId === selectedApp.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                        Reject
                      </button>
                    </>
                  )}
                  {selectedApp.status === 'shortlisted' && (
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'rejected')}
                      disabled={updatingId === selectedApp.id}
                      className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {updatingId === selectedApp.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-purple-500" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send Email</h2>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-900 dark:text-white">{selectedApp.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Email subject"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      rows={6}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none cursor-text"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={sendEmailToStudent}
                      disabled={sendingEmail}
                      className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {sendingEmail ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Email
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}