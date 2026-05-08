// app/api/blog/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// GET - Fetch all blogs
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        `SELECT id, title, excerpt, featured_image, status, views, created_at, updated_at 
         FROM blogs ORDER BY created_at DESC`
      );
      
      return NextResponse.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST - Create new blog
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, excerpt, featured_image, status } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        `INSERT INTO blogs (title, content, excerpt, featured_image, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [title, content, excerpt || null, featured_image || null, status || 'draft']
      );
      
      return NextResponse.json({ success: true, id: (result as any).insertId });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
}