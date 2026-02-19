"use client"
import React from 'react';
import { ChevronDown, Star } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { useState } from 'react';
import { calculateDistanceKm, calculatePrice } from '@/utils/geocode';
import AddressInput from '@/components/AddressInput';
import dynamic from 'next/dynamic';

const EstimateMap = dynamic(() => import('@/components/EstimateMap'), { ssr: false });

const ServiceType = ({ 
  image, 
  name, 
  description, 
  selected, 
  onClick 
}: { 
  image: string; 
  name: string; 
  description: string; 
  selected: boolean; 
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`flex flex-col items-center p-4 border-2 rounded-2xl bg-white transition-all cursor-pointer relative overflow-hidden ${
      selected 
        ? "border-[#a67c00] shadow-md ring-1 ring-[#a67c00]" 
        : "border-slate-100 shadow-sm hover:border-amber-200"
    }`}
  >
    <div className="h-24 w-full mb-2 flex items-center justify-center relative">
      <img 
        src={image} 
        alt={name} 
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h4 className={`font-bold text-sm ${selected ? "text-[#a67c00]" : "text-slate-800"}`}>{name}</h4>
    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{description}</p>
    
    {selected && (
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#a67c00] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    )}
  </div>
);

const VEHICLES = [
  { 
    id: 'pickup', 
    name: 'Pickup', 
    description: '6 ft bed', 
    image: '/images/pickup_truck.png', 
    basePrice: 50 
  },
  { 
    id: 'van', 
    name: 'Van', 
    description: '8 ft van', 
    image: '/images/van.png', 
    basePrice: 75 
  },
  { 
    id: 'mini_box', 
    name: 'XL', 
    description: '10 ft van', 
    image: '/images/mini_box_truck.png', 
    basePrice: 100 
  },
  { 
    id: 'box', 
    name: 'Box', 
    description: '12 ft box', 
    image: '/images/26Feet_box_truck.png', 
    basePrice: 150 
  },
];

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs px-4">
    <div className="w-12 h-12 rounded-full border-2 border-amber-600 flex items-center justify-center mb-4 text-amber-600 font-bold">
      {number}
    </div>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default function EstimatePage() {
  const [pickup, setPickup] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [drop, setDrop] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0]);
  const [showRealTime, setShowRealTime] = useState(false);

  const distanceKm = pickup && drop ? calculateDistanceKm(pickup.lat, pickup.lng, drop.lat, drop.lng) : 0;
  // Use distance in miles for Lugg style feel if needed, but keeping km for consistency with previous tool calls
  const traveledMiles = distanceKm * 0.621371;
  const basePrice = selectedVehicle.basePrice;
  const distanceFee = distanceKm * 15; 
  const laborFee = 55; // Placeholder for labor fee (175 mins from image)
  const totalEstimated = basePrice + distanceFee + (distanceKm > 0 ? laborFee : 0);

  const center = pickup || drop || { lat: 23.8103, lng: 90.4125 }; 
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#fcfcfc]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8  overflow-hidden">
          
          {/* Left Column: Scrollable Content */}
          <div className=" overflow-y-auto px-6 py-12 lg:px-12 ">
            <header className="mb-12 text-center">
              <h1 className="text-5xl font-black text-[#0f2a3f] mb-4 tracking-tight">Get an estimate</h1>
              <p className="text-slate-500 text-lg">Enter your addresses to see instant prices with Digaxy.</p>
            </header>

            {/* Input Section */}
            <section className="space-y-4 mb-16">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <AddressInput label="Pickup Address" onSelect={setPickup} />
                <AddressInput label="Drop Address" onSelect={setDrop} />
                
                {pickup && drop && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex justify-between items-center transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Route Distance</p>
                      <p className="text-2xl font-black text-amber-950">{distanceKm.toFixed(1)} <span className="text-sm font-bold">km</span></p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Estimated Price</p>
                      <p className="text-2xl font-black text-amber-950">${totalEstimated.toFixed(0)}</p>
                    </div>
                  </div>
                )}

                <button className="w-full bg-[#a67c00] hover:bg-[#8e6a00] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-200 uppercase tracking-widest text-sm translate-y-0 active:translate-y-1">
                  See Real-time Prices
                </button>
              </div>
            </section>

            {/* Right Column: Sticky Map */}
          <div className="hidden lg:block  h-[500px] overflow-hidden -z-10">
            <EstimateMap center={center} pickup={pickup} drop={drop} />
          </div>
          
          {/* Mobile Map - at top */}
          <div className="lg:hidden h-[350px] w-full order-first border-b border-slate-100 -z-10">
            <EstimateMap center={center} pickup={pickup} drop={drop} />
          </div>

            {/* Service Types */}
            <section className="mb-10">
              <div className="grid grid-cols-2 gap-4">
                {VEHICLES.map((v) => (
                  <ServiceType 
                    key={v.id} 
                    {...v} 
                    selected={selectedVehicle.id === v.id}
                    onClick={() => setSelectedVehicle(v)}
                  />
                ))}
              </div>
              <button className="w-full mt-6 bg-[#a67c00] hover:bg-[#8e6a00] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-200 uppercase tracking-widest text-sm translate-y-0 active:translate-y-1">
                Continue
              </button>
            </section>

            {/* Cost Breakdown */}
            <section className="mb-12">
               <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-1 w-16 bg-[#a67c00]/20 rounded-full mb-6" />
                  <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-sm border border-slate-100 flex items-center space-x-2 whitespace-nowrap">
                       <span className="text-sm font-black text-slate-800">2h 55 min</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight text-center">Estimated time to load and unload your items.</p>
                  </div>
               </div>

               <div className="space-y-5 px-4">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-sm font-bold">Base fare <span className="text-[10px] font-medium text-slate-400">(Digaxy {selectedVehicle.name})</span></span>
                    <span className="font-black text-slate-700">${distanceKm > 0 ? basePrice.toFixed(2) : "--"}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-sm font-bold">Traveled distance <span className="text-[10px] font-medium text-slate-400">({distanceKm.toFixed(1)} km)</span></span>
                    <span className="font-black text-slate-700">${distanceKm > 0 ? distanceFee.toFixed(2) : "--"}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-sm font-bold">Labor fee <span className="text-[10px] font-medium text-slate-400">(Estimated)</span></span>
                    <span className="font-black text-slate-700">${distanceKm > 0 ? laborFee.toFixed(2) : "0.00"}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-base font-bold text-slate-600">Total price <span className="text-[10px] font-medium text-slate-400">(estimated)</span></span>
                    <span className="text-4xl font-black text-slate-900">${distanceKm > 0 ? totalEstimated.toFixed(2) : "0.00"}</span>
                  </div>
               </div>

               <div className="mt-10 p-5 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex items-start space-x-3">
                  <div className="mt-0.5 text-amber-600">
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-amber-900 uppercase tracking-wide mb-1">This is only an estimate.</h5>
                    <p className="text-[10px] text-amber-800 leading-relaxed font-medium">Final price may be higher based on actual labor time.</p>
                  </div>
               </div>
            </section>

            {/* How It Works */}
            <section className="mb-16">
              <h3 className="text-2xl font-black text-[#0f2a3f] mb-12">Process</h3>
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg mb-2">Book your Digaxy</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Choose vehicle, enter pickup & drop-off locations instantly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg mb-2">We'll handle the rest</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Digaxy movers load, transport and unload safely at destination.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg mb-2">Rate & tip</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Ensure satisfaction and give feedback after successful delivery.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          

        </div>
      </div>
    </MainLayout>
  );
}
