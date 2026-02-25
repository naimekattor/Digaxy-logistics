"use client"
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/MainLayout';
import { useState, useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Search, MapPin } from 'lucide-react';

const LIBRARIES: ('places' | 'geometry')[] = ['places', 'geometry'];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Featured/popular cities with images (Colorado-focused)
  const popularCities = [
    {
      name: 'Denver, CO',
      lat: 39.7392,
      lng: -104.9903,
      description: 'Capital City - Busy & High Demand',
      imageUrl: 'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/panoramic-images/skyline-and-mountains-at-dusk-denver-colorado,104696.jpg?max=800',
      alt: 'Denver skyline at sunset with Rocky Mountains',
    },
    {
      name: 'Boulder, CO',
      lat: 40.0150,
      lng: -105.2705,
      description: 'College Town - Active & Vibrant',
      imageUrl: 'http://res.cloudinary.com/simpleview/image/upload/v1479846824/clients/boulder/Winter_Flatirons_with_hiker_and_dog_7fe5c1a7-e428-4433-ab02-b676f91d2e9e.jpg',
      alt: 'Boulder Flatirons rock formations in winter',
    },
    {
      name: 'Aurora, CO',
      lat: 39.7294,
      lng: -104.8319,
      description: 'Growing Suburb - Diverse & Expanding',
      imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/stock%2FGettyImages-149002153',
      alt: 'Aurora Colorado city view with mountains',
    },
    {
      name: 'New York City, NY',
      lat: 40.7128,
      lng: -74.0060,
      description: 'Family-Friendly - Fast-Developing Area',
      imageUrl: 'https://pikwizard.com/pw/medium/30d86d3029b43aaf79543eb3c468949d.jpg',
      alt: 'New York City Times Square at night with bright lights',
    },
    {
      name: 'Vail, CO',
      lat: 39.6403,
      lng: -106.3742,
      description: 'Resort Town - Premium Mountain Destination',
      imageUrl: 'https://vailwillows.com/wp-content/uploads/2024/06/Building-Exteriors-3.jpg',
      alt: 'Vail Colorado ski resort village and mountains',
    },
    {
      name: 'Eagle Mountain (Eagle), CO',
      lat: 39.6547,
      lng: -106.8286,
      description: 'Outdoor Community - Peaceful & Scenic',
      imageUrl: 'https://townsquare.media/site/510/files/2022/06/attachment-33-neighborhood.JPG?w=780&q=75',
      alt: 'Eagle Colorado mountain landscape',
    },
    {
      name: 'Colorado Springs, CO',
      lat: 38.8339,
      lng: -104.8214,
      description: 'Military Hub - Stable & High Activity',
      imageUrl: 'https://mln4vdu6fmby.i.optimole.com/cb:A1Bt.2bf42/w:700/h:500/q:mauto/rt:fill/g:ce/f:best/https://manitousprings.org/wp-content/uploads/2019/04/hero-Colorado_Springs_CVB_-_Downtown__21downtown-colorado-springs.jpg',
      alt: 'Colorado Springs downtown with Pikes Peak',
    },
    {
      name: 'Fort Collins, CO',
      lat: 40.5853,
      lng: -105.0844,
      description: 'University City - Trendy & Youthful',
      imageUrl: 'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/panoramic-images/skyline-and-mountains-at-dusk-denver-colorado,104696.jpg?max=800',
      alt: 'Fort Collins cityscape',
    },
    {
      name: 'Aspen, CO',
      lat: 39.1911,
      lng: -106.8175,
      description: 'Luxury Resort - High-End & Popular',
      imageUrl: 'https://vailwillows.com/wp-content/uploads/2024/06/Building-Exteriors-3.jpg',
      alt: 'Aspen Colorado luxury resort streets',
    },
  ];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES,
  });

  const filteredCities = useMemo(() => {
    if (!searchTerm) return popularCities;
    return popularCities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const mapCenter = { lat: 39.5501, lng: -105.7821 }; // Focus on Colorado

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
            <div className="max-w-xl mx-auto mb-12 relative">
              <div className="relative">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search city..."
                  className="w-full px-6 py-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Real-time Search Results */}
              {searchTerm && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map(city => (
                      <Link
                        key={city.name}
                        href={`/cities/${encodeURIComponent(city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`}
                        className="flex items-center gap-3 px-6 py-4 hover:bg-amber-50 transition-colors border-b last:border-0 border-gray-50 text-left"
                      >
                        <MapPin size={18} className="text-amber-500" />
                        <div>
                          <p className="font-bold text-gray-900">{city.name}</p>
                          <p className="text-sm text-gray-500">{city.description}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-gray-500 italic">No cities found matching "{searchTerm}"</div>
                  )}
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="mb-16 h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={mapCenter}
                  zoom={7}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [
                      { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#7c93a3' }] },
                      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d2d4' }] },
                    ]
                  }}
                >
                  {popularCities.map((city) => (
                    <Marker
                      key={city.name}
                      position={{ lat: city.lat, lng: city.lng }}
                      title={city.name}
                    />
                  ))}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400 animate-pulse">Loading map...</p>
                </div>
              )}
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

            {/* City Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {filteredCities.map((city) => (
                <div
                  key={city.name}
                  className="group bg-white flex rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
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
                    <div className='w-1/2 text-left'>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{city.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{city.description}</p>
                    </div>
                    <Link
                      href={`/cities/${encodeURIComponent(
                        city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div>
                <h3 className="text-2xl font-bold text-amber-600 mb-6">Texas</h3>
                <ul className="space-y-2 text-gray-700">
                  {['Austin', 'Dallas', 'Houston', 'San Antonio', 'Fort Worth'].map((city) => (
                    <li key={city} className="hover:text-amber-600 transition">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-600 mb-6">Florida</h3>
                <ul className="space-y-2 text-gray-700">
                  {['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg'].map((city) => (
                    <li key={city} className="hover:text-amber-600 transition">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-600 mb-6">Georgia</h3>
                <ul className="space-y-2 text-gray-700">
                  {['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon'].map((city) => (
                    <li key={city} className="hover:text-amber-600 transition">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}