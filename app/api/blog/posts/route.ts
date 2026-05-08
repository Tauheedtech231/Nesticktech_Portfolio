/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/posts/route.ts (Updated POST method)
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

// GET - Fetch all blogs
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let query = `
      SELECT b.id, b.title, b.excerpt, b.featured_image, b.status, b.views, b.created_at, b.updated_at,
             GROUP_CONCAT(c.name) as categories
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
      return NextResponse.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST - Create new blog with category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, excerpt, featured_image, status, category_id } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    let imageUrl = null;
    if (featured_image) {
      imageUrl = await saveImage(featured_image);
    }

    const connection = await pool.getConnection();
    
    try {
      // Start transaction
      await connection.beginTransaction();

      // Insert blog
      const [result] = await connection.execute(
        `INSERT INTO blogs (title, content, excerpt, featured_image, status, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [title, content, excerpt || null, imageUrl, status || 'draft']
      );
      
      const blogId = (result as any).insertId;

      // Insert category relation if category selected
      if (category_id) {
        await connection.execute(
          'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
          [blogId, category_id]
        );
      }
      
      // Commit transaction
      await connection.commit();
      
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