'use client';

import React from 'react';
import { Card } from '@/components/ui/Primitives';
import { 
    Box, Truck, CreditCard, Gift, 
    RefreshCw, Rocket, ChevronLeft 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const recentNotifications = [
    { id: 1, title: 'Booking confirmed', icon: Box },
    { id: 2, title: 'Your loader is on the way', icon: Truck },
    { id: 3, title: 'Payment successful', icon: CreditCard },
    { id: 4, title: 'Special discount this week', icon: Gift },
];

const previousNotifications = [
    { id: 5, title: 'Your mover has arrived', icon: RefreshCw },
    { id: 6, title: 'Payment received', icon: CreditCard },
    { id: 7, title: 'A new promo is available', icon: Rocket },
];

export default function CustomerNotificationsPage() {
  const router = useRouter();

  const NotificationItem = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-6 py-4 px-2 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
        <div className="text-brand-gold group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800">{title}</span>
    </div>
  );

  return (
    <div className="max-w-2xl px-4">
        <button 
            onClick={() => router.back()}
            className="flex items-center gap-4 text-3xl font-bold text-gray-900 mb-12 hover:text-brand-gold transition-colors"
        >
            <ChevronLeft size={32} />
            Notification
        </button>

        <section className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Recent</h3>
            <div className="space-y-4">
                {recentNotifications.map(n => <NotificationItem key={n.id} {...n} />)}
            </div>
        </section>

        <section>
            <h3 className="text-xl font-bold text-gray-900 mb-8">Previous</h3>
            <div className="space-y-4">
                {previousNotifications.map(n => <NotificationItem key={n.id} {...n} />)}
            </div>
        </section>
    </div>
  );
}
