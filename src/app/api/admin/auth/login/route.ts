import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  createAdminSession,
  ensureBootstrapAdmin,
  getSessionCookieName,
  getSessionMaxAgeSeconds,
  normalizeAdminEmail,
  verifyAdminPassword,
} from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string };
    const normalizedEmail = normalizeAdminEmail(email || '');

    if (!normalizedEmail || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await ensureBootstrapAdmin(normalizedEmail, password);

    const admin = await prisma.adminUser.findFirst({
      where: { email: normalizedEmail, isActive: true },
    });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await verifyAdminPassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { token } = await createAdminSession(admin.id);
    const response = NextResponse.json({
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: getSessionMaxAgeSeconds(),
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
