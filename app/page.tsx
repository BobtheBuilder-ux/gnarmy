'use client';

import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { FeatureCard } from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Building2,
  Globe,
  Leaf,
  Ship,
  Shield,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const highlights = [
    {
      icon: Building2,
      title: '100% Indigenous Ownership',
      description: 'Proudly Nigerian-owned and operated from our headquarters in Abuja.',
    },
    {
      icon: Globe,
      title: 'Multi-State Operations',
      description: 'Extensive operations across mining, agriculture, and biomass sectors.',
    },
    {
      icon: Leaf,
      title: 'Bio-based Material Production',
      description: 'Sustainable production of biomass and bio-based materials for global markets.',
    },
    {
      icon: Ship,
      title: 'Port Operations via Onne Wharf',
      description: 'Streamlined export logistics through verified port facilities.',
    },
    {
      icon: Shield,
      title: 'Verified Supply Chain',
      description: 'SGS and BV certified operations with complete traceability.',
    },
    {
      icon: Award,
      title: 'Government Partnerships',
      description: 'Strategic collaborations ensuring regulatory compliance and excellence.',
    },
  ];

  const stats = [
    { value: '10+', label: 'Product Categories' },
    { value: '15+', label: 'Export Destinations' },
    { value: '100%', label: 'Quality Compliance' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <>
      <Hero
        title="Powering Industries. Feeding Nations. Exporting Excellence."
        subtitle="Gnarmy Coal Trade and Consultancy Ltd is an indigenous Nigerian company operating across Mining, Agriculture, Biomass, and International Trade with verified supply chains and global partnerships."
        backgroundVideo="/video1.mp4"
        backgroundPoster="/photo1.jpeg"
        videoAriaLabel="Corporate overview background video"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/services">Explore Our Operations</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white hover:bg-white/90" asChild>
            <Link href="/contact">Partner With Us</Link>
          </Button>
        </div>
      </Hero>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Gnarmy</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on integrity, driven by excellence, and committed to sustainable growth across Africa and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <FeatureCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Trusted Partner in Resource Development & Export
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              From extraction to export, we deliver end-to-end solutions with verified quality, transparent processes, and global compliance standards.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our integrated approach combines resource development, value addition, and export excellence to serve clients across Europe, Asia, Middle East, and Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Live Coal Price Section */}
      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Market Snapshot</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live coal commodity pricing to support informed decisions.
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          {/* ErrorBoundary wraps chart for robustness */}
          <div>
            {/* Import locally to avoid SSR issues */}
            {(() => {
              const CoalChart = require('@/components/CoalChart').default;
              const ErrorBoundary = require('@/components/ErrorBoundary').default;
              return (
                <ErrorBoundary>
                  <CoalChart title="Coal Price (Live)" />
                </ErrorBoundary>
              );
            })()}
          </div>
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Export Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Connect with our team to discuss your requirements, request samples, or learn more about our verified supply chain and export capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/export-process">Export Process</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Business Pillars</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three core focus areas driving sustainable growth and export excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: 'Resource Development',
              description: 'Mining operations, agricultural cultivation, and biomass collection with sustainable practices.',
            },
            {
              icon: Users,
              title: 'Value Addition',
              description: 'Processing, grading, packaging, and quality assurance meeting international standards.',
            },
            {
              icon: Globe,
              title: 'Export Excellence',
              description: 'Seamless logistics, documentation, compliance, and delivery to global destinations.',
            },
          ].map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                    <pillar.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
