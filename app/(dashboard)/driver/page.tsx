'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Toggle, Button, Card } from '@/components/ui/Primitives';
import EarningsWidget from '@/components/dashboard/EarningsWidget';
import { MapPin, Package, Calendar, FileText, DollarSign, Clock } from 'lucide-react';

export default function DriverDashboardPage() {
  const { data: session } = useSession();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="max-w-5xl">
        {/* Header Section */}
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {session?.user?.name?.split(' ')[0] || 'Naim'}!</h1>
            <p className="text-gray-500 mt-1 font-medium">You're ready to start earning.</p>
        </div>

        {/* Helper Promo */}
        <div className="bg-[#C59D5F] rounded-full py-3 px-8 text-center text-white font-bold text-lg mb-8 cursor-pointer hover:bg-opacity-90 transition shadow-lg shadow-brand-gold/20 max-w-2xl">
            Don't own a truck? Become a certified helper!
        </div>

        {/* Status & Location */}
        <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-900">Online</span>
                <Toggle 
                    enabled={isOnline} 
                    onChange={setIsOnline} 
                />
            </div>
            
            {/* <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <input 
                    type="text" 
                    className="block w-full pl-16 pr-6 py-4 border border-brand-gold/30 rounded-2xl leading-5 bg-white placeholder-gray-500 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all"
                    placeholder="Use current location"
                    readOnly
                />
            </div> */}
        </div>

        {/* No Active Delivery Card */}
        <div className="mb-12 max-w-2xl mx-auto">
            <div className="p-12 border border-brand-gold/40 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-white shadow-sm relative overflow-hidden">
                <h3 className="text-brand-gold font-bold text-2xl mb-4">No Active Deliveries</h3>
                <p className="text-gray-500 mb-8 font-medium max-w-xs leading-relaxed">
                    You'll be notified when a new delivery request comes in
                </p>
                <div className="flex items-center gap-3 text-brand-gold font-bold">
                    <Package size={24} className="animate-bounce" />
                    <span>Waiting for new delivery requests...</span>
                </div>
            </div>
        </div>

        {/* Earnings Overview */}
        <div className="mb-10">
            <h3 className="font-bold text-2xl text-gray-900 mb-6">Earning Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <Calendar size={20} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Today</span>
                    <span className="text-xl font-bold text-gray-800">$212.44</span>
                </Card>
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <Calendar size={20} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">This Week</span>
                    <span className="text-xl font-bold text-gray-800">$812.33</span>
                </Card>
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <FileText size={20} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rating</span>
                    <div className="flex items-center gap-1 text-xl font-bold text-gray-800">
                        <span className="text-brand-gold">★</span> 4.97
                    </div>
                </Card>
            </div>
        </div>

        {/* Quick Actions */}
        <div>
            <h3 className="font-bold text-2xl text-gray-900 mb-6">Quick Action</h3>
            <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 pl-4 pr-8 py-3 rounded-full border border-brand-gold/30 bg-white hover:bg-brand-gold/5 transition-colors text-sm font-bold text-gray-900">
                    <FileText size={18} className="text-gray-700" />
                    My Deliveries
                </button>
                <button className="flex items-center gap-2 pl-4 pr-8 py-3 rounded-full border border-brand-gold/30 bg-white hover:bg-brand-gold/5 transition-colors text-sm font-bold text-gray-900">
                    <DollarSign size={18} className="text-gray-700" />
                    Payouts
                </button>
                <button className="flex items-center gap-2 pl-4 pr-8 py-3 rounded-full border border-brand-gold/30 bg-white hover:bg-brand-gold/5 transition-colors text-sm font-bold text-gray-900">
                    <Clock size={18} className="text-gray-700" />
                    Availability
                </button>
            </div>
        </div>
    </div>
  );
}