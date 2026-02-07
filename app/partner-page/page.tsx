"use client"
import React, { useState } from 'react';
import { Calendar, CircleDollarSign, Zap, Truck, User, Phone, Mail, MapPin } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import Image from 'next/image';

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm flex flex-col items-start text-left">
    <div className="p-3 bg-orange-50 rounded-lg mb-6">
      <Icon className="w-8 h-8 text-orange-600" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);
const LOCATIONS = ["San Diego", "Los Angeles", "New York", "Chicago", "Houston"];
const TRUCK_TYPES = ["Car", "Pick up", "Cargo Van"];
export default function PartnerPage() {
    const [location, setLocation] = useState("San Diego");
  const [truck, setTruck] = useState("Car");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <MainLayout>
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          Become a Digaxy Partner
        </h1>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Earn money delivering big & bulky items. Work when you want. Get paid instantly.
        </p>
        
        <div className="inline-block px-6 py-2 border border-orange-200 rounded-full text-orange-700 bg-orange-50 text-sm font-medium mb-12">
          Don't own a truck? Become a certified helper!
        </div>

        {/* Illustration and Floating Tooltips */}
        <div className="relative max-w-xl mx-auto mb-16">
          <div className="flex justify-center">
            {/* Placeholder for Main Illustration */}
            <div className="w-64 h-64 bg-slate-100 rounded-full flex items-center justify-center">
               <Image src={"/images/partnermain.png"} alt='partner animation' width={449} height={421}/>
            </div>
          </div>
          
          {/* Floating Tooltips (Desktop) */}
          
          <div className="hidden md:block absolute top-10 -left-20 bg-white p-4 rounded-xl shadow-lg border border-slate-100 text-left w-48">
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 bg-blue-900 rounded-full" />
              <p className="text-xs font-semibold">Earn $30-$80 per delivery</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <p className="text-xs font-semibold">Instant payouts</p>
            </div>
          </div>

          <div className="hidden md:block absolute top-10 -right-20 bg-white p-4 rounded-xl shadow-lg border border-slate-100 text-left w-48">
             <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 bg-blue-900 rounded-full" />
              <p className="text-xs font-semibold">Flexible scheduling</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <p className="text-xs font-semibold">Keep 100% of tips</p>
            </div>
          </div>
        </div>

        {/* Lead Form */}
        <div className="max-w-md mx-auto ">
          {/* <form className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Your name..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="tel" placeholder="Your phone..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input type="email" placeholder="Your email..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl appearance-none text-slate-500 focus:ring-2 focus:ring-orange-500">
                <option>Your location...</option>
              </select>
            </div>
            
            <div className="text-left px-2 pt-2">
              <p className="text-sm font-semibold text-slate-700 mb-2">Do you own a truck?</p>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" name="truck" className="text-orange-500 focus:ring-orange-500" /> <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" name="truck" className="text-orange-500 focus:ring-orange-500" /> <span>No</span>
                </label>
              </div>
            </div>

            
          </form> */}
          <button className="w-full bg-[#A97200]  text-white font-bold py-4 rounded-xl transition-colors mt-4">
              Get Started
            </button>
        </div>
      </section>

      {/* Earning Estimate Section */}
      <section
      style={{
        background: "#fdfbf7",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* ── Title ── */}
        <h2
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: 700,
            color: "#1e2a3a",
            margin: "0 0 28px",
            letterSpacing: "-0.4px",
          }}
        >
          Earning estimate
        </h2>

        {/* ── Outer card ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #e8e4dc 0%, #dddad4 50%, #d8d6d0 100%)",
            borderRadius: 28,
            padding: "36px 40px 32px",
          }}
        >
          {/* ── Top row: 3 columns ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr 0.9fr",
              gap: 24,
              alignItems: "start",
            }}
          >

            {/* ─── COL 1: Pickup location ─── */}
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4a4a4a",
                }}
              >
                Pickup location
              </p>

              {/* custom dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: "100%",
                    background: "#ffffff",
                    border: "none",
                    borderRadius: 14,
                    padding: "11px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    fontSize: 14.5,
                    color: "#2c2c2c",
                    fontFamily: "inherit",
                    textAlign: "left",
                  }}
                >
                  <span>{location}</span>
                  {/* chevron */}
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    style={{
                      transition: "transform 0.2s",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M1 1L7 7L13 1" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* dropdown list */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      overflow: "hidden",
                    }}
                  >
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setLocation(loc); setDropdownOpen(false); }}
                        style={{
                          width: "100%",
                          background: loc === location ? "#f5f0e8" : "transparent",
                          border: "none",
                          padding: "10px 16px",
                          textAlign: "left",
                          fontSize: 14,
                          color: "#2c2c2c",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => { if (loc !== location) e.target.style.background = "#f9f7f3"; }}
                        onMouseLeave={(e) => { e.target.style.background = loc === location ? "#f5f0e8" : "transparent"; }}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* price range */}
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#1e2a3a",
                  letterSpacing: "-0.5px",
                }}
              >
                $700–$900
              </p>
            </div>

            {/* ─── COL 2: Truck type ─── */}
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4a4a4a",
                }}
              >
                Truck type
              </p>

              {/* white inner card */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "14px 18px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {TRUCK_TYPES.map((type) => {
                  const selected = truck === type;
                  return (
                    <label
                      key={type}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "6px 0",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      {/* custom radio dot */}
                      <input
                        type="radio"
                        name="truck-type"
                        checked={selected}
                        onChange={() => setTruck(type)}
                        style={{ display: "none" }}
                      />
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: selected ? "#b8860b" : "#c8c4bc",
                          flexShrink: 0,
                          transition: "background 0.2s",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          color: "#2c2c2c",
                          fontWeight: selected ? 500 : 400,
                        }}
                      >
                        {type}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* ─── COL 3: Hours + Tips ─── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Hours per week */}
              <div>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4a4a4a",
                  }}
                >
                  Hours per week
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#1e2a3a",
                    letterSpacing: "-0.3px",
                  }}
                >
                  20
                </p>
              </div>

              {/* Estimated Tips */}
              <div>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#4a4a4a",
                  }}
                >
                  Estimated Tips
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#1e2a3a",
                    letterSpacing: "-0.3px",
                  }}
                >
                  $100
                </p>
              </div>
            </div>
          </div>

          {/* ── Bottom: Most common jobs ── */}
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 14,
                fontWeight: 500,
                color: "#7a7a7a",
              }}
            >
              Most common jobs
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 19,
                fontWeight: 700,
                color: "#1e2a3a",
              }}
            >
              Furniture &amp; home goods
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Your Benefits Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-16">Your Benefits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BenefitCard 
            icon={Calendar}
            title="Flexible Scheduling"
            description="Work anytime - no minimum hours."
          />
          <BenefitCard 
            icon={CircleDollarSign}
            title="High Earnings"
            description="Get paid per job + 100% of your tips."
          />
          <BenefitCard 
            icon={Zap}
            title="Instant Payouts"
            description="Cash out instantly."
          />
          <BenefitCard 
            icon={Truck}
            title="Big & Bulky Experts"
            description="We match you with deliveries ideal for your vehicle."
          />
        </div>
      </section>
    </div>
    </MainLayout>
  );
}