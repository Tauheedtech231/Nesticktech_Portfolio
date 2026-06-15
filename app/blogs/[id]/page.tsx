// app/blogs/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogClient from './BlogClient';

// Blog data fetch karne ka function (with logging)
async function getBlog(id: string) {
  try {
    console.log(`🔍 Fetching blog ID: ${id}`);
    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blog/posts/${id}`;
    console.log(`📡 API URL: ${apiUrl}`);
    
    const res = await fetch(apiUrl, {
      cache: 'no-store',
    });
    
    const data = await res.json();
    
    // 🔥 PRINT FULL API RESPONSE
    console.log('📦 API RESPONSE:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      // Check if Arabic fields exist
      const blog = data.data;
      console.log('📝 BLOG DATA:');
      console.log(`   - title: ${blog.title}`);
      console.log(`   - titleAr: ${blog.titleAr || '❌ MISSING'}`);
      console.log(`   - content length: ${blog.content?.length || 0}`);
      console.log(`   - contentAr length: ${blog.contentAr?.length || 0}`);
      console.log(`   - excerpt: ${blog.excerpt || '❌ MISSING'}`);
      console.log(`   - excerptAr: ${blog.excerptAr || '❌ MISSING'}`);
      
      return blog;
    }
    console.error('❌ API returned success: false', data);
    return null;
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
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
  
  // Get Arabic title if available
  const hasArabicContent = blog.titleAr && blog.titleAr.trim() !== '';
  const arabicTitle = hasArabicContent ? `${blog.titleAr} | نستيك تك` : `${blog.title} | Nestick Tech`;
  const englishTitle = `${blog.title} | Nestick Tech`;
  
  // Calculate read times
  const readTimeEn = Math.ceil((blog.content?.length || 0) / 1000) || 3;
  const readTimeAr = blog.contentAr ? Math.ceil((blog.contentAr?.length || 0) / 1000) || 3 : readTimeEn;
  
  // Descriptions
  const descriptionEn = blog.excerpt || `Read this article by Nestick Tech. ${readTimeEn} min read.`;
  const descriptionAr = (blog.excerptAr && blog.excerptAr.trim() !== '') 
    ? blog.excerptAr 
    : `اقرأ هذا المقال من نستيك تك. ${readTimeAr} دقيقة قراءة.`;
  
  return {
    title: englishTitle,
    description: descriptionEn,
    keywords: `${blog.category}, web development, technology, programming, Nestick Tech`,
    authors: [{ name: blog.author || 'Nestick Tech' }],
    creator: 'Nestick Tech',
    publisher: 'Nestick Tech',
    robots: 'index, follow',
    
    // Open Graph Tags - Use English version for OG (social media)
    openGraph: {
      title: englishTitle,
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
      alternateLocale: hasArabicContent ? ['ar_SA'] : [],
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: ['Nestick Tech'],
      tags: [blog.category].filter(Boolean),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: englishTitle,
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
    console.log(`❌ Blog not found for ID: ${id}`);
    notFound();
  }
  
  console.log(`✅ Rendering blog page for ID: ${id}, Title: ${blog.title}`);
  
  return <BlogClient blog={blog} />;
}