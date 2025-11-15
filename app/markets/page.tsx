'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function MarketsPage() {
  const regions = [
    {
      name: 'Europe',
      countries: [
        { name: 'Germany', products: 'Coal, Biomass, Agricultural Products' },
        { name: 'Netherlands', products: 'Biomass, Palm Kernel Shell, Cocoa' },
        { name: 'Poland', products: 'Coal, Biomass Materials' },
        { name: 'Belgium', products: 'Agricultural Commodities' },
        { name: 'Spain', products: 'Biomass, Sesame Seeds' },
      ],
    },
    {
      name: 'Middle East',
      countries: [
        { name: 'United Arab Emirates', products: 'Coal, Agricultural Products, Minerals' },
        { name: 'Qatar', products: 'Biomass, Agricultural Commodities' },
        { name: 'Saudi Arabia', products: 'Agricultural Products' },
        { name: 'Oman', products: 'Minerals, Biomass' },
      ],
    },
    {
      name: 'Asia',
      countries: [
        { name: 'India', products: 'Coal, Palm Kernel Shell, Rice Husk' },
        { name: 'China', products: 'Minerals, Agricultural Products, Biomass' },
        { name: 'South Korea', products: 'Biomass, Coal' },
        { name: 'Vietnam', products: 'Agricultural Commodities' },
        { name: 'Indonesia', products: 'Minerals' },
      ],
    },
    {
      name: 'Africa',
      countries: [
        { name: 'Ghana', products: 'Agricultural Products, Minerals' },
        { name: 'Kenya', products: 'Biomass, Agricultural Commodities' },
        { name: 'Egypt', products: 'Agricultural Products' },
        { name: 'South Africa', products: 'Minerals, Agricultural Products' },
      ],
    },
  ];

  return (
    <>
      <Hero
        title="Global Markets & Destinations"
        subtitle="Serving clients across four continents with reliable supply chains and verified export capabilities."
        backgroundImage="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Where We Export</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Established trade relationships and logistics networks spanning 15+ countries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    {region.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {region.countries.map((country, idx) => (
                      <div key={idx} className="pb-4 border-b last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-semibold">{country.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{country.products}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Export Capabilities</h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Export Destinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">4</div>
                    <div className="text-sm text-muted-foreground">Continents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Delivery Success</div>
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t">
                  <h3 className="font-semibold text-lg mb-4">Logistics Infrastructure</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Port operations via Onne Wharf (Rivers State) with direct container access</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Strategic warehousing facilities near major export ports</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Partnerships with international freight forwarders and shipping lines</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Container stuffing, fumigation, and securing services</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Marine insurance and cargo tracking for all shipments</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
