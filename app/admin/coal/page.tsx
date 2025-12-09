"use client";

import { useEffect, useState } from 'react';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

type HistoryItem = { id?: string; price: number; time: string; user: string };

export default function CoalAdminPage() {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/coal', { cache: 'no-store' });
      const json = await res.json();
      setCurrentPrice(typeof json?.price === 'number' ? json.price : null);
      setLastUpdated(json?.time || null);
      setEditPrice(json?.price != null ? String(json.price) : '');
    } catch {}
    try {
      const hist = await fetch('/api/coal/history', { cache: 'no-store' });
      const items = await hist.json();
      setHistory(items);
    } catch {}
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const num = Number(editPrice);
    if (!Number.isFinite(num) || num <= 0) {
      toast.error('Enter a valid positive price');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/coal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: num }),
      });
      if (!res.ok) throw new Error('Save failed');
      const json = await res.json();
      setCurrentPrice(json.price);
      setLastUpdated(json.time);
      toast.success('Price updated');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('coal-price-updated'));
      }
      const hist = await fetch('/api/coal/history', { cache: 'no-store' });
      const items = await hist.json();
      setHistory(items);
    } catch (e) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const del = async () => {
    setDeleting(true);
    try {
      const res = await fetch('/api/coal', { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setCurrentPrice(null);
      setLastUpdated(null);
      setEditPrice('');
      toast.success('Price deleted');
      const hist = await fetch('/api/coal/history', { cache: 'no-store' });
      const items = await hist.json();
      setHistory(items);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('coal-price-updated'));
      }
    } catch (e) {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Section>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Coal Price Dashboard</h1>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground">Current Price</div>
                <div className="text-2xl font-bold">{currentPrice != null ? currentPrice.toFixed(2) : '—'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-sm">{lastUpdated || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Edit Price</div>
                <Input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} aria-label="Edit coal price" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={save} disabled={saving}>Save</Button>
              <Button variant="outline" onClick={load}>Refresh</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={deleting}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete current price?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear the current coal price value.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={del}>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Change History</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">User</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice().reverse().map((h, i) => (
                    <tr key={h.id || i} className="border-b">
                      <td className="p-2">{new Date(h.time).toLocaleString()}</td>
                      <td className="p-2">{h.user}</td>
                      <td className="p-2">{h.price.toFixed(2)}</td>
                      <td className="p-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This removes the selected history record.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={async () => {
                                try {
                                  const res = await fetch('/api/coal/history', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: h.id, time: h.time }),
                                  });
                                  if (!res.ok) throw new Error('Delete failed');
                                  const hist = await fetch('/api/coal/history', { cache: 'no-store' });
                                  const items = await hist.json();
                                  setHistory(items);
                                  toast.success('History entry deleted');
                                } catch (e) {
                                  toast.error('Failed to delete entry');
                                }
                              }}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
