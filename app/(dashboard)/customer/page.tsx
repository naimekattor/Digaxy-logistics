'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '@/components/ui/Primitives';
import { 
    Truck, MapPin, ChevronDown, Calendar, Clock, Edit3, 
    Box, Check, CreditCard, User as UserIcon, Home, 
    Building2, GraduationCap, Monitor, Sofa, ShoppingBag, 
    Smartphone, Trash2, Heart, User, Globe, Info, Phone, 
    MessageSquare, X, CornerDownRight, Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { createParcel } from '@/services/parcel.service';
import { ParcelCreateRequest, ParcelResponse } from '@/types/parcel';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

// Dynamically import MapSelector to avoid SSR issues
const MapSelector = dynamic(() => import('@/components/MapSelector'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-[3rem] bg-gray-200 animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  )
});

const locations = [
    "New York City", "Los Angeles", "Chicago", "Houston", "Phoenix", 
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin", 
    "Jacksonville", "Fort Worth", "El Paso", "Nashville", "Detroit"
];

const vehicleTypes = [
    { id: 'pickup', name: 'Pickup', price: '$42.92 + $1.62', detail: 'per labor min', imageSrc: "/images/pickup_truck.png" },
    { id: 'van', name: 'Van', price: '$77 + $2.02', detail: 'per labor min', imageSrc: "/images/van.png" },
    { id: 'box', name: 'Mini Box Truck', price: '$144.51 + $2.30', detail: 'per labor min', imageSrc: "/images/mini_box_truck.png" },
    { id: 'box26feet', name: '26 Feet Box Truck', price: '$230 + $4.99', detail: 'per labor min', imageSrc: "/images/26Feet_box_truck.png" },
];

const services = [
    { id: 'home', name: 'Home moving', icon: Home },
    { id: 'apartment', name: 'Apartment moving', icon: Building2 },
    { id: 'college', name: 'College moving', icon: GraduationCap },
    { id: 'storage', name: 'Storage moving', icon: Box },
    { id: 'office', name: 'Office moving', icon: Monitor },
    { id: 'furniture', name: 'Furniture delivery', icon: Sofa },
    { id: 'fb', name: 'FB Marketplace delivery', icon: ShoppingBag },
    { id: 'app', name: 'Application delivery', icon: Smartphone },
    { id: 'junk', name: 'Junk removal', icon: Trash2 },
    { id: 'donation', name: 'Donation pick up', icon: Heart },
    { id: 'labor', name: 'Labor only', icon: User },
    { id: 'craigslist', name: 'Craigslist delivery', icon: Globe },
];

