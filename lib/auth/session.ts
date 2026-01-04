import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPayload {
  email: string;
  name: string;
  id: string;
}

/**
 * Create a new session and set HTTP-only cookie
 */
export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

/**
 * Get the current session from the cookie
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Delete the session cookie
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
