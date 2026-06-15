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
    return null;
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

// GET - Fetch single blog with Arabic fields (WITH LOGS)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  console.log(`\n🔵 [GET] /api/blog/posts/${(await params).id} - Request received`);
  
  try {
    const { id } = await params;
    console.log(`📝 Fetching blog with ID: ${id}`);
    
    const connection = await pool.getConnection();
    console.log(`✅ Database connection acquired`);
    
    try {
      // Update view count
      await connection.execute('UPDATE blogs SET views = views + 1 WHERE id = ?', [id]);
      console.log(`👁️ View count updated for blog ID: ${id}`);
      
      // Fetch blog with category information and theme fields
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
      console.log(`📊 Query returned ${blogs.length} row(s)`);
      
      if (blogs.length === 0) {
        console.log(`❌ Blog not found for ID: ${id}`);
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      const blog = blogs[0];
      
      // LOG ARABIC FIELDS STATUS
      console.log(`\n📝 BLOG DATA FOR ID ${id}:`);
      console.log(`   ├─ title: ${blog.title}`);
      console.log(`   ├─ titleAr: ${blog.titleAr ? '✅ EXISTS' : '❌ NULL'} (${blog.titleAr || 'No Arabic title'})`);
      console.log(`   ├─ content length: ${blog.content?.length || 0}`);
      console.log(`   ├─ contentAr: ${blog.contentAr ? '✅ EXISTS' : '❌ NULL'} (${blog.contentAr?.length || 0} chars)`);
      console.log(`   ├─ excerpt: ${blog.excerpt?.substring(0, 50)}...`);
      console.log(`   ├─ excerptAr: ${blog.excerptAr ? '✅ EXISTS' : '❌ NULL'}`);
      console.log(`   ├─ category_ids: ${blog.category_ids}`);
      console.log(`   ├─ category_names: ${blog.category_names}`);
      console.log(`   └─ status: ${blog.status}`);
      
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
        console.log(`📁 Categories: ${categories.map(c => c.name).join(', ')}`);
      }
      
      const responseData = {
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
        theme_heading_color: blog.theme_heading_color || '#000000',
        theme_font_family: blog.theme_font_family || 'Arial, sans-serif',
        theme_bg_color: blog.theme_bg_color || '#ffffff',
        theme_text_color: blog.theme_text_color || '#333333',
        theme_accent_color: blog.theme_accent_color || '#8b5cf6'
      };
      
      const duration = Date.now() - startTime;
      console.log(`✅ Response prepared in ${duration}ms`);
      console.log(`📤 Sending response with titleAr: ${responseData.titleAr ? 'PRESENT' : 'MISSING'}\n`);
      
      return NextResponse.json({ 
        success: true, 
        data: responseData
      });
    } finally {
      connection.release();
      console.log(`🔌 Database connection released`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error fetching blog after ${duration}ms:`, error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT - Update blog with Arabic fields (WITH LOGS)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  console.log(`\n🟡 [PUT] /api/blog/posts/${(await params).id} - Request received`);
  
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
      theme_heading_color,
      theme_font_family,
      theme_bg_color,
      theme_text_color,
      theme_accent_color
    } = body;

    console.log(`📝 Updating blog ID: ${id}`);
    console.log(`   ├─ title: ${title}`);
    console.log(`   ├─ titleAr: ${titleAr || '❌ Not provided'}`);
    console.log(`   ├─ content length: ${content?.length || 0}`);
    console.log(`   ├─ contentAr: ${contentAr ? '✅ Provided' : '❌ Not provided'}`);
    console.log(`   ├─ excerpt: ${excerpt?.substring(0, 50)}...`);
    console.log(`   ├─ excerptAr: ${excerptAr ? '✅ Provided' : '❌ Not provided'}`);
    console.log(`   ├─ category_id: ${category_id || 'None'}`);
    console.log(`   └─ status: ${status || 'draft'}`);

    if (!title || !content) {
      console.log(`❌ Validation failed: Title or content missing`);
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    console.log(`✅ Database connection acquired`);
    
    try {
      await connection.beginTransaction();
      console.log(`🔓 Transaction started`);
      
      // Get current blog
      const [oldRows] = await connection.execute(
        'SELECT featured_image, status FROM blogs WHERE id = ?',
        [id]
      );
      const oldBlog = (oldRows as any[])[0];
      console.log(`📖 Old blog data retrieved`);
      
      let imageUrl = null;
      
      if (featured_image) {
        if (featured_image.startsWith('data:image')) {
          console.log(`🖼️ New image detected, saving...`);
          imageUrl = await saveImage(featured_image);
          if (oldBlog?.featured_image) {
            await deleteImage(oldBlog.featured_image);
            console.log(`🗑️ Old image deleted`);
          }
          console.log(`✅ New image saved: ${imageUrl}`);
        } else {
          imageUrl = featured_image;
          console.log(`🖼️ Using existing image: ${imageUrl}`);
        }
      }
      
      // Update blog
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
      console.log(`💾 Blog updated in database`);
      
      // Update category
      if (category_id !== undefined) {
        await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
        console.log(`🗑️ Existing categories deleted`);
        
        if (category_id) {
          await connection.execute(
            'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
            [id, category_id]
          );
          console.log(`✅ New category ${category_id} assigned`);
        }
      }
      
      await connection.commit();
      console.log(`✅ Transaction committed`);
      
      // IndexNow ping
      const isPublished = status === 'published';
      if (isPublished) {
        const indexNowKey = process.env.INDEXNOW_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nesticktech.com/';
        
        if (indexNowKey) {
          const blogUrl = `${siteUrl}blogs/${id}`;
          await sendIndexNowPing(blogUrl, indexNowKey);
          await sendIndexNowPing(`${siteUrl}blogs`, indexNowKey);
        }
      }
      
      const duration = Date.now() - startTime;
      console.log(`✅ Blog updated successfully in ${duration}ms\n`);
      
      return NextResponse.json({ success: true, message: 'Blog updated successfully' });
    } catch (error) {
      await connection.rollback();
      console.error(`❌ Transaction failed, rolling back:`, error);
      throw error;
    } finally {
      connection.release();
      console.log(`🔌 Database connection released`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ PUT blog error after ${duration}ms:`, error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog with image and category relations
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  console.log(`\n🔴 [DELETE] /api/blog/posts/${(await params).id} - Request received`);
  
  try {
    const { id } = await params;
    console.log(`🗑️ Deleting blog ID: ${id}`);
    
    const connection = await pool.getConnection();
    console.log(`✅ Database connection acquired`);
    
    try {
      await connection.beginTransaction();
      console.log(`🔓 Transaction started`);
      
      const [rows] = await connection.execute(
        'SELECT featured_image FROM blogs WHERE id = ?',
        [id]
      );
      const blog = (rows as any[])[0];
      
      if (blog?.featured_image) {
        await deleteImage(blog.featured_image);
        console.log(`🗑️ Featured image deleted`);
      }
      
      await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
      console.log(`🗑️ Category relations deleted`);
      
      await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
      console.log(`🗑️ Blog deleted`);
      
      await connection.commit();
      console.log(`✅ Transaction committed`);
      
      const duration = Date.now() - startTime;
      console.log(`✅ Blog deleted successfully in ${duration}ms\n`);
      
      return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      await connection.rollback();
      console.error(`❌ Transaction failed:`, error);
      throw error;
    } finally {
      connection.release();
      console.log(`🔌 Database connection released`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ DELETE blog error after ${duration}ms:`, error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}