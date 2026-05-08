/* eslint-disable react-hooks/set-state-in-effect */
// admin_blogs_portal/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './providers';

export default function AdminBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (!auth && pathname !== '/login') {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/login') {
    return null;
  }

  if (pathname === '/login') {
    return <ThemeProvider>{children}</ThemeProvider>;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="ml-64 p-6 min-h-screen"
        >
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </motion.main>
      </div>
    </ThemeProvider>
  );
}