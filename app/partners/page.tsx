'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function PartnersPage() {
  const partners = [
    {
      name: 'SGS Nigeria Limited',
      logo: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
      website: 'https://www.sgs.com',
      description: 'SGS is the world\'s leading testing, inspection, and certification company. We\'ve partnered with SGS since 2020 to ensure all our export products meet international quality standards through rigorous pre-shipment inspections.',
      partnership: 'Our collaboration with SGS provides clients with independent verification of product quality, quantity, and compliance, building trust and facilitating smooth international trade transactions.',
    },
    {
      name: 'Nigerian Export Promotion Council (NEPC)',
      logo: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800',
      website: '#',
      description: 'The Nigerian Export Promotion Council is the apex government agency mandated to promote and develop Nigeria\'s non-oil export sector. As registered exporters since 2019, we work closely with NEPC to maintain full regulatory compliance.',
      partnership: 'This strategic partnership ensures we remain current with export regulations, benefit from trade facilitation programs, and contribute to Nigeria\'s economic diversification goals through legitimate export activities.',
    },
    {
      name: 'Onne Port Complex',
      logo: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
      website: '#',
      description: 'Onne Port is one of Nigeria\'s largest and most modern seaport facilities located in Rivers State. We\'ve maintained operational agreements since 2019, utilizing their container terminal and cargo handling infrastructure for all our export shipments.',
      partnership: 'Our long-standing relationship with Onne Port provides us with dedicated warehouse space, priority container stuffing facilities, and streamlined customs clearance, ensuring timely and secure export operations for our clients.',
    },
  ];

  return (
    <>
      <Hero
        title="Our Strategic Partners"
        subtitle="Building excellence through trusted collaborations with industry-leading organizations."
        backgroundImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our success is built on strong partnerships with world-class organizations that share our commitment to quality,
            compliance, and operational excellence. These strategic relationships enable us to deliver verified products,
            maintain international standards, and provide seamless export services to clients across the globe.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <a
                    href={partner.website}
                    target={partner.website !== '#' ? '_blank' : '_self'}
                    rel={partner.website !== '#' ? 'noopener noreferrer' : ''}
                    className="block"
                  >
                    <div className="relative h-56 overflow-hidden rounded-t-lg bg-muted">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {partner.website !== '#' && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                  </a>

                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-4">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {partner.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {partner.partnership}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Partnership Benefits</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  These strategic partnerships enable us to maintain the highest standards of quality, compliance, and
                  operational efficiency throughout our supply chain.
                </p>
                <p>
                  By collaborating with industry leaders in inspection, regulation, and logistics, we provide our clients
                  with confidence in product quality, regulatory compliance, and timely delivery.
                </p>
                <p className="text-foreground font-semibold pt-4">
                  Every partnership is built on shared values of integrity, transparency, and commitment to excellence.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </>
  );
}
