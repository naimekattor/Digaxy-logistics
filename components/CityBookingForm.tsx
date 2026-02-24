"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export default function CityBookingForm() {
  const router = useRouter();
  const [pickup, setPickup] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);
  const [drop, setDrop] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
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
    if (dropAutocompleteRef.current !== null) {
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

  const handleSeePrices = () => {
    if (pickup && drop) {
      const searchParams = new URLSearchParams({
        pickup_lat: pickup.lat.toFixed(6),
        pickup_lng: pickup.lng.toFixed(6),
        pickup_label: pickup.label,
        drop_lat: drop.lat.toFixed(6),
        drop_lng: drop.lng.toFixed(6),
        drop_label: drop.label,
      });
      router.push(`/estimate?${searchParams.toString()}`);
    } else {
      // If one is missing, we could show a toast or just wait for both
      alert("Please select both pickup and drop-off addresses from the suggestions.");
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pickup address
        </label>
        {isLoaded ? (
          <Autocomplete
            onLoad={(ref) => (pickupAutocompleteRef.current = ref)}
            onPlaceChanged={onPickupPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm"
            />
          </Autocomplete>
        ) : (
          <div className="w-full h-[58px] bg-gray-100 rounded-xl animate-pulse" />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Drop-off address
        </label>
        {isLoaded ? (
          <Autocomplete
            onLoad={(ref) => (dropAutocompleteRef.current = ref)}
            onPlaceChanged={onDropPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter drop-off location"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all shadow-sm"
            />
          </Autocomplete>
        ) : (
          <div className="w-full h-[58px] bg-gray-100 rounded-xl animate-pulse" />
        )}
      </div>

      <button
        onClick={handleSeePrices}
        className="mt-6 w-full inline-flex items-center justify-center px-12 py-5 bg-[#A97200] text-white text-xl font-bold rounded-2xl shadow-lg  hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
      >
        See prices
      </button>
    </div>
  );
}
