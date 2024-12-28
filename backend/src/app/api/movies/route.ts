import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const movies = await storage.getMovies();
  const userMovies = movies.filter((movie: any) => movie.userId === decoded.userId);
  return NextResponse.json(userMovies);
}

export async function POST(request: Request) {
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
    const movieData = await request.json();
    const movies = await storage.getMovies();
    
    const newMovie = {
      id: Date.now().toString(),
      ...movieData,
      userId: decoded.userId
    };

    movies.push(newMovie);
    await storage.saveMovies(movies);

    return NextResponse.json(newMovie);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}