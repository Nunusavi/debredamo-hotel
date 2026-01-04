import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow access to login page
  if (path.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Protect all admin routes
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    const session = await getSession();

    if (!session) {
      // Redirect to login for page requests
      if (path.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      // Return 401 for API requests
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
