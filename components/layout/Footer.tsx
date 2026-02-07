import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Primitives';

const footerSections = [
  {
    title: 'Digaxy',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Cities', href: '#cities' },
      { label: 'Register', href: '/register' },
      { label: 'Get Estimate', href: '#estimate' },
      { label: 'Become a Partner', href: '#partner' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Home Move', href: '#' },
      { label: 'Apartment Move', href: '#' },
      { label: 'College Move', href: '#' },
      { label: 'Office Move', href: '#' },
      { label: 'Furniture Delivery', href: '#' },
      { label: 'Donation Pickup', href: '#' },
    ],
  },
  {
    title: 'Legal Information',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-content mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Revolutionizing logistics and moving services with local experts you can trust.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-gray-900 mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-brand-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Digaxy Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Social Icons Placeholder */}
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-gold transition-colors cursor-pointer">f</span>
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-gold transition-colors cursor-pointer">t</span>
              <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-gold transition-colors cursor-pointer">i</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
