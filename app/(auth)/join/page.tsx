'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Primitives';

export default function JoinAsPage() {
  const router = useRouter();

  const handleRoleSelect = (role: 'driver' | 'customer' | 'helper') => {
    // Redirect to signup and pass the role in the URL
    router.push(`/signup?role=${role}`);
  };

  return (
    <AuthLayout imageSrc="/images/auth_illustrations/join.png" imageAlt="Join Digaxy">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#1A2E35] mb-3">Join As</h1>
        <p className="text-gray-500">
          Choose your role to get started with <span className="text-brand-gold font-bold">DIGAXY</span>
        </p>
      </div>

      <div className="space-y-4 w-full">
        {/* Mover Option */}
        <Button 
          
          onClick={() => handleRoleSelect('customer')}
          className=" w-full bg-[#A37800] h-16 text-lg font-semibold rounded-xl transition-all"
        >
          Customer
        </Button>
        {/* Driver Option */}
        <Button 
        variant="outline"
          onClick={() => handleRoleSelect('driver')}
          className="w-full h-16 text-lg font-semibold border-slate-300 text-[#1A2E35]  rounded-xl transition-all"
        >
          Driver
        </Button>

        
        <Button 
          variant="outline"
          onClick={() => handleRoleSelect('helper')}
          className="w-full h-16 text-lg font-semibold border-slate-300 text-[#1A2E35]  rounded-xl transition-all"
        >
          Helper
        </Button>
      </div>
    </AuthLayout>
  );
}