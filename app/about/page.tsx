'use client';

import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Sprout, TrendingUp, Users2, User } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparency and honesty in all our dealings with clients, partners, and stakeholders.',
    },
    {
      icon: Users2,
      title: 'Responsibility',
      description: 'Accountable operations that benefit communities and protect the environment.',
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear communication and verifiable processes throughout our supply chain.',
    },
    {
      icon: Sprout,
      title: 'Sustainability',
      description: 'Long-term thinking that balances economic growth with environmental stewardship.',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Continuous improvement and expansion while maintaining quality standards.',
    },
  ];

  const pillars = [
    {
      title: 'Resource Development',
      description: 'Strategic extraction and cultivation of minerals, agricultural products, and biomass materials across multiple Nigerian states with sustainable practices.',
    },
    {
      title: 'Value Addition',
      description: 'State-of-the-art processing, grading, packaging, and quality control meeting international standards and certification requirements.',
    },
    {
      title: 'Export Excellence',
      description: 'End-to-end export solutions including logistics, documentation, compliance, and reliable delivery to global destinations.',
    },
  ];

  return (
    <>
      <Hero
        title="About Gnarmy Coal Trade and Consultancy Ltd"
        subtitle="An indigenous Nigerian company built on integrity, driven by excellence, and committed to powering industries and feeding nations through sustainable resource development."
        backgroundImage="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Company Profile</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Gnarmy Coal Trade and Consultancy Ltd is a fully indigenous Nigerian company headquartered in Abuja, with operations spanning Mining, Agriculture, Biomass, and International Trade sectors.
              </p>
              <p>
                We specialize in the extraction, processing, and export of minerals, agro-commodities, and bio-based materials, serving clients across Europe, Asia, Middle East, and Africa through verified supply chains and strategic partnerships.
              </p>
              <p>
                Our operations include coal mining, agricultural commodity sourcing, biomass production, and comprehensive export services supported by port operations via Onne Wharf. We maintain rigorous quality standards through SGS and Bureau Veritas certifications, ensuring our clients receive products that meet international specifications.
              </p>
              <p>
                With government partnerships, full regulatory compliance, and a commitment to transparency, Gnarmy stands as a trusted partner for businesses seeking reliable access to Nigerian resources.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Business Overview</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Our company operates at the intersection of agriculture, energy, international trade, and finance, with a strong focus on development within Nigeria and across the African continent.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver world-class minerals, agricultural products, and biomass materials through sustainable extraction, rigorous quality control, and reliable export services that empower industries and support global energy transitions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Africa's most trusted resource development and export company, recognized globally for operational excellence, environmental responsibility, and lasting partnerships that drive economic growth.
                </p>
                <div className="mt-8 pt-8 border-t">
                  <h4 className="text-xl font-bold mb-4">Our Vision & Goals</h4>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li>• To become Africa's major coal trading company.</li>
                    <li>• To leverage Nigeria's agricultural resources for significant cross-border trade.</li>
                    <li>• To foster financial inclusion and empowerment for unbanked populations.</li>
                    <li>• To build major trade relationships connecting Nigeria with India, South Korea, Vietnam, China, and the USA.</li>
                  </ul>
                </div>
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide every decision, partnership, and operation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Business Pillars</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three integrated capabilities delivering end-to-end resource development solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full border-l-4 border-l-primary shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Strategic Goals</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <ul className="space-y-4">
                <li>• <strong>Trade Relationships:</strong> Build strong, mutually beneficial trade partnerships to enhance coal distribution and agricultural products.</li>
                <li>• <strong>Sustainability:</strong> Balance economic growth with environmental considerations, particularly in energy production.</li>
                <li>• <strong>Community Impact:</strong> Focus on creating job opportunities and improving living standards through agricultural and financial inclusion initiatives.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Conclusion</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Your initiatives encompass significant potential for economic development and sustainability in Africa. By combining these sectors, you can create a robust network that not only addresses energy and agricultural challenges but also promotes financial empowerment.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Leadership: Director</h2>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col items-center">
                  <img
                    src="/director.jpeg"
                    alt="Director, Alloysius Chijioke Tabansi"
                    width={320}
                    height={320}
                    loading="lazy"
                    className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-lg shadow-md border border-border mb-4"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">ALLOYSIUS CHIJIOKE TABANSI</h3>
                  <p className="text-lg font-semibold text-primary mb-6">DIRECTOR.</p>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Alloysius Chijioke Tabansi holds Bsc in Business Management from the Moddibo Adama University of Technology, Yola Adamawa State.
                      He hails from Urum Community, Awka North Local Government of Anambra State.
                    </p>

                    <p>
                      He has over 20 years business experience in so many business sectors. Ranging from oil and Gas, Automobile, Energy and financial services, import and export, Distribution etc.
                    </p>

                    <p>
                      He is an experienced leader in different levels of life. A United Nation Peace Ambassador award recipient.
                    </p>

                    <p>
                      He is chairman/ CEO Noble Alchucks Nig Ltd.
                      Notec Energy Ltd.
                    </p>

                    <p>
                      As a director in Gnarmy, his wealth of experience in Energy, finance and leadership is playing major role towards achieving the Vision and mission of the company.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Corporate Address</h2>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold">Gnarmy Coal Trade and Consultancy Ltd</p>
                <p className="text-muted-foreground">36 Akwa Crescent, Gwarinpa</p>
                <p className="text-muted-foreground">Abuja, FCT</p>
                <p className="text-muted-foreground">Nigeria</p>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Business Hours:</span> Monday - Friday: 9:00 AM - 5:00 PM, Saturday: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </>
  );
}
