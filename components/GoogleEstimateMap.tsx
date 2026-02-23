"use client";
import React, { useMemo, useCallback, useRef, useEffect, useState } from "react";
import { GoogleMap, MarkerF, PolylineF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#7c93a3" }, { lightness: "-10" }] },
    { featureType: "administrative.country", elementType: "geometry", stylers: [{ visibility: "on" }] },
    { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#a0abb3" }] },
    { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#a0abb3" }] },
    { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#edf1f3" }] },
    { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#d7dfe3" }] },
    { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
    { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
    { featureType: "road.local", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.local", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#cfd9de" }] },
  ],
};

interface Props {
  center: { lat: number; lng: number };
  pickup: { lat: number; lng: number } | null;
  drop: { lat: number; lng: number } | null;
}

export default function GoogleEstimateMap({ center, pickup, drop }: Props) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[]>([]);

  // Fetch directions when pickup/drop change
  useEffect(() => {
    if (!pickup || !drop) {
      setRoutePath([]);
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: drop,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const path = result.routes[0].overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          setRoutePath(path);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [pickup, drop]);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Automatically fit bounds to pickup/drop markers
  useEffect(() => {
    if (!mapRef.current || !pickup || !drop) return;

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(pickup);
    bounds.extend(drop);
    mapRef.current.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  }, [pickup, drop, routePath]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickup || drop || center}
      zoom={13}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {pickup && (
        <MarkerF
          position={pickup}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z",
            fillColor: "#a67c00",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.5,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      )}

      {drop && (
        <MarkerF
          position={drop}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z",
            fillColor: "#1f2937",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.5,
            anchor: new google.maps.Point(12, 22),
          }}
        />
      )}

      {routePath.length > 0 && (
        <PolylineF
          path={routePath}
          options={{
            strokeColor: "#a67c00",
            strokeOpacity: 0.8,
            strokeWeight: 6,
          }}
        />
      )}
    </GoogleMap>
  );
}