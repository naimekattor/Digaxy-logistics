import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ParcelCreateRequest } from '@/types/parcel';

interface BookingState {
    parcelData: ParcelCreateRequest;
    currentStep: number;
    setParcelData: (data: Partial<ParcelCreateRequest>) => void;
    setCurrentStep: (step: number) => void;
    resetBooking: () => void;
}

const initialParcelData: ParcelCreateRequest = {
    pickup_date: '',
    pickup_time: '10:00',
    pickup_user_name: '',
    phone_number: '',
    pickup_address: '',
    drop_user_name: '',
    drop_number: '',
    drop_address: '',
    price: '0',
    vehicle_type: 'Pickup',
    notes: '',
    special_instructions: '',
    percel_type: 'Medium',
    ping: '',
    pong: '',
    ding: '',
    dong: '',
    estimated_distance_km: '0',
    estimated_time_minutes: '0',
};

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            parcelData: initialParcelData,
            currentStep: 1,
            setParcelData: (data) =>
                set((state) => ({
                    parcelData: { ...state.parcelData, ...data },
                })),
            setCurrentStep: (step) => set({ currentStep: step }),
            resetBooking: () => set({ parcelData: initialParcelData, currentStep: 1 }),
        }),
        {
            name: 'booking-storage',
        }
    )
);