export default function CustomerDashboardPage() {
  const [view, setView] = useState<'home' | 'select-location' | 'service-selection' | 'pickup-location' | 'drop-location' | 'estimation' | 'booking-details' | 'booking-confirmed'>('home');
  const [selectedVehicle, setSelectedVehicle] = useState('pickup');
  const [showLocations, setShowLocations] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('app');
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [pickupLocation, setPickupLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
    street?: string;
    city?: string;
  } | null>(null);
  const [dropLocation, setDropLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
    street?: string;
    city?: string;
  } | null>(null);

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [createdParcel, setCreatedParcel] = useState<ParcelResponse | null>(null);
  console.log(session.accessToken);
  
  // Parcel creation state
  const [parcelData, setParcelData] = useState({
    pickup_date: new Date().toISOString().split('T')[0],
    pickup_time: '10:00',
    pickup_user_name: '',
    phone_number: '',
    pickup_address: '',
    drop_user_name: '',
    drop_number: '',
    drop_address: '',
    price: '75.00',
    vehicle_type: 'Pickup',
    notes: '',
    special_instructions: '',
    percel_type: 'Medium',
    latitude: '0.0',
    longitude: '0.0',
    estimated_distance_km: '10',
    estimated_time_minutes: '30'
  });

  // Lifted states from conditional block
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [useMap, setUseMap] = useState(false);

  const handleMapLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    setSelectedMapLocation(location);
    
    // Extract address components
    if (location.address) {
      const addressParts = location.address.split(',');
      const street = addressParts[0]?.trim();
      const city = addressParts.length > 1 ? addressParts[addressParts.length - 2]?.trim() : '';
      const zip = addressParts.length > 1 ? addressParts[addressParts.length - 1]?.trim() : '';
      
      setSearchLocation(`${street}, ${city}`);
    }
  };

  const stepHeader = (title: string, backView: any) => (
    <button 
        onClick={() => setView(backView)}
        className="flex items-center gap-4 text-3xl font-bold text-gray-900 mb-12 hover:text-brand-gold transition-colors"
    >
        <ChevronDown size={32} className="rotate-90" />
        {title}
    </button>
  );

  const vehicleSummaryCard = () => (
    <Card className="flex items-center gap-6 p-6 mb-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
            <Truck size={40} className="text-gray-800" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-900">Pickup Truck</h3>
            <p className="text-gray-500 font-medium">Best for small deliveries</p>
        </div>
    </Card>
  );

  if (view === 'select-location') {
    return (
        <div className="max-w-6xl mx-auto">
            {stepHeader('Select Location on Map', 'home')}
            
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map Section */}
                    <div className="lg:col-span-2">
                        <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <MapSelector 
                                onLocationSelect={handleMapLocationSelect}
                                initialLocation={selectedMapLocation || undefined}
                            />
                        </div>
                    </div>
                    
                    {/* Info Panel */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-gray-50 border-none rounded-[2rem]">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Map Instructions</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">1</span>
                                    </div>
                                    <p className="text-gray-600">Click anywhere on the map to select location</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">2</span>
                                    </div>
                                    <p className="text-gray-600">Drag map to explore different areas</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">3</span>
                                    </div>
                                    <p className="text-gray-600">Use +/- buttons to zoom in/out</p>
                                </li>
                            </ul>
                        </Card>
                        
                        {/* Selected Location Details */}
                        {selectedMapLocation && (
                            <Card className="p-6 bg-white border-2 border-brand-gold/20 rounded-[2rem]">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Location</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={20} className="text-brand-gold flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">{selectedMapLocation.address || 'Address not available'}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Navigation size={20} className="text-brand-gold flex-shrink-0 mt-1" />
                                        <p className="text-gray-700">
                                            Coordinates: {selectedMapLocation.lat.toFixed(6)}, {selectedMapLocation.lng.toFixed(6)}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Button 
                        onClick={() => {
                            if (selectedMapLocation) {
                                setView('home');
                                setShowLocations(false);
                            }
                        }}
                        disabled={!selectedMapLocation}
                        className="w-full sm:w-80 h-16 text-xl font-bold rounded-2xl bg-[#B8860B] hover:bg-[#D4A017] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {selectedMapLocation ? 'Use This Location' : 'Select a location first'}
                    </Button>
                    
                    <Button 
                        onClick={() => {
                            // Get current location
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        handleMapLocationSelect({
                                            lat: position.coords.latitude,
                                            lng: position.coords.longitude
                                        });
                                    },
                                    (error) => {
                                        console.error('Error getting location:', error);
                                        alert('Unable to get current location. Please enable location services.');
                                    }
                                );
                            }
                        }}
                        className="w-full sm:w-60 h-16 text-lg font-bold rounded-2xl bg-white border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/5 shadow"
                    >
                        <Navigation size={20} className="mr-2" />
                        Use My Location
                    </Button>
                </div>
            </div>
        </div>
    );
  }

  if (view === 'service-selection') {
    return (
        <div className=" mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-12 leading-tight">A truck and movers for any occasion</h1>
            <div className="space-y-4">
                {services.map((s) => (
                    <div 
                        key={s.id} 
                        onClick={() => { setSelectedService(s.id); setView('pickup-location'); }}
                        className={cn(
                            "flex items-center justify-between px-8 py-3 rounded-3xl border transition-all cursor-pointer group",
                            selectedService === s.id ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-brand-gold/20 text-gray-900 hover:border-brand-gold"
                        )}
                    >
                        <div className="flex items-center gap-6">
                            <s.icon size={24} className={cn(selectedService === s.id ? "text-white" : "text-gray-900")} />
                            <span className="text-xl font-semibold">{s.name}</span>
                        </div>
                        <ChevronDown size={24} className={cn("rotate-[270deg]", selectedService === s.id ? "text-white" : "text-gray-400")} />
                    </div>
                ))}
            </div>
            {/* <div className="flex justify-center mt-12 mb-20">
                <ChevronDown size={48} className="text-gray-300 animate-bounce" />
            </div> */}
        </div>
    );
  }

  if (view === 'pickup-location' || view === 'drop-location') {
    const isPickup = view === 'pickup-location';

    return (
        <div className=" mx-auto">
            {stepHeader(isPickup ? 'Pickup Location' : 'Drop Location', isPickup ? 'service-selection' : 'pickup-location')}
            {vehicleSummaryCard()}
            
            {!useMap ? (
                <>
                    <p className="text-gray-500 text-lg mb-10 max-w-2xl font-medium">
                        {isPickup 
                            ? "This is where your delivery begins. Please provide your pickup address to help our driver locate you quickly and start the trip smoothly."
                            : "This is your delivery destination. Please enter the exact drop-off address to make sure your goods reach the right location."
                        }
                    </p>
                    
                    <form className="space-y-8 mb-12">
  <h3 className="text-2xl font-bold text-brand-gold">
    {isPickup ? "Enter Pickup Address" : "Enter Drop Address"}
  </h3>

  <div className="space-y-6">

    {/* Name & Phone */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-lg font-bold text-gray-900">
          {isPickup ? "Pickup Contact Name" : "Drop Contact Name"}
        </label>
        <Input
          placeholder='E.g. "John Doe"'
          className="bg-white border-brand-gold/30 h-16 rounded-2xl text-lg pl-8"
          value={isPickup ? parcelData.pickup_user_name : parcelData.drop_user_name}
          onChange={(e) => setParcelData(prev => ({
            ...prev,
            [isPickup ? 'pickup_user_name' : 'drop_user_name']: e.target.value
          }))}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-lg font-bold text-gray-900">
          {isPickup ? "Pickup Phone Number" : "Drop Phone Number"}
        </label>
        <Input
          placeholder='E.g. "+1 234 567 890"'
          className="bg-white border-brand-gold/30 h-16 rounded-2xl text-lg pl-8"
          value={isPickup ? parcelData.phone_number : parcelData.drop_number}
          onChange={(e) => setParcelData(prev => ({
            ...prev,
            [isPickup ? 'phone_number' : 'drop_number']: e.target.value
          }))}
          required
        />
      </div>
    </div>

    {/* Address Line 1 */}
    <div className="space-y-2">
      <label className="text-lg font-bold text-gray-900">
        Street Address
      </label>
      <Input
        name="street"
        placeholder='E.g. "34 Park Ave"'
        className="bg-white border-brand-gold/30 h-16 rounded-2xl text-lg pl-8"
        value={isPickup ? parcelData.pickup_address : parcelData.drop_address}
        onChange={(e) => {
          const val = e.target.value;
          setParcelData(prev => ({
            ...prev,
            [isPickup ? 'pickup_address' : 'drop_address']: val
          }));
        }}
        required
      />
    </div>
  </div>
</form>


                    {/* <div className="mb-12">
                        <Button 
                            onClick={() => setUseMap(true)}
                            className="w-full h-16 text-xl font-bold rounded-2xl bg-white border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/5 mb-4"
                        >
                            <MapPin size={20} className="mr-2" />
                            Select on Map Instead
                        </Button>
                    </div> */}

                    <div className="space-y-6 mb-12">
                        <h4 className="text-xl font-bold text-brand-gold">Helpful Tips</h4>
                        <div className="space-y-4">
                            {['Ensure your location pin is placed correctly.', 'Add nearby landmarks (e.g., "next to ABC Market") for easier identification.', 'Be available at the pickup spot before the vehicle arrives.'].map((tip, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded bg-black mt-1.5 flex-shrink-0"></div>
                                    <p className="text-gray-600 font-medium">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button 
                        onClick={() => {
                            if (isPickup) {
                                setPickupLocation({ lat: 0, lng: 0, street, city });
                            } else {
                                setDropLocation({ lat: 0, lng: 0, street, city });
                            }
                            setView(isPickup ? 'drop-location' : 'estimation');
                        }}
                        
                        className="w-96 h-14 text-xl font-semibold rounded-[16px] bg-[#B8860B] hover:bg-[#D4A017] shadow-xl shadow-brand-gold/20"
                    >
                        {isPickup ? 'Confirm Pickup Location' : 'Confirm Drop Location'}
                    </Button>
                </>
            ) : (
                <>
                    <div className="mb-8">
                        <Button 
                            onClick={() => setUseMap(false)}
                            className="mb-6 flex items-center gap-2 text-brand-gold hover:text-brand-gold/80"
                        >
                            <ChevronDown size={20} className="rotate-90" />
                            Back to Address Form
                        </Button>
                        
                        <div className="h-[500px] rounded-[2rem] overflow-hidden shadow-xl">
                            <MapSelector 
                                onLocationSelect={(location) => {
                                    if (isPickup) {
                                        setPickupLocation(location);
                                        setParcelData(prev => ({
                                          ...prev,
                                          pickup_address: location.address || '',
                                          latitude: location.lat.toString(),
                                          longitude: location.lng.toString()
                                        }));
                                    } else {
                                        setDropLocation(location);
                                        setParcelData(prev => ({
                                          ...prev,
                                          drop_address: location.address || ''
                                        }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <Button 
                        onClick={() => {
                            if ((isPickup && pickupLocation) || (!isPickup && dropLocation)) {
                                setView(isPickup ? 'drop-location' : 'estimation');
                            }
                        }}
                        disabled={isPickup ? !pickupLocation : !dropLocation}
                        className="w-full h-20 text-2xl font-bold rounded-3xl bg-[#B8860B] hover:bg-[#D4A017] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPickup ? 'Confirm Pickup Location' : 'Confirm Drop Location'}
                    </Button>
                </>
            )}
        </div>
    );
  }

  if (view === 'estimation') {
      return (
          <div className="max-w-4xl mx-auto">
              {stepHeader('Estimated Distance & Price', 'drop-location')}
              {vehicleSummaryCard()}
              <p className="text-gray-500 text-lg mb-10 max-w-2xl font-medium">
                  Here's a quick overview of your delivery details — including distance, estimated cost, and travel route.
              </p>

              <div className="space-y-8 mb-12">
                  <h3 className="text-2xl font-bold text-brand-gold">Distance & Price</h3>
                  <div className="space-y-6">
                      <div>
                          <p className="font-bold text-gray-900 mb-2">Estimated Distance:</p>
                          <p className="text-gray-500 font-medium">Automatically calculated based on your pickup and drop locations.</p>
                      </div>
                      <div>
                          <p className="font-bold text-gray-900 mb-2">Estimated Price:</p>
                          <p className="text-gray-500 font-medium">Generated according to the selected vehicle type, distance, and base fare.</p>
                      </div>
                  </div>
              </div>

              <div className="space-y-6 mb-12">
                  <h4 className="text-xl font-bold text-brand-gold">Notes & Info</h4>
                  <div className="space-y-4">
                      {['Distance is calculated using the shortest available route.', 'You\'ll see the final price after confirmation.'].map((note, i) => (
                          <div key={i} className="flex items-start gap-4">
                              <div className="w-5 h-5 rounded bg-black mt-1.5 flex-shrink-0"></div>
                              <p className="text-gray-600 font-medium">{note}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <Button 
                onClick={() => setView('booking-details')}
                className="w-96 h-14 text-xl font-semibold rounded-[16px] bg-[#B8860B] hover:bg-[#D4A017] shadow-xl"
              >
                  Continue to Details
              </Button>
          </div>
      );
  }

  if (view === 'booking-details') {
    const handleConfirmBooking = async () => {
      setLoading(true);
      try {
        const payload: ParcelCreateRequest = {
          ...parcelData,
          vehicle_type: vehicleTypes.find(v => v.id === selectedVehicle)?.name || 'Pickup',
        };
        const response = await createParcel(payload, session?.accessToken);
        setCreatedParcel(response);
        setView('booking-confirmed');
        toast.success('Booking confirmed successfully!');
      } catch (err: any) {
        toast.error(err.message || 'Failed to create booking');
        console.error('Parcel Creation Error:', err);
      } finally {
        setLoading(false);
      }
    };

      return (
          <div className=" mx-auto">
              {stepHeader('Movers on your schedule', 'estimation')}
              
              <div className="space-y-12">
                  <div className="space-y-6">
                      <div className="flex items-center gap-4 text-brand-gold">
                            <Calendar size={20} />
                            <span className="font-bold">Select Date</span>
                      </div>
                      <div className="relative">
                          <input 
                            type="date"
                            className="w-full h-20 px-8 bg-white border border-brand-gold/30 rounded-3xl text-xl font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                            value={parcelData.pickup_date}
                            onChange={(e) => setParcelData(prev => ({ ...prev, pickup_date: e.target.value }))}
                          />
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="flex items-center gap-4 text-brand-gold">
                            <Clock size={20} />
                            <span className="font-bold">Select Time Slot</span>
                      </div>
                      <div className="relative">
                          <select 
                            className="w-full h-20 pl-8 pr-12 bg-white border border-brand-gold/30 rounded-3xl text-xl font-medium appearance-none outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                            value={parcelData.pickup_time}
                            onChange={(e) => setParcelData(prev => ({ ...prev, pickup_time: e.target.value }))}
                          >
                              <option value="10:00">10:00AM - 12:00PM</option>
                              <option value="12:00">12:00PM - 02:00PM</option>
                              <option value="14:00">02:00PM - 04:00PM</option>
                              <option value="16:00">04:00PM - 06:00PM</option>
                          </select>
                          <Clock size={24} className="absolute right-8 top-7 text-gray-400" />
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="flex items-center gap-4 text-brand-gold">
                            <Box size={20} />
                            <span className="font-bold">Parcel Details</span>
                      </div>
                      <div className="space-y-4 pl-8">
                          <div className="space-y-4">
                            <div>
                                <label className="text-lg font-bold text-gray-900 mb-2 block">Parcel Type</label>
                                <select 
                                    className="w-full h-16 px-6 bg-white border border-brand-gold/30 rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                                    value={parcelData.percel_type}
                                    onChange={(e) => setParcelData(prev => ({ ...prev, percel_type: e.target.value }))}
                                >
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-lg font-bold text-gray-900 mb-2 block">Notes</label>
                                <textarea 
                                    placeholder="Any notes about the parcel?"
                                    className="w-full min-h-[100px] p-6 bg-white border border-brand-gold/30 rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                                    value={parcelData.notes}
                                    onChange={(e) => setParcelData(prev => ({ ...prev, notes: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="text-lg font-bold text-gray-900 mb-2 block">Special Instructions</label>
                                <textarea 
                                    placeholder="Special instructions for the driver?"
                                    className="w-full min-h-[100px] p-6 bg-white border border-brand-gold/30 rounded-2xl text-lg font-medium outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                                    value={parcelData.special_instructions}
                                    onChange={(e) => setParcelData(prev => ({ ...prev, special_instructions: e.target.value }))}
                                />
                            </div>
                          </div>
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-brand-gold">
                                <UserIcon size={20} />
                                <span className="font-bold">Contact Info</span>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Edit3 size={20} className="text-gray-600" /></button>
                      </div>
                      <div className="space-y-3 pl-8">
                          <p className="text-xl font-medium"><span className="text-gray-500">Name:</span> {parcelData.pickup_user_name}</p>
                          <p className="text-xl font-medium"><span className="text-gray-500">Phone:</span> {parcelData.phone_number}</p>
                      </div>
                  </div>

                  <div className="space-y-6 border-t border-gray-100 pt-12">
                      <div className="flex items-center gap-4 text-brand-gold">
                            <CreditCard size={20} />
                            <span className="font-bold">Payment</span>
                      </div>
                      <div className="space-y-4 pl-8">
                          <p className="text-2xl font-bold">Estimated Price: <span className="text-[#B8860B] italic">${parcelData.price}</span></p>
                          <div className="flex gap-8 text-xl font-medium text-gray-500 italic">
                             <span>Stripe</span>
                             <span>Tip</span>
                          </div>
                      </div>
                  </div>

                  <Button 
                    onClick={handleConfirmBooking}
                    disabled={loading}
                    className="w-96 h-14 text-xl font-semibold rounded-[16px] bg-[#B8860B] hover:bg-[#D4A017] shadow-xl mb-20 disabled:opacity-50"
                  >
                      {loading ? 'Processing...' : 'Review & Confirm Booking'}
                  </Button>
              </div>
          </div>
      );
  }

  if (view === 'booking-confirmed') {
      return (
          <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 max-w-2xl">
                  <div className="flex items-center gap-4 text-3xl font-bold text-gray-900 mb-6">
                      <Check size={32} className="text-green-500" />
                      Booking Confirmed!
                  </div>
                  
                  <div className="space-y-6 mb-12">
                      {[
                        { label: 'Parcel ID:', value: createdParcel?.parcel_id || 'N/A' },
                        { label: 'Vehicle:', value: createdParcel?.vehicle_type || 'N/A' },
                        { label: 'Pickup:', value: createdParcel?.pickup_address || 'N/A' },
                        { label: 'Drop:', value: createdParcel?.drop_address || 'N/A' },
                        { label: 'Date:', value: createdParcel?.pickup_date || 'N/A' },
                        { label: 'Time:', value: createdParcel?.pickup_time || 'N/A' },
                        { label: 'Parcel Type:', value: createdParcel?.percel_type || 'N/A' },
                        { label: 'Total:', value: `$${createdParcel?.price || '0.00'}`, isTotal: true },
                      ].map((item) => (
                        <div key={item.label} className="flex text-xl">
                            <span className="w-32 font-bold text-gray-900">{item.label}</span>
                            <span className={cn("font-medium", item.isTotal ? "text-brand-gold italic" : "text-gray-600")}>{item.value}</span>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-8 mb-12">
                      <div className="flex items-center gap-4 text-brand-gold">
                            <Info size={20} />
                            <span className="font-bold">Next Steps</span>
                      </div>
                      <div className="space-y-4 pl-8">
                          <p className="text-xl font-medium text-gray-600">Track your parcel from your dashboard. A driver will be assigned soon.</p>
                          <Button 
                            onClick={() => setView('home')}
                            className="w-60 h-14 text-lg font-bold rounded-xl bg-[#B8860B] hover:bg-[#D4A017] shadow-xl"
                          >
                            Back to Dashboard
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

   return (
    <div className="max-w-5xl">
        <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {session?.user?.username || 'Customer'}!</h1>
            <p className="text-xl text-gray-500 font-medium">Ready to book your next move?</p>
        </div>

        <section className="mb-12">
            {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">Book A Move</h2> */}
            
            {/* <div className="relative max-w-2xl mb-4">
                <div 
                    onClick={() => setShowLocations(!showLocations)}
                    className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-3xl px-8 py-3 cursor-pointer shadow-sm hover:border-brand-gold transition-all"
                >
                    <div className="flex items-center gap-4 text-gray-500">
                        <MapPin size={24} className="text-brand-gold" />
                        <span className="text-xl font-medium">
                            {selectedMapLocation?.address || searchLocation || "Search your preferable location..."}
                        </span>
                    </div>
                    <ChevronDown className={cn("text-gray-400 transition-transform", showLocations && "rotate-180")} />
                </div>

                {showLocations && (
                    <Card className="absolute top-full left-0 w-full mt-4 z-50 p-3 max-h-[30rem] overflow-y-auto shadow-2xl border-gray-100 bg-white rounded-[2rem]">
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                setView('select-location');
                                setShowLocations(false);
                            }}
                            className="p-6 flex items-center gap-5 text-brand-gold bg-brand-gold/5 border-b border-gray-50 mb-4 hover:bg-brand-gold/10 rounded-2xl cursor-pointer transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <span className="text-lg font-bold">Select on Map</span>
                        </div>
                        
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                // Get current location
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            setSelectedMapLocation({
                                                lat: position.coords.latitude,
                                                lng: position.coords.longitude
                                            });
                                            setSearchLocation('Current Location');
                                            setShowLocations(false);
                                        },
                                        (error) => {
                                            console.error('Error getting location:', error);
                                            alert('Unable to get current location. Please enable location services.');
                                        }
                                    );
                                }
                            }}
                            className="p-6 flex items-center gap-5 text-brand-gold bg-brand-gold/5 border-b border-gray-50 mb-4 hover:bg-brand-gold/10 rounded-2xl cursor-pointer transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <Navigation size={24} />
                            </div>
                            <span className="text-lg font-bold">Use Current Location</span>
                        </div>
                        
                        <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Available Cities</div>
                        
                        <div className="space-y-1">
                            {locations.map((loc) => (
                                <div 
                                    key={loc}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchLocation(loc);
                                        setShowLocations(false);
                                    }}
                                    className="px-8 py-5 hover:bg-gray-50 rounded-2xl cursor-pointer text-gray-700 text-lg font-medium transition-colors flex items-center gap-4 group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-brand-gold transition-colors"></div>
                                    {loc}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div> */}

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Vehicle Type</h3>
                <p className="text-gray-400 mb-8 font-medium ">Select a vehicle that matches your load</p>
                
                <div className="flex flex-wrap gap-8 mb-12">
  {vehicleTypes.map((v) => (
    <div
      key={v.id}
      onClick={() => setSelectedVehicle(v.id)}
      className={cn(
        " border-2 rounded-[1rem] w-[200px] px-6 py-8 flex flex-col items-center cursor-pointer transition-all",
        selectedVehicle === v.id
          ? "border-brand-gold bg-[#EFEFEF]  shadow-xl scale-105"
          : "border-gray-100 bg-[#EFEFEF] hover:border-gray-300"
      )}
    >
      {/* IMAGE WRAPPER */}
      <div className="w-full h-32 mb-6 flex items-center justify-center">
        <Image
          src={v.imageSrc}
          alt={v.name}
          width={120}
          height={80}
          quality={90}
          className="object-contain"
        />
      </div>

      {/* TEXT */}
      <span className="text-lg font-bold text-gray-900">
        {v.name}
      </span>
      <span className="text-sm font-semibold text-gray-900 mt-1">
        {v.price}
      </span>
      <span className="text-xs text-gray-400 mt-1 text-center">
        {v.detail}
      </span>
    </div>
  ))}
</div>


                <div className="flex justify-center md:justify-start">
                    <Button 
                        onClick={() => setView('service-selection')}
                        className="w-60 h-14 text-xl font-bold rounded-xl bg-[#B8860B] hover:bg-[#D4A017] shadow-xl shadow-brand-gold/20"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </section>
    </div>
  );
}