'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui/Primitives';
import { 
    ChevronLeft, Truck, Calendar, Clock, MapPin, 
    DollarSign, XCircle, Info, RefreshCw, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Tab = 'Active' | 'Completed' | 'Cancelled';

export default function CustomerBookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Active');
  const [selectedCancelled, setSelectedCancelled] = useState<any>(null);
  const router = useRouter();

  const tabs: Tab[] = ['Active', 'Completed', 'Cancelled'];

  const cancelledBookings = [
      { id: '8832', type: 'Pickup', date: 'Nov 12, 2025', from: '34 Park Ave', to: '21 Green St', reason: 'Change in delivery time', refund: 'Processed ($45)', icon: Truck },
      { id: '8745', type: 'Pickup Van', date: 'Oct 28, 2025', from: '102 Lake View Rd', to: '55 Maple St', reason: 'Driver delayed too long', refund: 'Pending approval', icon: Truck },
  ];

  return (
    <div className="max-w-4xl px-4 pb-20">
        <button 
            onClick={() => router.back()}
            className="flex items-center gap-4 text-3xl font-bold text-gray-900 mb-12 hover:text-brand-gold transition-colors"
        >
            <ChevronLeft size={32} />
            My Bookings
        </button>

        <div className="flex gap-4 mb-12">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "px-10 py-4 rounded-full text-xl font-bold transition-all border-2",
                        activeTab === tab 
                            ? "bg-gray-200 border-brand-gold/30 text-gray-900" 
                            : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>

        {activeTab === 'Active' && (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Card Example:</h3>
                <Card className="p-10 bg-gray-200 border-none rounded-[2rem] space-y-6">
                    <div className="flex items-center gap-4 text-brand-gold font-bold text-xl italic">
                        <Truck size={24} /> Booking #8832 - Mini Truck
                    </div>
                    <div className="flex flex-wrap gap-8 text-lg font-bold text-gray-700 italic">
                        <div className="flex items-center gap-2"><Calendar size={20} className="text-brand-gold" /> Nov 12, 2025</div>
                        <div className="flex items-center gap-2"><Clock size={20} className="text-brand-gold" /> 10:00AM - 12:00PM</div>
                    </div>
                    <div className="space-y-4 text-lg font-bold text-gray-700 italic">
                        <div className="flex items-center gap-4"><MapPin size={20} className="text-brand-gold" /> From: 34 Park Ave</div>
                        <div className="flex items-center gap-4 text-brand-gold"><ChevronLeft size={20} className="rotate-180" /> To: 21 Green St</div>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-700 italic">
                       <DollarSign size={20} className="text-brand-gold" /> $90.00 / Status: On the way
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button className="w-48 h-14 rounded-2xl bg-brand-gold hover:bg-[#D4A017] text-lg font-bold text-white shadow-xl">Track</Button>
                        <Button variant="ghost" className="w-48 h-14 rounded-2xl border-2 border-brand-gold/30 text-lg font-bold text-gray-700 italic">Cancel</Button>
                    </div>
                </Card>
            </div>
        )}

        {activeTab === 'Completed' && (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Shows finished deliveries:</h3>
                <Card className="p-10 bg-gray-200 border-none rounded-[2rem] space-y-6">
                    <div className="flex items-center gap-4 text-brand-gold font-bold text-xl italic">
                        <Truck size={24} /> Booking #87832 - Cargo Van
                    </div>
                    <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                        <Calendar size={20} className="text-brand-gold" /> Completed Nov 12,2025
                    </div>
                    <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                        <MapPin size={20} className="text-brand-gold" /> 4.5/5 "Handled carefully"
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button className="w-48 h-14 rounded-2xl bg-brand-gold hover:bg-[#D4A017] text-lg font-bold text-white shadow-xl">View Receipt</Button>
                        <Button variant="ghost" className="w-48 h-14 rounded-2xl border-2 border-brand-gold/30 text-lg font-bold text-gray-700 italic">Book Again</Button>
                    </div>
                </Card>
            </div>
        )}

        {activeTab === 'Cancelled' && (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Shows finished deliveries:</h3>
                {cancelledBookings.map(b => (
                    <Card 
                        key={b.id} 
                        onClick={() => setSelectedCancelled(b)}
                        className="p-10 bg-gray-200 border-none rounded-[2rem] space-y-5 cursor-pointer hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-center gap-4 text-red-500 font-bold text-xl italic">
                            <XCircle size={24} /> Booking #{b.id} - {b.type}
                        </div>
                        <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                            <Calendar size={20} className="text-brand-gold" /> Cancelled on {b.date}
                        </div>
                        <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                            <MapPin size={20} className="text-brand-gold" /> From: {b.from}
                        </div>
                        <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                            <MapPin size={20} className="text-brand-gold opacity-50" /> To: {b.to}
                        </div>
                        <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                            <RefreshCw size={20} className="text-brand-gold" /> Reason: {b.reason}
                        </div>
                        <div className="flex items-center gap-4 text-lg font-bold text-gray-700 italic">
                            <DollarSign size={20} className="text-brand-gold" /> Refund: {b.refund}
                        </div>
                    </Card>
                ))}
            </div>
        )}

        {/* Cancelled Details Popup */}
        {selectedCancelled && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                <Card className="w-full max-w-lg bg-white p-10 rounded-[3rem] shadow-2xl relative animate-in fade-in zoom-in duration-200">
                    <button 
                        onClick={() => setSelectedCancelled(null)}
                        className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-400" />
                    </button>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 italic">Booking Details</h2>
                    
                    <div className="space-y-6 mb-10">
                        <div className="flex items-center gap-4 text-red-500 font-bold text-xl italic">
                            <XCircle size={24} /> Cancelled
                        </div>
                        <div className="space-y-4">
                            <p className="text-lg font-bold"><span className="text-gray-500 italic uppercase tracking-widest text-xs block mb-1">Booking ID</span> #{selectedCancelled.id}</p>
                            <p className="text-lg font-bold"><span className="text-gray-500 italic uppercase tracking-widest text-xs block mb-1">Vehicle Type</span> {selectedCancelled.type}</p>
                            <p className="text-lg font-bold"><span className="text-gray-500 italic uppercase tracking-widest text-xs block mb-1">Route</span> {selectedCancelled.from} → {selectedCancelled.to}</p>
                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                                <p className="text-red-900 font-bold text-sm mb-1 uppercase tracking-widest">Cancellation Reason</p>
                                <p className="text-red-700 italic font-medium">{selectedCancelled.reason}</p>
                            </div>
                            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                                <p className="text-green-900 font-bold text-sm mb-1 uppercase tracking-widest">Refund Status</p>
                                <p className="text-green-700 italic font-medium">{selectedCancelled.refund}</p>
                            </div>
                        </div>
                    </div>

                    <Button 
                        onClick={() => setSelectedCancelled(null)}
                        className="w-full h-16 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-lg font-bold text-white"
                    >
                        Close Details
                    </Button>
                </Card>
            </div>
        )}
    </div>
  );
}
