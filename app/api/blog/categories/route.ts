// app/api/blog/categories/route.ts
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

// GET - Fetch all categories
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        'SELECT id, name, description, created_at FROM categories ORDER BY name ASC'
      );
      
      return NextResponse.json({ success: true, data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET categories error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST - Create category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, description || null]
      );
      
      return NextResponse.json({ success: true, id: (result as any).insertId });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('POST category error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 });
  }
}