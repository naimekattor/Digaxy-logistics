import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { getPlaceDetails, searchAddress } from "@/utils/geocode";

interface AddressInputProps {
  label: string;
  onSelect: (place: { lat: number; lng: number; label: string }) => void;
}

export default function AddressInput({ label, onSelect }: AddressInputProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const libraries: ("places" | "geometry")[] = ["places", "geometry"];
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!query || !isLoaded) {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchAddress(query); // uses Google AutocompleteService
      setSuggestions(results);
      setLoading(false);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeoutRef.current);
  }, [query, isLoaded]);

  const handleSelect = async (place: any) => {
    const fullPlace = await getPlaceDetails(place.placeId);
    onSelect(fullPlace);
    setQuery(fullPlace.label);
    setSuggestions([]);
  };

  if (!isLoaded) return null; // or loading indicator

  return (
    <div className="mb-4 relative">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        className="border p-2 w-full"
        placeholder={label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <div className="absolute top-full bg-white p-2">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full max-h-40 overflow-auto z-10">
          {suggestions.map((s) => (
            <li
              key={s.placeId}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}