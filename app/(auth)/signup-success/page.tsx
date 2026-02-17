'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Primitives';
import AuthLayout from '@/components/auth/AuthLayout';
import { CheckCircle2 } from 'lucide-react';
import { UserRole } from '@/types';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole;

  const handleContinue = () => {
    if (role === UserRole.CUSTOMER) router.push('/customer');
    else if (role === UserRole.HELPER) router.push('/helper');
    else if (role === UserRole.DRIVER) router.push('/driver/pending'); 
    else router.push('/login');
  };

  return (
    <AuthLayout imageSrc="/images/auth_illustrations/signup.png" imageAlt="Registration Successful">
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-[#1A2E35] mb-2">Account Created!</h2>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
          Your email has been verified and your account is now active.
        </p>

        <Button 
          onClick={handleContinue}
          className="w-full bg-[#A37800] hover:bg-[#866200] h-14 text-lg font-bold shadow-lg shadow-brand-gold/20"
        >
          Continue
        </Button>
      </div>
    </AuthLayout>
  );
}

export default function SignupSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
