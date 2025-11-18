'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    // {
    //   icon: MapPin,
    //   title: 'Address',
    //   content: '36 Akwa Crescent, Gwarinpa, Abuja, FCT, Nigeria',
    // },
    {
      icon: Phone,
      title: 'Phone',
      content: '+234 816 744 9552',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@gnarnyco.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon-Fri: 9:00 AM - 5:00 PM\nSat: 10:00 AM - 2:00 PM',
    },
  ];

  const faqs = [
    {
      question: 'What are your minimum order quantities?',
      answer: 'MOQs vary by product. Minerals typically require 5,000 MT minimum, agricultural products range from 50-500 MT, and biomass materials from 100-500 MT. Contact us for specific product MOQs.',
    },
    {
      question: 'Do you offer samples?',
      answer: 'Yes, we provide product samples for quality verification and testing. Sample costs and shipping are typically borne by the buyer. Contact us to request samples for your desired products.',
    },
    {
      question: 'What export documents do you provide?',
      answer: 'We provide complete export documentation including Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, SGS/BV Inspection Certificate, Phytosanitary Certificate (for agricultural products), and NEPC Export Permit.',
    },
    {
      question: 'What payment terms do you accept?',
      answer: 'We accept LC (Letter of Credit), DLC (Documentary Letter of Credit), and SBLC (Standby Letter of Credit) from reputable international banks. Payment terms are negotiated based on order size and buyer relationship.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'From confirmed order to shipment: 15-30 days depending on product and quantity. Ocean freight transit times vary by destination: Europe (18-25 days), Asia (20-30 days), Middle East (10-15 days), Africa (7-14 days).',
    },
    {
      question: 'Can you customize product specifications?',
      answer: 'Yes, we offer custom processing, grading, and packaging to meet specific buyer requirements. Share your specifications and we will confirm our ability to fulfill your needs.',
    },
  ];

  return (
    <>
      <Hero
        title="Get In Touch"
        subtitle="Have questions about our products, services, or export process? Our team is ready to assist you."
        backgroundImage="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{info.title}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                  <p><span className="font-semibold text-foreground">Saturday:</span> 10:00 AM - 2:00 PM</p>
                  <p><span className="font-semibold text-foreground">Sunday:</span> Closed</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@company.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your inquiry, product requirements, or questions..."
                      rows={6}
                      required
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>

          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src="https://www.google.com/maps?q=36%20Akwa%20Crescent,%20Gwarinpa,%20Abuja,%20Nigeria&output=embed"
                  title="Gnarmy Coal Trade and Consultancy Ltd Location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-lg border-0"
                  aria-label="Map showing 36 Akwa Crescent, Gwarinpa, Abuja, Nigeria"
                ></iframe>
              </AspectRatio>
            </CardContent>
          </Card>

          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps?q=36%20Akwa%20Crescent,%20Gwarinpa,%20Abuja,%20Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </>
  );
}
