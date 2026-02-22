'use client';

import React, { useEffect } from 'react';
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 23.7809,
  lng: 90.4075,
};

export default function MapTestPage() {
  const testGeocode = async () => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=Dhaka&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await res.json();
    console.log('Geocode Response:', data);
  };

  useEffect(() => {
    testGeocode();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Google Maps Test (Logistics App)
      </h1>

      <LoadScript
        googleMapsApiKey={
          process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
        }
        libraries={['places']}
      >
        {/* Autocomplete MUST be inside LoadScript */}
        <Autocomplete>
          <input
            type="text"
            placeholder="Search location"
            className="border p-2 w-full mb-4"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}