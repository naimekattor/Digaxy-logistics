'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button, Input, Card, AccordionItem, Toggle } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Layout, 
  Plus, 
  Minus, 
  ArrowRight,
  ChevronRight,
  Info,
  MousePointerClick,
  Calendar,
  DollarSign,
  CheckCircle2,
  Home,
  Building2,
  GraduationCap,
  Monitor,
  Sofa,
  Box,
  ShoppingBag,
  Trash2,
  Heart,
  Globe,
  Smartphone,
  User
} from 'lucide-react';
import GetApp from '@/components/GetApp';
import Hiw from '@/components/Hiw';
import EstimateSection from '@/components/EstimateSection';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import PartnerSection from '@/components/PartnerSection';
import PartnerRetailer from '@/components/PartnerRetailer';

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

export default function LandingPage() {
  const [activeService, setActiveService] = useState<ServiceKey>('home');

  const currentService = SERVICES_CONFIG[activeService];

  return (
    <div className="min-h-screen  font-sans text-gray-900">
      <Navbar />

      <main className="pt-20">
        {/* --- Hero Section --- */}
<section className="relative overflow-hidden px-4 md:px-6 pt-16 pb-24 
  bg-gradient-to-l from-[#A97200]/0 via-[#C29A47]/0 to-[#C29A47]/15">

          {activeService === 'home' ? (
            // === HOME LAYOUT (Horizontal Bar) ===
            <>
              <div className="max-content mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left min-h-[350px] flex flex-col justify-center">
                  <h1 className="text-5xl md:text-[60px] font-sans font-black text-[#111827] mb-6 leading-[1.1] tracking-tight transition-all duration-300 transform">
                    Fast, Easy & Reliable <br />
                    Moving <span className="text-[#A87900]">With Digaxy</span>
                  </h1>
                  <p className="text-xl text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                    Book movers instantly — reliable, safe, and always on time.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                    <Button className="w-auto h-16 px-10 bg-[#A87900] text-white font-bold rounded-2xl flex items-center gap-3 text-lg shadow-xl shadow-[#A87900]/20 hover:scale-[1.02] transition-all border-none">
                      <Truck size={22} className="text-white" />
                      Book a Move
                    </Button>
                    <Button variant="ghost" className="w-auto h-16 px-10 border-2 border-[#E8DFC5] bg-white text-gray-900 font-bold rounded-2xl flex items-center gap-3 text-lg hover:bg-gray-50 transition-all">
                      <MousePointerClick size={22} />
                      Sign up for free
                    </Button>
                  </div>

                  {/* Social Proof */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                           <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" width={40} height={40} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-center sm:items-start leading-none">
                      <div className="flex text-[#FACC15] mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <span className="text-sm font-normal text-gray-400">10k+ happy customers</span>
                    </div>
                  </div>
                </div>

                {/* Right Illustration (Home) */}
                <div className="flex-1 relative w-full flex justify-center lg:justify-end">
                  <div className="relative w-full aspect-[4/3] max-w-2xl">
                     <div className="absolute inset-0 bg-[#A87900]/5 rounded-[5rem] blur-[80px] -rotate-12 scale-110 translate-y-10"></div>
                     <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <img 
                          src={currentService.image} 
                          alt="Home Moving"
                          className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-opacity duration-300 transform scale-105"
                        />
                     </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Sticky Booking Bar (Home only) */}
              <div className="max-content mx-auto relative z-20">
                <div className="p-4 md:p-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#E8DFC5] rounded-xl py-3 px-4 text-sm text-gray-900 focus-within:ring-2 focus-within:ring-[#A87900] transition-all">
  <MapPin size={16} className="text-gray-600 shrink-0" />
  <input
    type="text"
    placeholder="Pickup Location"
    className="w-full bg-transparent outline-none font-normal"
  />
</div>

                  <div className="flex items-center gap-2 bg-[#FDFBF7] border border-[#E8DFC5] rounded-xl py-3 px-4 text-sm font-bold text-gray-900 focus-within:ring-2 focus-within:ring-[#A87900] transition-all outline-none">
  <MapPin size={16} className="text-gray-600 shrink-0" />
  <input
    type="text"
    placeholder="Drop Location"
    className="w-full bg-transparent outline-none font-normal"
  />
</div>

                  <Button className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-white">
                      <MapPin size={16} /> Price
                    </label>
                  
                  </Button>
                  
                  
                  <Button className="h-[50px] bg-transparent border-none text-gray-400 font-bold hover:bg-transparent hover:text-gray-900 justify-start px-0 w-auto lg:hidden">
                    Looking for a quote?
                  </Button>
                  {/* Note: The image shows icons below. We'll simplify to just standard features below for now or keep existing */}
                </div>
                 <div className="mt-12 flex flex-wrap justify-center lg:justify-between gap-8 px-4">
                  {[
                    { label: 'Same-day service', icon: CheckCircle2 },
                    { label: 'Live Tracking', icon: MapPin },
                    { label: 'Trusted Professionals', icon: ShieldCheck },
                    { label: 'Affordable pricing', icon: DollarSign }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center">
                        <feat.icon size={14} />
                      </div>
                      <span className="text-sm font-bold text-gray-600">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // === OTHER SERVICES LAYOUT (Vertical Form) ===
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              {/* Left Content */}
              <div className="flex-1 w-full space-y-10">
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-[#111827] leading-[1.2] tracking-tight transition-all duration-300 transform">
                    {currentService.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed transition-all duration-300 max-w-xl">
                    {currentService.subtitle}
                  </p>
                </div>

                {/* Dynamic Booking Form */}
                <div className="space-y-4 max-w-md">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Pickup Location" 
                      className="w-full bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl py-5 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-gold transition-all shadow-sm outline-none placeholder:text-gray-400" 
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Drop-off Location" 
                      className="w-full bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl py-5 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-brand-gold transition-all shadow-sm outline-none placeholder:text-gray-400" 
                    />
                  </div>
                  <Button className="h-16 bg-[#A87900] hover:bg-[#8B6914] text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#A87900]/20 transition-all border-none">
                    {currentService.cta}
                  </Button>
                </div>

                {/* Feature Icons (Subtle) */}
                <div className="hidden md:flex flex-wrap items-center gap-8 pt-4">
                  {[
                    { label: 'Same-day service', icon: CheckCircle2 },
                    { label: 'Live Tracking', icon: MapPin },
                    { label: 'Trusted Professionals', icon: ShieldCheck },
                    { label: 'Affordable pricing', icon: DollarSign }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <feat.icon size={18} className="text-[#111827]" />
                      <span className="text-xs font-bold text-gray-600">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Illustration */}
              <div className="flex-1 relative w-full flex justify-center lg:justify-end">
                <div className="relative w-full aspect-[4/3] max-w-2xl">
                   <div className="absolute inset-0 bg-brand-gold/5 rounded-[5rem] blur-[80px] -rotate-12 scale-110 translate-y-10"></div>
                   
                   <div className="relative z-10 w-full h-full bg-[#FDFBF7]/30 rounded-[4rem] overflow-hidden flex items-center justify-center transition-all duration-500 transform">
                      <img 
                        src={currentService.image} 
                        alt={currentService.title}
                        className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-opacity duration-300"
                      />
                      
                      <div className="absolute top-10 right-10 w-24 h-24 bg-brand-gold/10 rounded-[2rem] rotate-12 flex items-center justify-center">
                          <Box size={40} className="text-brand-gold/40" />
                      </div>
                      <div className="absolute bottom-20 left-10 w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center">
                          <Truck size={32} className="text-brand-gold/40" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Get App section */}
        <GetApp/>

        {/* --- How It Works --- */}
        <Hiw/>
        {/* --- Service Selection Chips --- */}
        <section className="py-10 px-4 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
      A mover for every need — Digaxyx makes it simple
    </h2>

    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-8">
      {(Object.keys(SERVICES_CONFIG) as ServiceKey[]).map((key) => {
        const Icon = SERVICES_CONFIG[key].icon;
        const isActive = activeService === key;
        const label =
          key === 'fb'
            ? 'FB Marketplace'
            : key === 'craigslist'
            ? 'Craigslist'
            : key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <button
            key={key}
            onClick={() => {
              setActiveService(key);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={cn(
              "group flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 border shadow-sm",
              isActive
                ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-400 text-amber-800 shadow-amber-200/60 scale-[1.04]"
                : "bg-white border-gray-200 text-gray-700 hover:border-amber-200 hover:bg-amber-50/40 hover:shadow-amber-100/40 hover:text-amber-800"
            )}
          >
            <Icon
              size={20}
              className={cn(
                "transition-colors duration-300",
                isActive ? "text-amber-600" : "text-gray-500 group-hover:text-amber-600"
              )}
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  </div>
</section>

        {/* --- Instant Estimate Section --- */}
        <EstimateSection/>

        {/* --- Testimonials --- */}
        <Testimonials/>

        {/* --- FAQ Section --- */}
        <Faq/>

        {/* --- Become a Partner Section --- */}
        <PartnerSection/>

        {/* --- Partner Retailers --- */}
        <PartnerRetailer/>
      </main>

      <Footer />
    </div>
  );
}