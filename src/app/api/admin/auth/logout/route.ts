import { NextRequest, NextResponse } from 'next/server';
import { deleteAdminSession, getSessionCookieName } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(getSessionCookieName())?.value;
    if (token) {
      await deleteAdminSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(getSessionCookieName(), '', {
      path: '/',
      expires: new Date(0),
      maxAge: 0,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
