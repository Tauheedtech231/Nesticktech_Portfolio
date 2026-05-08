/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/posts/[id]/route.ts
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

// Helper function to save base64 image to local folder
async function saveImage(base64String: string): Promise<string | null> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return null;
  }

  try {
    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return null;
    }

    const extension = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
    
    await mkdir(uploadDir, { recursive: true });
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    return `/uploads/blogs/${filename}`;
  } catch (error) {
    console.error('Image save error:', error);
    return null;
  }
}

// Helper function to delete old image
async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) return;
  
  try {
    const filepath = path.join(process.cwd(), 'public', imageUrl);
    if (fs.existsSync(filepath)) {
      await unlink(filepath);
    }
  } catch (error) {
    console.error('Image delete error:', error);
  }
}

// GET - Fetch single blog with category
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      // Update view count
      await connection.execute('UPDATE blogs SET views = views + 1 WHERE id = ?', [id]);
      
      // Fetch blog with category information
      const [rows] = await connection.execute(
        `SELECT 
          b.id, 
          b.title, 
          b.content, 
          b.excerpt, 
          b.featured_image, 
          b.status, 
          b.views, 
          b.created_at, 
          b.updated_at,
          GROUP_CONCAT(DISTINCT c.id) as category_ids,
          GROUP_CONCAT(DISTINCT c.name) as category_names,
          GROUP_CONCAT(DISTINCT c.description) as category_descriptions
         FROM blogs b
         LEFT JOIN blog_categories bc ON b.id = bc.blog_id
         LEFT JOIN categories c ON bc.category_id = c.id
         WHERE b.id = ?
         GROUP BY b.id`,
        [id]
      );
      
      const blogs = rows as any[];
      if (blogs.length === 0) {
        return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
      }
      
      const blog = blogs[0];
      
      // Parse categories
      const categories = [];
      if (blog.category_ids) {
        const ids = blog.category_ids.split(',');
        const names = blog.category_names ? blog.category_names.split(',') : [];
        const descriptions = blog.category_descriptions ? blog.category_descriptions.split(',') : [];
        
        for (let i = 0; i < ids.length; i++) {
          categories.push({
            id: parseInt(ids[i]),
            name: names[i] || '',
            description: descriptions[i] || ''
          });
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        data: {
          ...blog,
          categories
        }
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('GET blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT - Update blog with local image upload and category
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, content, excerpt, featured_image, status, category_id } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();
    
    try {
      // Start transaction
      await connection.beginTransaction();
      
      // Get current blog to delete old image if needed
      const [oldRows] = await connection.execute(
        'SELECT featured_image FROM blogs WHERE id = ?',
        [id]
      );
      const oldBlog = (oldRows as any[])[0];
      
      let imageUrl = null;
      
      // Check if new image is base64 (new upload) or URL (existing)
      if (featured_image) {
        if (featured_image.startsWith('data:image')) {
          // New image uploaded - save it
          imageUrl = await saveImage(featured_image);
          // Delete old image
          if (oldBlog?.featured_image) {
            await deleteImage(oldBlog.featured_image);
          }
        } else {
          // Existing URL - keep as is
          imageUrl = featured_image;
        }
      }
      
      // Update blog
      await connection.execute(
        `UPDATE blogs 
         SET title = ?, content = ?, excerpt = ?, featured_image = ?, status = ?, updated_at = NOW()
         WHERE id = ?`,
        [title, content, excerpt || null, imageUrl, status || 'draft', id]
      );
      
      // Update category relation
      if (category_id !== undefined) {
        // Delete existing category relations
        await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
        
        // Insert new category if selected
        if (category_id) {
          await connection.execute(
            'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
            [id, category_id]
          );
        }
      }
      
      // Commit transaction
      await connection.commit();
      
      return NextResponse.json({ success: true, message: 'Blog updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('PUT blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE - Delete blog with image and category relations
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    try {
      // Start transaction
      await connection.beginTransaction();
      
      // Get blog image to delete
      const [rows] = await connection.execute(
        'SELECT featured_image FROM blogs WHERE id = ?',
        [id]
      );
      const blog = (rows as any[])[0];
      
      // Delete image file
      if (blog?.featured_image) {
        await deleteImage(blog.featured_image);
      }
      
      // Delete category relations
      await connection.execute('DELETE FROM blog_categories WHERE blog_id = ?', [id]);
      
      // Delete blog
      await connection.execute('DELETE FROM blogs WHERE id = ?', [id]);
      
      // Commit transaction
      await connection.commit();
      
      return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('DELETE blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}