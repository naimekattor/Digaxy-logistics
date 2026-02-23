// app/locations/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/MainLayout';

export const metadata = {
  title: 'Find Digaxy Near You - Moving & Delivery Services',
  description: 'Discover Digaxy moving, delivery, and hauling services in cities across the US.',
};

export default function LocationsPage() {
  // Featured/popular cities with images (Colorado-focused as per your screenshot)
  const popularCities = [
    {
      name: 'Denver, CO',
      description: 'Capital City - Busy & High Demand',
      imageUrl: 'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/panoramic-images/skyline-and-mountains-at-dusk-denver-colorado,104696.jpg?max=800',
      alt: 'Denver skyline at sunset with Rocky Mountains',
    },
    {
      name: 'Boulder, CO',
      description: 'College Town - Active & Vibrant',
      imageUrl: 'http://res.cloudinary.com/simpleview/image/upload/v1479846824/clients/boulder/Winter_Flatirons_with_hiker_and_dog_7fe5c1a7-e428-4433-ab02-b676f91d2e9e.jpg',
      alt: 'Boulder Flatirons rock formations in winter',
    },
    {
      name: 'Aurora, CO',
      description: 'Growing Suburb - Diverse & Expanding',
      imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/stock%2FGettyImages-149002153',
      alt: 'Aurora Colorado city view with mountains',
    },
    {
      name: 'New York City, NY',
      description: 'Family-Friendly - Fast-Developing Area',
      imageUrl: 'https://pikwizard.com/pw/medium/30d86d3029b43aaf79543eb3c468949d.jpg',
      alt: 'New York City Times Square at night with bright lights',
    },
    {
      name: 'Vail, CO',
      description: 'Resort Town - Premium Mountain Destination',
      imageUrl: 'https://vailwillows.com/wp-content/uploads/2024/06/Building-Exteriors-3.jpg',
      alt: 'Vail Colorado ski resort village and mountains',
    },
    {
      name: 'Eagle Mountain (Eagle), CO',
      description: 'Outdoor Community - Peaceful & Scenic',
      imageUrl: 'https://townsquare.media/site/510/files/2022/06/attachment-33-neighborhood.JPG?w=780&q=75', // fallback scenic mountain town
      alt: 'Eagle Colorado mountain landscape',
    },
    {
      name: 'Colorado Springs, CO',
      description: 'Military Hub - Stable & High Activity',
      imageUrl: 'https://mln4vdu6fmby.i.optimole.com/cb:A1Bt.2bf42/w:700/h:500/q:mauto/rt:fill/g:ce/f:best/https://manitousprings.org/wp-content/uploads/2019/04/hero-Colorado_Springs_CVB_-_Downtown__21downtown-colorado-springs.jpg',
      alt: 'Colorado Springs downtown with Pikes Peak',
    },
    {
      name: 'Fort Collins, CO',
      description: 'University City - Trendy & Youthful',
      imageUrl: 'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/panoramic-images/skyline-and-mountains-at-dusk-denver-colorado,104696.jpg?max=800', // placeholder - replace with actual Fort Collins image
      alt: 'Fort Collins cityscape',
    },
    {
      name: 'Aspen, CO',
      description: 'Luxury Resort - High-End & Popular',
      imageUrl: 'https://vailwillows.com/wp-content/uploads/2024/06/Building-Exteriors-3.jpg', // placeholder - replace with Aspen-specific
      alt: 'Aspen Colorado luxury resort streets',
    },
  ];

  // Other states list (as plain text columns)
  const otherStates = {
    Texas: [
      'Austin', 'Dallas', 'Houston', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Plano',
      'Irving', 'Garland', 'Frisco', 'McKinney', 'Round Rock', 'Pasadena', 'Lubbock', 'Grand Prairie',
      'Waco', 'Carrollton', 'Abilene',
    ],
    Florida: [
      'Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Hialeah', 'Fort Lauderdale',
      'Cape Coral', 'Tallahassee', 'Pembroke Pines', 'Hollywood', 'Gainesville', 'Miramar',
      'Coral Springs', 'Clearwater', 'Palm Bay', 'West Palm Beach', 'Lakeland', 'Pompano Beach',
    ],
    Georgia: [
      'Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon', 'Roswell', 'Sandy Springs', 'Johns Creek',
      'Warner Robins', 'Valdosta', 'Marietta', 'Brookhaven', 'Smyrna', 'Dunwoody', 'Peachtree City',
      'Athens', 'Gainesville', 'Canton',
    ],
  };

  return (
    <MainLayout>
         <main className="min-h-screen bg-gray-50">
      {/* Hero / Map Section */}
      <section className="py-16 px-6 md:px-12 bg-white border-b">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find <span className="text-brand-gold">Digaxy</span> Near You
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Moving, delivery and hauling services available in selected cities across the country. 
            Search your city to get started.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-gold text-white px-6 py-2 rounded-full font-medium hover:bg-amber-700 transition">
                Search
              </button>
            </div>
          </div>

          {/* US Map Placeholder */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              {/* You can replace this with an actual interactive map (e.g., react-simple-maps or SVG) */}
              <div className="text-center py-20 bg-gray-100 rounded-xl border border-gray-200">
                <p className="text-xl font-medium text-gray-700">
                  Interactive US Map with pins in: Colorado (State)
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  (Pins in Denver, Boulder, Aurora, Colorado Springs, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Cities We Serve
            </h2>
            <p className="text-xl text-amber-600 font-medium">
              Colorado (State)
            </p>
            <p className="text-gray-600 mt-2">
              Fast service across Colorado cities.
            </p>
          </div>

          {/* Hero Banner Image */}
         <div className="mb-12 aspect-[3.04/1] rounded-2xl overflow-hidden shadow-xl relative">
  <Image
    src="/images/city.png"
    alt="Colorado cities panorama"
    fill
    className="object-cover"
    priority
  />
</div>


          {/* City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
  {popularCities.map((city) => (
    <div
      key={city.name}
      className="group bg-white flex rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200"
    >
      {/* IMAGE */}
      <div className="relative w-1/3">
        <Image
          src={city.imageUrl}
          alt={city.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* TEXT */}
      <div className="p-6 flex items-center justify-between w-2/3">
        <div className='w-1/2'>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{city.name}</h3>
          <p className="text-gray-600 mb-4">{city.description}</p>
        </div>
        <Link
          href={`/cities/${encodeURIComponent(
            city.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
          )}`}
          className="inline-block text-amber-600 font-semibold hover:text-amber-800 transition"
        >
          See services 
        </Link>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* Other States List */}
      <section className="py-16 px-6 md:px-12 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            More Cities Coming Soon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {Object.entries(otherStates).map(([state, cities]) => (
              <div key={state}>
                <h3 className="text-2xl font-bold text-amber-600 mb-6">{state}</h3>
                <ul className="space-y-2 text-gray-700">
                  {cities.map((city) => (
                    <li key={city} className="hover:text-amber-600 transition">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </MainLayout>
  );
}