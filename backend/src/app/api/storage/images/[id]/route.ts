import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { verifyToken } from '@/lib/auth';
import { corsMiddleware, handleOptions } from '@/lib/cors';

async function handler(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const image = await storage.getImage(params.id);
  
  if (!image) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  // Only allow access to own images
  if (image.userId !== decoded.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ data: image.data });
}

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  return corsMiddleware(request, (req) => handler(req, context));
}

export async function OPTIONS(request: NextRequest) {
  return handleOptions();
}