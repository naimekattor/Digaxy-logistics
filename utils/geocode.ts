// utils/geocode.ts
export async function searchAddress(query: string): Promise<{ label: string; placeId: string }[]> {
  if (!query) return [];

  // Make sure Google Maps is loaded and `google.maps` is available
  if (!window.google?.maps?.places) return [];

  return new Promise((resolve) => {
    const service = new google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: query,
        // optional: restrict to country
        componentRestrictions: { country: "bd" }, // Bangladesh
      },
      (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
          resolve([]);
          return;
        }

        resolve(
          predictions.map((p) => ({
            label: p.description,
            placeId: p.place_id,
          }))
        );
      }
    );
  });
}

// Get lat/lng from selected place
export async function getPlaceDetails(placeId: string): Promise<{ label: string; lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps?.places) return reject("Google Maps not loaded");

    const service = new google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails(
      {
        placeId,
        fields: ["geometry", "formatted_address"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          resolve({
            label: place.formatted_address!,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        } else {
          reject("Place details not found");
        }
      }
    );
  });
}

// Calculate distance in km (Haversine formula)
export function calculateDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Simple pricing formula
export function calculatePrice(distanceKm: number) {
  const baseFare = 50; // base charge
  const perKm = 15; // per km rate
  return baseFare + distanceKm * perKm;
}