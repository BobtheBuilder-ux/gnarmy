import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { verifySession } from '@/lib/auth';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRICE_FILE = path.join(DATA_DIR, 'coal.json');
const HISTORY_FILE = path.join(DATA_DIR, 'coal-history.json');

async function ensureData() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(PRICE_FILE);
  } catch {
    await fs.writeFile(PRICE_FILE, JSON.stringify({ name: 'Coal', price: null, time: null }));
  }
  try {
    await fs.access(HISTORY_FILE);
  } catch {
    await fs.writeFile(HISTORY_FILE, JSON.stringify([]));
  }
}

export async function GET() {
  await ensureData();
  const buf = await fs.readFile(PRICE_FILE, 'utf8');
  const json = JSON.parse(buf);
  return NextResponse.json(json);
}

const schema = z.object({ price: z.number().finite().positive() });

export async function POST(req: NextRequest) {
  await ensureData();
  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const token = req.cookies.get('session')?.value || '';
  const session = token ? await verifySession(token, secret) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid price' }, { status: 400 });

  const { price } = parsed.data;
  const time = new Date().toISOString();
  const current = { name: 'Coal', price, time };
  await fs.writeFile(PRICE_FILE, JSON.stringify(current));

  const histBuf = await fs.readFile(HISTORY_FILE, 'utf8');
  const history = JSON.parse(histBuf) as Array<{ id?: string; price: number; time: string; user: string }>;
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  history.push({ id, price, time, user: session.username });
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history));

  return NextResponse.json(current);
}

export async function DELETE(req: NextRequest) {
  await ensureData();
  const secret = process.env.AUTH_SECRET || 'dev-secret';
  const token = req.cookies.get('session')?.value || '';
  const session = token ? await verifySession(token, secret) : null;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cleared = { name: 'Coal', price: null, time: null };
  await fs.writeFile(PRICE_FILE, JSON.stringify(cleared));
  return NextResponse.json(cleared);
}
