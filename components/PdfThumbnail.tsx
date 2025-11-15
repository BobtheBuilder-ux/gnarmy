'use client';

import { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: string;
  title: string;
  description: string;
  category: string;
  onView: () => void;
  index: number;
}

export function PdfThumbnail({
  file,
  title,
  description,
  category,
  onView,
  index,
}: PdfThumbnailProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      isEvalSupported: false,
    }),
    [],
  );

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
        <div className="relative h-64 bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center">
                  <FileText className="w-16 h-16 text-primary/30" />
                </div>
              }
              error={
                <div className="flex items-center justify-center">
                  <FileText className="w-16 h-16 text-primary/30" />
                </div>
              }
              options={documentOptions}
            >
              <Page
                pageNumber={1}
                width={300}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </Document>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
          {numPages > 0 && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                {numPages} {numPages === 1 ? 'page' : 'pages'}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          <Button onClick={onView} className="w-full" variant="default">
            <FileText className="w-4 h-4 mr-2" />
            View Full Document
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
