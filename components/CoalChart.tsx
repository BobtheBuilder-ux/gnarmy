"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChartConfiguration, Chart as ChartJS } from "chart.js";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type CommodityDataPoint = {
  time: Date;
  price: number;
};

type CoalChartProps = {
  title?: string;
  refreshIntervalMs?: number;
  className?: string;
};

/**
 * CoalChart renders a responsive, live-updating line chart of Coal commodity prices.
 *
 * Props:
 * - title: Optional title displayed above the chart.
 * - refreshIntervalMs: Interval in milliseconds for auto-refresh; defaults to 60000.
 * - className: Optional container className for layout customizations.
 */
export function CoalChart({
  title = "Coal Price (Live)",
  refreshIntervalMs = 60000,
  className,
}: CoalChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);
  const [dataPoints, setDataPoints] = useState<CommodityDataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [percentChange, setPercentChange] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = useMemo(
    () => new Intl.NumberFormat(undefined, { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    []
  );
  // Helper to ensure we only ever pass a number to the formatter
  const formatNumber = (value: number): string => formatPrice.format(value);

  const fetchCoalPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/coal", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      if (json?.error) {
        throw new Error(String(json.error));
      }
      const price: number = Number(json?.price ?? NaN);
      if (!Number.isFinite(price)) {
        throw new Error("Invalid price value for Coal commodity");
      }
      const now = json?.time ? new Date(json.time) : new Date();
      setCurrentPrice(price);
      setLastUpdated(now);
      setDataPoints((prev) => {
        const next = [...prev, { time: now, price }];
        if (next.length >= 2) {
          const prevPrice = next[next.length - 2]?.price;
          if (Number.isFinite(prevPrice)) {
            const pct = ((price - prevPrice) / prevPrice) * 100;
            setPercentChange(pct);
          } else {
            setPercentChange(null);
          }
        } else {
          setPercentChange(null);
        }
        return next.slice(-60); // keep last 60 points (~1 hour at 60s)
      });
    } catch (err: any) {
      setError(err?.message ?? "Failed to load coal price");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize chart once
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || chartRef.current) return;

    const lineColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();
    const primaryHsl = lineColor ? `hsl(${lineColor})` : "#2563eb"; // fallback

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Coal Price",
            data: [],
            borderColor: primaryHsl,
            backgroundColor: primaryHsl,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const y = Number((ctx as any)?.parsed?.y ?? NaN);
                return Number.isFinite(y) ? `Price: ${formatNumber(y)}` : "Price: —";
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue("--foreground")
                ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()})`
                : undefined,
            },
          },
          y: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue("--foreground")
                ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()})`
                : undefined,
            },
            beginAtZero: false,
          },
        },
      },
    };

    chartRef.current = new Chart(ctx, config);
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [formatPrice]);

  // Update chart when data points change
  useEffect(() => {
    if (!chartRef.current) return;
    const labels = dataPoints.map((p) => p.time.toLocaleTimeString());
    const values = dataPoints.map((p) => p.price);
    chartRef.current.data.labels = labels as any;
    chartRef.current.data.datasets[0].data = values as any;
    chartRef.current.update("active");
  }, [dataPoints]);

  // Fetch initial and set auto-refresh
  useEffect(() => {
    fetchCoalPrice();
    const id = setInterval(fetchCoalPrice, refreshIntervalMs);
    return () => clearInterval(id);
  }, [fetchCoalPrice, refreshIntervalMs]);

  const pctColorClass = percentChange == null ? "text-muted-foreground" : percentChange >= 0 ? "text-green-600" : "text-red-600";

  return (
    <section aria-labelledby="coal-chart-title" className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 id="coal-chart-title" className="text-xl md:text-2xl font-semibold">
          {title}
        </h3>
        <button
          type="button"
          onClick={fetchCoalPrice}
          className="px-3 py-2 rounded-md border border-border hover:bg-muted/50"
          aria-label="Refresh coal price"
        >
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-4">
        <div className="md:col-span-1">
          <div className="text-sm text-muted-foreground">Current Price</div>
          <div className="text-2xl font-bold">
            {typeof currentPrice === 'number' && Number.isFinite(currentPrice) ? formatNumber(currentPrice) : "—"}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="text-sm text-muted-foreground">Change (vs previous)</div>
          <div className={`text-xl font-semibold ${pctColorClass}`}>
            {percentChange == null ? "—" : `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="text-sm">{lastUpdated ? lastUpdated.toLocaleString() : "—"}</div>
        </div>
      </div>

      <div className="relative w-full h-[260px] md:h-[340px] rounded-lg border border-border bg-card" role="img" aria-label="Coal price line chart">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive font-medium">
            {error}
          </div>
        )}
        {loading && !currentPrice && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Loading…</div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          aria-hidden={!!error}
          role="presentation"
        ></canvas>
      </div>
    </section>
  );
}

CoalChart.propTypes = {
  title: PropTypes.string,
  refreshIntervalMs: PropTypes.number,
  className: PropTypes.string,
};

export default CoalChart;