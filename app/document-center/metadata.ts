import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const ogImage = 'https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1280&h=720';

export const metadata: Metadata = {
  title: 'Document Center | Gnarmy Coal Trade and Consultancy Ltd',
  description:
    'Access our library of corporate documents and operational videos. View-only PDFs and embedded MP4s served from public assets.',
  openGraph: {
    title: 'Document Center | Gnarmy Coal Trade and Consultancy Ltd',
    description:
      'Explore our videos and documents showcasing operations, compliance, and export excellence.',
    type: 'website',
    url: `${siteUrl}/document-center`,
    images: [
      {
        url: ogImage,
        width: 1280,
        height: 720,
        alt: 'Gnarmy Document Center - Video and PDF library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Document Center | Gnarmy Coal Trade and Consultancy Ltd',
    description:
      'Explore our videos and documents showcasing operations, compliance, and export excellence.',
    images: [ogImage],
  },
};