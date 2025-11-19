'use client';

import dynamic from 'next/dynamic';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Mountain, Wheat, Leaf, Settings, Truck, Award } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ServicesPage() {
  const CoalChart = dynamic(() => import('@/components/CoalChart'), { ssr: false });
  const services = [
    {
      id: 'mining',
      icon: Mountain,
      title: 'Mining & Minerals',
      description: 'Professional coal extraction and mineral processing with verified quality standards',
      overview: `Energy: Coal Trading & Power Generation

We are actively involved in the energy sector with a dual focus:
• Coal Trading: Developing a major trading operation to supply coal resources.
• Power Generation: Using both coal and biomass to generate electricity, aiming to mitigate power shortages in much of Africa.

Coal Trading
• Market Positioning:
  o Aim to become a leading coal trading company in Africa.
  o Establish trade relationships with India, South Korea, Vietnam, China, and the USA.
• Electricity Generation:
  o Address electricity shortages in Africa by promoting coal as a viable energy source.

Power Generation
• Coal and Biomass:
  o Develop power generation solutions that utilize both coal and biomass.
  o Focus on sustainable practices to ensure that energy production supports environmental goals.`,
      features: [
        'Coal Operations (Steam & Coking Coal)',
        'High-Grade Specifications',
        'Monthly Capacity: Up to 10,000 MT',
        'Crushing & Screening Services',
        'Quality Testing & Certification',
      ],
    },
    {
      id: 'agriculture',
      icon: Wheat,
      title: 'Agriculture & Commodities',
      description: 'Premium agricultural products sourced from verified farms across Nigeria',
      overview: `Agriculture: Value Chain Development

Our goal is to build and develop the complete agro value chain in Nigeria and Africa.
• Cassava Byproducts: We are focused on creating major pathways to utilize cassava byproducts.
• Protein Sourcing: We aim to leverage Nigeria's annual production of over 3 million tons of cassava leaves as a source of raw protein for cross-border markets.

Agriculture Value Chain Development
• Focus on Cassava:
  o Utilize cassava by-products to enhance trade across borders.
  o Leverage Nigeria's production of over 3 million tons of cassava leaves annually, aiming to transform these into valuable raw protein sources.`,
      features: [
        'Rice Husk & Rice Husk Ash',
        'Cassava Leaf Protein',
        'Sesame Seeds (White & Mixed)',
        'Ginger (Split & Whole)',
        'Cocoa Beans',
        'Quality Grading & Sorting',
      ],
    },
    {
      id: 'biomass',
      icon: Leaf,
      title: 'Biomass & Bio-based Materials',
      description: 'Sustainable energy materials supporting global renewable initiatives',
      features: [
        'Palm Kernel Shell (PKS)',
        'Coconut Shell Charcoal',
        'Biochar Production',
        'Rice Husk Ash (High Silica)',
        'Renewable Energy Applications',
        'Carbon Credit Eligible',
      ],
    },
    {
      id: 'processing',
      icon: Settings,
      title: 'Processing & Value Addition',
      description: 'Comprehensive processing services ensuring international quality standards',
      features: [
        'Crushing & Grading',
        'Moisture Control',
        'Packaging Solutions',
        'Contamination Testing',
        'Size Classification',
        'Custom Processing',
      ],
    },
    {
      id: 'logistics',
      icon: Truck,
      title: 'Logistics & Export Solutions',
      description: 'End-to-end export management from warehouse to destination port',
      features: [
        'Customs Clearance',
        'Pre-shipment Inspection (SGS/BV)',
        'Freight Forwarding',
        'Marine Insurance',
        'Container Stuffing',
        'Documentation Support',
      ],
    },
    {
      id: 'quality',
      icon: Award,
      title: 'Quality & Compliance',
      description: 'Rigorous certification and compliance ensuring global market acceptance',
      features: [
        'SGS Certification',
        'Bureau Veritas Inspection',
        'ISO Standards Compliance',
        'NEPC Export Permits',
        'Phytosanitary Certificates',
        'Certificate of Origin',
      ],
    },
  ];

  const coreBusinessAreas = [
    {
      id: 'financial-inclusion',
      title: 'Financial Inclusion',
      content: `We are dedicated to providing financial services to underserved populations.
• Target: Reaching the unbanked through accessible financial systems.
• Services:
  o Micro and online financial systems.
  o Provision of soft loans.
• Social Impact: A key focus on education, as well as youth inclusion in both agriculture and finance.

Financial Inclusion:
• Implement microfinance solutions to support the unbanked population.
• Offer soft loans and educational resources to empower youth in agriculture and financial management.`,
    },
    {
      id: 'international-trade',
      title: 'International Trade',
      content: `We are strategically positioned to create a major trade hub.
• Key Partners: Our objective is to link Nigeria with major economies, including India, South Korea, Vietnam, China, and the USA, facilitating trade in our core sectors.`,
    },
  ];

  return (
    <>
      <Hero
        title="Comprehensive Export Services"
        subtitle="From extraction to export, we provide integrated solutions across mining, agriculture, biomass, and international trade."
        backgroundImage="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Offerings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vertically integrated capabilities delivering quality, compliance, and reliability
          </p>
        </motion.div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                      <p className="text-muted-foreground text-lg">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {service.overview && (
                    <div className="mb-6 p-6 bg-muted/30 rounded-lg">
                      <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {service.overview}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Live Coal Price for Mining Section */}
      <Section id="mining-price" className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Mining Market Update</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Live coal price tracking aligned with our mining operations.
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <div>
            <ErrorBoundary>
              <CoalChart title="Coal Price (Live)" />
            </ErrorBoundary>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Business Areas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expanding our reach through financial inclusion and international trade partnerships
          </p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {coreBusinessAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">{area.title}</h3>
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {area.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Payment & Inspection Terms</h2>
          <div className="space-y-6 text-lg text-white/90 leading-relaxed">
            <p>
              We accept LC (Letter of Credit), DLC (Documentary Letter of Credit), and SBLC (Standby Letter of Credit) payment terms for secure international transactions.
            </p>
            <p>
              All shipments undergo third-party inspection by SGS or Bureau Veritas prior to loading, ensuring quality compliance and client confidence.
            </p>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
