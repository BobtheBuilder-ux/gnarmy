'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-[#36454f] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/logo.png"
                alt="Gnarmy logo"
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-display font-bold text-lg text-white">Gnarmy</div>
                <div className="text-xs text-white/70">Coal Trade & Consultancy</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Powering Industries. Feeding Nations. Exporting Excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-primary transition-colors text-sm">Our Services</Link></li>
              <li><Link href="/products" className="text-white/70 hover:text-primary transition-colors text-sm">Products Catalogue</Link></li>
              <li><Link href="/export-process" className="text-white/70 hover:text-primary transition-colors text-sm">Export Process</Link></li>
              <li><Link href="/markets" className="text-white/70 hover:text-primary transition-colors text-sm">Global Markets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/compliance" className="text-white/70 hover:text-primary transition-colors text-sm">Legal & Compliance</Link></li>
              <li><Link href="/careers" className="text-white/70 hover:text-primary transition-colors text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/compliance#terms" className="text-white/70 hover:text-primary transition-colors text-sm">Terms of Use</Link></li>
              <li><Link href="/compliance#privacy" className="text-white/70 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">36 Akwa Crescent, Gwarinpa, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/70 text-sm">+234 816 744 9552</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-white/70 text-sm break-all">info@gnarnyco.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="bg-white/5 rounded-lg p-8 mb-8">
            <h3 className="font-semibold text-xl mb-3">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-6">
              Get market rates, new product arrivals, and export compliance updates delivered monthly.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground"
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Gnarmy Coal Trade and Consultancy Ltd. All rights reserved.
            </p>
            {/* <p className="text-white/60 text-sm">
              100% Indigenous Nigerian Company
            </p> */}
            <p className="text-white/60 text-sm text-center md:text-left">
              Ajoo Management and Consultancy Ltd (Subsidiary of GNARMY COAL TRADE AND CONSULTANCY LTD)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
