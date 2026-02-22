'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
    Box, Truck, CreditCard, Gift, 
    RefreshCw, Rocket, ChevronLeft,
    Bell, Loader2, RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getNotifications } from '@/services/notification.service';
import { Notification } from '@/types/notification';
import { useNotificationStore } from '@/stores/notificationStore';

export default function CustomerNotificationsPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const notifications = useNotificationStore((state) => state.notifications);
    const connected = useNotificationStore((state) => state.connected);
    const connect = useNotificationStore((state) => state.connect);
    const setNotifications = useNotificationStore((state) => state.setNotifications);

    const fetchNotifications = useCallback(async () => {
        if (session?.accessToken) {
            try {
                setLoading(true);
                setError(null);
                // Fetching page 2 with page_size 1 as requested by user
                const response = await getNotifications(session.accessToken as string, 2, 1);
                setNotifications(response.results);
            } catch (err: any) {
                setError(err.message || 'Failed to load notifications');
            } finally {
                setLoading(false);
            }
        } else if (status === 'unauthenticated') {
            setLoading(false);
            setError('Please sign in to view your notifications');
        }
    }, [session?.accessToken, status, setNotifications]);

    useEffect(() => {
        if (session?.accessToken) {
            connect(session.accessToken as string);
        }
    }, [session?.accessToken, connect]);

    useEffect(() => {
        if (status !== 'loading') {
            fetchNotifications();
        }
    }, [fetchNotifications, status]);

    const getIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'booking': return Box;
            case 'delivery': return Truck;
            case 'payment': return CreditCard;
            case 'promo': return Gift;
            case 'update': return RefreshCw;
            case 'alert': return Rocket;
            default: return Bell;
        }
    };

    const NotificationItem = (n: Notification) => {
        const Icon = getIcon(n.notification_type);
        const date = new Date(n.created_at).toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <div key={n.id} className="flex items-start gap-6 py-6 px-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-gray-100">
                <div className="text-brand-gold group-hover:scale-110 transition-transform mt-1 bg-brand-gold/10 p-3 rounded-xl">
                    <Icon size={24} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <div className="flex justify-between items-start gap-4">
                        <span className="text-xl font-bold text-gray-900 leading-tight">{n.title}</span>
                        <span className="text-xs font-semibold text-gray-400 whitespace-nowrap mt-1 uppercase tracking-wider">{date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium">{n.message}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-3xl px-6 py-12">
            <div className="flex justify-between items-center mb-12">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-4 text-3xl font-black text-gray-900 hover:text-brand-gold transition-colors group"
                >
                    <div className="p-2 rounded-full group-hover:bg-brand-gold/10 transition-colors">
                        <ChevronLeft size={32} />
                    </div>
                    Notifications
                </button>
                
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold",
                        connected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                        <div className={cn("w-2 h-2 rounded-full", connected ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                        {connected ? 'Connected' : 'Disconnected'}
                    </div>

                    {!loading && !error && (
                        <button 
                            onClick={fetchNotifications}
                            className="p-3 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-all"
                            title="Refresh notifications"
                        >
                            <RotateCcw size={24} />
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                    <Loader2 size={56} className="text-brand-gold animate-spin" />
                    <div className="text-center">
                        <p className="text-gray-900 font-bold text-xl mb-1">Checking for updates</p>
                        <p className="text-gray-400 font-medium">Please wait a moment...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-3xl text-center shadow-lg shadow-red-500/5">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bell size={32} className="text-red-600" />
                    </div>
                    <h3 className="font-black text-2xl mb-2 text-gray-900">Oops! Something went wrong</h3>
                    <p className="text-gray-600 font-medium mb-8 max-w-xs mx-auto">{error}</p>
                    <button 
                        onClick={fetchNotifications}
                        className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                        Try Again
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.length > 0 ? (
                        <>
                            <div className="divide-y divide-gray-100 bg-white rounded-3xl overflow-hidden">
                                {notifications.map(n => NotificationItem(n))}
                            </div>
                            <p className="text-center text-gray-400 text-sm font-medium pt-8">
                                Displaying latest updates
                            </p>
                        </>
                    ) : (
                        <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <Bell size={48} className="text-gray-200" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">No notifications yet</h3>
                            <p className="text-gray-500 font-medium max-w-xs mx-auto">We'll notify you here when there are updates on your bookings.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
