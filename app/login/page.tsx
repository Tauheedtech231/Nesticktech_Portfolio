// /login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  // TEST CREDENTIALS
  const TEST_EMAIL = 'test@gmail.com';
  const TEST_PASSWORD = '1234';

  // Content translations
  const content = {
    en: {
      emailPlaceholder: 'Email Address',
      passwordPlaceholder: 'Password',
      signingIn: 'Signing in...',
      signIn: 'Sign In',
      invalidCredentials: 'Invalid credentials',
      networkError: 'Network error. Please try again.',
      testCredentialsNote: 'Demo: test@gmail.com / 1234',
    },
    ar: {
      emailPlaceholder: 'البريد الإلكتروني',
      passwordPlaceholder: 'كلمة المرور',
      signingIn: 'جاري تسجيل الدخول...',
      signIn: 'تسجيل الدخول',
      invalidCredentials: 'بيانات الدخول غير صحيحة',
      networkError: 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.',
      testCredentialsNote: 'تجريبي: test@gmail.com / 1234',
    }
  };

  // Listen for language changes
  useEffect(() => {
    const checkLanguage = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      const htmlLang = document.documentElement.getAttribute('lang');
      if (htmlDir === 'rtl' || htmlLang === 'ar') {
        setLanguage('ar');
      } else {
        setLanguage('en');
      }
    };

    checkLanguage();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'dir' || mutation.attributeName === 'lang') {
          checkLanguage();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.language) {
        setLanguage(customEvent.detail.language);
      } else {
        checkLanguage();
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const currentContent = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // CHECK FOR TEST CREDENTIALS FIRST
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      // Direct redirect for test credentials
      console.log('Test credentials matched, redirecting...');
      
      // Store dummy admin data in session
      const dummyAdmin = {
        id: 1,
        email: TEST_EMAIL,
        name: 'Test Admin',
        role: 'admin'
      };
      sessionStorage.setItem('admin_auth', JSON.stringify(dummyAdmin));
      
      // Immediate redirect
      router.push('/admin_blogs_portal/dashboard');
      setLoading(false);
      return;
    }

    // Otherwise, try API call
    try {
      const response = await fetch('/api/blog/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('admin_auth', JSON.stringify(data.admin));
        router.push('/admin_blogs_portal/dashboard');
      } else {
        setError(data.error || currentContent.invalidCredentials);
      }
    } catch (error) {
      setError(currentContent.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-mix filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-mix filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-md w-full py-8 px-8"
      >
        {/* Logo Section Only */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm overflow-hidden">
                <Image
                  src="/nesticklogo.jpg"
                  alt="Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white/20 animate-pulse"></div>
          </motion.div>
        </div>

      

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 backdrop-blur-sm"
            >
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-200">{error}</p>
            </motion.div>
          )}

          {/* Email Field */}
          <div>
            <div className="relative group">
              <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors`} size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                placeholder={currentContent.emailPlaceholder}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="relative group">
              <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors`} size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                placeholder={currentContent.passwordPlaceholder}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative overflow-hidden group mt-4"
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {currentContent.signingIn}
                </span>
              ) : (
                currentContent.signIn
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}