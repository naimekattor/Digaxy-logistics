export type UserGender = 'Male' | 'Female' | 'Other';

export interface UserProfile {
    id: number;
    profile_picture: string | null;
    username: string;
    email: string;
    full_name: string;
    phone_number: string;
    is_active: boolean;
    date_joined: string;
    role: string;
    usertype: string;
    usergender: UserGender;
    date_of_birth: string | null;
}

export interface ProfileUpdateRequest {
    username?: string;
    full_name?: string;
    phone_number?: string;
    usergender?: UserGender;
    date_of_birth?: string;
    profile_picture?: File | null;
}
