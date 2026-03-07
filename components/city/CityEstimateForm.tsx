"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui/Primitives";

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export default function CityEstimateForm() {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const [pickup, setPickup] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [drop, setDrop] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [distanceKm, setDistanceKm] = useState(0);

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

  useEffect(() => {
    if (pickup && drop && window.google) {
      const p1 = new google.maps.LatLng(pickup.lat, pickup.lng);
      const p2 = new google.maps.LatLng(drop.lat, drop.lng);
      const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000;
      setDistanceKm(dist);
    }
  }, [pickup, drop]);

  // Pricing Logic (simplified version from estimate page)
  const basePrice = 50; // Base price for 'Lite' vehicle
  const distanceFee = distanceKm * 15;
  const laborFee = 55;
  const totalEstimated = basePrice + distanceFee + (distanceKm > 0 ? laborFee : 0);

  const handleSeePrices = () => {
    if (pickup && drop) {
      const params = new URLSearchParams({
        pickup_lat: pickup.lat.toString(),
        pickup_lng: pickup.lng.toString(),
        pickup_label: pickup.label,
        drop_lat: drop.lat.toString(),
        drop_lng: drop.lng.toString(),
        drop_label: drop.label,
      });
      router.push(`/estimate?${params.toString()}`);
    } else {
        // Scroll to services if addresses not filled? 
        // For now, just focus on redirecting if they have addresses.
        router.push("/estimate");
    }
  };

  return (
    <div className="mt-12 p-10 max-w-lg mx-auto space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold z-10" size={20} />
          {isLoaded ? (
            <Autocomplete
              onLoad={(ref) => (pickupAutocompleteRef.current = ref)}
              onPlaceChanged={onPickupPlaceChanged}
            >
              <input
                placeholder="Pickup address"
                className="w-full h-16 pl-16 pr-6 border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              />
            </Autocomplete>
          ) : (
            <Input
              placeholder="Pickup address"
              className="w-full h-16 pl-16 pr-6 border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              disabled
            />
          )}
        </div>
        <div className="relative">
          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold z-10" size={20} />
          {isLoaded ? (
            <Autocomplete
              onLoad={(ref) => (dropAutocompleteRef.current = ref)}
              onPlaceChanged={onDropPlaceChanged}
            >
              <input
                placeholder="Drop-off address"
                className="w-full h-16 pl-16 pr-6 border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              />
            </Autocomplete>
          ) : (
            <Input
              placeholder="Drop-off address"
              className="w-full h-16 pl-16 pr-6 border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              disabled
            />
          )}
        </div>
      </div>

      {pickup && drop && distanceKm > 0 && (
        <div className="p-6 bg-brand-gold/5 rounded-2xl border border-brand-gold/20 animate-in fade-in zoom-in-95 duration-300">
           <div className="flex justify-between items-center">
             <div>
                <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-1">Estimated Price</p>
                <p className="text-4xl font-bold text-gray-900">${totalEstimated.toFixed(0)}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Distance</p>
                <p className="text-xl font-bold text-gray-700">{distanceKm.toFixed(1)} km</p>
             </div>
           </div>
        </div>
      )}

      <Button 
        onClick={handleSeePrices}
        className="w-full h-14 text-xl font-semibold rounded-[16px] bg-brand-gold hover:bg-[#D4A017] text-white shadow-xl shadow-brand-gold/20 transition-all flex items-center justify-center gap-2"
      >
        <span>See accurate prices</span>
        <ChevronRight size={24} />
      </Button>
    </div>
  );
}
