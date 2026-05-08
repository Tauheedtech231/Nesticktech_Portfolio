/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/careers/applications/[id]/view-cv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { readFile } from 'fs/promises';
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

      // Construct the full file path
      const relativePath = cv_file.startsWith('/') ? cv_file.slice(1) : cv_file;
      const filePath = path.join(process.cwd(), 'public', relativePath);

      // Read the file
      const fileBuffer = await readFile(filePath);

      // Determine content type based on file extension
      let contentType = 'application/octet-stream';
      if (cv_filename.endsWith('.pdf')) {
        contentType = 'application/pdf';
      } else if (cv_filename.endsWith('.doc')) {
        contentType = 'application/msword';
      } else if (cv_filename.endsWith('.docx')) {
        contentType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('CV view error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to view CV' },
      { status: 500 }
    );
  }
}
