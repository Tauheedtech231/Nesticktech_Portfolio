'use client';

import { usePathname } from 'next/navigation';
import Navbar from './src/portfolio/components/Navbar';
import Footer from './src/portfolio/components/Footer';
import WhatsappButton from './src/portfolio/components/WhatsappButton';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Routes where layout should be hidden
  const hideLayout =
    pathname.startsWith('/login') ||
    pathname.startsWith('/admin_blogs_portal');

  return (
    <>
      {!hideLayout && <Navbar />}
      
      {children}

      {!hideLayout && <WhatsappButton />}
      {!hideLayout && <Footer />}
    </>
  );
}