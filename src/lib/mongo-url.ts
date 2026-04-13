/**
 * Merges recommended query params for Atlas (timeouts, retryWrites, w) without duplicating keys.
 */
export function augmentMongoUri(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) {
    return trimmed;
  }

  const qMark = trimmed.indexOf('?');
  const base = qMark === -1 ? trimmed : trimmed.slice(0, qMark);
  const existing = qMark === -1 ? '' : trimmed.slice(qMark + 1);
  const params = new URLSearchParams(existing);
  if (!params.has('serverSelectionTimeoutMS')) params.set('serverSelectionTimeoutMS', '8000');
  if (!params.has('connectTimeoutMS')) params.set('connectTimeoutMS', '10000');
  // Atlas replica sets; skip w/retryWrites defaults for local mongodb://
  if (/\.mongodb\.net/i.test(base)) {
    if (!params.has('retryWrites')) params.set('retryWrites', 'true');
    if (!params.has('w')) params.set('w', 'majority');
  }
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

/**
 * URL Prisma uses at runtime: MONGODB_URL, DATABASE_URL, or MONGODB_URI (first wins).
 * TLS "InternalError" / server selection failures are usually Atlas IP allowlist, paused cluster,
 * wrong password, or network/SSL inspection — not fixable from code alone.
 */
export function buildPrismaMongoUrl(): string {
  const raw =
    process.env.MONGODB_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    process.env.MONGODB_URI?.trim();
  if (!raw) {
    throw new Error(
      'Missing MONGODB_URL, DATABASE_URL, or MONGODB_URI. Add your Atlas connection string to .env (Atlas → Connect → Drivers).'
    );
  }
  return augmentMongoUri(raw);
}

export function isLikelyMongoConnectionFailure(error: unknown): boolean {
  const msg =
    error && typeof error === 'object' && 'message' in error && typeof (error as Error).message === 'string'
      ? (error as Error).message
      : String(error);
  return (
    /Server selection timeout|No available servers|connection timed out|ECONNREFUSED|ENOTFOUND|P2010|I\/O error|InternalError/i.test(
      msg
    )
  );
}
