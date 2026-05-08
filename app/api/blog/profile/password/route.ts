/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/profile/password/route.ts
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, currentPassword, newPassword } = body;

    if (!id || !currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'All fields required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Verify current password
      const [rows] = await connection.execute(
        'SELECT id FROM admin_users WHERE id = ? AND password = ?',
        [id, currentPassword]
      );
      
      const admins = rows as any[];
      if (admins.length === 0) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
      }
      
      // Update password (plain text for now, use bcrypt in production)
      await connection.execute(
        'UPDATE admin_users SET password = ? WHERE id = ?',
        [newPassword, id]
      );
      
      return NextResponse.json({ success: true, message: 'Password changed successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ success: false, error: 'Failed to change password' }, { status: 500 });
  }
}