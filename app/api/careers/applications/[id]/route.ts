/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/careers/applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    if (!status) {
      return NextResponse.json({ success: false, error: 'Status is required' }, { status: 400 });
    }

    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    try {
      // Get application details before update
      const [appRows] = await connection.execute(
        'SELECT full_name, email, position FROM career_applications WHERE id = ?',
        [id]
      );
      const application = (appRows as any[])[0];

      if (!application) {
        return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
      }

      // Update status
      await connection.execute(
        'UPDATE career_applications SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?',
        [status, notes || null, id]
      );

      // Send email notification to applicant
      let emailSubject = '';
      let emailMessage = '';

      switch (status) {
        case 'reviewed':
          emailSubject = 'Your application is under review';
          emailMessage = 'We are currently reviewing your application and will get back to you soon.';
          break;
        case 'shortlisted':
          emailSubject = 'Congratulations! You have been shortlisted';
          emailMessage = 'We are pleased to inform you that you have been shortlisted for the next round. Our HR team will contact you shortly for an interview.';
          break;
        case 'rejected':
          emailSubject = 'Update on your application';
          emailMessage = 'Thank you for your interest. After careful review, we have decided to move forward with other candidates. We wish you the best in your job search.';
          break;
        default:
          emailSubject = 'Application status update';
          emailMessage = 'Your application status has been updated. Please check your portal for more details.';
      }

      await transporter.sendMail({
        from: `"Nestick Tech HR" <${process.env.EMAIL_USER}>`,
        to: application.email,
        subject: emailSubject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 500px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Application Status Update</h2>
              </div>
              <div class="content">
                <p>Dear ${application.full_name},</p>
                <p>${emailMessage}</p>
                ${notes ? `<p><strong>Additional Notes:</strong> ${notes}</p>` : ''}
                <p>Position Applied: <strong>${application.position}</strong></p>
                <p>Best regards,<br><strong>Nestick Tech HR Team</strong></p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      return NextResponse.json({
        success: true,
        message: `Application ${status} successfully`
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update application' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();

    try {
      const [rows] = await connection.execute(
        `SELECT id, full_name, email, phone, position, experience, portfolio, message, 
                category, cv_file, cv_filename, cv_file_size, status, notes, created_at, updated_at
         FROM career_applications WHERE id = ?`,
        [id]
      );

      const applications = rows as any[];
      if (applications.length === 0) {
        return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: applications[0] });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch application' }, { status: 500 });
  }
}