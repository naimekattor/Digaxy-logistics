'use client';

import React from 'react';
import { ChevronLeft, Edit, Camera, User, Mail, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CustomerProfilePage() {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Profile</h1>
        </div>
        <Link href="/customer/profile/edit" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Edit size={20} className="text-gray-900" />
        </Link>
      </div>

      <div className="flex flex-col items-center mt-8 mb-12">
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

      <div className="px-8 space-y-8 max-w-lg mx-auto">
        {/* Name */}
        <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold mt-1">
                <User size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">Your Name</p>
                <p className="text-sm text-gray-600">Joe Mitchell</p>
            </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold mt-1">
                <Mail size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">jonmitchell016@gmail.com</p>
            </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold mt-1">
                <Phone size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">Phone number</p>
                <p className="text-sm text-gray-600">01832074027</p>
            </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold mt-1">
                <MapPin size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">Address</p>
                <p className="text-sm text-gray-600">United States</p>
            </div>
        </div>
      </div>
    </div>
  );
}
