'use client';

import React from 'react';
import { Card, Button, Input, Toggle } from '@/components/ui/Primitives';
import { User, Shield, Bell, HardHat } from 'lucide-react';

export default function HelperSettingsPage() {
  return (
    <div className="max-w-4xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Helper Profile Settings</h1>
            <p className="text-gray-500">Manage your contact details and availability</p>
        </div>

        <div className="space-y-8">
            <Card className="p-8 border-none shadow-sm">
                <h3 className="text-xl font-bold mb-8">Personal Information</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="First Name" defaultValue="Alex" />
                        <Input label="Last Name" defaultValue="Helper" />
                        <Input label="Phone Number" defaultValue="+1 987 654 321" />
                        <Input label="Email Address" defaultValue="alex@digaxy.com" />
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-none shadow-sm">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <HardHat className="text-brand-gold" size={24} /> Work Preferences
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-gray-900">Heavy Lifting Available</h4>
                            <p className="text-xs text-gray-400">Can handle items over 50 lbs</p>
                        </div>
                        <Toggle enabled={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                        <div>
                            <h4 className="font-bold text-gray-900">Multi-day Availability</h4>
                            <p className="text-xs text-gray-400">Available for long-term moving projects</p>
                        </div>
                        <Toggle enabled={false} onChange={() => {}} />
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
