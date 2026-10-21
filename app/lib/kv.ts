// Tiny key-value store used for lead idempotency and conversion claims.
//
// Production: Upstash Redis over its REST API (atomic SET NX = the dedupe lock).
// Configure via Vercel → Storage → Upstash, which sets either:
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, or
//   KV_REST_API_URL / KV_REST_API_TOKEN
//
// Local dev without those vars falls back to an in-memory map so the flow can
// be tested end to end. The fallback is never used in production.

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

type MemEntry = { value: string; expiresAt: number };
const globalMem = globalThis as unknown as { __slvKv?: Map<string, MemEntry> };
const mem = (globalMem.__slvKv ??= new Map<string, MemEntry>());

export const kvMode = (): 'redis' | 'memory' | 'unavailable' => {
  if (url && token) return 'redis';
  return process.env.NODE_ENV === 'production' ? 'unavailable' : 'memory';
};

async function redis(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(url as string, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  const json = (await res.json().catch(() => null)) as { result?: unknown; error?: string } | null;
  if (!res.ok || !json || json.error) {
    throw new Error(`KV ${command[0]} failed: ${json?.error || res.status}`);
  }
  return json.result;
}

const memGet = (key: string): string | null => {
  const hit = mem.get(key);
  if (!hit) return null;
  if (hit.expiresAt < Date.now()) {
    mem.delete(key);
    return null;
  }
  return hit.value;
};

/** Atomically set `key` only if it does not exist. Returns true if this call won. */
export async function kvSetNX(key: string, value: string, ttlSeconds: number): Promise<boolean> {
  const mode = kvMode();
  if (mode === 'redis') return (await redis(['SET', key, value, 'NX', 'EX', ttlSeconds])) === 'OK';
  if (mode === 'memory') {
    if (memGet(key) !== null) return false;
    mem.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    return true;
  }
  throw new Error('KV unavailable: Upstash Redis env vars are not set.');
}

export async function kvSet(key: string, value: string, ttlSeconds: number): Promise<void> {
  const mode = kvMode();
  if (mode === 'redis') {
    await redis(['SET', key, value, 'EX', ttlSeconds]);
    return;
  }
  if (mode === 'memory') {
    mem.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    return;
  }
  throw new Error('KV unavailable: Upstash Redis env vars are not set.');
}

export async function kvGet(key: string): Promise<string | null> {
  const mode = kvMode();
  if (mode === 'redis') return ((await redis(['GET', key])) as string | null) ?? null;
  if (mode === 'memory') return memGet(key);
  throw new Error('KV unavailable: Upstash Redis env vars are not set.');
}

export async function kvDel(key: string): Promise<void> {
  const mode = kvMode();
  if (mode === 'redis') {
    await redis(['DEL', key]);
    return;
  }
  if (mode === 'memory') mem.delete(key);
}
