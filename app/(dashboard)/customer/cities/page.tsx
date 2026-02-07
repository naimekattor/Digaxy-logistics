import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';

const citiesInColorado = [
  { name: 'Denver, CO', description: 'Capital City - Busy & High Demand', imageUrl: '/images/denver.jpg' },
  { name: 'Boulder, CO', description: 'College Town - Active & Vibrant', imageUrl: '/images/denver.jpg' },
  { name: 'Aurora, CO', description: 'Growing Suburb - Diverse & Expanding', imageUrl: '/images/denver.jpg' },
  { name: 'New York City, NY', description: 'Family Friendly - Fast Developing Area', imageUrl: '/images/denver.jpg' }, // Note: Keeping NY as per image request even if odd under CO
  { name: 'Vail, CO', description: 'Resort Town - Premium Mountain Destination', imageUrl: '/images/denver.jpg' },
  { name: 'Eagle Mountain (Eagle), CO', description: 'Outdoor Community - Peaceful & Scenic', imageUrl: '/images/denver.jpg' },
  { name: 'Colorado Springs, CO', description: 'Military Hub - Stable & High Activity', imageUrl: '/images/denver.jpg' },
  { name: 'Fort Collins, CO', description: 'University City - Trendy & Beautiful', imageUrl: '/images/denver.jpg' },
  { name: 'Aspen, CO', description: 'Luxury Resort - High-End & Popular', imageUrl: '/images/denver.jpg' },
];

const stateLists = {
  Texas: ['Austin', 'Dallas', 'Houston', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Plano', 'Irving', 'Garland', 'Frisco', 'McKinney', 'Round Rock', 'Pasadena', 'Lubbock', 'Grand Prairie', 'Brownsville', 'Waco', 'Carrollton', 'Abilene'],
  Florida: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Cape Coral', 'Pembroke Pines', 'Hollywood', 'Gainesville', 'Miramar', 'Coral Springs', 'Clearwater', 'Palm Bay', 'West Palm Beach', 'Lakeland', 'Pompano Beach'],
  Georgia: ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Roswell', 'Sandy Springs', 'Johns Creek', 'Albany', 'Warner Robins', 'Valdosta', 'Marietta', 'Brookhaven', 'Smyrna', 'Dunwoody', 'Peachtree City', 'Athens', 'Gainesville', 'Canton']
};

export default function Cities() {
  return (
    <div className="min-h-screen py-12 font-sans text-gray-900">
      <main className="max-w-4xl mx-auto px-4 md:px-8">


        {/* --- Popular Cities (Colorado) --- */}
        <section className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-2">Popular Cities We Serve</h2>
            <h3 className="text-lg font-bold text-gray-500">Colorado (State)</h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Fast service across Colorado cities</p>
          </div>

          <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-10">
            <Image
              src="/images/citiesbanner.jpg"
              alt="Colorado"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {citiesInColorado.map((city, index) => (
              <div
                key={index}
                className="flex items-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100 group"
              >
                <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-gray-100">
                  <Image
                    src={city.imageUrl}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-base font-bold text-gray-900 truncate">{city.name}</h3>
                  <p className="text-xs text-gray-400 font-medium truncate">{city.description}</p>
                </div>
                <Link 
                    href={`/customer/cities/${city.name.toLowerCase().split(',')[0].replace(/\s+/g, '-')}`}
                    className="ml-2 text-xs font-bold text-[#A87900] hover:underline whitespace-nowrap"
                >
                    See services
                </Link>
              </div>
            ))}
          </div>
        </section>

        

      </main>
    </div>
  );
}

// Simple internal component for the map pin graphic
const MapPinFilled = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
    </svg>
);
