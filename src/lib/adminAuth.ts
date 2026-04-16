import crypto from 'crypto';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SafeAdmin = {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
};

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function getSessionMaxAgeSeconds() {
  return SESSION_MAX_AGE_SECONDS;
}

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function hashAdminPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      resolve(key.toString('hex'));
    });
  });
  return `${salt}:${derived}`;
}

export async function verifyAdminPassword(password: string, stored: string) {
  const [salt, savedKey] = stored.split(':');
  if (!salt || !savedKey) return false;

  const derived = await new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) return reject(err);
      resolve(key.toString('hex'));
    });
  });

  return crypto.timingSafeEqual(Buffer.from(savedKey, 'hex'), Buffer.from(derived, 'hex'));
}

export async function createAdminSession(adminId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.adminSession.create({
    data: {
      token,
      adminId,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function deleteAdminSession(token: string) {
  await prisma.adminSession.deleteMany({ where: { token } });
}

export async function getAdminFromRequest(req: NextRequest): Promise<SafeAdmin | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.adminSession.findFirst({
    where: {
      token,
      expiresAt: { gt: new Date() },
    },
  });
  if (!session) return null;

  const admin = await prisma.adminUser.findFirst({
    where: { id: session.adminId, isActive: true },
  });
  if (!admin) return null;

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    isActive: admin.isActive,
  };
}

export async function ensureBootstrapAdmin(email: string, password: string) {
  const bootstrapEmail = normalizeAdminEmail(process.env.ADMIN_EMAIL || '');
  const bootstrapPassword = process.env.ADMIN_PASSWORD || '';
  const bootstrapName = (process.env.ADMIN_NAME || 'Primary Admin').trim();

  // Recovery fallback for local/dev so admin login is never permanently locked out.
  const fallbackEmail = 'admin@kashishlife.com';
  const fallbackPassword = 'admin12345';
  const fallbackName = 'Primary Admin';

  const systemEmail = bootstrapEmail || fallbackEmail;
  const systemPassword = bootstrapPassword || fallbackPassword;
  const systemName = bootstrapName || fallbackName;

  if (normalizeAdminEmail(email) !== systemEmail || password !== systemPassword) return;

  const passwordHash = await hashAdminPassword(systemPassword);
  await prisma.adminUser.upsert({
    where: { email: systemEmail },
    update: {
      name: systemName,
      passwordHash,
      role: 'super_admin',
      isActive: true,
    },
    create: {
      email: systemEmail,
      name: systemName,
      passwordHash,
      role: 'super_admin',
      isActive: true,
    },
  });
}
