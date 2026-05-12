/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/faq/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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

// GET - Fetch all active FAQs
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [faq] = await connection.execute(
      `SELECT id, question, answer, display_order, is_active 
       FROM faq 
       WHERE is_active = 1 
       ORDER BY display_order ASC`
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      faq 
    });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQ' },
      { status: 500 }
    );
  }
}

// GET all FAQs for admin (including inactive)
export async function GET_ALL() {
  try {
    const connection = await pool.getConnection();
    
    const [faq] = await connection.execute(
      `SELECT id, question, answer, display_order, is_active 
       FROM faq 
       ORDER BY display_order ASC`
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      faq 
    });
  } catch (error) {
    console.error('Error fetching all FAQs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, display_order, is_active } = body;
    
    // Validate required fields
    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: 'Question and answer are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO faq (question, answer, display_order, is_active) 
       VALUES (?, ?, ?, ?)`,
      [question, answer, display_order || 0, is_active !== false ? 1 : 0]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      id: (result as any).insertId,
      message: 'FAQ created successfully' 
    });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

// PUT - Update FAQ
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { question, answer, display_order, is_active } = body;
    
    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }
    
    if (!question || !answer) {
      return NextResponse.json(
        { success: false, message: 'Question and answer are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    // Convert undefined values to null or default values
    const updateDisplayOrder = display_order !== undefined && display_order !== null ? display_order : 0;
    const updateIsActive = is_active !== undefined && is_active !== null ? (is_active ? 1 : 0) : 1;
    
    await connection.execute(
      `UPDATE faq 
       SET question = ?, answer = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [question, answer, updateDisplayOrder, updateIsActive, id]
    );
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'FAQ updated successfully' 
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE - Delete FAQ
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
    await connection.execute('DELETE FROM faq WHERE id = ?', [id]);
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'FAQ deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}