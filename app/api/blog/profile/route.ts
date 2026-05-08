/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/profile/route.ts
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

// Helper to save avatar
async function saveAvatar(base64String: string): Promise<string | null> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return null;
  }

  try {
    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return null;

    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const filename = `avatar-${Date.now()}.${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    
    return `/uploads/avatars/${filename}`;
  } catch (error) {
    console.error('Avatar save error:', error);
    return null;
  }
}

// GET - Fetch profile
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Admin ID required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(
        'SELECT id, username, email, role, avatar, bio, phone, website, location, created_at FROM admin_users WHERE id = ?',
        [id]
      );
      
      const admins = rows as any[];
      if (admins.length === 0) {
        return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: admins[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET profile error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// PUT - Update profile
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, username, email, bio, phone, website, location, avatar } = body;

    if (!id || !username || !email) {
      return NextResponse.json({ success: false, error: 'ID, username and email required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Get current avatar to delete old if needed
      const [oldRows] = await connection.execute(
        'SELECT avatar FROM admin_users WHERE id = ?',
        [id]
      );
      const oldAdmin = (oldRows as any[])[0];
      
      let avatarUrl = null;
      if (avatar) {
        if (avatar.startsWith('data:image')) {
          // New avatar uploaded
          avatarUrl = await saveAvatar(avatar);
          // Delete old avatar file
          if (oldAdmin?.avatar && oldAdmin.avatar !== avatarUrl) {
            const oldPath = path.join(process.cwd(), 'public', oldAdmin.avatar);
            if (fs.existsSync(oldPath)) {
              await unlink(oldPath);
            }
          }
        } else if (avatar.startsWith('/uploads/')) {
          // Existing avatar URL
          avatarUrl = avatar;
        }
      }
      
      await connection.execute(
        `UPDATE admin_users 
         SET username = ?, email = ?, bio = ?, phone = ?, website = ?, location = ?, avatar = ?
         WHERE id = ?`,
        [username, email, bio || null, phone || null, website || null, location || null, avatarUrl, id]
      );
      
      return NextResponse.json({ success: true, message: 'Profile updated successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('PUT profile error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}