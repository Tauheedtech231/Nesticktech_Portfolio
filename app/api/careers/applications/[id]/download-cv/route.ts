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

      // ✅ FIX: File path outside public folder
      let filePath: string;
      
      // Check if cv_file is old format (starts with /uploads/careers/)
      if (cv_file.startsWith('/uploads/careers/')) {
        // Old format: /uploads/careers/123456_resume.pdf
        // Remove leading slash and use uploads folder
        const filename = cv_file.replace('/uploads/careers/', '');
        filePath = path.join(process.cwd(), 'uploads', 'careers', filename);
      } else {
        // New format: just filename (123456_resume.pdf)
        filePath = path.join(process.cwd(), 'uploads', 'careers', cv_file);
      }

      // Check if file exists
      if (!existsSync(filePath)) {
        // Fallback: try old public folder
        const oldPath = path.join(process.cwd(), 'public', 'uploads', 'careers', 
          cv_file.includes('/') ? cv_file.split('/').pop() || cv_file : cv_file
        );
        
        if (existsSync(oldPath)) {
          filePath = oldPath;
        } else {
          return NextResponse.json(
            { success: false, error: 'CV file not found on server' },
            { status: 404 }
          );
        }
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