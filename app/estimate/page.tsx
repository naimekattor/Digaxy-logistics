"use client"
import React, { useState, useRef, useCallback, useEffect, Suspense } from 'react';
import { ChevronDown, Star, MapPin } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/stores/bookingStore';
import dynamic from 'next/dynamic';

const GoogleEstimateMap = dynamic(() => import('@/components/GoogleEstimateMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Map...</div>
});

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
    className={`flex flex-col items-center p-4 border-2 rounded-2xl bg-white transition-all cursor-pointer relative overflow-hidden group ${
      selected 
        ? "border-[#a67c00] shadow-md ring-1 ring-[#a67c00]" 
        : "border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50/10"
    }`}
  >
    <div className="h-24 w-full mb-2 flex items-center justify-center relative">
      <img 
        src={image} 
        alt={name} 
        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h4 className={`font-black text-sm ${selected ? "text-[#a67c00]" : "text-slate-800 uppercase tracking-tight"}`}>{name}</h4>
    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{description}</p>
    
    {selected && (
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#a67c00] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </div>
    )}
  </div>
);

const VEHICLES = [
  { id: 'pickup', name: 'Pickup', description: '6 ft bed', image: '/images/pickup_truck.png', basePrice: 50 },
  { id: 'van', name: 'Van', description: '8 ft van', image: '/images/van.png', basePrice: 75 },
  { id: 'mini_box', name: 'XL', description: '10 ft van', image: '/images/mini_box_truck.png', basePrice: 100 },
  { id: 'box', name: 'Box', description: '12 ft box', image: '/images/26Feet_box_truck.png', basePrice: 150 },
];

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

