import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

export const runtime = 'nodejs';

function parseMonth(m: string) {
  const d1 = Date.parse(m);
  if (!Number.isNaN(d1)) return d1;
  const d2 = Date.parse(`${m}-01`);
  if (!Number.isNaN(d2)) return d2;
  return Date.now();
}

export async function GET() {
  const csvPath = process.env.COAL_CSV_PATH || 'public/Coal_prices__sample_.csv';
  try {
    const raw = await fs.readFile(csvPath, 'utf8');
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length < 2) return NextResponse.json({ error: 'No data' }, { status: 500 });
    const header = lines[0].split(',').map((h) => h.trim());
    const iMonth = header.findIndex((h) => h.toLowerCase().includes('month'));
    const iPrice = header.findIndex((h) => h.toLowerCase().includes('price'));
    if (iMonth < 0 || iPrice < 0) return NextResponse.json({ error: 'Invalid header' }, { status: 500 });
    const items = lines.slice(1).map((l) => {
      const cols = l.split(',');
      const month = cols[iMonth]?.trim() || '';
      const price = Number((cols[iPrice] || '').trim());
      return { month, price };
    }).filter((x) => x.month && Number.isFinite(x.price));
    items.sort((a, b) => parseMonth(a.month) - parseMonth(b.month));
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to read CSV' }, { status: 500 });
  }
}
