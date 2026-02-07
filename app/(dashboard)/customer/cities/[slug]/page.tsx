import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, Truck, MapPin, Check, Search } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui/Primitives';

import { notFound } from 'next/navigation';

export default async function DynamicCityPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug || typeof slug !== 'string') {
    return notFound();
  }

  // Format slug back to city name (e.g., "denver" -> "Denver")
  const cityName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const cityStates: Record<string, string> = {
    'denver': 'CO', 'boulder': 'CO', 'aurora': 'CO', 'vail': 'CO', 'eagle': 'CO',
    'colorado-springs': 'CO', 'fort-collins': 'CO', 'aspen': 'CO', 'new-york-city': 'NY'
  };

  const state = cityStates[slug] || 'CO';

  return (
    <div className="min-h-screen pb-20">
      <main className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-10">
          <Link href="/customer/cities" className="flex items-center text-gray-700 hover:text-brand-gold transition-colors group">
              <ChevronLeft size={32} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xl font-bold">Cities</span>
          </Link>
        </div>

        <section className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">Digaxy Movers in <br /> <span className="text-brand-gold italic">{cityName}, {state}</span></h1>
          <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto">
            Fast, affordable on-demand moving and delivery services anywhere in {cityName}!
          </p>

          <div className="mt-12 p-10 max-w-lg mx-auto space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" size={20} />
                    <Input
                        placeholder="Pickup address"
                        className="w-full h-16 pl-16 pr-6  border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" size={20} />
                    <Input
                        placeholder="Drop-off address"
                        className="w-full h-16 pl-16 pr-6  border rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                </div>
            </div>
            <Button className="w-96 h-14 text-xl font-semibold rounded-[16px] bg-brand-gold hover:bg-[#D4A017] text-white  shadow-xl shadow-brand-gold/20 transition-all text-xl">
              See prices
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <div className="relative w-full h-[25rem] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/denver.jpg"
              alt={`${cityName} cityscape`}
              fill
              className="object-cover"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { label: 'Overall Rating', value: '4.9/5', icon: Star },
            { label: 'Delivery Rating', value: '4.8/5', icon: Truck },
            { label: 'Furniture Moves', value: '4.7/5', icon: MapPin },
          ].map((stat, i) => (
            <div key={i} className="p-8 text-center flex items-center gap-4  transition-all ">
                <div className="w-16 h-16  flex items-center justify-center text-brand-gold mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon size={32} />
                </div>
                <div>
                  <p className="font-bold text-[#202020] uppercase tracking-widest text-xs mb-1">{stat.label}</p>
                <p className="text-xs font-bold  text-[#202020]">— {stat.value}</p>
                </div>
                
            </div>
          ))}
        </section>

        <section className="mb-20">
          <h2 className="text-xl font-bold text-gray-900 mb-12 text-center">Service Available In This City</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lite', desc: 'Small/light items',imageSrc:"/images/pickup_truck.png" },
              { name: 'Van', desc: 'Large moves',imageSrc:"/images/van.png" },
              { name: 'Pickup', desc: 'Medium moves',imageSrc:"/images/mini_box_truck.png" },
              { name: 'XL', desc: 'Overloaded loads',imageSrc:"/images/26Feet_box_truck.png" },
            ].map((v, i) => (
              <Card key={i} className="p-6 bg-white border-none rounded-[2rem] shadow-sm hover:border-brand-gold border-2 border-transparent transition-all flex flex-col items-center justify-center text-center cursor-pointer group">
                  <div className="relative w-24 h-16 mb-4 group-hover:scale-105 transition-transform">
                    <Image src={v.imageSrc} alt={v.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{v.name}</h3>
                  <p className="text-sm text-gray-400 font-medium italic">{v.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className=" p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10">
              <h2 className="text-4xl font-black mb-12">Why Choose Digaxy In <br /><span className="text-brand-gold">{cityName}</span></h2>
              <div className="space-y-4 gap-8 max-w-3xl">
                {[
                  'Near-instant delivery times',
                  'Best rates for short-distance moves',
                  'Movers available 7 days a week',
                  'Same-day and scheduled deliveries',
                  'Background-checked helpers'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 text-xl font-medium">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                        <Check size={20} />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}