function EstimateContent() {
  const { isLoaded } = useJsApiLoader({ 
    id: 'google-map-script', 
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, 
    libraries: LIBRARIES 
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const setParcelData = useBookingStore(state => state.setParcelData);

  const [pickup, setPickup] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [drop, setDrop] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0]);
  const [distanceKm, setDistanceKm] = useState(0);

  const handleContinueToBooking = () => {
    if (pickup && drop) {
      setParcelData({
        pickup_address: pickup.label,
        ping: pickup.lat.toFixed(6),
        pong: pickup.lng.toFixed(6),
        drop_address: drop.label,
        ding: drop.lat.toFixed(6),
        dong: drop.lng.toFixed(6),
        vehicle_type: selectedVehicle.name,
      });
      router.push("/book");
    }
  };

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Initialize from search params
  useEffect(() => {
    const pLat = searchParams.get('pickup_lat');
    const pLng = searchParams.get('pickup_lng');
    const pLabel = searchParams.get('pickup_label');
    const dLat = searchParams.get('drop_lat');
    const dLng = searchParams.get('drop_lng');
    const dLabel = searchParams.get('drop_label');

    if (pLat && pLng && pLabel) {
      setPickup({ lat: parseFloat(pLat), lng: parseFloat(pLng), label: pLabel });
    }
    if (dLat && dLng && dLabel) {
      setDrop({ lat: parseFloat(dLat), lng: parseFloat(dLng), label: dLabel });
    }
  }, [searchParams]);

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current) {
      const place = pickupAutocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setPickup({ 
          lat: place.geometry.location.lat(), 
          lng: place.geometry.location.lng(), 
          label: place.formatted_address || "" 
        });
      }
    }
  };

  const onDropPlaceChanged = () => {
    if (dropAutocompleteRef.current) {
      const place = dropAutocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setDrop({ 
          lat: place.geometry.location.lat(), 
          lng: place.geometry.location.lng(), 
          label: place.formatted_address || "" 
        });
      }
    }
  };

  useEffect(() => {
    if (pickup && drop && window.google) {
      const p1 = new google.maps.LatLng(pickup.lat, pickup.lng);
      const p2 = new google.maps.LatLng(drop.lat, drop.lng);
      const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000;
      setDistanceKm(dist);
    }
  }, [pickup, drop]);

  const basePrice = selectedVehicle.basePrice;
  const distanceFee = distanceKm * 15; 
  const laborFee = 55; 
  const totalEstimated = basePrice + distanceFee + (distanceKm > 0 ? laborFee : 0);
  const center = pickup || drop || { lat: 23.8103, lng: 90.4125 };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
        
        {/* Left Column: Scrollable Content */}
        <div className="overflow-y-auto px-0 py-12 lg:px-6">
          <header className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight leading-none">Get an estimate</h1>
            <p className="text-gray-500 text-lg font-medium">Enter your addresses to see instant prices with Digaxy.</p>
          </header>

          {/* Input Section */}
          <section className="space-y-4 mb-12">
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100/80 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Pickup Address</label>
                <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl px-5 h-[62px] text-sm text-gray-900 focus-within:ring-2 focus-within:ring-[#A87900] transition-all group">
                  <MapPin size={20} className="text-gray-400 group-focus-within:text-[#A87900] shrink-0" />
                  {isLoaded ? (
                    <Autocomplete onLoad={ref => pickupAutocompleteRef.current = ref} onPlaceChanged={onPickupPlaceChanged}>
                      <input
                        type="text"
                        key={pickup?.label} 
                        defaultValue={pickup?.label || ""}
                        placeholder="Where are we picking up?"
                        className="w-full bg-transparent border-none outline-none font-bold text-gray-800 placeholder:text-gray-400 placeholder:font-black placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
                      />
                    </Autocomplete>
                  ) : (
                    <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Drop Address</label>
                <div className="flex items-center gap-3 bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl px-5 h-[62px] text-sm text-gray-900 focus-within:ring-2 focus-within:ring-[#A87900] transition-all group">
                  <MapPin size={20} className="text-slate-800 group-focus-within:text-[#A87900] shrink-0" />
                  {isLoaded ? (
                    <Autocomplete onLoad={ref => dropAutocompleteRef.current = ref} onPlaceChanged={onDropPlaceChanged}>
                      <input
                        type="text"
                        key={drop?.label}
                        defaultValue={drop?.label || ""}
                        placeholder="Where is the destination?"
                        className="w-full bg-transparent border-none outline-none font-bold text-gray-800 placeholder:text-gray-400 placeholder:font-black placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
                      />
                    </Autocomplete>
                  ) : (
                    <div className="w-full h-4 bg-slate-100 rounded animate-pulse" />
                  )}
                </div>
              </div>
              
              {pickup && drop && (
                <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100 flex justify-between items-center transition-all animate-in zoom-in-95 duration-500 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 rotate-12">
                    <Truck size={60} className="text-amber-900" />
                  </div>
                  <div className="space-y-1 z-10">
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">Route Distance</p>
                    <p className="text-3xl font-black text-amber-950">{distanceKm.toFixed(1)} <span className="text-sm font-bold opacity-40">km</span></p>
                  </div>
                  <div className="h-12 w-[2px] bg-amber-200 hidden sm:block" />
                  <div className="text-right space-y-1 z-10">
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em]">Estimated Price</p>
                    <p className="text-3xl font-black text-amber-950">${totalEstimated.toFixed(0)}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Service Types */}
          <section className="mb-12">
            <h3 className="text-xl font-black text-[#111827] mb-6 px-1 uppercase tracking-tight">Select Vehicle</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {VEHICLES.map((v) => (
                <ServiceType key={v.id} {...v} selected={selectedVehicle.id === v.id} onClick={() => setSelectedVehicle(v)} />
              ))}
            </div>
          </section>

          {/* Cost Breakdown */}
          <section className="mb-12 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                <Star size={150} fill="currentColor" className="text-[#a67c00]" />
             </div>
             
             <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-1.5 bg-amber-600/10 rounded-full mb-8" />
                <div className="text-center relative">
                   <p className="text-5xl font-black text-[#111827] mb-1 tracking-tighter">
                      {distanceKm > 0 ? (Math.round(distanceKm * 2) + 30) : "--"} <span className="text-xl opacity-30 font-black uppercase tracking-widest ml-1">min</span>
                   </p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em]">Est. Handling Time</p>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between items-baseline group/row">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-600 group-hover/row:text-slate-900 transition-colors">Base fare</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Digaxy {selectedVehicle.name}</span>
                  </div>
                  <span className="font-black text-slate-800 text-xl">${distanceKm > 0 ? basePrice.toFixed(2) : "--"}</span>
                </div>

                <div className="flex justify-between items-baseline group/row">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-600 group-hover/row:text-slate-900 transition-colors">Travel price</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{distanceKm.toFixed(1)} km distance</span>
                  </div>
                  <span className="font-black text-slate-800 text-xl">${distanceKm > 0 ? distanceFee.toFixed(2) : "--"}</span>
                </div>

                <div className="flex justify-between items-baseline group/row">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-600 group-hover/row:text-slate-900 transition-colors">Handling fee</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Load & Unload effort</span>
                  </div>
                  <span className="font-black text-slate-800 text-xl">${distanceKm > 0 ? laborFee.toFixed(2) : "0.00"}</span>
                </div>

                <div className="pt-8 border-t-2 border-slate-50 flex justify-between items-center">
                  <span className="text-xl font-black text-[#111827] uppercase tracking-tighter">Total Estimate</span>
                  <div className="text-right">
                    <span className="block text-5xl font-black text-amber-600 leading-none tracking-tighter">
                      ${distanceKm > 0 ? totalEstimated.toFixed(0) : "0.00"}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 block">taxes included</span>
                  </div>
                </div>
             </div>

             <div className="mt-10 p-6 bg-amber-50/30 rounded-3xl flex items-start space-x-4 border border-amber-100/50">
                <div className="p-2 bg-amber-100/50 rounded-xl">
                  <Star size={18} fill="currentColor" className="text-amber-600 shrink-0" />
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed font-black uppercase tracking-tight opacity-70">
                  This is a non-binding estimate based on average handling speeds. Final price is calculated based on real-time activity tracking during the move.
                </p>
             </div>
          </section>

          <button 
            onClick={handleContinueToBooking}
            className="group relative w-full bg-[#a67c00] hover:bg-[#8e6a00] text-white font-black py-7 rounded-[2rem] transition-all shadow-xl shadow-amber-200/50 uppercase tracking-[0.25em] text-base transform active:scale-[0.98] mb-8 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">Continue to Booking</span>
            <ChevronDown className="rotate-[-90deg] group-hover:translate-x-1 transition-transform relative z-10" size={22} strokeWidth={3} />
          </button>
          
          <div className="flex items-center justify-center gap-4 opacity-30 group">
             <div className="h-[1px] w-12 bg-slate-400 transition-all group-hover:w-20" />
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Digaxy Professional</p>
             <div className="h-[1px] w-12 bg-slate-400 transition-all group-hover:w-20" />
          </div>
        </div>

        {/* Right Column: Sticky Map */}
        <div className="hidden lg:block relative h-full min-h-screen pt-12 pb-12">
          <div className="sticky top-12 h-[calc(100vh-120px)] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-[6px] border-white ring-1 ring-slate-100/50">
            <GoogleEstimateMap center={center} pickup={pickup} drop={drop} />
          </div>
        </div>
        
        {/* Mobile Map */}
        <div className="lg:hidden h-[350px] w-full rounded-b-[3.5rem] overflow-hidden shadow-xl mb-8 order-first border-b border-slate-100">
          <GoogleEstimateMap center={center} pickup={pickup} drop={drop} />
        </div>

      </div>
    </div>
  );
}

export default function EstimatePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[#fcfcfc] font-sans">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-black text-slate-300 uppercase tracking-[0.3em] text-xs">Initializing Estimate...</p>
          </div>
        }>
          <EstimateContent />
        </Suspense>
      </div>
    </MainLayout>
  );
}

import { Truck } from 'lucide-react';
