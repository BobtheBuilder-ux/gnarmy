'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';

interface Video {
  id: string;
  title: string;
  description: string;
  path: string;
  thumbnail: string;
  // optional poster image for the embedded player; falls back to thumbnail
  poster?: string;
  duration: string;
}

interface VideoGalleryProps {
  videos: Video[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative h-56 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/60 backdrop-blur-sm border-none text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title}
      >
        {selectedVideo && (
          <div className="w-full">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <video
                src={selectedVideo.path}
                controls
                controlsList="nodownload"
                className="w-full h-full"
                autoPlay
                preload="metadata"
                poster={selectedVideo.poster || selectedVideo.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-muted-foreground">{selectedVideo.description}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
