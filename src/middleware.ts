import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function looksLikeSessionToken(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('admin_session');
  const sessionValue = session?.value ?? '';
  const hasValidFormatSession = looksLikeSessionToken(sessionValue);

  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!hasValidFormatSession) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      if (sessionValue) {
        response.cookies.set('admin_session', '', {
          path: '/',
          expires: new Date(0),
          maxAge: 0,
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
      return response;
    }
  }

  if (path === '/admin/login' && hasValidFormatSession) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
