import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { verifyToken } from '@/lib/auth';
import { corsMiddleware, handleOptions } from '@/lib/cors';

async function handler(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, oldImageId } = await request.json();
    
    // If updating an existing image, use its ID
    const id = oldImageId || Date.now().toString();

    // Store the image data
    const image = {
      id,
      data,
      userId: decoded.userId
    };

    // Save/update the image data
    await storage.saveImage(image);

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Storage error:', error);
    return NextResponse.json(
      { error: 'Failed to save image' },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  return corsMiddleware(request, handler);
}

export async function OPTIONS(request: NextRequest) {
  return handleOptions();
}