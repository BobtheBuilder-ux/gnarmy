import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  title: 'Gnarmy Coal Trade and Consultancy Ltd | Mining, Agriculture & Export Excellence',
  description: 'Indigenous Nigerian company specializing in mining, agriculture, biomass, and international trade. Powering industries, feeding nations, exporting excellence.',
  keywords: 'mining, agriculture, biomass, export, Nigeria, coal, rice husk, international trade',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Gnarmy Coal Trade and Consultancy Ltd',
    description: 'Powering Industries. Feeding Nations. Exporting Excellence.',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
