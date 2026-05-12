/* eslint-disable react-hooks/immutability */
// admin_blogs_portal/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  User, 
  LogOut,
  PlusCircle,
  Sparkles,
  Briefcase,
  ChevronRight,
  ChevronDown,
  Settings,
  HelpCircle,
  Star,
  Layout,
  Home
} from 'lucide-react';
import { useTheme } from '../providers';
import { useState, useEffect } from 'react';

const menuItems = [
  { href: '/admin_blogs_portal/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: false },
  { href: '/admin_blogs_portal/blogs', label: 'All Blogs', icon: FileText, badge: false },
  { href: '/admin_blogs_portal/blogs/new', label: 'New Blog', icon: PlusCircle, badge: false },
  { href: '/admin_blogs_portal/categories', label: 'Categories', icon: Tags, badge: false },
  { href: '/admin_blogs_portal/careers', label: 'Applications', icon: Briefcase, badge: 'pending' },
  { href: '/admin_blogs_portal/profile', label: 'Profile', icon: User, badge: false },
];

// Home dropdown items
const homeDropdownItems = [
  { href: '/admin_blogs_portal/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin_blogs_portal/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/admin_blogs_portal/footer', label: 'Footer', icon: Layout },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHomeOpen, setIsHomeOpen] = useState(false);

  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Check if any home dropdown item is active
  useEffect(() => {
    const isHomeActive = homeDropdownItems.some(item => 
      pathname === item.href || pathname?.startsWith(item.href + '/')
    );
    if (isHomeActive) {
      setIsHomeOpen(true);
    }
  }, [pathname]);

  const fetchPendingCount = async () => {
    try {
      const response = await fetch('/api/careers/applications?status=pending');
      const data = await response.json();
      if (data.success) {
        setPendingCount(data.count || 0);
      }
    } catch (error) {
      console.error('Error fetching pending count:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    window.location.href = '/admin_blogs_portal/login';
  };

  const toggleHomeDropdown = () => {
    setIsHomeOpen(!isHomeOpen);
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  const dropdownVariants:Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-64 fixed left-0 top-0 h-full flex flex-col shadow-2xl z-30"
      style={{
        backgroundColor: theme === 'dark' ? '#0F172A' : '#FFFFFF',
        borderRight: `1px solid ${theme === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(0, 0, 0, 0.05)'}`,
      }}
    >
      {/* Logo Section */}
      <div className="p-5 border-b" style={{ borderColor: theme === 'dark' ? '#1E293B' : '#E5E7EB' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50" />
            <div onClick={() => router.push('/')} className="relative cursor-pointer w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
              Blog Admin
            </h1>
            <p className="text-[10px] font-medium" style={{ color: theme === 'dark' ? '#64748B' : '#9CA3AF' }}>
              Content Management System
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Home Dropdown */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={itemVariants}
          transition={{ delay: 0.03 }}
        >
          <button
            onClick={toggleHomeDropdown}
            onMouseEnter={() => setHoveredItem('Home')}
            onMouseLeave={() => setHoveredItem(null)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
              homeDropdownItems.some(item => pathname === item.href || pathname?.startsWith(item.href + '/'))
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home 
                size={18} 
                className={`transition-all duration-200 ${
                  homeDropdownItems.some(item => pathname === item.href || pathname?.startsWith(item.href + '/'))
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-blue-500'
                }`} 
              />
              <span className="tracking-wide">Home</span>
            </div>
            
            <div className="flex items-center gap-2">
              {hoveredItem === 'Home' && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                >
                  <ChevronRight size={14} className="text-blue-400" />
                </motion.div>
              )}
              <motion.div
                animate={{ rotate: isHomeOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} className="text-gray-400" />
              </motion.div>
            </div>
          </button>

          {/* Dropdown Items */}
          <AnimatePresence>
            {isHomeOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="ml-6 mt-1 space-y-1 overflow-hidden"
              >
                {homeDropdownItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon 
                          size={16} 
                          className={`transition-all duration-200 ${
                            isActive 
                              ? 'text-blue-500' 
                              : 'text-gray-400 group-hover:text-blue-500'
                          }`} 
                        />
                        <span className="tracking-wide">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Other Menu Items */}
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const showBadge = item.badge === 'pending' && pendingCount > 0;
          
          return (
            <motion.div
              key={item.href}
              initial="initial"
              animate="animate"
              variants={itemVariants}
              transition={{ delay: (index + 1) * 0.03 }}
            >
              <Link
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={18} 
                    className={`transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-500' 
                        : 'text-gray-400 group-hover:text-blue-500'
                    }`} 
                  />
                  <span className="tracking-wide">{item.label}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {showBadge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500 text-white shadow-sm"
                    >
                      {pendingCount}
                    </motion.span>
                  )}
                  {hoveredItem === item.label && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                    >
                      <ChevronRight size={14} className="text-blue-400" />
                    </motion.div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t mt-auto" style={{ borderColor: theme === 'dark' ? '#1E293B' : '#E5E7EB' }}>
        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 group cursor-pointer"
        >
          <LogOut size={16} className="group-hover:scale-110 transition-transform duration-200" />
          <span>Logout</span>
        </motion.button>
        
        {/* User Info Footer */}
        <div className="mt-3 pt-3 text-center border-t" style={{ borderColor: theme === 'dark' ? '#1E293B' : '#E5E7EB' }}>
          <p className="text-[10px]" style={{ color: theme === 'dark' ? '#475569' : '#94A3B8' }}>
            &copy; {new Date().getFullYear()} Nestick Tech
          </p>
        </div>
      </div>
    </motion.aside>
  );
}