'use client';

import { useEffect, useMemo, useState } from 'react';
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
  const [availableDocs, setAvailableDocs] = useState<Document[]>([]);
  const [docsLoading, setDocsLoading] = useState<boolean>(true);

  // Filter to only PDFs that actually exist in /public/documents
  useEffect(() => {
    let cancelled = false;
    const checkAvailability = async () => {
      setDocsLoading(true);
      try {
        const checks = await Promise.all(
          documentsData.map(async (doc) => {
            try {
              const res = await fetch(doc.path, { method: 'HEAD' });
              return res.ok ? doc : null;
            } catch {
              return null;
            }
          })
        );
        if (!cancelled) {
          setAvailableDocs(checks.filter(Boolean) as Document[]);
        }
      } finally {
        if (!cancelled) setDocsLoading(false);
      }
    };
    checkAvailability();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero
        title="Document Center"
        subtitle="Access our comprehensive library of corporate documents, technical specifications, and operational videos."
        backgroundImage="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

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

        {docsLoading ? (
          <div className="text-center text-muted-foreground">Loading available documents…</div>
        ) : availableDocs.length === 0 ? (
          <div className="text-center text-muted-foreground">No documents available at the moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableDocs.map((doc, index) => (
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
        )}
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
