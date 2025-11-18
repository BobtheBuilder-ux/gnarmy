import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import CoalChart from '@/components/CoalChart';

describe('CoalChart', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renders loading state initially', async () => {
    (fetch as any).mockResolvedValue({ ok: true, json: async () => ({ price: 0, time: new Date().toISOString() }) });
    await act(async () => {
      render(<CoalChart />);
    });
    expect(screen.getByText(/loading/i)).toBeTruthy();
  });

  it('displays current price after successful fetch', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'Coal', price: 98.1234, time: new Date().toISOString() }),
    });
    
    await act(async () => {
      render(<CoalChart />);
    });
    // Fast-forward any timers if used
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    
    expect(screen.getByText(/current price/i)).toBeTruthy();
    expect(screen.getByText(/98\.12/)).toBeTruthy();
  });

  it('handles API error gracefully', async () => {
    (fetch as any).mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' });
    await act(async () => {
      render(<CoalChart />);
    });
    expect(screen.getByText(/api error/i)).toBeTruthy();
  });
});