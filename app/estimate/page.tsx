import React from 'react';
import { ChevronDown, Star, MapPin, Navigation } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

const ServiceType = ({ image, name, description }) => (
  <div className="flex flex-col items-center p-6 border border-amber-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="h-16 mb-4 flex items-center justify-center">
      {/* Placeholder for truck illustrations */}
      <div className="w-24 h-12 bg-slate-100 rounded" />
    </div>
    <h4 className="font-bold text-slate-800">{name}</h4>
    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center max-w-xs px-4">
    <div className="w-12 h-12 rounded-full border-2 border-amber-600 flex items-center justify-center mb-4 text-amber-600 font-bold">
      {number}
    </div>
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default function EstimatePage() {
  return (
    <MainLayout>
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="pt-16 pb-12 px-4 text-center">
        <h1 className="text-4xl font-black text-[#0f2a3f] mb-4">Get an estimate</h1>
        <p className="text-slate-500 text-sm">Enter your addresses to see instant prices with Digaxy.</p>
      </header>

      {/* Input Section */}
      <section className="max-w-xl mx-auto px-4 space-y-3 mb-12">
        <input 
          type="text" 
          placeholder="Pickup address" 
          className="w-full px-6 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <input 
          type="text" 
          placeholder="Drop-off address" 
          className="w-full px-6 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button className="w-full bg-[#a67c00] text-white font-bold py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/20">
          see prices
        </button>
      </section>

      {/* Map Illustration Placeholder */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="relative aspect-[16/9] w-full bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-blue-900/5">
          {/* Simulated Map Elements */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />
          <Navigation className="absolute top-1/4 right-1/4 w-8 h-8 text-blue-500 fill-blue-500" />
          <MapPin className="absolute bottom-1/3 left-1/4 w-10 h-10 text-red-500 fill-red-500" />
          
          {/* Price Tags */}
          <div className="absolute top-[20%] left-[25%] bg-[#3b82f6] text-white p-3 rounded-xl shadow-xl">
             <div className="text-[10px] font-bold">23 min</div>
             <div className="text-lg font-black">$2.00</div>
          </div>
          <div className="absolute bottom-[30%] right-[30%] bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-100">
             <div className="text-[10px] font-bold text-slate-400">26 min</div>
             <div className="text-lg font-black">$2.50</div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown & Ratings */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <select className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-400 appearance-none">
                <option>Choose your vehicles</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
            </div>
            <div className="relative">
              <select className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-400 appearance-none">
                <option>Number of items</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-[#0f2a3f] text-center">Service Ratings</h3>
            <div className="space-y-2">
              {[
                { label: "4.9/5 - 1.2k+ reviews", icon: Star },
                { label: "4.8/5 - Delivery ratings", icon: Star },
                { label: "4.7/5 - Furniture moves", icon: Star },
              ].map((rating, i) => (
                <div key={i} className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-500">
                  <rating.icon className="w-3 h-3 text-amber-600 fill-amber-600" />
                  <span>{rating.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-xl">
          <h3 className="font-black text-[#0f2a3f] mb-6">Estimate cost</h3>
          <div className="space-y-4">
            {[
              { label: "Base fare", price: "$0.00" },
              { label: "Distance", price: "$1-100" },
              { label: "Estimated labor", price: "$9.00" },
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-xs font-bold border-b border-slate-100 pb-2">
                <span className="text-slate-500">{row.label}</span>
                <span className="text-[#0f2a3f]">{row.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-black pt-2">
              <span className="text-[#0f2a3f]">Total estimated price</span>
              <span className="text-[#0f2a3f]">$10.00</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 leading-tight italic">
              Final price may vary based on item count & actual time.
            </p>
          </div>
        </div>
      </section>

      {/* Service Types Grid */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <h2 className="text-3xl font-black text-[#0f2a3f] text-center mb-12">Service Types</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceType name="Lite" description="Small/light items" />
          <ServiceType name="Van" description="Large moves" />
          <ServiceType name="Pickup" description="Medium moves" />
          <ServiceType name="XL" description="Oversized loads" />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <h2 className="text-3xl font-black text-[#0f2a3f] text-center mb-16">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <Step 
            number="1" 
            title="Book your Digaxy" 
            description="Choose vehicle, enter pickup & drop-off"
          />
          <Step 
            number="2" 
            title="We'll take it from here" 
            description="Digaxy movers load and transport safely"
          />
          <Step 
            number="3" 
            title="Rate & tip" 
            description="Give feedback after delivery"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-black text-[#0f2a3f] text-center mb-16">What our customers say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Daniel, Phoenix", rate: "$800/week", img: "D" },
            { name: "Alex, Detroit", rate: "$600/week", img: "A" }
          ].map((user, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-white">
              <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-400">
                {user.img}
              </div>
              <div>
                <p className="text-sm font-black text-[#0f2a3f]">I make {user.rate} part-time delivering furniture</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{user.name}</p>
                <p className="text-[10px] text-slate-300 italic">Rated 4.9 across thousands of deliveries</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </MainLayout>
  );
}