'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

export default function CareersPage() {
  const positions = [
    {
      title: 'Mining Engineer',
      department: 'Operations',
      location: 'Enugu / Kogi State',
      type: 'Full-Time',
      description: 'Experienced mining engineer for coal extraction operations. Responsibilities include site planning, safety management, and production optimization.',
    },
    {
      title: 'Export Coordinator',
      department: 'Logistics',
      location: 'Abuja / Port Harcourt',
      type: 'Full-Time',
      description: 'Manage export documentation, coordinate with freight forwarders, and ensure compliance with international trade regulations.',
    },
    {
      title: 'Quality Analyst',
      department: 'Quality Control',
      location: 'Multiple Locations',
      type: 'Full-Time',
      description: 'Conduct product testing, quality inspections, and certification processes. Liaise with SGS and Bureau Veritas inspectors.',
    },
    {
      title: 'Field Officer (Agriculture)',
      department: 'Procurement',
      location: 'Benue / Kaduna State',
      type: 'Full-Time',
      description: 'Source agricultural commodities from verified farms, assess quality, negotiate pricing, and manage farmer relationships.',
    },
    {
      title: 'Agronomist',
      department: 'Agriculture',
      location: 'Multiple States',
      type: 'Contract',
      description: 'Provide technical guidance to partner farms on crop production, quality improvement, and sustainable agricultural practices.',
    },
    {
      title: 'Logistics Manager',
      department: 'Supply Chain',
      location: 'Port Harcourt',
      type: 'Full-Time',
      description: 'Oversee warehouse operations, container stuffing, port coordination, and shipment tracking for all export activities.',
    },
  ];

  const benefits = [
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Professional development opportunities and clear advancement paths',
    },
    {
      icon: Users,
      title: 'Collaborative Environment',
      description: 'Work with experienced professionals across multiple sectors',
    },
    {
      icon: TrendingUp,
      title: 'Competitive Compensation',
      description: 'Industry-leading salaries and performance-based incentives',
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and employee welfare programs',
    },
  ];

  return (
    <>
      <Hero
        title="Join Our Team"
        subtitle="Build your career with a leading indigenous company driving excellence in mining, agriculture, and export."
        backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Work With Us</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We welcome professionals and partners passionate about energy, agriculture, and sustainability. Join a team committed to operational excellence, ethical business practices, and meaningful impact across Nigeria and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
        </motion.div>

        <div className="space-y-6">
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                        <Badge variant="outline">{position.location}</Badge>
                      </div>
                    </div>
                    <Button asChild className="md:mt-0">
                      <Link href="/contact">Apply Now</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{position.description}</p>
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
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Don't See Your Role?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            We're always looking for talented individuals to join our team. Send us your CV and let us know how you can contribute to our mission.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Send Your CV</Link>
          </Button>
        </motion.div>
      </Section>
    </>
  );
}
