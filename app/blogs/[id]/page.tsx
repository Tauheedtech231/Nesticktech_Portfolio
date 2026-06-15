// app/blogs/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogClient from './BlogClient';

// Blog data fetch karne ka function
async function getBlog(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/posts/${id}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Dynamic OG Tags ke liye generateMetadata function (with Arabic support)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  
  if (!blog) {
    return {
      title: 'Blog Not Found | Nestick Tech',
      description: 'The requested blog post could not be found.',
    };
  }
  
  // Read language from URL or default to English
  const language = blog.language || 'en';
  const isRTL = language === 'ar';
  
  // Calculate read time
  const readTimeEn = Math.ceil(blog.content?.length / 1000) || 3;
  const readTimeAr = blog.contentAr ? Math.ceil(blog.contentAr?.length / 1000) || 3 : readTimeEn;
  
  // Get title and description based on language
  const titleEn = `${blog.title} | Nestick Tech`;
  const titleAr = blog.titleAr ? `${blog.titleAr} | نستيك تك` : titleEn;
  const descriptionEn = blog.excerpt || `Read this article by Nestick Tech. ${readTimeEn} min read.`;
  const descriptionAr = blog.excerptAr || blog.excerpt || `اقرأ هذا المقال من نستيك تك. ${readTimeAr} دقيقة قراءة.`;
  
  return {
    title: titleEn,
    description: descriptionEn,
    keywords: `${blog.category}, web development, technology, programming, Nestick Tech`,
    authors: [{ name: blog.author || 'Nestick Tech' }],
    creator: 'Nestick Tech',
    publisher: 'Nestick Tech',
    robots: 'index, follow',
    
    // Open Graph Tags (Facebook, LinkedIn, WhatsApp) - English version
    openGraph: {
      title: titleEn,
      description: descriptionEn,
      url: `https://nesticktech.com/blogs/${blog.id}`,
      siteName: 'Nestick Tech',
      images: [
        {
          url: blog.featured_image || 'https://nesticktech.com/nesticklogo.jpg',
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: ['Nestick Tech'],
      tags: [blog.category].filter(Boolean),
    },
    
    // Twitter Card - English version
    twitter: {
      card: 'summary_large_image',
      title: titleEn,
      description: descriptionEn,
      images: [blog.featured_image || 'https://nesticktech.com/nesticklogo.jpg'],
      creator: '@nesticktech',
      site: '@nesticktech',
    },
    
    // Canonical URL
    alternates: {
      canonical: `https://nesticktech.com/blogs/${blog.id}`,
    },
  };
}

// Main page component
export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  
  if (!blog) {
    notFound();
  }
  
  return <BlogClient blog={blog} />;
}