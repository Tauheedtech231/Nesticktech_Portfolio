/* eslint-disable react/no-unescaped-entities */
// admin_blogs_portal/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  status: string;
  views: number;
  created_at: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    totalViews: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      const data = await response.json();
      if (data.success) {
        const blogs = data.data;
        setStats({
          total: blogs.length,
          published: blogs.filter((b: Blog) => b.status === 'published').length,
          draft: blogs.filter((b: Blog) => b.status === 'draft').length,
          totalViews: blogs.reduce((sum: number, b: Blog) => sum + (b.views || 0), 0),
        });
        setRecentBlogs(blogs.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Blogs', value: stats.total, icon: FileText, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: 'Published', value: stats.published, icon: CheckCircle, color: 'from-green-500 to-green-600', change: '+5%' },
    { title: 'Draft', value: stats.draft, icon: Clock, color: 'from-yellow-500 to-yellow-600', change: '-2%' },
    { title: 'Total Views', value: stats.totalViews, icon: Eye, color: 'from-purple-500 to-purple-600', change: '+23%' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent Blogs</h2>
          </div>
          <Link href="/admin_blogs_portal/blogs" className="text-sm text-blue-500 hover:text-blue-600">
            View All →
          </Link>
        </div>
        
        {recentBlogs.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No blogs yet. Create your first blog!</p>
            <Link href="/admin_blogs_portal/blogs/new" className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Create Blog
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{blog.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full ${
                      blog.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {blog.status}
                    </span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    <span>{blog.views} views</span>
                  </div>
                </div>
                <Link
                  href={`/admin_blogs_portal/blogs/${blog.id}/edit`}
                  className="px-3 py-1.5 text-sm text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}