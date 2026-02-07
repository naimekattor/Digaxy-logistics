'use client';

import React from 'react';
import { ChevronLeft, User, Phone, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3 sticky top-0 z-10 bg-white">
        <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Edit</h1>
      </div>

      <div className="flex flex-col items-center mt-8 mb-10">
        <div className="relative">
            <div className="w-32 h-32 rounded-full border border-brand-gold overflow-hidden p-1">
                <img 
                    src="https://picsum.photos/200" 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover" 
                />
            </div>
            <button className="absolute bottom-0 right-0 bg-gray-500 text-white p-1.5 rounded-lg border-2 border-white">
                <Camera size={16} />
            </button>
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">naimdoel@gmail.com</h2>
      </div>

      <div className="px-8 space-y-6 max-w-lg mx-auto">
        
        {/* Name Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 pl-1">Name</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User size={20} />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter your name"
                    defaultValue="Joe Mitchell"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-brand-gold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-gray-400"
                />
            </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 pl-1">Phone</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone size={20} />
                </div>
                <input 
                    type="tel" 
                    placeholder="Phone number"
                    defaultValue="01832074027"
                    className="w-full pl-12 pr-4 py-3.5 rounded-full border border-brand-gold text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all placeholder:text-gray-400"
                />
            </div>
        </div>

      </div>
    </div>
  );
}
