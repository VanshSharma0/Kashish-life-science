import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest, hashAdminPassword, normalizeAdminEmail } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    const currentAdmin = await getAdminFromRequest(req);
    if (!currentAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const admins = await prisma.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      admins.map((admin) => ({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
      }))
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load admins';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentAdmin = await getAdminFromRequest(req);
    if (!currentAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { email, name, password, role } = (await req.json()) as {
      email?: string;
      name?: string;
      password?: string;
      role?: string;
    };

    const normalizedEmail = normalizeAdminEmail(email || '');
    if (!normalizedEmail || !name?.trim() || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Name, email and password (min 8 chars) are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.adminUser.findFirst({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'Admin email already exists' }, { status: 409 });
    }

    const passwordHash = await hashAdminPassword(password);
    const admin = await prisma.adminUser.create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        passwordHash,
        role: role === 'super_admin' ? 'super_admin' : 'admin',
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isActive: admin.isActive,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create admin';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
