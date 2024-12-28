import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const users = await storage.getUsers();
    
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken(user.id);
    
    return NextResponse.json({
      user: { id: user.id, email: user.email },
      token
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}