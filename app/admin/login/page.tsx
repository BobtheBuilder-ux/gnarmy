"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !password) {
      toast.error('Enter username and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      toast.success('Logged in');
      router.push('/admin/coal');
    } catch (e) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <div className="max-w-md mx-auto">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button onClick={submit} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
