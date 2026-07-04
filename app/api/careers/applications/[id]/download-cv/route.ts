/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/careers/applications/[id]/download-cv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.execute(
        'SELECT cv_file, cv_filename FROM career_applications WHERE id = ?',
        [id]
      );

      const applications = rows as any[];
      if (applications.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Application not found' },
          { status: 404 }
        );
      }

      const { cv_file, cv_filename } = applications[0];

      if (!cv_file) {
        return NextResponse.json(
          { success: false, error: 'CV file not found' },
          { status: 404 }
        );
      }

      // ✅ FIX: Check both formats
      let filePath: string = '';
      let filename: string = '';

      // Case 1: New format - just filename (ID 39)
      if (!cv_file.includes('/')) {
        filename = cv_file;
        filePath = path.join(process.cwd(), 'uploads', 'careers', filename);
      } 
      // Case 2: Old format - /uploads/careers/filename (ID 38, 37)
      else if (cv_file.startsWith('/uploads/careers/')) {
        filename = cv_file.replace('/uploads/careers/', '');
        // Try new location first
        const newPath = path.join(process.cwd(), 'uploads', 'careers', filename);
        if (existsSync(newPath)) {
          filePath = newPath;
        } else {
          // Fallback to old public location
          filePath = path.join(process.cwd(), 'public', 'uploads', 'careers', filename);
        }
      }
      // Case 3: Any other format
      else {
        filename = path.basename(cv_file);
        filePath = path.join(process.cwd(), 'uploads', 'careers', filename);
        if (!existsSync(filePath)) {
          filePath = path.join(process.cwd(), 'public', 'uploads', 'careers', filename);
        }
      }

      // Check if file exists
      if (!existsSync(filePath)) {
        return NextResponse.json(
          { success: false, error: 'CV file not found on server' },
          { status: 404 }
        );
      }

      // Read the file
      const fileBuffer = await readFile(filePath);

      // Determine content type
      let contentType = 'application/octet-stream';
      const ext = cv_filename.toLowerCase();
      if (ext.endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (ext.endsWith('.doc')) {
        contentType = 'application/msword';
      } else if (ext.endsWith('.docx')) {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${cv_filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('CV download error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download CV' },
      { status: 500 }
    );
  }
}