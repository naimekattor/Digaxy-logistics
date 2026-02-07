import { cn } from '@/lib/utils';
import { Box, Building2, Globe, GraduationCap, Heart, Home, Monitor, ShoppingBag, Smartphone, Sofa, Trash2, User } from 'lucide-react';
import React, { useState } from 'react'
const SERVICES_CONFIG = {
  'home': {
    title: 'Fast, Easy & Reliable Home Moving',
    subtitle: 'From packing to unloading, we handle your home move with precision.',
    cta: 'Book Home Move',
    icon: Home,
    image: '/images/hero-home.png'
  },
  'apartment': {
    title: 'Seamless Apartment Moving Services',
    subtitle: 'Expert movers for tight spaces and stairs. We make it easy.',
    cta: 'Book Apartment Move',
    icon: Building2,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Apartment+Moving+Illustration'
  },
  'college': {
    title: 'Stress-Free College Moving',
    subtitle: 'Moving into a dorm or campus housing? We\'ve got you covered.',
    cta: 'Book College Move',
    icon: GraduationCap,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=College+Moving+Illustration'
  },
  'office': {
    title: 'Professional Office Relocation',
    subtitle: 'Minimize downtime with our efficient commercial moving services.',
    cta: 'Book Office Move',
    icon: Monitor,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Office+Moving+Illustration'
  },
  'furniture': {
    title: 'Expert Furniture Delivery',
    subtitle: 'Purchased something big? We\'ll deliver it safely to your room.',
    cta: 'Book Delivery',
    icon: Sofa,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Furniture+Delivery+Illustration'
  },
  'storage': {
    title: 'Efficient Storage Moving',
    subtitle: 'Easy transport to and from your storage unit.',
    cta: 'Book Storage Move',
    icon: Box,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Storage+Moving+Illustration'
  },
  'fb': {
    title: 'FB Marketplace Delivery',
    subtitle: 'Found a deal? We pick it up and deliver it today.',
    cta: 'Book FB Delivery',
    icon: ShoppingBag,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=FB+Marketplace+Illustration'
  },
  'junk': {
    title: 'Quick Junk Removal',
    subtitle: 'Clear out the clutter with our fast disposal service.',
    cta: 'Book Junk Removal',
    icon: Trash2,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Junk+Removal+Illustration'
  },
  'donation': {
    title: 'Easy Donation Pick Up',
    subtitle: 'Getting rid of items? We\'ll take them to your preferred center.',
    cta: 'Book Donation Pickup',
    icon: Heart,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Donation+Pickup+Illustration'
  },
  'craigslist': {
    title: 'Craigslist Item Delivery',
    subtitle: 'Safe and reliable delivery for any Craigslist purchases.',
    cta: 'Book Delivery',
    icon: Globe,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Craigslist+Delivery+Illustration'
  },
  'appliances': {
    title: 'Appliance Delivery & Moving',
    subtitle: 'Refrigerators, washers, and more — delivered with care.',
    cta: 'Book Appliance Move',
    icon: Smartphone,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Appliance+Delivery+Illustration'
  },
  'labor': {
    title: 'Expert Labor Help When You Need It',
    subtitle: 'From furniture rearranging to loading services, our team handles the hard work for you.',
    cta: 'See prices',
    icon: User,
    image: 'https://via.placeholder.com/600x450/FDFBF7/8B6914?text=Labor+Help+Illustration'
  }
} as const;

type ServiceKey = keyof typeof SERVICES_CONFIG;
const ServiceSelection = () => {
    const [activeService, setActiveService] = useState<ServiceKey>('home');

  const currentService = SERVICES_CONFIG[activeService];
  return (
    <section className="py-12 px-4 bg-white border-b border-gray-50">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-6 lg:pb-0 scrollbar-hide no-scrollbar">
                  {(Object.keys(SERVICES_CONFIG) as ServiceKey[]).map((key) => {
                    const Icon = SERVICES_CONFIG[key].icon;
                    const isActive = activeService === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setActiveService(key);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={cn(
                          "flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200 border-2",
                          isActive 
                            ? "bg-brand-gold/5 border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/10" 
                            : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-100"
                        )}
                      >
                        <Icon size={18} className={cn(isActive ? "text-brand-gold" : "text-gray-400")} />
                        {key === 'fb' ? 'FB Marketplace' : key.charAt(0).toUpperCase() + key.slice(1).replace('craigslist', 'Craigslist')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
  )
}

export default ServiceSelection
