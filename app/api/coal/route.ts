import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request) {
  const isDev = process.env.NODE_ENV !== 'production';
  try {
    const url = new URL((_req as any)?.url ?? 'http://localhost');
    const live = url.searchParams.get('live');
    if (isDev && live !== '1') {
      return new Response(
        JSON.stringify({ name: 'Coal', price: null, time: new Date().toISOString(), error: 'dev-fallback' }),
        { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }, status: 200 }
      );
    }
  } catch {}
  // Prefer env-provided key; fall back to provided key string
  const apiKey =
    process.env.TE_API_KEY || process.env.NEXT_PUBLIC_TE_API_KEY || 'bb79912b577e42a:hm3nzjuqvmx1r8l';

  // Per Trading Economics docs, use the `c` query with `client:secret`
  // Ref: https://docs.tradingeconomics.com/markets/snapshot/
  const base = 'https://api.tradingeconomics.com/markets/commodities';

  async function fetchCommodities(key: string) {
    const url = `${base}?c=${encodeURIComponent(key)}&format=json`;
    const res = await fetch(url, { cache: 'no-store', headers: { accept: 'application/json' } });
    if (!res.ok) {
      const details = await res.text().catch(() => '');
      return { error: `Upstream error: ${res.status} ${res.statusText}`, details: details?.slice(0, 160) };
    }
    const data = await res.json();
    if (!Array.isArray(data)) return { error: 'Unexpected upstream response' };
    return { data };
  }

  try {
    let result = await fetchCommodities(apiKey);
    let data = (result as any)?.data;
    // If response looks like a free-tier placeholder (no names, nulls), fall back to guest key
    const hasUsable = Array.isArray(data) && data.some((d: any) => typeof d?.Name === 'string' && d.Name.trim());
    if (!hasUsable) {
      const guestRes = await fetchCommodities('guest:guest');
      data = (guestRes as any)?.data;
    }

    const coal = data.find((item: any) => {
      const name: string = String(item?.Name ?? item?.name ?? '').toLowerCase();
      return /coal/.test(name);
    });

    if (!coal) {
      return new Response(JSON.stringify({ error: 'Coal not found', name: 'Coal', price: null, time: new Date().toISOString() }), {
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        status: 200,
      });
    }

    const candidate = [coal?.Last, coal?.Close, coal?.last, coal?.close, coal?.price, coal?.value].find(
      (v: any) => typeof v === 'number' || typeof v === 'string'
    );
    const price: number = Number(candidate);
    const time = new Date().toISOString();
    if (!Number.isFinite(price)) {
      return new Response(JSON.stringify({ error: 'Invalid price', name: String(coal?.Name ?? coal?.name ?? 'Coal'), price: null, time }), {
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        status: 200,
      });
    }

    const nameOut = String(coal?.Name ?? coal?.name ?? 'Coal');
    return new Response(JSON.stringify({ name: nameOut, price, time }), {
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      status: 200,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Failed to fetch coal data', name: 'Coal', price: null, time: new Date().toISOString() }),
      { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }, status: 200 }
    );
  }
}