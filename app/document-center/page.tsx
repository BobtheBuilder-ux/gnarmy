'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Modal } from '@/components/Modal';
import { motion } from 'framer-motion';
import documentsData from '@/data/documents.json';
import videosData from '@/data/videos.json';

const PdfThumbnail = dynamic(() => import('@/components/PdfThumbnail').then(mod => ({ default: mod.PdfThumbnail })), { ssr: false });
const PdfViewer = dynamic(() => import('@/components/PdfViewer').then(mod => ({ default: mod.PdfViewer })), { ssr: false });
const VideoGallery = dynamic(() => import('@/components/VideoGallery').then(mod => ({ default: mod.VideoGallery })), { ssr: false });

interface Document {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
}

export default function DocumentCenterPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <>
      <Hero
        title="Document Center"
        subtitle="Access our comprehensive library of corporate documents, technical specifications, and operational videos."
        backgroundImage="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Backend Requirements</h2>
            <p className="text-muted-foreground">
              This site runs as a static Next.js export with no active backend services. All documents and videos are served from the <code>/public</code> folder.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>No Supabase, REST API, or server routes are used.</li>
              <li>External resources: PDF worker/CMaps/fonts from <code>unpkg.com</code>.</li>
              <li>Set <code>NEXT_PUBLIC_SITE_URL</code> for correct Open Graph metadata.</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">System Architecture</h2>
            <p className="text-muted-foreground">
              Client-side rendering for PDFs and videos, static pages, and CDN-hosted PDF assets.
            </p>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <pre className="text-xs leading-relaxed overflow-auto">
{`[Browser]
   └─ Next.js (static pages)
       ├─ /public/documents/*.pdf → react-pdf (client-only)
       ├─ /public/videos/*.mp4 → HTML5 video
       └─ PDF worker/CMaps/fonts → unpkg CDN
`}
              </pre>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Company Videos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our operations, facilities, and processes through comprehensive video documentation
          </p>
        </motion.div>

        <VideoGallery videos={videosData} />
      </Section>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">PDF Documents</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of company documents, reports, and technical specifications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentsData.map((doc, index) => (
            <PdfThumbnail
              key={doc.id}
              file={doc.path}
              title={doc.title}
              description={doc.description}
              category={doc.category}
              onView={() => setSelectedDocument(doc)}
              index={index}
            />
          ))}
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Document Access Notice</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All documents and videos in the Document Center are proprietary materials of Gnarmy Coal Trade and Consultancy Ltd. They are provided for viewing purposes only and are protected by copyright.
            </p>
            <p className="text-sm text-muted-foreground">
              For additional documents, technical specifications, or partnership inquiries, please contact our team directly.
            </p>
            <div className="mt-6 text-left">
              <h4 className="font-semibold mb-2">Setup & Configuration</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Place PDFs in <code>/public/documents</code> and MP4s in <code>/public/videos</code>.</li>
                <li>Ensure filenames in <code>/data/documents.json</code> and <code>/data/videos.json</code> match exactly.</li>
                <li>Set <code>NEXT_PUBLIC_SITE_URL</code> in environment for correct social previews.</li>
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Troubleshooting Connectivity</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>404 for PDFs/videos: verify file exists and path matches data JSON.</li>
                <li>PDF viewer error: pin <code>pdfjs-dist</code> to v3.x and use client-only rendering.</li>
                <li>CDN blocked: host worker/CMaps/fonts locally or allowlist <code>unpkg.com</code>.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Section>

      <Modal
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        title={selectedDocument?.title}
      >
        {selectedDocument && (
          <div className="h-[70vh]">
            <PdfViewer file={selectedDocument.path} />
          </div>
        )}
      </Modal>
    </>
  );
}
