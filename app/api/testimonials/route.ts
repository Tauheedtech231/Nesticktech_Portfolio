/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database connection directly
const pool = mysql.createPool({
  host: process.env.DB_HOST || '76.13.220.47',
  user: process.env.DB_USER || 'lms_user',
  password: process.env.DB_PASSWORD || 'StrongPass@456',
  database: process.env.DB_NAME || 'official_site',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// GET - Fetch all testimonials
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [testimonials] = await connection.execute(
      `SELECT id, name, role, company, image, text, rating, display_order, is_active, created_at 
       FROM testimonials 
       ORDER BY display_order ASC`
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      testimonials 
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, company, image, text, rating, display_order, is_active } = body;
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO testimonials (name, role, company, image, text, rating, display_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, role, company, image, text, rating || 5, display_order || 0, is_active !== false]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      id: (result as any).insertId,
      message: 'Testimonial created successfully' 
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

// PUT - Update testimonial
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { name, role, company, image, text, rating, display_order, is_active } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    await connection.execute(
      `UPDATE testimonials 
       SET name = ?, role = ?, company = ?, image = ?, text = ?, rating = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [name, role, company, image, text, rating, display_order, is_active, id]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial updated successfully' 
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM testimonials WHERE id = ?', [id]);
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}

// PATCH - Toggle testimonial status
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { is_active } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE testimonials SET is_active = ? WHERE id = ?',
      [is_active, id]
    );
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial status updated successfully' 
    });
  } catch (error) {
    console.error('Error updating testimonial status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update testimonial status' },
      { status: 500 }
    );
  }
}