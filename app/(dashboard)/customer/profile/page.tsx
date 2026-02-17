'use client';

import React, { useEffect, useState } from 'react';
import { 
    ChevronLeft, Edit, Camera, User, 
    Mail, Phone, MapPin, Loader2, Calendar,
    UserCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getProfile } from '@/services/profile.service';
import { UserProfile } from '@/types/profile';

export default function CustomerProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (session?.accessToken) {
                try {
                    setLoading(true);
                    const data = await getProfile(session.accessToken as string);
                    setProfile(data);
                } catch (err: any) {
                    setError(err.message || 'Failed to load profile');
                } finally {
                    setLoading(false);
                }
            } else if (status === 'unauthenticated') {
                router.push('/login');
            }
        };

        if (status !== 'loading') {
            fetchProfile();
        }
    }, [session?.accessToken, status, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 size={48} className="text-brand-gold animate-spin" />
                <p className="text-gray-500 font-medium italic">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 max-w-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-red-600 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const ProfileItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | null | undefined }) => (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold mt-1">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-600">{value || 'Not provided'}</p>
            </div>
        </div>
    );

    return (
        <div className="mx-auto min-h-screen pb-12">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
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
                    <div className="w-32 h-32 rounded-full border-2 border-brand-gold overflow-hidden p-1 shadow-lg shadow-brand-gold/10">
                        {profile?.profile_picture ? (
                            <img 
                                src={profile.profile_picture} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                <UserCircle size={80} />
                            </div>
                        )}
                    </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{profile?.full_name || profile?.username}</h2>
                <p className="text-sm text-gray-500 font-medium">{profile?.email}</p>
            </div>

            <div className="px-8 space-y-8 max-w-lg mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <ProfileItem icon={User} label="Full Name" value={profile?.full_name} />
                <ProfileItem icon={Mail} label="Email Address" value={profile?.email} />
                <ProfileItem icon={Phone} label="Phone Number" value={profile?.phone_number} />
                <ProfileItem icon={UserCircle} label="Gender" value={profile?.usergender} />
                <ProfileItem icon={Calendar} label="Date of Birth" value={profile?.date_of_birth} />
                <ProfileItem icon={MapPin} label="Account Type" value={profile?.usertype} />
            </div>
        </div>
    );
}
