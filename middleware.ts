import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('session')?.value || '';
    const secret = process.env.AUTH_SECRET || 'dev-secret';
    const session = token ? await verifySession(token, secret) : null;
    if (!session && url.pathname !== '/admin/login') {
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
