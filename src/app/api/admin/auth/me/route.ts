import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromRequest } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ admin });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch admin';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
