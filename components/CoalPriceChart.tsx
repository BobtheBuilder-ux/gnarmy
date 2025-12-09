"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

type Item = { month: string; price: number };
type Point = { label: string; price: number; ma30: number };

export default function CoalPriceChart({ className }: { className?: string }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const currentPrice = points.length ? points[points.length - 1].price : null;
  const currentMA = points.length ? points[points.length - 1].ma30 : null;
  const prevPrice = points.length > 1 ? points[points.length - 2].price : null;
  const priceChangePct = currentPrice != null && prevPrice != null && prevPrice !== 0
    ? ((currentPrice - prevPrice) / prevPrice) * 100
    : null;

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/coal/csv', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load CSV');
      const items: Item[] = await res.json();
      const curRes = await fetch('/api/coal', { cache: 'no-store' });
      let currentAppend: Item | null = null;
      if (curRes.ok) {
        const cur = await curRes.json();
        if (typeof cur?.price === 'number' && Number.isFinite(cur.price)) {
          const d = cur?.time ? new Date(cur.time) : new Date();
          const monthLabel = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
          currentAppend = { month: monthLabel, price: cur.price };
        }
      }
      const base = currentAppend ? [...items, currentAppend] : items;
      const labels = base.map((x) => x.month);
      const prices = base.map((x) => x.price);
      const window = 30;
      const ma: number[] = prices.map((_, idx) => {
        const start = Math.max(0, idx - (window - 1));
        const slice = prices.slice(start, idx + 1);
        const sum = slice.reduce((a, b) => a + b, 0);
        return sum / slice.length;
      });
      const data: Point[] = labels.map((label, i) => ({ label, price: prices[i], ma30: ma[i] }));
      setPoints(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener('coal-price-updated', handler);
    return () => {
      window.removeEventListener('coal-price-updated', handler);
    };
  }, []);

  const config = useMemo(() => ({
    price: { label: 'Price', color: 'hsl(var(--chart-1))' },
  }), []);

  return (
    <div className={className}>
      <Card className="border-none shadow-lg mb-4">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div>
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-2xl font-bold">{currentPrice != null ? currentPrice.toFixed(2) : '—'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">30-Day Moving Average</div>
              <div className="text-2xl font-bold">{currentMA != null ? currentMA.toFixed(2) : '—'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Price Change % (vs prev)</div>
              <div className={`text-xl font-semibold ${priceChangePct == null ? 'text-muted-foreground' : priceChangePct >= 0 ? 'text-green-600' : 'text-red-600'}`}>{priceChangePct == null ? '—' : `${priceChangePct >= 0 ? '+' : ''}${priceChangePct.toFixed(2)}%`}</div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-3 py-2 rounded-md border border-border hover:bg-muted/50"
                onClick={() => { setRefreshing(true); loadData(); }}
              >
                {refreshing ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChartContainer config={config} className="w-full">
        <ResponsiveContainer>
          <LineChart data={points} margin={{ left: 16, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="price" stroke="var(--color-price, #000)" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {loading && !points.length && (
        <div className="mt-2 text-muted-foreground">Loading…</div>
      )}
      {error && (
        <div className="mt-2 text-destructive">{error}</div>
      )}
    </div>
  );
}
