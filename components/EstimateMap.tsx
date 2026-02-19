"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  center: { lat: number; lng: number };
  pickup: { lat: number; lng: number } | null;
  drop: { lat: number; lng: number } | null;
}

export default function EstimateMap({ center, pickup, drop }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const marker1Ref = useRef<any>(null);
  const marker2Ref = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const L = require("leaflet");
    if (mapRef.current) return;

    // Custom SVG Markers
    const createMarkerIcon = (color: string) => L.divIcon({
      html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="9" r="3" fill="white"/>
      </svg>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    // Initialize Map with CartoDB Positron (Grayscale/Minimalist)
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([center.lat, center.lng], 13);
    
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapRef.current = map;
    (mapRef.current as any)._markerIcon1 = createMarkerIcon("#a67c00"); // Pickup Amber
    (mapRef.current as any)._markerIcon2 = createMarkerIcon("#1f2937"); // Dropoff Dark

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const L = require("leaflet");
    const map = mapRef.current;
    const icon1 = (map as any)._markerIcon1;
    const icon2 = (map as any)._markerIcon2;

    // Update view
    map.setView([center.lat, center.lng]);

    // Update Pickup Marker
    if (marker1Ref.current) marker1Ref.current.remove();
    if (pickup) {
      marker1Ref.current = L.marker([pickup.lat, pickup.lng], { icon: icon1 }).addTo(map);
    }

    // Update Drop Marker
    if (marker2Ref.current) marker2Ref.current.remove();
    if (drop) {
      marker2Ref.current = L.marker([drop.lat, drop.lng], { icon: icon2 }).addTo(map);
    }

    // Update Polyline - Theme Style (Amber)
    if (polylineRef.current) polylineRef.current.remove();
    if (pickup && drop) {
      polylineRef.current = L.polyline(
        [[pickup.lat, pickup.lng], [drop.lat, drop.lng]],
        { 
          color: "#a67c00", 
          weight: 6, 
          opacity: 0.8,
          lineJoin: 'round',
          lineCap: 'round'
        }
      ).addTo(map);

      // Fit bounds if both points exist
      map.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [center, pickup, drop]);

  return <div ref={mapContainerRef} className="h-full w-full bg-[#f8fafc]" />;
}



