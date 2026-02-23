"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  User as UserIcon, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Box,
  Package,
  AlertCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Input, Card } from '@/components/ui/Primitives';
import { useBookingStore } from '@/stores/bookingStore';
import { createParcel } from '@/services/parcel.service';
import MainLayout from '@/components/MainLayout';
import { toast } from 'sonner';
import { calculateDistanceKm } from '@/utils/geocode';

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

const vehicleTypes = [
  { id: 'Pickup', name: 'Pickup', basePrice: 42.92, perKmRate: 1.62 },
  { id: 'Van', name: 'Van', basePrice: 77.00, perKmRate: 2.02 },
  { id: 'Mini Box Truck', name: 'Minibox', basePrice: 144.51, perKmRate: 2.30 },
  { id: 'Box Truck', name: 'Bigbox', basePrice: 230.00, perKmRate: 4.99 },
];

export default function BookingPage() {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const { parcelData, currentStep, setParcelData, setCurrentStep, resetBooking } = useBookingStore();
  
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  });

  const pickupAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropAutocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Dynamic Estimation Calculation
  useEffect(() => {
    if (parcelData.ping && parcelData.pong && parcelData.ding && parcelData.dong) {
      const lat1 = parseFloat(parcelData.ping);
      const lng1 = parseFloat(parcelData.pong);
      const lat2 = parseFloat(parcelData.ding);
      const lng2 = parseFloat(parcelData.dong);

      if (!isNaN(lat1) && !isNaN(lng1) && !isNaN(lat2) && !isNaN(lng2)) {
        const distance = calculateDistanceKm(lat1, lng1, lat2, lng2);
        const vehicle = vehicleTypes.find(v => v.id === parcelData.vehicle_type) || vehicleTypes[0];
        const totalPrice = vehicle.basePrice + (distance * vehicle.perKmRate);
        const estimatedTime = Math.round(distance * 2);

        if (parcelData.estimated_distance_km !== distance.toFixed(2) || parcelData.price !== totalPrice.toFixed(2)) {
          setParcelData({
            estimated_distance_km: distance.toFixed(2),
            estimated_time_minutes: estimatedTime.toString(),
            price: totalPrice.toFixed(2)
          });
        }
      }
    }
  }, [parcelData.ping, parcelData.pong, parcelData.ding, parcelData.dong, parcelData.vehicle_type]);

  const onPickupPlaceChanged = () => {
    if (pickupAutocompleteRef.current) {
      const place = pickupAutocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setParcelData({
          pickup_address: place.formatted_address || "",
          ping: place.geometry.location.lat().toFixed(6),
          pong: place.geometry.location.lng().toFixed(6),
        });
      }
    }
  };

  const onDropPlaceChanged = () => {
    if (dropAutocompleteRef.current) {
      const place = dropAutocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setParcelData({
          drop_address: place.formatted_address || "",
          ding: place.geometry.location.lat().toFixed(6),
          dong: place.geometry.location.lng().toFixed(6),
        });
      }
    }
  };

  const handleFinalSubmit = async () => {
    if (authStatus !== 'authenticated') {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    try {
      await createParcel(parcelData, session?.accessToken);
      toast.success('Booking created successfully!');
      resetBooking();
      router.push('/customer');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // Render Helpers
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
            currentStep === s ? "bg-brand-gold text-white scale-110 shadow-lg" : 
            currentStep > s ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
          )}>
            {currentStep > s ? <CheckCircle2 size={20} /> : s}
          </div>
          {s < 4 && <div className={cn("h-0.5 w-12 transition-all", currentStep > s ? "bg-green-500" : "bg-gray-100")} />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Complete Your Booking</h1>
            <p className="text-slate-500 font-medium italic">Your professional move starts here</p>
          </div>

          {renderStepIndicator()}

          {/* Step 1: Schedule */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-8 md:p-12 border-none shadow-2xl shadow-slate-200 rounded-[2.5rem]">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                      <Calendar size={24} />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Select Date</h2>
                    </div>
                    <input 
                      type="date"
                      value={parcelData.pickup_date}
                      onChange={(e) => setParcelData({ pickup_date: e.target.value })}
                      className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                      <Clock size={24} />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Time Window</h2>
                    </div>
                    <select 
                      value={parcelData.pickup_time}
                      onChange={(e) => setParcelData({ pickup_time: e.target.value })}
                      className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 appearance-none"
                    >
                      <option value="10:00">10:00 AM - 12:00 PM</option>
                      <option value="12:00">12:00 PM - 02:00 PM</option>
                      <option value="14:00">02:00 PM - 04:00 PM</option>
                      <option value="16:00">04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>
              </Card>
              <div className="flex justify-end">
                <Button 
                  onClick={nextStep} 
                  disabled={!parcelData.pickup_date}
                  className="w-auto px-12 h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs gap-2"
                >
                  Location Details <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Locations */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-8 md:p-12 border-none shadow-2xl shadow-slate-200 rounded-[2.5rem]">
                <div className="space-y-10">
                  {/* Pickup */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-brand-gold">
                      <MapPin size={24} className="text-amber-600" />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Pickup Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        placeholder="Contact Name"
                        value={parcelData.pickup_user_name}
                        onChange={(e) => setParcelData({ pickup_user_name: e.target.value })}
                        className="h-16 rounded-2xl border-transparent bg-slate-50 focus:bg-white focus:border-brand-gold font-bold pl-6"
                      />
                      <Input 
                        placeholder="Phone Number"
                        value={parcelData.phone_number}
                        onChange={(e) => setParcelData({ phone_number: e.target.value })}
                        className="h-16 rounded-2xl border-transparent bg-slate-50 focus:bg-white focus:border-brand-gold font-bold pl-6"
                      />
                    </div>
                    {isLoaded && (
                      <Autocomplete
                        onLoad={ref => pickupAutocompleteRef.current = ref}
                        onPlaceChanged={onPickupPlaceChanged}
                      >
                        <input 
                          type="text"
                          placeholder="Search Street Address"
                          value={parcelData.pickup_address}
                          onChange={(e) => setParcelData({ pickup_address: e.target.value })}
                          className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                        />
                      </Autocomplete>
                    )}
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Drop-off */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-800">
                      <MapPin size={24} />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Drop-off Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        placeholder="Receiver Name"
                        value={parcelData.drop_user_name}
                        onChange={(e) => setParcelData({ drop_user_name: e.target.value })}
                        className="h-16 rounded-2xl border-transparent bg-slate-50 focus:bg-white focus:border-brand-gold font-bold pl-6"
                      />
                      <Input 
                        placeholder="Receiver Phone"
                        value={parcelData.drop_number}
                        onChange={(e) => setParcelData({ drop_number: e.target.value })}
                        className="h-16 rounded-2xl border-transparent bg-slate-50 focus:bg-white focus:border-brand-gold font-bold pl-6"
                      />
                    </div>
                    {isLoaded && (
                      <Autocomplete
                        onLoad={ref => dropAutocompleteRef.current = ref}
                        onPlaceChanged={onDropPlaceChanged}
                      >
                        <input 
                          type="text"
                          placeholder="Search Street Address"
                          value={parcelData.drop_address}
                          onChange={(e) => setParcelData({ drop_address: e.target.value })}
                          className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                        />
                      </Autocomplete>
                    )}
                  </div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="ghost" onClick={prevStep} className="w-auto gap-2 font-bold text-slate-400">
                  <ChevronLeft size={18} /> Schedule
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!parcelData.pickup_address || !parcelData.drop_address || !parcelData.pickup_user_name}
                  className="w-auto px-12 h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs gap-2"
                >
                  Parcel Information <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Parcel Details */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-8 md:p-12 border-none shadow-2xl shadow-slate-200 rounded-[2.5rem]">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 text-brand-gold mb-4">
                      <Box size={24} />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Parcel Type</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {['Small', 'Medium', 'Large'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setParcelData({ percel_type: type })}
                          className={cn(
                            "h-20 rounded-2xl font-black border-2 transition-all",
                            parcelData.percel_type === type 
                              ? "border-brand-gold bg-amber-50 text-brand-gold shadow-md" 
                              : "border-slate-100 bg-white text-slate-400 grayscale"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-slate-800 mb-4">
                      <Truck size={24} />
                      <h2 className="text-2xl font-black uppercase tracking-tight">Vehicle Choice</h2>
                    </div>
                    <select 
                      value={parcelData.vehicle_type}
                      onChange={(e) => setParcelData({ vehicle_type: e.target.value })}
                      className="w-full h-16 px-6 bg-slate-50 border-2 border-transparent focus:border-brand-gold focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 appearance-none"
                    >
                      <option value="Pickup">Pickup Truck</option>
                      <option value="Van">Cargo Van</option>
                      <option value="Mini Box Truck">Mini Box Truck</option>
                      <option value="Box Truck">Box Truck</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Internal Notes</h2>
                    <textarea 
                      placeholder="Add any specific instructions or items to handle with care..."
                      value={parcelData.notes}
                      onChange={(e) => setParcelData({ notes: e.target.value })}
                      className="w-full min-h-[140px] p-6 bg-slate-50 border-none rounded-[2rem] outline-none font-medium text-slate-600 focus:bg-white focus:ring-2 focus:ring-brand-gold transition-all"
                    />
                  </div>
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="ghost" onClick={prevStep} className="w-auto gap-2 font-bold text-slate-400">
                  <ChevronLeft size={18} /> Locations
                </Button>
                <Button 
                  onClick={nextStep} 
                  className="w-auto px-12 h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs gap-2"
                >
                  Review Booking <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="p-8 md:p-12 border-none shadow-2xl shadow-slate-200 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Package size={200} />
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="text-center group">
                    <p className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Final Summary</p>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Everything Look Correct?</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-8 rounded-[2rem]">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Address</p>
                        <p className="font-bold text-slate-800 line-clamp-2">{parcelData.pickup_address}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
                        <p className="font-bold text-slate-800">{parcelData.pickup_user_name} • {parcelData.phone_number}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop-off Address</p>
                        <p className="font-bold text-slate-800 line-clamp-2">{parcelData.drop_address}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled For</p>
                        <p className="font-bold text-slate-800">{parcelData.pickup_date} at {parcelData.pickup_time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-8 bg-brand-gold/5 border-2 border-brand-gold/20 rounded-[2.5rem]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-sm">
                        <Truck size={28} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Selected Fleet</p>
                        <p className="text-xl font-black text-slate-800">{parcelData.vehicle_type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Estimated Cost</p>
                      <p className="text-4xl font-black text-brand-gold tracking-tight">${parcelData.price || '50.00'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button variant="ghost" onClick={prevStep} className="w-auto px-8 font-bold text-slate-400 hover:text-slate-600">
                  <ChevronLeft size={18} /> Adjust Details
                </Button>
                <Button 
                  onClick={handleFinalSubmit} 
                  isLoading={loading}
                  className="flex-1 h-20 rounded-[1.5rem] bg-[#A87900] hover:bg-black text-white font-black text-xl uppercase tracking-widest shadow-2xl shadow-amber-200 transition-all transform active:scale-95"
                >
                  Confirm & Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal Backdrop */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAuthModal(false)} />
          <Card className="relative z-10 w-full max-w-md p-10 border-none shadow-2xl rounded-[3rem] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-brand-gold mx-auto mb-6">
                <UserIcon size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Almost There!</h2>
              <p className="text-slate-500 font-medium">Please sign in to confirm your booking and track your driver.</p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => router.push('/login?callbackUrl=/book')}
                className="h-16 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-xs"
              >
                Sign In to Account
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/signup?role=customer&callbackUrl=/book')}
                className="h-16 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 font-black uppercase tracking-widest text-xs hover:border-brand-gold transition-all"
              >
                Create New Profile
              </Button>
            </div>

            <p className="text-center mt-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Secured by Digaxy Auth
            </p>
          </Card>
        </div>
      )}
    </MainLayout>
  );
}
