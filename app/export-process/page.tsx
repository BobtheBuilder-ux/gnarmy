'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MessageSquare, FileText, CreditCard, Settings, FileCheck, Ship } from 'lucide-react';

export default function ExportProcessPage() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Inquiry',
      description: 'Contact us with your product requirements, specifications, destination, and desired delivery timeline.',
    },
    {
      icon: FileText,
      title: 'Quotation',
      description: 'Receive detailed quotation including product specs, pricing, payment terms, and delivery schedule.',
    },
    {
      icon: CreditCard,
      title: 'Payment',
      description: 'Agree on payment terms (LC/DLC/SBLC) and complete initial deposit or open letter of credit.',
    },
    {
      icon: Settings,
      title: 'Processing',
      description: 'Product is sourced, processed, graded, and prepared for export according to specifications.',
    },
    {
      icon: FileCheck,
      title: 'Documentation',
      description: 'Pre-shipment inspection by SGS/BV, export permits, certificates, and shipping documents prepared.',
    },
    {
      icon: Ship,
      title: 'Delivery',
      description: 'Goods loaded, shipped to destination port, and all documents transferred for customs clearance.',
    },
  ];

  return (
    <>
      <Hero
        title="Export Process"
        subtitle="A transparent, step-by-step journey from your inquiry to successful delivery at your destination port."
        backgroundImage="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six clear steps ensuring quality, compliance, and timely delivery
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}>
                  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-primary mb-2">Step {index + 1}</div>
                          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary border-4 border-white shadow-lg items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Payment Terms</h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Accepted Payment Methods</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>LC (Letter of Credit):</strong> Irrevocable, confirmed letter of credit from reputable international bank</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>DLC (Documentary Letter of Credit):</strong> Documentary collection with payment against shipping documents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>SBLC (Standby Letter of Credit):</strong> Standby credit for established business relationships</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-semibold mb-3">Third-Party Inspection</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      All shipments undergo mandatory pre-shipment inspection by SGS (Société Générale de Surveillance) or Bureau Veritas. Independent inspection reports confirm product quality, quantity, and compliance with contract specifications before loading.
                    </p>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-xl font-semibold mb-3">Typical Timeline</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      From confirmed order to shipment: 15-30 days depending on product type and quantity. Transit time varies by destination (Europe: 18-25 days, Asia: 20-30 days, Middle East: 10-15 days).
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
