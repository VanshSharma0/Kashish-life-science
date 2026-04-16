import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminFromRequest, hashAdminPassword } from '@/lib/adminAuth';

const PROTECTED_SUPER_ADMIN_EMAIL = 'admin@kashishlifescience.com';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin = await getAdminFromRequest(req);
    if (!currentAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { name, password, role, isActive } = (await req.json()) as {
      name?: string;
      password?: string;
      role?: string;
      isActive?: boolean;
    };

    const target = await prisma.adminUser.findFirst({ where: { id } });
    if (!target) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    const isProtectedSuperAdmin =
      target.email.toLowerCase() === PROTECTED_SUPER_ADMIN_EMAIL && target.role === 'super_admin';

    if (isProtectedSuperAdmin) {
      if (typeof isActive === 'boolean' && !isActive) {
        return NextResponse.json({ error: 'Protected super admin cannot be deactivated' }, { status: 403 });
      }
      if (role && role !== 'super_admin') {
        return NextResponse.json({ error: 'Protected super admin role cannot be changed' }, { status: 403 });
      }
    }

    if (typeof isActive === 'boolean' && !isActive) {
      const activeCount = await prisma.adminUser.count({ where: { isActive: true } });
      if (activeCount <= 1 && target.isActive) {
        return NextResponse.json({ error: 'Cannot deactivate the last active admin' }, { status: 400 });
      }
    }

    const updateData: {
      name?: string;
      passwordHash?: string;
      role?: string;
      isActive?: boolean;
    } = {};

    if (name?.trim()) updateData.name = name.trim();
    if (password && password.length >= 8) {
      updateData.passwordHash = await hashAdminPassword(password);
    }
    if (role) {
      updateData.role = role === 'super_admin' ? 'super_admin' : 'admin';
    }
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }

    const updated = await prisma.adminUser.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      isActive: updated.isActive,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update admin';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin = await getAdminFromRequest(req);
    if (!currentAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (currentAdmin.id === id) {
      return NextResponse.json({ error: 'You cannot delete your own admin account' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findFirst({ where: { id } });
    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    const isProtectedSuperAdmin =
      admin.email.toLowerCase() === PROTECTED_SUPER_ADMIN_EMAIL && admin.role === 'super_admin';
    if (isProtectedSuperAdmin) {
      return NextResponse.json({ error: 'Protected super admin cannot be deleted' }, { status: 403 });
    }

    const count = await prisma.adminUser.count({ where: { isActive: true } });
    if (admin.isActive && count <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last active admin' }, { status: 400 });
    }

    await prisma.adminSession.deleteMany({ where: { adminId: id } });
    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete admin';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
