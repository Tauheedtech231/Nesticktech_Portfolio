/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Helper function to save base64 image to local folder
async function saveImage(base64String: string): Promise<string | null> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return null;
  }

  try {
    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return null;
    }

    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
    
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    return `/uploads/blogs/${filename}`;
  } catch (error) {
    console.error('Image save error:', error);
    return null;
  }
}

// Helper function to delete old image
async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) return;
  
  try {
    const filepath = path.join(process.cwd(), 'public', imageUrl);
    if (fs.existsSync(filepath)) {
      await unlink(filepath);
    }
  } catch (error) {
    console.error('Image delete error:', error);
  }
}

// IndexNow Helper Function
async function sendIndexNowPing(url: string, key: string) {
  try {
    const indexNowApi = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}`;
    
    const response = await fetch(indexNowApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log(`✅ IndexNow ping sent for: ${url}`);
      return true;
    } else {
      console.log(`❌ IndexNow failed for: ${url}`, response.status);
      return false;
    }
  } catch (error) {
    console.error('IndexNow error:', error);
    return false;
  }
}

// GET - Fetch single blog with Arabic fields
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      // Update view count
      await connection.execute('UPDATE blogs SET views = views + 1 WHERE id = ?', [id]);
      
      // Fetch blog with category information and theme fields (INCLUDING ARABIC FIELDS)
      const [rows] = await connection.execute(
        `SELECT 
          b.id, 
          b.title, 
          b.titleAr,
          b.content, 
          b.contentAr,
          b.excerpt, 
          b.excerptAr,
          b.featured_image, 
          b.status, 
          b.views, 
          b.created_at, 
          b.updated_at,
          b.published_at,
          b.theme_heading_color,
          b.theme_font_family,
          b.theme_bg_color,
          b.theme_text_color,
          b.theme_accent_color,
          GROUP_CONCAT(DISTINCT c.id) as category_ids,
          GROUP_CONCAT(DISTINCT c.name) as category_names,
          GROUP_CONCAT(DISTINCT c.description) as category_descriptions
         FROM blogs b
         LEFT JOIN blog_categories bc ON b.id = bc.blog_id
         LEFT JOIN categories c ON bc.category_id = c.id
         WHERE b.id = ?
         GROUP BY b.id`,
        [id]
      );
      
      const blogs = rows as any[];
      if (blogs.length === 0) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      const blog = blogs[0];
      
      // Parse categories
      const categories = [];
      if (blog.category_ids) {
        const ids = blog.category_ids.split(',');
        const names = blog.category_names ? blog.category_names.split(',') : [];
        const descriptions = blog.category_descriptions ? blog.category_descriptions.split(',') : [];
        
        for (let i = 0; i < ids.length; i++) {
          categories.push({
            id: parseInt(ids[i]),
            name: names[i] || '',
            description: descriptions[i] || ''
          });
        }
      }
      
      // Return blog with theme fields and Arabic fields
      return NextResponse.json({ 
        success: true, 
        data: {
          id: blog.id,
          title: blog.title,
          titleAr: blog.titleAr,
          content: blog.content,
          contentAr: blog.contentAr,
          excerpt: blog.excerpt,
          excerptAr: blog.excerptAr,
          featured_image: blog.featured_image,
          status: blog.status,
          views: blog.views,
          created_at: blog.created_at,
          updated_at: blog.updated_at,
          published_at: blog.published_at,
          categories: categories,
          // Theme fields with defaults
          theme_heading_color: blog.theme_heading_color || '#000000',
          theme_font_family: blog.theme_font_family || 'Arial, sans-serif',
          theme_bg_color: blog.theme_bg_color || '#ffffff',
          theme_text_color: blog.theme_text_color || '#333333',
          theme_accent_color: blog.theme_accent_color || '#8b5cf6'
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT - Update blog with Arabic fields
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { 
      title, 
      titleAr,
      content, 
      contentAr,
      excerpt, 
      excerptAr,
      featured_image, 
      status, 
      category_id,
      // Theme fields
      theme_heading_color,
      theme_font_family,
      theme_bg_color,
      theme_text_color,
      theme_accent_color
    } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Start transaction
      await connection.beginTransaction();
      
      // Get current blog to delete old image if needed and check old status
      const [oldRows] = await connection.execute(
        'SELECT featured_image, status FROM blogs WHERE id = ?',
        [id]
      );
      const oldBlog = (oldRows as any[])[0];
      
      let imageUrl = null;
      
      // Check if new image is base64 (new upload) or URL (existing)
      if (featured_image) {
        if (featured_image.startsWith('data:image')) {
          // New image uploaded - save it
          imageUrl = await saveImage(featured_image);
          // Delete old image
          if (oldBlog?.featured_image) {
            await deleteImage(oldBlog.featured_image);
          }
        } else {
          // Existing URL - keep as is
          imageUrl = featured_image;
        }
      }
      
      // Update blog with theme fields and Arabic fields
      await connection.execute(
        `UPDATE blogs 
         SET 
          title = ?, 
          titleAr = ?,
          content = ?, 
          contentAr = ?,
          excerpt = ?, 
          excerptAr = ?,
          featured_image = ?, 
          status = ?, 
          theme_heading_color = ?,
          theme_font_family = ?,
          theme_bg_color = ?,
          theme_text_color = ?,
          theme_accent_color = ?,
          updated_at = NOW()
         WHERE id = ?`,
        [
          title, 
          titleAr || null,
          content, 
          contentAr || null,
          excerpt || null, 
          excerptAr || null,
          imageUrl, 
          status || 'draft',
          theme_heading_color || '#000000',
          theme_font_family || 'Arial, sans-serif',
          theme_bg_color || '#ffffff',
          theme_text_color || '#333333',
          theme_accent_color || '#8b5cf6',
          id
        ]
      );
      
      // Update category relation
      if (category_id !== undefined) {
        // Delete existing category relations
        await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
        
        // Insert new category if selected
        if (category_id) {
          await connection.execute(
            'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
            [id, category_id]
          );
        }
      }
      
      // Commit transaction
      await connection.commit();
      
      // 🔥 SEND INDEXNOW PING - ONLY IF BLOG IS PUBLISHED
      const isPublished = status === 'published';
      
      if (isPublished) {
        const indexNowKey = process.env.INDEXNOW_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nesticktech.com/';
        
        if (indexNowKey) {
          const blogUrl = `${siteUrl}blogs/${id}`;
          await sendIndexNowPing(blogUrl, indexNowKey);
          await sendIndexNowPing(`${siteUrl}blogs`, indexNowKey);
          console.log(`📡 IndexNow pinged for updated blog ID: ${id}`);
        } else {
          console.warn('⚠️ INDEXNOW_KEY not found in environment variables');
        }
      }
      
      return NextResponse.json({ success: true, message: 'Blog updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('PUT blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog with image and category relations
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      // Start transaction
      await connection.beginTransaction();
      
      // Get blog image to delete
      const [rows] = await connection.execute(
        'SELECT featured_image FROM blogs WHERE id = ?',
        [id]
      );
      const blog = (rows as any[])[0];
      
      // Delete image file
      if (blog?.featured_image) {
        await deleteImage(blog.featured_image);
      }
      
      // Delete category relations
      await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
      
      // Delete blog
      await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
      
      // Commit transaction
      await connection.commit();
      
      return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('DELETE blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}