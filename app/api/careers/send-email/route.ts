// app/api/careers/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { to, name, subject, message, position } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366F1, #8B5CF6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
          .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nestick Tech</h2>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
            ${position ? `<p><strong>Position Applied:</strong> ${position}</p>` : ''}
            <p>Best regards,<br><strong>Nestick Tech HR Team</strong></p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Nestick Tech. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Nestick Tech HR" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}