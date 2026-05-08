/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/careers/applications/route.ts
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

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let query = `
      SELECT id, full_name, email, phone, position, experience, portfolio, message, 
             category, cv_filename, cv_file, status, notes, created_at, updated_at
      FROM career_applications
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute(query, params);
      
      // Get stats
      const [statsRows] = await connection.execute(
        `SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'reviewed' THEN 1 ELSE 0 END) as reviewed,
          SUM(CASE WHEN status = 'shortlisted' THEN 1 ELSE 0 END) as shortlisted,
          SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
          SUM(CASE WHEN category = 'job' THEN 1 ELSE 0 END) as jobs,
          SUM(CASE WHEN category = 'internship' THEN 1 ELSE 0 END) as internships
        FROM career_applications`
      );

      return NextResponse.json({ 
        success: true, 
        data: rows,
        stats: (statsRows as any[])[0],
        count: (rows as any[]).length
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET applications error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch applications' }, { status: 500 });
  }
}