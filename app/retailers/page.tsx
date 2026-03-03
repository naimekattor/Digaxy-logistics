"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import Image from 'next/image';
import PartnerRetailer from '@/components/PartnerRetailer';

const retailers = [
  {
    key: "ikea",
    logoUrl: "https://picsum.photos/seed/ikea-logo/180/70",
    title: "IKEA Delivery",
    desc: "Fast delivery for furniture, shelving, decor and large flat-packed items",
    items: [
      "Individual items",
      "Multiple pieces of furniture",
      "Assembly options",
      "Same-day or scheduled delivery",
    ],
  },
  {
    key: "costco",
    logoUrl: "https://picsum.photos/seed/costco-logo/180/70",
    title: "Costco Delivery",
    desc: "Perfect for big-box, oversized, or bulk items purchased in-store or online.",
    items: [
      "TVs, appliances, and electronics",
      "Mattresses & furniture",
      "Large grocery or bulk orders",
      "Membership-supported pickup",
    ],
  },
  {
    key: "bestbuy",
    logoUrl: "https://picsum.photos/seed/bestbuy-logo/180/70",
    title: "Best Buy Delivery",
    desc: "Fast delivery for electronics and major appliances.",
    items: [
      "TVs, computers, speakers",
      "Refrigerators, washers, dryers",
      "Secure handling for fragile items",
      "Scheduled or on-demand delivery",
    ],
  },
  {
    key: "walmart",
    logoUrl: "https://picsum.photos/seed/walmart-logo/180/70",
    title: "Walmart Delivery",
    desc: "Quick delivery for household goods, groceries, and oversized items.",
    items: [
      "Furniture & home goods",
      "TVs & electronics",
      "Outdoor items (grills, patio sets)",
      "Bulk groceries & essentials",
    ],
  },
];

const DOT_COLORS = ["#1b4b5a", "#b8860b"];

/* ─── single card ──────────────────────────── */
function RetailerCard({ logoUrl, title, desc, items, delay }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {/* logo placeholder */}
      <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <img
          src={logoUrl}
          alt={title}
          style={{
            maxHeight: 64,
            maxWidth: 180,
            objectFit: "contain",
            borderRadius: 6,
          }}
        />
      </div>

      {/* title */}
      <h3
        style={{
          margin: "0 0 10px",
          fontSize: 22,
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>

      {/* description */}
      <p
        style={{
          margin: "0 0 28px",
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "#7a7a7a",
          maxWidth: 280,
        }}
      >
        {desc}
      </p>

      {/* bullet list – left-aligned inside a constrained box */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, width: "100%", maxWidth: 300, textAlign: "left" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 16,
              fontSize: 14,
              color: "#2c2c2c",
              fontWeight: 450,
            }}
          >
            {/* dot */}
            <span
              style={{
                flexShrink: 0,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: DOT_COLORS[i % 2],
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reusable Component for Service Capabilities
const ServiceCard = ({ title, description, iconColor,serImage }) => (
  <div className="flex items-start space-x-4 p-4">
    <div className={`w-16 h-16 rounded-full ${iconColor} flex-shrink-0 flex items-center justify-center`}>
      {/* Placeholder for Illustration */}
      <Image src={serImage} alt='service icon' width={214} height={160}/>
      <div className="w-10 h-10 bg-gray-200 rounded-md opacity-50" />
    </div>
    <div>
      <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
      <p className="text-sm text-slate-500 leading-tight">{description}</p>
    </div>
  </div>
);


export default function DeliveryLandingPage() {
  const [query, setQuery] = useState("");

const filtered = retailers.filter(r =>
  r.title.toLowerCase().includes(query.toLowerCase()) ||
  r.desc.toLowerCase().includes(query.toLowerCase()) ||
  r.items.some(item => item.toLowerCase().includes(query.toLowerCase()))
);

const scrollTo = (key) => {
  document.getElementById(`retailer-${key}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  setQuery("");
};
  return (
    <MainLayout>
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold  mb-6 text-slate-900">
          Deliver Big & Bulky Items <br /> From Your Favorite Retailers
        </h1>
        <p className="text-slate-500 mb-10 max-w-lg mx-auto">
          Fast, on-demand pickup and delivery from top national retailers. 
          Choose your store and get instant pricing.
        </p>
        
        <div className="relative max-w-md mx-auto">
  <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
  <input 
    type="text"
    value={query}
    onChange={e => setQuery(e.target.value)} 
    placeholder="Search retailer name..." 
    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  />

  {/* ✅ MOVED INSIDE HERE */}
  {query && (
    <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg z-50 overflow-hidden">
      {filtered.length === 0 ? (
        <p className="p-4 text-slate-400 text-sm">No retailers found</p>
      ) : (
        filtered.map(r => (
          <div key={r.key} onClick={() => scrollTo(r.key)} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer">
            <img src={r.logoUrl} className="w-12 h-10 object-contain" />
            <div>
              <p className="font-semibold text-sm text-slate-800">{r.title}</p>
              <p className="text-xs text-slate-400">{r.desc}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>
      </section>
      

      {/* Top Retail Partners */}
      <section className="py-12 px-4">
        {/* <h2 className="text-2xl font-bold text-center mb-8">Top Retail Partners</h2> */}
        <PartnerRetailer />
      </section>

      <hr className="border-slate-100 max-w-6xl mx-auto my-12" />

      {/* Service Capabilities */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Service Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <ServiceCard 
            title="Fast Delivery" 
            description="Same-day or scheduled delivery" 
            iconColor="bg-yellow-50"
            serImage="/images/service1.png"
          />
          <ServiceCard 
            title="Oversized Item Support" 
            description="For furniture, appliances, gym equipment, etc." 
            iconColor="bg-blue-50"
            serImage="/images/service2.png"
          />
          <ServiceCard 
            title="Professional Movers" 
            description="Vetted helpers for big and bulky items" 
            iconColor="bg-orange-50"
            serImage="/images/service3.png"
          />
          <ServiceCard 
            title="Pickup from store" 
            description="We pick up items you've purchased in-store or online" 
            iconColor="bg-green-50"
            serImage="/images/service4.png"
          />
        </div>
      </section>

      {/* Retailer Directory */}
      <section
        style={{
          background: "#ffffff",
          padding: "72px 24px 80px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* heading */}
          <h2
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#1a1a1a",
              margin: "0 0 56px",
              letterSpacing: "-0.5px",
            }}
          >
            Retailer Directory
          </h2>

          {/* 2×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "48px 40px",
            }}
          >
            {retailers.map((r, i) => (
  <div id={`retailer-${r.key}`} key={r.key}>
    <RetailerCard {...r} delay={i * 100} />
  </div>
))}
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  );
}