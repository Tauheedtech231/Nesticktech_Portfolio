/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/footer/route.ts
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
  connectTimeout: 30000,
  enableKeepAlive: true,
});

// GET - Fetch all footer data
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    // Fetch contacts
    const [contacts] = await connection.execute(
      `SELECT id, type, value, url, display_order 
       FROM footer_contacts 
       WHERE is_active = 1 
       ORDER BY display_order ASC`
    );
    
    // Fetch social links
    const [social] = await connection.execute(
      `SELECT id, platform, url, icon_name, color, display_order 
       FROM footer_social 
       WHERE is_active = 1 
       ORDER BY display_order ASC`
    );
    
    // Fetch settings
    const [settings] = await connection.execute(
      `SELECT key_name, value FROM footer_settings`
    );
    
    connection.release();
    
    // Convert settings to object
    const settingsObj: Record<string, string> = {};
    (settings as any[]).forEach(setting => {
      settingsObj[setting.key_name] = setting.value;
    });
    
    return NextResponse.json({ 
      success: true, 
      contacts,
      social,
      settings: settingsObj
    });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch footer data' },
      { status: 500 }
    );
  }
}

// POST - Add new contact/social
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, type, value, url, platform, icon_name, color } = body;
    
    const connection = await pool.getConnection();
    
    if (category === 'contact') {
      // Validate required fields
      if (!type || !value) {
        return NextResponse.json(
          { success: false, message: 'Type and value are required' },
          { status: 400 }
        );
      }
      
      await connection.execute(
        `INSERT INTO footer_contacts (type, value, url, display_order) 
         VALUES (?, ?, ?, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM footer_contacts))`,
        [type, value, url || null]
      );
    } else if (category === 'social') {
      // Validate required fields
      if (!platform || !url || !icon_name) {
        return NextResponse.json(
          { success: false, message: 'Platform, URL and icon name are required' },
          { status: 400 }
        );
      }
      
      await connection.execute(
        `INSERT INTO footer_social (platform, url, icon_name, color, display_order) 
         VALUES (?, ?, ?, ?, (SELECT COALESCE(MAX(display_order), 0) + 1 FROM footer_social))`,
        [platform, url, icon_name, color || '#6366F1']
      );
    }
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Added successfully' 
    });
  } catch (error) {
    console.error('Error adding:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add' },
      { status: 500 }
    );
  }
}

// PUT - Update contact/social
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    const { category, type, value, url, platform, icon_name, color } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    if (category === 'contact') {
      // Validate required fields
      if (!type || !value) {
        return NextResponse.json(
          { success: false, message: 'Type and value are required' },
          { status: 400 }
        );
      }
      
      await connection.execute(
        `UPDATE footer_contacts 
         SET type = ?, value = ?, url = ?
         WHERE id = ?`,
        [type, value, url || null, id]
      );
    } else if (category === 'social') {
      // Validate required fields
      if (!platform || !url || !icon_name) {
        return NextResponse.json(
          { success: false, message: 'Platform, URL and icon name are required' },
          { status: 400 }
        );
      }
      
      await connection.execute(
        `UPDATE footer_social 
         SET platform = ?, url = ?, icon_name = ?, color = ?
         WHERE id = ?`,
        [platform, url, icon_name, color || '#6366F1', id]
      );
    }
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Updated successfully' 
    });
  } catch (error) {
    console.error('Error updating:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update' },
      { status: 500 }
    );
  }
}

// DELETE - Remove contact/social
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    
    if (!id || !category) {
      return NextResponse.json(
        { success: false, message: 'ID and category are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    if (category === 'contact') {
      await connection.execute('DELETE FROM footer_contacts WHERE id = ?', [id]);
    } else if (category === 'social') {
      await connection.execute('DELETE FROM footer_social WHERE id = ?', [id]);
    }
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete' },
      { status: 500 }
    );
  }
}

// PATCH - Update display order
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, category } = body;
    
    const connection = await pool.getConnection();
    
    if (category === 'contact') {
      for (const item of items) {
        await connection.execute(
          'UPDATE footer_contacts SET display_order = ? WHERE id = ?',
          [item.display_order, item.id]
        );
      }
    } else if (category === 'social') {
      for (const item of items) {
        await connection.execute(
          'UPDATE footer_social SET display_order = ? WHERE id = ?',
          [item.display_order, item.id]
        );
      }
    }
    
    connection.release();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order updated successfully' 
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update order' },
      { status: 500 }
    );
  }
}