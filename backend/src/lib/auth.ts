import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export function generateToken(userId: string) {
  return sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}