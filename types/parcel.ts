export type VehicleType = 'Small' | 'Medium' | 'Large' | 'Pickup' | 'Van' | 'Mini Box Truck' | '26 Feet Box Truck' | 'Bigbox';

export interface ParcelCreateRequest {
    pickup_date: string;
    pickup_time: string;
    pickup_user_name: string;
    phone_number: string;
    pickup_address: string;
    drop_user_name: string;
    drop_number: string;
    drop_address: string;
    price: string;
    vehicle_type: string;
    notes: string;
    special_instructions: string;
    percel_type: string;
    ping: string;
    pong: string;
    ding: string;
    dong: string;
    estimated_distance_km: string;
    estimated_time_minutes: string;
}

export interface ParcelResponse extends ParcelCreateRequest {
    id: number;
    payment_status: string;
    created_at: string;
    updated_at: string;
    delivery_status: string;
    parcel_id: string;
    user: number;
}
export interface ParcelListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ParcelResponse[];
}
