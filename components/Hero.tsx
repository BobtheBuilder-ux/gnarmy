'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundPoster?: string;
  videoAriaLabel?: string; // if not provided, treated as decorative
  height?: string;
}

export function Hero({
  title,
  subtitle,
  children,
  backgroundImage,
  backgroundVideo,
  backgroundPoster,
  videoAriaLabel,
  height = 'min-h-[600px]'
}: HeroProps) {
  const hasBackground = Boolean(backgroundImage || backgroundVideo);
  const isDecorative = !videoAriaLabel;
  return (
    <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {backgroundVideo && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          poster={backgroundPoster}
          title={videoAriaLabel || 'Background video'}
          aria-hidden={isDecorative}
        />
      )}

      {hasBackground && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      )}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${hasBackground ? 'text-white' : 'text-foreground'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${hasBackground ? 'text-white/90' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
