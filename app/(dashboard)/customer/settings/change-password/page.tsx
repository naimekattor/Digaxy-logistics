'use client';

import React from 'react';
import { Card, Button, Input } from '@/components/ui/Primitives';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Change Password</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="space-y-6">
          <Input 
            label="Old Password" 
            placeholder="Type here" 
            type="password"
            className="bg-white border-brand-gold/20 focus:border-brand-gold"
          />
          
          <Input 
            label="New Password" 
            placeholder="Type here" 
            type="password"
            className="bg-white border-brand-gold/20 focus:border-brand-gold"
          />

          <Input 
            label="Confirm Password" 
            placeholder="Type here" 
            type="password"
            className="bg-white border-brand-gold/20 focus:border-brand-gold"
          />
        </div>

        <div className="mt-8">
            <Button className="w-full">
                Change Password
            </Button>
        </div>
      </div>
    </div>
  );
}
