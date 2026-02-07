import { cn } from '@/lib/utils'
import React from 'react'

const EstimateSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Get an instant estimate
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Add your pickup and drop-off location to calculate your price.
      </p>
    </div>

    <div className="bg-gradient-to-r from-[#C29A47]/15
to-[#2B4C54]/15  rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-8 md:p-12">
      {/* Subtle top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>

      <div className="space-y-10">
        

        {/* Locations Grid */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-2">
            <label className="block text-[21px] font-semibold text-gray-700">Pickup location</label>
            <input
              type="text"
              placeholder="Where should we pick up your item?"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-800 placeholder-gray-400 shadow-sm"
            />
          </div>

          <div className="space-y-2 relative">
  <label className="block text-[21px] font-semibold text-gray-700">
    Drop-off location
  </label>

  <div className="relative">
    <input
      type="text"
      placeholder="Where should we deliver?"
      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-800 placeholder-gray-400 shadow-sm"
    />
    <button
      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors"
    >
      Use current location
    </button>
  </div>
</div>

        </div>


        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-6 md:gap-12 py-4">
          <div className="flex flex-col items-center">
            
            <span className="mt-2 text-sm font-medium text-gray-500">Pickup</span>
          </div>
          <div className="flex-1 h-1 bg-[#ACACAC] rounded max-w-[120px]"></div>
          <div className="flex flex-col items-center">
            
            <span className="mt-2 text-sm font-medium text-gray-500">Drop-off</span>
          </div>
          <div className="flex-1 h-1 bg-[#ACACAC] rounded max-w-[120px]"></div>
          <div className="flex flex-col items-center opacity-60">
            
            <span className="mt-2 text-sm font-medium text-gray-500">Estimate</span>
          </div>
        </div>

       

        {/* CTA */}
        <div className="text-center">
          <button className="inline-flex items-center px-12 py-5 bg-[#A97200] text-white text-xl font-bold rounded-2xl shadow-lg shadow-amber-300/40 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-400/50 transform hover:scale-[1.03] transition-all duration-300">
            Get Instant Estimate
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default EstimateSection
