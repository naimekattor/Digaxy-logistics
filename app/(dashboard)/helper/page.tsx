'use client';

import React, { useState } from 'react';
import { Toggle, Button, Card } from '@/components/ui/Primitives';
import EarningsWidget from '@/components/dashboard/EarningsWidget';
import { MapPin, CheckCircle2, Calendar, FileText, DollarSign, Clock } from 'lucide-react';

export default function HelperDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);

  const bulletPoints = [
    "Quick onboarding",
    "ID verification",
    "Start receiving delivery helper jobs"
  ];

  return (
    <div className="max-w-5xl">
        {/* Header Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Become a Certified Helper</h1>
            
            <div className="mt-6 flex items-center gap-4">
                <span className="text-lg font-bold text-gray-900">Online</span>
                <Toggle enabled={isOnline} onChange={setIsOnline} />
            </div>
        </div>

        {/* Description Section */}
        <div className="mb-10 max-w-2xl">
            <p className="text-gray-900 text-lg font-bold leading-relaxed mb-8">
                No truck? No problem. Join as a helper and earn money by assisting in loading, lifting and moving items. Work anytime, set your own schedule.
            </p>

            <div className="space-y-4 mb-10">
                {bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="bg-[#C59D5F] rounded-full p-0.5">
                            <CheckCircle2 size={16} className="text-white" />
                        </div>
                        <span className="text-[#C59D5F] font-bold">{point}</span>
                    </div>
                ))}
            </div>

            <Button className="w-80 h-14 text-xl font-bold rounded-2xl bg-[#B8860B] hover:bg-[#A6790A] shadow-xl text-white">
                Start Helper Registration
            </Button>
        </div>

        {/* Earnings Overview */}
        <div className="mb-12">
            <h3 className="font-bold text-2xl text-gray-900 mb-6">Earning Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <Calendar size={20} className="text-[#1A2E35] mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Today</span>
                    <span className="text-xl font-bold text-gray-800">$212.44</span>
                </Card>
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <Calendar size={20} className="text-[#1A2E35] mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">This Week</span>
                    <span className="text-xl font-bold text-gray-800">$812.33</span>
                </Card>
                <Card className="p-6 bg-[#D9D9D9]/50 border-none rounded-2xl flex flex-col items-center text-center">
                    <FileText size={20} className="text-[#1A2E35] mb-2" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Rating</span>
                    <div className="flex items-center gap-1 text-xl font-bold text-gray-800">
                        <span className="text-[#C59D5F]">★</span> 4.97
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