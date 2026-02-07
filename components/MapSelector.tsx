'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDRDMTguNDggNCAxNCA4LjQ4IDE0IDE0QzE0IDE5LjUyIDI0IDM2IDI0IDM2QzI0IDM2IDM0IDE5LjUyIDM0IDE0QzM0IDguNDggMjkuNTIgNCAyNCA0Wk0yNCAxOEMyMi44OSAxOCAyMiAxNy4xMSAyMiAxNkMyMiAxNC44OSAyMi44OSAxNCAyNCAxNEMyNS4xMSAxNCAyNiAxNC44OSAyNiAxNkMyNiAxNy4xMSAyNS4xMSAxOCAyNCAxOFoiIGZpbGw9IiNCODhGMEIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNCA0QzE4LjQ4IDQgMTQgOC40OCAxNCAxNEMxNCAxOS41MiAyNCAzNiAyNCAzNkMyNCAzNiAzNCAxOS41MiAzNCAxNEMzNCA4LjQ4IDI5LjUyIDQgMjQgNFpNMjYgMTZDMjYgMTcuMTEgMjUuMTEgMTggMjQgMThDMjIuODkgMTggMjIgMTcuMTEgMjIgMTZDMjIgMTQuODkgMjIuODkgMTQgMjQgMTRDMjUuMTEgMTQgMjYgMTQuODkgMjYgMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

interface MapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
  initialLocation?: { lat: number; lng: number };
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (loc: any) => void }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const markerRef = useRef<any>(null);

  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      
      // Get address from coordinates
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'MoveItApp/1.0'
            }
          }
        );
        const data = await response.json();
        
        if (data.display_name) {
          setAddress(data.display_name);
          onLocationSelect({ lat, lng, address: data.display_name });
        } else {
          setAddress('Address not found');
          onLocationSelect({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
        onLocationSelect({ lat, lng });
      }
    },
  });

  // Set initial position if provided
  useEffect(() => {
    if (position) {
      markerRef.current?.openPopup();
    }
  }, [position]);

  return position === null ? null : (
    <Marker position={position} icon={customIcon} ref={markerRef}>
      <Popup>
        <div className="p-2">
          <strong className="text-gray-800">Selected Location</strong>
          <p className="text-sm text-gray-600 mt-1">
            Lat: {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
          </p>
          {address && (
            <p className="text-xs text-gray-500 mt-2">{address}</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapSelector({ onLocationSelect, initialLocation }: MapSelectorProps) {
  const defaultCenter = initialLocation || { lat: 40.7128, lng: -74.0060 }; // New York

  return (
    <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl">
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '2rem' }}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}