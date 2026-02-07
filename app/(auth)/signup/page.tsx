'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { Button, Input } from '@/components/ui/Primitives';
import { UserRole } from '@/types';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Mail, Eye, EyeOff } from 'lucide-react';
import DriverOnboardingWizard from '@/components/auth/DriverOnboardingWizard';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as UserRole || UserRole.CUSTOMER;
  
  const { signup, isLoading } = useAuth();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRole) setRole(initialRole);
  }, [initialRole]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    try {
        await signup(`${formData.firstName} ${formData.lastName}`, formData.email, role);
        router.push(role === UserRole.DRIVER ? '/driver' : role === UserRole.HELPER ? '/helper' : '/customer');
    } catch (err) {
        setError("Signup failed. Please try again.");
    }
  };

  if (role === UserRole.DRIVER) {
      return <DriverOnboardingWizard />;
  }

  return (
    <AuthLayout imageSrc="/images/auth_illustrations/signup.png" imageAlt="Signup Digaxy">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#1A2E35] mb-2">Sign Up</h2>
        <p className="text-gray-500 text-sm">Create your account to begin your journey with us</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            placeholder="First name" 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            required 
          />
          <Input 
            placeholder="Last name" 
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            required 
          />
        </div>

        <div className="relative">
          <Input 
            type="email" 
            placeholder="Email" 
            className="pl-10"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="relative">
          <Input 
            type={showPass ? "text" : "password"} 
            placeholder="password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <Input 
            type={showPass ? "text" : "password"} 
            placeholder="Confirm password" 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required 
          />
        </div>

        <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="terms" className="w-4 h-4 rounded border-gray-300 accent-brand-gold" required />
            <label htmlFor="terms" className="text-sm text-gray-500">I agree to the Terms & conditions</label>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button type="submit" isLoading={isLoading} className="w-full bg-[#A37800] hover:bg-[#866200] h-12 text-lg">
          Sign Up
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-500">
        Already have an account? <Link href="/login" className="text-brand-gold font-bold">Sign In</Link>
      </p>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#FDFBF7] px-2 text-gray-400 font-bold">Or</span></div>
      </div>

      <Button variant="outline" className="w-full h-12 border-slate-300 flex items-center justify-center gap-3">
        <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </Button>
    </AuthLayout>
  );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    );
}