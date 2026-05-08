// app/api/blog/posts/[id]/route.ts
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

// GET - Fetch single blog
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
      
      const [rows] = await connection.execute(
        `SELECT id, title, content, excerpt, featured_image, status, views, created_at, updated_at 
         FROM blogs WHERE id = ?`,
        [id]
      );
      
      const blogs = rows as any[];
      if (blogs.length === 0) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: blogs[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT - Update blog
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, content, excerpt, featured_image, status } = body;

    const connection = await pool.getConnection();
    
    try {
      await connection.execute(
        `UPDATE blogs 
         SET title = ?, content = ?, excerpt = ?, featured_image = ?, status = ?, updated_at = NOW()
         WHERE id = ?`,
        [title, content, excerpt || null, featured_image || null, status || 'draft', id]
      );
      
      return NextResponse.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('PUT blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
      return NextResponse.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('DELETE blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}