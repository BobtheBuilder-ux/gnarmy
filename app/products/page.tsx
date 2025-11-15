'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useState } from 'react';
import productsData from '@/lib/products-data.json';
import Link from 'next/link';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Minerals', 'Agriculture', 'Biomass'];

  const filteredProducts = selectedCategory === 'All'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <>
      <Hero
        title="Products Catalogue"
        subtitle="Comprehensive range of minerals, agricultural commodities, and biomass materials available for export with verified quality standards."
        backgroundImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[120px]"
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Product</th>
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-left p-4 font-semibold">Origin</th>
                <th className="text-left p-4 font-semibold">MOQ</th>
                <th className="text-left p-4 font-semibold">Monthly Capacity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <Badge variant="secondary">{product.category}</Badge>
                  </td>
                  <td className="p-4 font-semibold">{product.product}</td>
                  <td className="p-4 text-muted-foreground">{product.description}</td>
                  <td className="p-4">{product.origin}</td>
                  <td className="p-4">{product.moq}</td>
                  <td className="p-4">{product.monthlyCapacity}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="inline-block border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Need Product Samples?</h3>
              <p className="text-muted-foreground mb-6">
                Request samples for quality verification and testing before placing your order.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Request Sample</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Product Specifications</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                All products are subject to pre-shipment inspection by SGS or Bureau Veritas to ensure compliance with agreed specifications and international standards.
              </p>
              <p>
                Detailed technical specifications, certificates of analysis, and material safety data sheets (MSDS) are available upon request for all products.
              </p>
              <p>
                Custom processing, grading, and packaging options are available to meet specific buyer requirements. Contact our team to discuss your needs.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
