'use client';

import React, { useEffect, useState } from 'react';
import { 
    ChevronLeft, User, Phone, Camera, 
    Loader2, Save, AtSign, UserSquare,
    Calendar, Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getProfile, updateProfile } from '@/services/profile.service';
import { UserProfile, ProfileUpdateRequest, UserGender } from '@/types/profile';

export default function EditProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState<ProfileUpdateRequest>({
        username: '',
        full_name: '',
        phone_number: '',
        usergender: 'Male',
        date_of_birth: '',
        profile_picture: null,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (session?.accessToken) {
                try {
                    setLoading(true);
                    const profile = await getProfile(session.accessToken as string);
                    setFormData({
                        username: profile.username || '',
                        full_name: profile.full_name || '',
                        phone_number: profile.phone_number || '',
                        usergender: profile.usergender || 'Male',
                        date_of_birth: profile.date_of_birth || '',
                    });
                    if (profile.profile_picture) {
                        setPreviewUrl(profile.profile_picture);
                    }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, profile_picture: file }));
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.accessToken) return;

        try {
            setSaving(true);
            setError(null);
            setSuccess(false);
            await updateProfile(session.accessToken as string, formData);
            setSuccess(true);
            setTimeout(() => {
                router.push('/customer/profile');
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 size={48} className="text-brand-gold animate-spin" />
                <p className="text-gray-500 font-medium italic">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">Edit Profile</h1>
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={saving || success}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-full font-bold hover:bg-brand-gold/90 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : (success ? <Check size={18} /> : <Save size={18} />)}
                    {success ? 'Saved!' : (saving ? 'Saving...' : 'Save')}
                </button>
            </div>

            <div className="flex flex-col items-center mt-8 mb-10">
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-image')?.click()}>
                    <div className="w-32 h-32 rounded-full border-2 border-brand-gold overflow-hidden p-1 shadow-lg shadow-brand-gold/10 group-hover:opacity-80 transition-opacity">
                        {previewUrl ? (
                            <img 
                                src={previewUrl} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                <User size={64} />
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-xl border-2 border-white shadow-lg">
                        <Camera size={18} />
                    </div>
                    <input 
                        id="profile-image"
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <p className="mt-4 text-sm font-bold text-brand-gold">Tap to change photo</p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 space-y-6 max-w-lg mx-auto">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Username</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <AtSign size={18} />
                        </div>
                        <input 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter username"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                        />
                    </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <User size={18} />
                        </div>
                        <input 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Phone size={18} />
                        </div>
                        <input 
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            type="tel" 
                            placeholder="Enter phone number"
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                        />
                    </div>
                </div>

                {/* Gender and DOB row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <UserSquare size={18} />
                            </div>
                            <select 
                                name="usergender"
                                value={formData.usergender}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all appearance-none bg-white"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Date of Birth</label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                <Calendar size={18} />
                            </div>
                            <input 
                                name="date_of_birth"
                                value={formData.date_of_birth || ''}
                                onChange={handleChange}
                                type="date" 
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={saving || success}
                        className="w-full py-4 bg-brand-gold text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-lg shadow-gray-200 disabled:opacity-50 transform active:scale-95"
                    >
                        {saving ? (
                            <div className="flex items-center justify-center gap-3">
                                <Loader2 size={24} className="animate-spin" />
                                <span>Saving Changes...</span>
                            </div>
                        ) : (success ? 'Changes Saved!' : 'Save Profile')}
                    </button>
                </div>
            </form>
        </div>
    );
}
