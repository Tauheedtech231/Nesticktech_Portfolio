/* eslint-disable react-hooks/exhaustive-deps */
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
  FileArchive,
  Filter,
  FileSpreadsheet,
  FileJson,
  Printer,
  CalendarRange,
  DollarSign,
  MapPin,
  Building,
  TrendingUp,
  FilterX,
  ChevronDown,
  ChevronUp,
  FileDown,
  Sheet,
  CheckSquare,
  Square
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';

// Hardcoded positions - Category based (No duplicates)
const JOB_POSITIONS = [
  { id: 'frontend', label: 'Frontend Developer' },
  { id: 'backend', label: 'Backend Developer' },
  { id: 'fullstack', label: 'Full Stack Developer' },
  { id: 'wordpress', label: 'WordPress Developer' },
  { id: 'shopify', label: 'Shopify Developer' },
  { id: 'devops', label: 'DevOps Engineer' },
  { id: 'sales', label: 'Sales Manager' },
  { id: 'content', label: 'Content Writer' },
  { id: 'marketing', label: 'Marketing Expert' },
  { id: 'meta', label: 'Meta Expert' },
  { id: 'graphic', label: 'Graphic Designer' },
  { id: 'social', label: 'Social Media Manager' },
];

const INTERNSHIP_POSITIONS = [
  { id: 'frontend-intern', label: 'Frontend Developer Intern' },
  { id: 'backend-intern', label: 'Backend Developer Intern' },
  { id: 'fullstack-intern', label: 'Full Stack Developer Intern' },
  { id: 'wordpress-intern', label: 'WordPress Developer Intern' },
  { id: 'graphic-intern', label: 'Graphic Designer Intern' },
  { id: 'content-intern', label: 'Content Writer Intern' },
  { id: 'marketing-intern', label: 'Marketing Intern' },
  { id: 'social-intern', label: 'Social Media Intern' },
];

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Pending', color: 'yellow' },
  { id: 'reviewed', label: 'Reviewed', color: 'blue' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'green' },
  { id: 'rejected', label: 'Rejected', color: 'red' },
];

const CATEGORY_OPTIONS = [
  { id: 'job', label: 'Full-Time Jobs', positions: JOB_POSITIONS },
  { id: 'internship', label: 'Internships', positions: INTERNSHIP_POSITIONS },
];

