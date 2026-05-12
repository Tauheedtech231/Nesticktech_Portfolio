// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'testimonials';
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, WEBP are allowed' },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large. Max 5MB allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.name);
    const filename = `${timestamp}-${randomStr}${ext}`;
    
    // Create directory if not exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(uploadDir, { recursive: true });
    
    // Save file
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);
    
    // Return the public URL
    const imageUrl = `/uploads/${folder}/${filename}`;
    
    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: 'File uploaded successfully'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE - Remove uploaded image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Image URL required' },
        { status: 400 }
      );
    }
    
    // Get the file path
    const filePath = path.join(process.cwd(), 'public', imageUrl);
    const fs = await import('fs/promises');
    
    // Check if file exists and delete
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (err) {
      // File doesn't exist, ignore
    }
    
    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete image' },
      { status: 500 }
    );
  }
}