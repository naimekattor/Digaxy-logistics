"use client"
import { cn } from '@/lib/utils'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import { MapPin, Truck } from 'lucide-react'

import { useBookingStore } from '@/stores/bookingStore'

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

const EstimateSection = () => {
  const router = useRouter();
  const setParcelData = useBookingStore(state => state.setParcelData);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  });

  const [pickup, setPickup] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [drop, setDrop] = useState<{ lat: number; lng: number; label: string } | null>(null);

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current) {
      const place = pickupAutocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setPickup({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: place.formatted_address || "",
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
          label: place.formatted_address || "",
        });
      }
    }
  };

  const handleEstimateClick = () => {
    if (pickup && drop) {
      setParcelData({
        pickup_address: pickup.label,
        ping: pickup.lat.toFixed(6),
        pong: pickup.lng.toFixed(6),
        drop_address: drop.label,
        ding: drop.lat.toFixed(6),
        dong: drop.lng.toFixed(6),
      });
      router.push("/book");
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-[#A97200]/0 via-[#C29A47]/0 to-[#C29A4726]/15 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 opacity-30" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl  font-black text-slate-900 mb-6  leading-none">
            Get an instant estimate
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Add your pickup and drip-off location to calculate your price.
          </p>
        </div>

        <div className="bg-gradient-to-b from-[#C29A47]/20 to-[#2B4C54]/20 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
          

          <div className="p-8 md:p-16 space-y-10">
            {/* Locations Grid */}
            <div className="grid grid-cols-1  gap-8 relative">

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Pickup location</label>
                <div className="flex items-center gap-4 bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl px-6 h-[72px] focus-within:ring-2 focus-within:ring-[#A87900] transition-all group shadow-sm">
  <MapPin size={22} className="text-amber-600 shrink-0" />
  
  {isLoaded ? (
    <div className="flex-1"> {/* Make Autocomplete take full remaining space */}
      <Autocomplete
        onLoad={(ref) => (pickupAutocompleteRef.current = ref)}
        onPlaceChanged={onPickupPlaceChanged}
      >
        <input
          type="text"
          placeholder="Where should we pick up?"
          className="w-full bg-transparent border-none outline-none font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-black placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
        />
      </Autocomplete>
    </div>
  ) : (
    <div className="flex-1 w-full h-4 bg-slate-100 rounded-full animate-pulse" />
  )}
</div>
              </div>

              <div className="space-y-3">
  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
    Drop-off location
  </label>

  <div className="flex items-center gap-4 bg-[#FDFBF7] border border-[#E8DFC5] rounded-2xl px-6 h-[72px] focus-within:ring-2 focus-within:ring-[#A87900] transition-all group shadow-sm">
    <MapPin size={22} className="text-slate-800 shrink-0" />

    {isLoaded ? (
      <div className="flex-1"> {/* Wrapper to allow input to stretch */}
        <Autocomplete
          onLoad={(ref) => (dropAutocompleteRef.current = ref)}
          onPlaceChanged={onDropPlaceChanged}
        >
          <input
            type="text"
            placeholder="Where should we deliver?"
            className="w-full bg-transparent border-none outline-none font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-black placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
          />
        </Autocomplete>
      </div>
    ) : (
      <div className="flex-1 w-full h-4 bg-slate-100 rounded-full animate-pulse" />
    )}
  </div>
</div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between gap-4 py-8">
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 transition-all group-hover:scale-110 group-hover:bg-amber-100">
                  <MapPin size={20} className="text-amber-600" />
                </div>
                <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup</span>
              </div>
              
              <div className="flex-1 h-[2px] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 translate-x-[-100%] animate-progress" />
              </div>

              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-slate-800 transition-all group-hover:scale-110 group-hover:bg-amber-100">
                  <MapPin size={20} className="text-amber-600" />
                </div>
                <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop-off</span>
              </div>

              <div className="flex-1 h-[2px] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 translate-x-[-100%] animate-progress" />
              </div>

              <div className="flex flex-col items-center group">
  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
    <Truck size={20} className="text-amber-600" /> 
  </div>
  <span className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
    Estimate
  </span>
</div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <button 
                onClick={handleEstimateClick}
                disabled={!pickup || !drop}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#A97200] hover:bg-[#8B5E00] text-white text-xl font-black rounded-3xl shadow-2xl shadow-amber-200 transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10 uppercase tracking-[0.2em] text-sm">Get Instant Estimate</span>
                <Truck className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 3s infinite linear;
        }
      `}</style>
    </section>
  )
}

export default EstimateSection