export default function CareersPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Multiple select filters
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [exporting, setExporting] = useState<string | null>(null);
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    jobs: 0,
    internships: 0
  });

  // Get positions based on selected categories
  const getAvailablePositions = () => {
    if (selectedCategories.length === 0) {
      // If no category selected, show all positions
      return [...JOB_POSITIONS, ...INTERNSHIP_POSITIONS];
    }
    
    let positions: { id: string; label: string }[] = [];
    if (selectedCategories.includes('job')) {
      positions = [...positions, ...JOB_POSITIONS];
    }
    if (selectedCategories.includes('internship')) {
      positions = [...positions, ...INTERNSHIP_POSITIONS];
    }
    return positions;
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, selectedStatuses, selectedCategories, selectedPositions, dateFilter, customStartDate, customEndDate, applications]);

  const fetchApplications = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/careers/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
        // Update stats based on actual data
        const pending = data.data.filter((app: Application) => app.status === 'pending').length;
        const reviewed = data.data.filter((app: Application) => app.status === 'reviewed').length;
        const shortlisted = data.data.filter((app: Application) => app.status === 'shortlisted').length;
        const rejected = data.data.filter((app: Application) => app.status === 'rejected').length;
        const jobs = data.data.filter((app: Application) => app.category === 'job').length;
        const internships = data.data.filter((app: Application) => app.category === 'internship').length;
        
        setStats({
          total: data.data.length,
          pending,
          reviewed,
          shortlisted,
          rejected,
          jobs,
          internships
        });
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
    
    // Status filter (multiple)
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(app => selectedStatuses.includes(app.status));
    }
    
    // Category filter (multiple)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(app => selectedCategories.includes(app.category));
    }
    
    // Position filter (multiple)
    if (selectedPositions.length > 0) {
      filtered = filtered.filter(app => selectedPositions.includes(app.position));
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(app => {
        const appDate = new Date(app.created_at);
        
        if (dateFilter === 'today') {
          const appDateOnly = new Date(appDate.getFullYear(), appDate.getMonth(), appDate.getDate());
          return appDateOnly.getTime() === today.getTime();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          return appDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          return appDate >= monthAgo;
        } else if (dateFilter === 'custom' && customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59);
          return appDate >= start && appDate <= end;
        }
        return true;
      });
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      );
    }
    
    setFilteredApps(filtered);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatuses([]);
    setSelectedCategories([]);
    setSelectedPositions([]);
    setDateFilter('all');
    setCustomStartDate('');
    setCustomEndDate('');
  };

  // Select/Deselect all for status
  const handleSelectAllStatus = () => {
    if (selectedStatuses.length === STATUS_OPTIONS.length) {
      setSelectedStatuses([]);
    } else {
      setSelectedStatuses(STATUS_OPTIONS.map(s => s.id));
    }
  };

  // Select/Deselect all for category
  const handleSelectAllCategory = () => {
    if (selectedCategories.length === CATEGORY_OPTIONS.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(CATEGORY_OPTIONS.map(c => c.id));
    }
  };

  // Select/Deselect all for position
  const handleSelectAllPositions = () => {
    const availablePositions = getAvailablePositions();
    if (selectedPositions.length === availablePositions.length && availablePositions.length > 0) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(availablePositions.map(p => p.label));
    }
  };

  // Toggle individual status
  const toggleStatus = (statusId: string) => {
    if (selectedStatuses.includes(statusId)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== statusId));
    } else {
      setSelectedStatuses([...selectedStatuses, statusId]);
    }
  };

  // Toggle individual category
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryId));
      // Remove positions that belong to this category
      const category = CATEGORY_OPTIONS.find(c => c.id === categoryId);
      if (category) {
        const categoryPositionLabels = category.positions.map(p => p.label);
        setSelectedPositions(prev => prev.filter(p => !categoryPositionLabels.includes(p)));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Toggle individual position
  const togglePosition = (positionLabel: string) => {
    if (selectedPositions.includes(positionLabel)) {
      setSelectedPositions(selectedPositions.filter(p => p !== positionLabel));
    } else {
      setSelectedPositions([...selectedPositions, positionLabel]);
    }
  };

  const exportToCSV = () => {
    setExporting('csv');
    try {
      const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Position', 'Category', 'Experience', 'Status', 'Applied Date', 'Portfolio', 'Message'];
      const csvData = filteredApps.map(app => [
        app.id,
        app.full_name,
        app.email,
        app.phone,
        app.position,
        app.category === 'job' ? 'Full-Time Job' : 'Internship',
        app.experience,
        app.status,
        new Date(app.created_at).toLocaleString(),
        app.portfolio || 'N/A',
        app.message.replace(/,/g, ' ').replace(/\n/g, ' ')
      ]);
      
      const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV');
    } finally {
      setExporting(null);
    }
  };

  const exportToExcel = () => {
    setExporting('excel');
    try {
      const exportData = filteredApps.map(app => ({
        'ID': app.id,
        'Full Name': app.full_name,
        'Email': app.email,
        'Phone': app.phone,
        'Position': app.position,
        'Category': app.category === 'job' ? 'Full-Time Job' : 'Internship',
        'Experience': app.experience,
        'Status': app.status,
        'Applied Date': new Date(app.created_at).toLocaleString(),
        'Portfolio': app.portfolio || 'N/A',
        'Message': app.message
      }));
      
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
      
      const summaryData = [
        { 'Metric': 'Total Applications', 'Value': filteredApps.length },
        { 'Metric': 'Pending', 'Value': filteredApps.filter(a => a.status === 'pending').length },
        { 'Metric': 'Reviewed', 'Value': filteredApps.filter(a => a.status === 'reviewed').length },
        { 'Metric': 'Shortlisted', 'Value': filteredApps.filter(a => a.status === 'shortlisted').length },
        { 'Metric': 'Rejected', 'Value': filteredApps.filter(a => a.status === 'rejected').length },
        { 'Metric': 'Jobs', 'Value': filteredApps.filter(a => a.category === 'job').length },
        { 'Metric': 'Internships', 'Value': filteredApps.filter(a => a.category === 'internship').length },
        { 'Metric': 'Export Date', 'Value': new Date().toLocaleString() }
      ];
      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
      
      XLSX.writeFile(workbook, `applications_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting Excel:', error);
      alert('Failed to export Excel');
    } finally {
      setExporting(null);
    }
  };

  const exportToPDF = () => {
    setExporting('pdf');
    try {
      const doc = new jsPDF('landscape');
      
      doc.setFontSize(18);
      doc.setTextColor(59, 130, 246);
      doc.text('Nestick Tech - Applications Report', 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Total Applications: ${filteredApps.length}`, 14, 36);
      
      let filterText = 'Filters Applied: ';
      if (selectedStatuses.length > 0) filterText += `Status: ${selectedStatuses.join(', ')}, `;
      if (selectedCategories.length > 0) filterText += `Category: ${selectedCategories.join(', ')}, `;
      if (selectedPositions.length > 0) filterText += `Position: ${selectedPositions.length} selected, `;
      if (dateFilter !== 'all') filterText += `Date: ${dateFilter}`;
      if (filterText === 'Filters Applied: ') filterText = 'No filters applied';
      
      doc.setFontSize(9);
      doc.text(filterText, 14, 42);
      
      const tableData = filteredApps.map(app => [
        app.id.toString(),
        app.full_name,
        app.email,
        app.phone,
        app.position,
        app.category === 'job' ? 'Job' : 'Intern',
        app.experience,
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ]);
      
      autoTable(doc, {
        head: [['ID', 'Name', 'Email', 'Phone', 'Position', 'Type', 'Experience', 'Status', 'Date']],
        body: tableData,
        startY: 48,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontSize: 9 },
        alternateRowStyles: { fillColor: [240, 240, 240] }
      });
      
      doc.save(`applications_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    } finally {
      setExporting(null);
    }
  };

  const printApplications = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const tableRows = filteredApps.map(app => `
      <tr>
        <td>${app.id}</td>
        <td>${app.full_name}</td>
        <td>${app.email}</td>
        <td>${app.phone}</td>
        <td>${app.position}</td>
        <td>${app.category === 'job' ? 'Job' : 'Internship'}</td>
        <td>${app.experience}</td>
        <td>${app.status}</td>
        <td>${new Date(app.created_at).toLocaleDateString()}</td>
      </tr>
    `).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Applications Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #3b82f6; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #3b82f6; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          .header { margin-bottom: 20px; }
          .stats { margin: 20px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Nestick Tech - Applications Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Total Applications: ${filteredApps.length}</p>
        </div>
        <div class="stats">
          <strong>Statistics:</strong> Pending: ${filteredApps.filter(a => a.status === 'pending').length} | 
          Reviewed: ${filteredApps.filter(a => a.status === 'reviewed').length} | 
          Shortlisted: ${filteredApps.filter(a => a.status === 'shortlisted').length} | 
          Rejected: ${filteredApps.filter(a => a.status === 'rejected').length}
        </div>
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Position</th><th>Type</th><th>Experience</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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

  const availablePositions = getAvailablePositions();

  return (
    <div className="cursor-default">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Applications</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage job and internship applications</p>
          </div>
          <div className="flex gap-2">
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-200 dark:border-gray-700 cursor-default">
          <p className="text-xl font-bold text-gray-900 dark:text-white">{filteredApps.length}</p>
          <p className="text-xs text-gray-500">Showing</p>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-3 text-center border border-yellow-500/30 cursor-default">
          <p className="text-xl font-bold text-yellow-500">{filteredApps.filter(a => a.status === 'pending').length}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-3 text-center border border-blue-500/30 cursor-default">
          <p className="text-xl font-bold text-blue-500">{filteredApps.filter(a => a.status === 'reviewed').length}</p>
          <p className="text-xs text-gray-500">Reviewed</p>
        </div>
        <div className="bg-green-500/10 rounded-xl p-3 text-center border border-green-500/30 cursor-default">
          <p className="text-xl font-bold text-green-500">{filteredApps.filter(a => a.status === 'shortlisted').length}</p>
          <p className="text-xs text-gray-500">Shortlisted</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-3 text-center border border-red-500/30 cursor-default">
          <p className="text-xl font-bold text-red-500">{filteredApps.filter(a => a.status === 'rejected').length}</p>
          <p className="text-xs text-gray-500">Rejected</p>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-3 text-center border border-purple-500/30 cursor-default">
          <p className="text-xl font-bold text-purple-500">{filteredApps.filter(a => a.category === 'job').length}</p>
          <p className="text-xs text-gray-500">Jobs</p>
        </div>
        <div className="bg-cyan-500/10 rounded-xl p-3 text-center border border-cyan-500/30 cursor-default">
          <p className="text-xl font-bold text-cyan-500">{filteredApps.filter(a => a.category === 'internship').length}</p>
          <p className="text-xs text-gray-500">Internships</p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={exportToCSV}
          disabled={exporting !== null || filteredApps.length === 0}
          className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all text-sm cursor-pointer disabled:opacity-50"
        >
          {exporting === 'csv' ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          CSV
        </button>
        <button
          onClick={exportToExcel}
          disabled={exporting !== null || filteredApps.length === 0}
          className="px-3 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-all text-sm cursor-pointer disabled:opacity-50"
        >
          {exporting === 'excel' ? <Loader2 size={14} className="animate-spin" /> : <Sheet size={14} />}
          Excel
        </button>
        <button
          onClick={exportToPDF}
          disabled={exporting !== null || filteredApps.length === 0}
          className="px-3 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all text-sm cursor-pointer disabled:opacity-50"
        >
          {exporting === 'pdf' ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
          PDF
        </button>
        <button
          onClick={printApplications}
          disabled={filteredApps.length === 0}
          className="px-3 py-2 bg-gray-600 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-all text-sm cursor-pointer disabled:opacity-50"
        >
          <Printer size={14} />
          Print
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium cursor-pointer"
          >
            <Filter size={18} />
            Advanced Filters
            {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
          >
            <FilterX size={14} />
            Clear All Filters
          </button>
        </div>

        {/* Basic Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, position, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text"
          />
        </div>

        {showAdvancedFilters && (
          <div className="space-y-4">
            {/* Status Filter - Multiple Select */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <button
                  onClick={handleSelectAllStatus}
                  className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                >
                  {selectedStatuses.length === STATUS_OPTIONS.length ? (
                    <>Deselect All</>
                  ) : (
                    <>Select All</>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {STATUS_OPTIONS.map(status => (
                  <label
                    key={status.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status.id)}
                      onChange={() => toggleStatus(status.id)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize cursor-pointer">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter - Multiple Select */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <button
                  onClick={handleSelectAllCategory}
                  className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                >
                  {selectedCategories.length === CATEGORY_OPTIONS.length ? (
                    <>Deselect All</>
                  ) : (
                    <>Select All</>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {CATEGORY_OPTIONS.map(category => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize cursor-pointer">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Position Filter - Multiple Select (Dynamic based on selected categories) */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Positions 
                  {selectedCategories.length > 0 && (
                    <span className="text-xs text-gray-500 ml-2">
                      (Showing positions for selected categories)
                    </span>
                  )}
                </label>
                {availablePositions.length > 0 && (
                  <button
                    onClick={handleSelectAllPositions}
                    className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1 cursor-pointer"
                  >
                    {selectedPositions.length === availablePositions.length ? (
                      <>Deselect All ({availablePositions.length})</>
                    ) : (
                      <>Select All ({availablePositions.length})</>
                    )}
                  </button>
                )}
              </div>
              {availablePositions.length > 0 ? (
                <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-700/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availablePositions.map(position => (
                      <label
                        key={position.id}
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPositions.includes(position.label)}
                          onChange={() => togglePosition(position.label)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer truncate">{position.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500">Please select at least one category to see positions</p>
                </div>
              )}
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>

              {dateFilter === 'custom' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(selectedStatuses.length > 0 || selectedCategories.length > 0 || selectedPositions.length > 0 || dateFilter !== 'all' || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500">Active Filters:</span>
            {selectedStatuses.length > 0 && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                Status: {selectedStatuses.join(', ')}
              </span>
            )}
            {selectedCategories.length > 0 && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                Type: {selectedCategories.join(', ')}
              </span>
            )}
            {selectedPositions.length > 0 && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                Positions: {selectedPositions.length} selected
              </span>
            )}
            {dateFilter !== 'all' && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                Date: {dateFilter}
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                Search: {searchTerm}
              </span>
            )}
          </div>
        )}
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
            <p className="text-gray-500">No applications found with current filters</p>
            <button
              onClick={clearAllFilters}
              className="mt-3 text-purple-500 hover:text-purple-600 text-sm cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal - Same as before */}
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