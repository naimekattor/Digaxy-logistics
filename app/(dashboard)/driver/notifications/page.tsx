'use client';

import React from 'react';
import { Card } from '@/components/ui/Primitives';
import { Bell, Info, ShieldCheck, Truck } from 'lucide-react';

const notifications = [
    { id: 1, title: 'New Job Available', message: 'A move in Brooklyn is looking for a driver. $150 potential earning.', time: '5m ago', icon: Truck, type: 'info' },
    { id: 2, title: 'Identity Verified', message: 'Your background check has been cleared. You are now a premium partner.', time: '1h ago', icon: ShieldCheck, type: 'success' },
    { id: 3, title: 'System Update', message: 'Maintenance scheduled for tonight at 2 AM EST.', time: '4h ago', icon: Info, type: 'warning' },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-500">Important updates about your account and jobs</p>
        </div>

        <div className="space-y-4">
            {notifications.map((n) => (
                <Card key={n.id} className="p-6 border-none shadow-sm flex gap-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                         n.type === 'success' ? 'bg-green-100 text-green-600' : 
                         n.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                         'bg-brand-gold/10 text-brand-gold'
                    }`}>
                        <n.icon size={28} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gray-900 text-lg">{n.title}</h3>
                            <span className="text-xs text-gray-400 font-bold tracking-widest">{n.time}</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{n.message}</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
}
