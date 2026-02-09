'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@/components/ui/Primitives';
import { 
    ChevronLeft, Truck, Calendar, Clock, MapPin, 
    DollarSign, XCircle, Info, RefreshCw, X,
    ChevronRight, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getPendingParcels, getDeliveredParcels, getCancelledParcels } from '@/services/parcel.service';
import { ParcelResponse, ParcelListResponse } from '@/types/parcel';
import { toast } from 'sonner';

type Tab = 'Active' | 'Completed' | 'Cancelled';

export default function CustomerBookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Active');
  const [parcels, setParcels] = useState<ParcelResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedParcel, setSelectedParcel] = useState<ParcelResponse | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const tabs: Tab[] = ['Active', 'Completed', 'Cancelled'];

  const fetchParcels = async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      let response: ParcelListResponse;
      switch (activeTab) {
        case 'Active':
          response = await getPendingParcels(session.accessToken, page);
          break;
        case 'Completed':
          response = await getDeliveredParcels(session.accessToken, page);
          break;
        case 'Cancelled':
          response = await getCancelledParcels(session.accessToken, page);
          break;
      }
      setParcels(response.results);
      setTotalCount(response.count);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch bookings');
      console.error('Fetch Bookings Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, [activeTab, page, session?.accessToken]);

  const BookingCard = ({ parcel, isCancelled = false }: { parcel: ParcelResponse, isCancelled?: boolean }) => (
    <Card 
        className={cn(
            "p-8 bg-white border border-gray-100 rounded-3xl space-y-6 transition-all hover:shadow-md hover:border-brand-gold/20",
            isCancelled && "cursor-pointer group"
        )}
        onClick={() => isCancelled && setSelectedParcel(parcel)}
    >
        <div className={cn(
            "flex items-center gap-4 font-bold text-xl",
            isCancelled ? "text-red-500" : "text-brand-gold"
        )}>
            {isCancelled ? <XCircle size={24} /> : <Truck size={24} />}
            Booking #{parcel.parcel_id.slice(0, 8)} - {parcel.vehicle_type}
        </div>
        
        <div className="flex flex-wrap gap-8 text-lg font-bold text-gray-700">
            <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-gold" /> 
                {new Date(parcel.pickup_date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
                <Clock size={18} className="text-brand-gold" /> 
                {parcel.pickup_time}
            </div>
        </div>

        <div className="space-y-4 text-lg font-bold text-gray-700">
            <div className="flex items-center gap-4">
                <MapPin size={18} className="text-brand-gold" /> 
                <span className="text-gray-400 font-medium uppercase tracking-wider text-xs w-12">From</span> 
                {parcel.pickup_address}
            </div>
            <div className="flex items-center gap-4">
                <div className="w-[18px] flex justify-center">
                    <div className="w-1 h-4 bg-brand-gold/20 rounded-full" />
                </div>
                <span className="text-brand-gold font-medium uppercase tracking-wider text-xs w-12">To</span>
                {parcel.drop_address}
            </div>
        </div>

        <div className="flex items-center gap-2 text-lg font-bold text-gray-700">
           <DollarSign size={18} className="text-brand-gold" /> 
           ${parcel.price} <span className="mx-2 text-gray-200">|</span> <span className="text-gray-500 font-medium">Status:</span> {parcelStatusDisplay(parcel.delivery_status)}
        </div>

        {!isCancelled && activeTab === 'Active' && (
            <div className="flex gap-4 pt-2">
                <Button className="w-40 h-12 rounded-xl bg-brand-gold hover:bg-[#D4A017] text-md font-bold text-white shadow-lg shadow-brand-gold/20">Track</Button>
                <Button variant="ghost" className="w-40 h-12 rounded-xl border border-gray-200 text-md font-bold text-gray-600 hover:bg-gray-50">Cancel</Button>
            </div>
        )}

        {activeTab === 'Completed' && (
            <div className="flex gap-4 pt-2">
                <Button className="w-40 h-12 rounded-xl bg-brand-gold hover:bg-[#D4A017] text-md font-bold text-white shadow-lg shadow-brand-gold/20">Receipt</Button>
                <Button variant="ghost" className="w-40 h-12 rounded-xl border border-gray-200 text-md font-bold text-gray-600 hover:bg-gray-50">Book Again</Button>
            </div>
        )}
    </Card>
  );

  return (
    <div className="max-w-4xl px-4 pb-20">
        <button 
            onClick={() => router.back()}
            className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-10 hover:text-brand-gold transition-colors"
        >
            <ChevronLeft size={28} />
            My Bookings
        </button>

        <div className="flex overflow-x-auto no-scrollbar gap-4 mb-10">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => {
                        setActiveTab(tab);
                        setPage(1);
                    }}
                    className={cn(
                        "px-8 py-3 rounded-full text-lg font-bold transition-all border",
                        activeTab === tab 
                            ? "bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-200" 
                            : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 size={40} className="animate-spin text-brand-gold" />
                <p className="text-lg font-bold text-gray-400">Loading your bookings...</p>
            </div>
        ) : parcels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <Truck size={32} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">No {activeTab} Bookings</h3>
                    <p className="text-gray-500 font-medium">You haven't made any bookings yet.</p>
                </div>
                <Button 
                    onClick={() => router.push('/customer')}
                    className="h-12 px-8 rounded-xl bg-brand-gold text-white font-bold"
                >
                    Book Now
                </Button>
            </div>
        ) : (
            <div className="space-y-6">
                {parcels.map(parcel => (
                    <BookingCard 
                        key={parcel.id} 
                        parcel={parcel} 
                        isCancelled={activeTab === 'Cancelled'} 
                    />
                ))}

                {/* Pagination */}
                {totalCount > 10 && (
                    <div className="flex items-center justify-center gap-6 pt-10">
                        <Button 
                            variant="ghost" 
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="h-12 px-6 rounded-xl border border-gray-200 font-bold text-gray-600 disabled:opacity-30"
                        >
                            Previous
                        </Button>
                        <span className="text-lg font-bold text-gray-900">
                            Page {page} of {Math.ceil(totalCount / 10)}
                        </span>
                        <Button 
                            variant="ghost" 
                            disabled={page >= Math.ceil(totalCount / 10)}
                            onClick={() => setPage(p => p + 1)}
                            className="h-12 px-6 rounded-xl border border-gray-200 font-bold text-gray-600 disabled:opacity-30"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        )}

        {/* Details Popup */}
        {selectedParcel && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                <Card className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-2xl relative animate-in fade-in zoom-in duration-200">
                    <button 
                        onClick={() => setSelectedParcel(null)}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Booking Details</h2>
                    
                    <div className="space-y-6 mb-10 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                        <div className={cn(
                            "flex items-center gap-4 font-bold text-xl",
                            activeTab === 'Cancelled' ? "text-red-500" : "text-brand-gold"
                        )}>
                            {activeTab === 'Cancelled' ? <XCircle size={24} /> : <Truck size={24} />}
                            {parcelStatusDisplay(selectedParcel.delivery_status)}
                        </div>
                        
                        <div className="space-y-5">
                            <DetailItem label="Booking ID" value={selectedParcel.parcel_id} />
                            <DetailItem label="Vehicle Type" value={selectedParcel.vehicle_type} />
                            <DetailItem label="Route" value={`${selectedParcel.pickup_address} → ${selectedParcel.drop_address}`} />
                            <DetailItem label="Parcel Type" value={selectedParcel.percel_type} />
                            <DetailItem label="Price" value={`$${selectedParcel.price}`} />
                            <DetailItem label="Pickup Info" value={`${selectedParcel.pickup_user_name} (${selectedParcel.phone_number})`} />
                            <DetailItem label="Drop Info" value={`${selectedParcel.drop_user_name} (${selectedParcel.drop_number})`} />
                            
                            {selectedParcel.notes && (
                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-gray-900 font-bold text-xs mb-1 uppercase tracking-widest">Notes</p>
                                    <p className="text-gray-700 font-medium leading-relaxed">{selectedParcel.notes}</p>
                                </div>
                            )}

                            {activeTab === 'Cancelled' && (
                                <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                                    <p className="text-red-900 font-bold text-xs mb-1 uppercase tracking-widest">Status</p>
                                    <p className="text-red-700 font-medium">This booking was cancelled and processed.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button 
                        onClick={() => setSelectedParcel(null)}
                        className="w-full h-14 rounded-xl bg-gray-900 hover:bg-black text-lg font-bold text-white shadow-xl shadow-gray-200"
                    >
                        Close Details
                    </Button>
                </Card>
            </div>
        )}
    </div>
  );
}

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div className="space-y-1">
        <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] block">{label}</span>
        <p className="text-md font-bold text-gray-800">{value}</p>
    </div>
);

const parcelStatusDisplay = (status: string) => {
    switch (status) {
        case 'Pending': return 'Pending Confirmation';
        case 'On the way': return 'En Route';
        case 'Delivered': return 'Completed';
        case 'Cancelled': return 'Cancelled';
        default: return status;
    }
};
