/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/posts/route.ts (Complete Updated API with Arabic Fields)
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

async function saveImage(base64String: string): Promise<string | null> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return null;
  }

  try {
    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return null;

    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    
    return `/uploads/blogs/${filename}`;
  } catch (error) {
    console.error('Image save error:', error);
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

// GET - Fetch all blogs (UPDATED with Arabic fields)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    // ✅ UPDATED QUERY - Added titleAr, contentAr, excerptAr
    let query = `
      SELECT 
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
        b.theme_heading_color,
        b.theme_font_family,
        b.theme_bg_color,
        b.theme_text_color,
        b.theme_accent_color,
        GROUP_CONCAT(DISTINCT c.name) as categories,
        GROUP_CONCAT(DISTINCT c.id) as category_ids
      FROM blogs b
      LEFT JOIN blog_categories bc ON b.id = bc.blog_id
      LEFT JOIN categories c ON bc.category_id = c.id
    `;
    const params: any[] = [];

    if (status) {
      query += ' WHERE b.status = ?';
      params.push(status);
    }

    query += ' GROUP BY b.id ORDER BY b.created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(query, params);
      
      const processedRows = (rows as any[]).map(row => ({
        id: row.id,
        title: row.title,
        titleAr: row.titleAr || null,
        content: row.content,
        contentAr: row.contentAr || null,
        excerpt: row.excerpt,
        excerptAr: row.excerptAr || null,
        featured_image: row.featured_image,
        status: row.status,
        views: row.views,
        created_at: row.created_at,
        updated_at: row.updated_at,
        theme_heading_color: row.theme_heading_color || '#000000',
        theme_font_family: row.theme_font_family || 'Arial, sans-serif',
        theme_bg_color: row.theme_bg_color || '#ffffff',
        theme_text_color: row.theme_text_color || '#333333',
        theme_accent_color: row.theme_accent_color || '#8b5cf6',
        category: row.categories ? row.categories.split(',')[0] : null,
        category_ids: row.category_ids,
        read_time: Math.ceil((row.content?.length || 0) / 1000) || 3
      }));
      
      console.log(`✅ GET blogs: Returning ${processedRows.length} blogs with Arabic fields`);
      
      return NextResponse.json({ success: true, data: processedRows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST - Create new blog with Arabic fields
export async function POST(req: NextRequest) {
  try {
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

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    let imageUrl = null;
    if (featured_image) {
      imageUrl = await saveImage(featured_image);
    }

    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        `INSERT INTO blogs (
          title, titleAr, content, contentAr, excerpt, excerptAr,
          featured_image, status, 
          theme_heading_color, theme_font_family, theme_bg_color, 
          theme_text_color, theme_accent_color,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
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
          theme_accent_color || '#8b5cf6'
        ]
      );
      
      const blogId = (result as any).insertId;

      if (category_id) {
        await connection.execute(
          'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
          [blogId, category_id]
        );
      }
      
      await connection.commit();
      
      // 🔥 SEND INDEXNOW PING - ONLY IF PUBLISHED
      if (status === 'published') {
        const indexNowKey = process.env.INDEXNOW_KEY;
        const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nesticktech.com/';
        
        if (indexNowKey) {
          const blogUrl = `${siteUrl}blogs/${blogId}`;
          await sendIndexNowPing(blogUrl, indexNowKey);
          await sendIndexNowPing(`${siteUrl}blogs`, indexNowKey);
          console.log(`📡 IndexNow pinged for blog ID: ${blogId}`);
        } else {
          console.warn('⚠️ INDEXNOW_KEY not found in environment variables');
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        id: blogId,
        message: 'Blog created successfully'
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
}