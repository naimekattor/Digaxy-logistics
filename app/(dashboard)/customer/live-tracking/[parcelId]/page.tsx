'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTrackingStore } from '@/stores/trackingStore';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100vh',
};
export default function TrackingPage() {
  const { parcelId } = useParams();
  const { data: session } = useSession();

  const { connect, disconnect, location, connected } =
    useTrackingStore();

    const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (session?.accessToken && parcelId) {
      connect(session.accessToken, parcelId as string);
    }

    return () => {
      disconnect(); 
    };
  }, [session, parcelId]);

   if (!isLoaded) return <div>Loading map...</div>;

  const driverLocation = location?.[Object.keys(location)[0]];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Live Tracking</h2>

      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>

      {location ? (
        <div className="mt-4">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      ) : (
        <p>Waiting for live location...</p>
      )}

      <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        driverLocation
          ? { lat: driverLocation.lat, lng: driverLocation.lng }
          : { lat: 23.8103, lng: 90.4125 } // default Dhaka
      }
      zoom={15}
    >
      {driverLocation && (
        <Marker
          position={{
            lat: driverLocation.lat,
            lng: driverLocation.lng,
          }}
        />
      )}
    </GoogleMap>
    </div>
  );
}
