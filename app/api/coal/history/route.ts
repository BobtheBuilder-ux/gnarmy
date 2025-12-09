import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { verifySession } from '@/lib/auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'coal-history.json');

export async function GET() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const buf = await fs.readFile(HISTORY_FILE, 'utf8');
    const json = JSON.parse(buf);
    return NextResponse.json(json);
  } catch {
    return NextResponse.json([]);
  }
}

export async function DELETE(req: NextRequest) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const token = req.cookies.get('session')?.value || '';
  const session = token ? await verifySession(token, secret) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = z
    .object({ id: z.string().optional(), time: z.string().optional() })
    .safeParse(body);
  if (!parsed.success || (!parsed.data.id && !parsed.data.time)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { id, time } = parsed.data;
  try {
    const buf = await fs.readFile(HISTORY_FILE, 'utf8');
    const arr = JSON.parse(buf) as Array<{ id?: string; time: string; price: number; user: string }>;
    const idx = arr.findIndex((x) => (id ? x.id === id : x.time === time));
    if (idx < 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    arr.splice(idx, 1);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(arr));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to delete' }, { status: 500 });
  }
}
