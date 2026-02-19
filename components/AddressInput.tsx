import { useState, useEffect } from "react";
import { searchAddress } from "@/utils/geocode";

interface AddressInputProps {
  label: string;
  onSelect: (place: { lat: number; lng: number; label: string }) => void;
}

export default function AddressInput({ label, onSelect }: AddressInputProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(async () => {
      const results = await searchAddress(query);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="mb-4 relative">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        className="border p-2 w-full"
        placeholder={label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full max-h-40 overflow-auto z-10">
          {suggestions.map((s) => (
            <li
              key={s.label}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(s);
                setQuery(s.label);
                setSuggestions([]);
              }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
