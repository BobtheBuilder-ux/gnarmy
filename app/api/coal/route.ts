import { NextResponse } from 'next/server';

export async function GET() {
  const clientId =
    process.env.TE_CLIENT_ID || process.env.NEXT_PUBLIC_TE_CLIENT_ID || 'bb79912b577e42a';
  const clientSecret =
    process.env.TE_CLIENT_SECRET || process.env.NEXT_PUBLIC_TE_CLIENT_SECRET || 'twh2u8ixra49rz4';

  const url = `https://api.tradingeconomics.com/markets/commodities?client=${clientId}&client_secret=${clientSecret}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status} ${res.statusText}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Unexpected upstream response' }, { status: 500 });
    }

    const coal = data.find(
      (item: any) => typeof item?.name === 'string' && item.name.toLowerCase() === 'coal'
    );
    if (!coal) {
      return NextResponse.json({ error: 'Coal not found' }, { status: 404 });
    }

    const price: number = Number(coal?.last ?? coal?.close ?? coal?.price ?? NaN);
    if (!Number.isFinite(price)) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 500 });
    }

    const time = new Date().toISOString();
    return NextResponse.json({ name: 'Coal', price, time });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Failed to fetch coal data' },
      { status: 500 }
    );
  }
}