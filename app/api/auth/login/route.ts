import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { signSession, safeCompare } from '@/lib/auth';

const schema = z.object({ username: z.string().min(1), password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  const { username, password } = parsed.data;
  const u = username.trim();
  const p = password.trim();

  const envUser = process.env.DASHBOARD_USERNAME || 'Admin';
  const envPass = process.env.DASHBOARD_PASSWORD || 'Admin';

  const okUser = safeCompare(u, envUser);
  const okPass = safeCompare(p, envPass);
  if (!okUser || !okPass) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const exp = Date.now() + 1000 * 60 * 60 * 8;
  const token = await signSession({ username: envUser, exp }, secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return res;
}
