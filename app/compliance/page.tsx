'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Scale, Award } from 'lucide-react';

export default function CompliancePage() {
  const registrations = [
    { name: 'Corporate Affairs Commission (CAC)', status: 'Registered', doc: 'RC Number: Available on Request' },
    { name: 'Companies and Allied Matters Act (CAMA)', status: 'Compliant', doc: 'Certificate of Incorporation' },
    { name: 'Nigerian Export Promotion Council (NEPC)', status: 'Approved Exporter', doc: 'Export Permit' },
    { name: 'Federal Inland Revenue Service (FIRS)', status: 'Registered', doc: 'Tax Identification Number (TIN)' },
    { name: 'Ministry of Mines and Steel Development', status: 'Licensed', doc: 'Mining License' },
    { name: 'Environmental Impact Assessment', status: 'Approved', doc: 'EIA Certificate' },
  ];

  return (
    <>
      <Hero
        title="Legal & Compliance"
        subtitle="Full regulatory compliance, transparent operations, and verified certifications ensuring trust and reliability."
        backgroundImage="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Corporate Registration & Licenses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fully registered and compliant with all Nigerian regulatory requirements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4" variant="secondary">{reg.status}</Badge>
                  <h3 className="font-semibold mb-2">{reg.name}</h3>
                  <p className="text-sm text-muted-foreground">{reg.doc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quality Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              International quality standards and third-party verification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Award,
                title: 'SGS Certification',
                description: 'Pre-shipment inspection and quality certification by SGS (Société Générale de Surveillance) ensuring products meet international standards.',
              },
              {
                icon: FileCheck,
                title: 'Bureau Veritas Inspection',
                description: 'Independent third-party inspection and verification services confirming quality, quantity, and compliance.',
              },
              {
                icon: Scale,
                title: 'ISO Standards',
                description: 'Commitment to ISO quality management systems for consistent product quality and operational excellence.',
              },
              {
                icon: Shield,
                title: 'Export Documentation',
                description: 'Complete export documentation including Certificate of Origin, Phytosanitary Certificates, and Bill of Lading.',
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <cert.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{cert.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="ethics"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Ethics & Compliance Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Gnarmy Coal Trade and Consultancy Ltd operates with unwavering commitment to ethical business practices, legal compliance, and corporate responsibility.
                </p>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Anti-Bribery & Anti-Corruption</h4>
                  <p>We maintain zero tolerance for bribery, corruption, or any form of unethical conduct. All employees and partners must comply with applicable anti-corruption laws including the Nigerian Corrupt Practices Act.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Trade Compliance</h4>
                  <p>We adhere to all international trade regulations, export controls, and sanctions. All transactions undergo compliance screening to ensure legal and ethical standards.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Environmental Responsibility</h4>
                  <p>Our operations prioritize environmental protection, sustainable resource extraction, and community benefit. We comply with all environmental regulations and conduct regular impact assessments.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="terms"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Terms of Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>By engaging with Gnarmy Coal Trade and Consultancy Ltd, you agree to conduct business in accordance with these terms:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>All product specifications, pricing, and terms are subject to written confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Payment terms must be agreed in writing before order processing begins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Quality complaints must be filed within 14 days of cargo arrival with supporting documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Force majeure events may affect delivery timelines and will be communicated promptly</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="privacy"
          >
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Gnarmy Coal Trade and Consultancy Ltd respects your privacy and protects your personal information:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Personal data is collected only for business purposes and with your consent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>We do not sell, share, or distribute your information to third parties without authorization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>All data is stored securely and accessed only by authorized personnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>You have the right to request access, correction, or deletion of your personal data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg bg-muted/50">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Disclaimer</h3>
                <p className="text-muted-foreground">
                  While we strive for accuracy, product specifications and availability are subject to change. Final terms are confirmed in written agreements. This website is for informational purposes and does not constitute a binding offer.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
