// Fetch address suggestions from Nominatim
export async function searchAddress(query: string) {
  if (!query) return [];
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
  );
  const data = await res.json();
  return data.map((place: any) => ({
    label: place.display_name,
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
  }));
}

// Calculate distance in km using the Haversine formula (no browser APIs needed)
export function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
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
  const baseFare = 50;  // base charge
  const perKm = 15;     // per km rate
  return baseFare + distanceKm * perKm;
}
