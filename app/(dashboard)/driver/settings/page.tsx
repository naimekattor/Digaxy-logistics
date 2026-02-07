'use client';

import React from 'react';
import { Card, Button, Input, Toggle } from '@/components/ui/Primitives';
import { User, Shield, Bell, CreditCard, Truck } from 'lucide-react';

export default function DriverSettingsPage() {
  return (
    <div className="max-w-4xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Driver Profile Settings</h1>
            <p className="text-gray-500">Manage your fleet information and payouts</p>
        </div>

        <div className="space-y-8">
            <Card className="p-8 border-none shadow-sm">
                <h3 className="text-xl font-bold mb-8">Personal Information</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="First Name" defaultValue="Naim" />
                        <Input label="Last Name" defaultValue="Doe" />
                        <Input label="Phone Number" defaultValue="+1 234 567 890" />
                        <Input label="Email Address" defaultValue="naim@digaxy.com" />
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-none shadow-sm">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <Truck className="text-brand-gold" size={24} /> Vehicle Information
                </h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Vehicle Model" defaultValue="Ford F-150" />
                        <Input label="License Plate" defaultValue="ABC-1234" />
                        <Input label="Vehicle Color" defaultValue="White" />
                        <Input label="Max Load (lbs)" defaultValue="2,000" />
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-none shadow-sm">
                <h3 className="text-xl font-bold mb-8">Availability</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-gray-900">Accepting New Jobs</h4>
                            <p className="text-xs text-gray-400">Toggle this to appear in customer searches</p>
                        </div>
                        <Toggle enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                        <div>
                            <h4 className="font-bold text-gray-900">Active Mode</h4>
                            <p className="text-xs text-gray-400">Receive instant push notifications for nearby tasks</p>
                        </div>
                        <Toggle enabled={true} onChange={() => {}} />
                    </div>
                </div>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="ghost" className="w-auto px-8">Discard</Button>
                <Button className="w-auto px-12 font-bold shadow-lg shadow-brand-gold/20">Update Profile</Button>
            </div>
        </div>
    </div>
  );
}
