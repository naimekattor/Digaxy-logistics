'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui/Primitives';
import AuthLayout from '@/components/auth/AuthLayout';
import { sendOtp, verifyOtp } from '@/services/auth.service';
import { UserRole } from '@/types';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const role = searchParams.get('role') as UserRole;
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    if (!email) {
      router.push('/signup');
      return;
    }
    // Auto send OTP on first load
    if (sentCount === 0) {
      handleInitialSend();
    }
  }, [email, sentCount]);

  const handleInitialSend = async () => {
    try {
      setSentCount(1);
      await sendOtp(email!);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code. Please try resending.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the verification code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await verifyOtp(email!, otp);
      
      // Success! Redirect to success page
      router.push(`/signup-success?role=${role}`);
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      setError('');
      await sendOtp(email!);
      setSentCount(prev => prev + 1);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth_illustrations/join.png" imageAlt="Verify Email">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1A2E35] mb-2">Check Your Email</h2>
        <p className="text-gray-500 text-sm">
          We've sent a 6-digit verification code to <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-3 text-center">
  <div className="relative">
    <Input
      placeholder="000000"
      value={otp}
      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
      className="
        text-center 
        text-3xl 
        tracking-[0.6em] 
        font-semibold 
        h-16 
        rounded-2xl 
        border-2 
        border-gray-200 
        focus:border-[#A37800] 
        focus:ring-4 
        focus:ring-[#A37800]/10
        transition-all 
        duration-200
      "
      maxLength={6}
      inputMode="numeric"
      required
    />
  </div>

  {error && (
    <p className="text-sm text-red-500 font-medium">
      {error}
    </p>
  )}
</div>


        <Button 
          type="submit"
          isLoading={loading}
          className="w-full bg-[#A37800] hover:bg-[#866200] h-14 text-lg font-bold shadow-lg shadow-brand-gold/20"
        >
          Verify & Continue
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{' '}
            <button 
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-brand-gold font-bold hover:underline disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
