'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTrackingStore } from '@/stores/trackingStore';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '70vh', 
};

export default function TrackingPage() {
  const { parcelId } = useParams();
  const { data: session } = useSession();

  const { connect, disconnect, location, connected } = useTrackingStore();

  const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    if (session?.accessToken && parcelId) {
      connect(session.accessToken, parcelId as string);
    }
    return () => {
      disconnect();
    };
  }, [session, parcelId]);

  if (!isLoaded) return <div className="p-6 text-center">Loading map...</div>;

  const driverLocation = location;
  console.log("Driver Location:", driverLocation);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Live Parcel Tracking</h2>

      {/* Status Card */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="font-semibold text-gray-700">
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        {driverLocation ? (
          <div className="text-right text-gray-600 text-sm">
            <p>
              Lat: <span className="font-medium">{driverLocation.lat.toFixed(6)}</span>
            </p>
            <p>
              Lng: <span className="font-medium">{driverLocation.lng.toFixed(6)}</span>
            </p>
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Waiting for live location...</span>
        )}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            driverLocation
              ? { lat: driverLocation.lat, lng: driverLocation.lng }
              : { lat: 23.8103, lng: 90.4125 }
          }
          zoom={15}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#7c93a3' }, { lightness: '-10' }],
              },
              { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
              { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#cfd9de' }] },
            ],
          }}
        >
          {driverLocation && (
            <Marker
              position={{ lat: driverLocation.lat, lng: driverLocation.lng }}
              icon={{
                url: '/images/van.png', 
                scaledSize: new google.maps.Size(150, 150), 
                anchor: new google.maps.Point(20, 20), 
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}