// app/blog/[id]/page.tsx
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

// Dynamic OG Tags ke liye generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  
  if (!blog) {
    return {
      title: 'Blog Not Found | Nestick Tech',
      description: 'The requested blog post could not be found.',
    };
  }
  
  // Calculate read time
  const readTime = Math.ceil(blog.content?.length / 1000) || 3;
  
  return {
    title: `${blog.title} | Nestick Tech`,
    description: blog.excerpt || `Read this article by Nestick Tech. ${readTime} min read.`,
    keywords: `${blog.category}, web development, technology, programming, Nestick Tech`,
    authors: [{ name: blog.author || 'Nestick Tech' }],
    creator: 'Nestick Tech',
    publisher: 'Nestick Tech',
    robots: 'index, follow',
    
    // Open Graph Tags (Facebook, LinkedIn, WhatsApp)
    openGraph: {
      title: blog.title,
      description: blog.excerpt || `Read this article by Nestick Tech. ${readTime} min read.`,
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
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: ['Nestick Tech'],
      tags: [blog.category].filter(Boolean),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || `Read this article by Nestick Tech. ${readTime} min read.`,
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