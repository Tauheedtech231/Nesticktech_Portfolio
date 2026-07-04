/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/careers/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

// ✅ FIXED: Save file outside public folder
async function saveFile(base64String: string, filename: string): Promise<string> {
  try {
    let base64Data = base64String;
    if (base64String.includes(',')) {
      base64Data = base64String.split(',')[1];
    }
    
    const buffer = Buffer.from(base64Data, 'base64');
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${filename.replace(/\s/g, '_')}`;
    
    // ✅ CHANGE 1: Remove 'public' from path
    const uploadDir = path.join(process.cwd(), 'uploads', 'careers');
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);
    
    // ✅ CHANGE 2: Return only filename
    return uniqueFilename;
  } catch (error) {
    console.error('File save error:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      position,
      experience,
      portfolio,
      message,
      category,
      cvFile,
      cvFilename,
      cvFileSize
    } = body;

    if (!fullName || !email || !phone || !position || !experience || !message || !cvFile) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    let cvPath = '';
    try {
      cvPath = await saveFile(cvFile, cvFilename);
    } catch (fileError) {
      console.error('File save error:', fileError);
      return NextResponse.json(
        { success: false, error: 'Failed to upload CV file. Please try again.' },
        { status: 500 }
      );
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.execute(
        `INSERT INTO career_applications 
         (full_name, email, phone, position, experience, portfolio, message, category, 
          cv_file, cv_filename, cv_file_size, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [
          fullName.trim(),
          email.toLowerCase().trim(),
          phone.trim(),
          position.trim(),
          experience,
          portfolio || null,
          message.trim(),
          category,
          cvPath, // ✅ Now stores only filename
          cvFilename,
          cvFileSize || 0
        ]
      );

      const adminEmail = process.env.ADMIN_EMAIL || 'nesticktech@gmail.com';
      
      // ✅ CHANGE 3: Generate download URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nesticktech.com';
      const downloadUrl = `${baseUrl}/api/download-cv?file=${cvPath}`;
      
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #374151; width: 140px; display: inline-block; }
            .field-value { color: #111827; }
            .download-btn {
              display: inline-block;
              background: #6366F1;
              color: white !important;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 8px;
              margin-top: 10px;
            }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Job Application</h2>
              <p>${category === 'job' ? 'Full-Time Position' : 'Internship Application'}</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Name:</span>
                <span class="field-value">${fullName}</span>
              </div>
              <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value">${email}</span>
              </div>
              <div class="field">
                <span class="field-label">Phone:</span>
                <span class="field-value">${phone}</span>
              </div>
              <div class="field">
                <span class="field-label">Position:</span>
                <span class="field-value">${position}</span>
              </div>
              <div class="field">
                <span class="field-label">Experience:</span>
                <span class="field-value">${experience}</span>
              </div>
              ${portfolio ? `
              <div class="field">
                <span class="field-label">Portfolio:</span>
                <span class="field-value"><a href="${portfolio}" target="_blank">${portfolio}</a></span>
              </div>
              ` : ''}
              <div class="field">
                <span class="field-label">Message:</span>
                <span class="field-value">${message}</span>
              </div>
              <div class="field">
                <span class="field-label">CV:</span>
                <span class="field-value">
                  <a href="${downloadUrl}" class="download-btn" target="_blank">📄 Download CV</a>
                </span>
              </div>
            </div>
            <div class="footer">
              <p>This application was submitted from the Nestick Tech careers page.</p>
              <p>Reply to: ${email} | Call: ${phone}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Nestick Tech Careers" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: `New ${category === 'job' ? 'Job' : 'Internship'} Application for ${position} from ${fullName}`,
        html: emailHtml,
        replyTo: email,
      });

      await transporter.sendMail({
        from: `"Nestick Tech Careers" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for your application - Nestick Tech",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 500px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You for Applying! 🚀</h2>
              </div>
              <div class="content">
                <p>Dear ${fullName},</p>
                <p>Thank you for submitting your application for the position of <strong>${position}</strong>.</p>
                <p>We have received your application and our HR team will review it carefully. If your profile matches our requirements, we will contact you within <strong>5-7 business days</strong>.</p>
                <p><strong>Application Summary:</strong></p>
                <ul>
                  <li>📧 Email: ${email}</li>
                  <li>📞 Phone: ${phone}</li>
                  <li>🎯 Position: ${position}</li>
                  <li>📅 Applied on: ${new Date().toLocaleDateString()}</li>
                </ul>
                <p>In the meantime, you can:</p>
                <ul>
                  <li>📱 Follow us on social media for updates</li>
                  <li>🌐 Visit our website to learn more about us</li>
                  <li>📧 Reply to this email for any queries</li>
                </ul>
                <a href="https://nesticktech.com" class="button">Visit Our Website</a>
                <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">Best regards,<br><strong>Nestick Tech HR Team</strong></p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        applicationId: (result as any).insertId
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}