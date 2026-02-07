'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/lib/authContext';
import { Button, Input } from '@/components/ui/Primitives'; // Removed Card
import { UserRole } from '@/types';
import AuthLayout from '@/components/auth/AuthLayout';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
        setError("Please fill in all fields");
        return;
    }

    try {
        const result = await signIn('credentials', {
            email,
            password,
            role,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
            return;
        }

        // Also update local mock context if desired, or skip if only using NextAuth
        await login(email, role);
        
        if (role === UserRole.DRIVER) router.push('/driver');
        else if (role === UserRole.HELPER) router.push('/helper');
        else router.push('/customer');
    } catch (err) {
        setError("Login failed. Please try again.");
    }
  };


    return (
    <AuthLayout imageSrc="/images/auth_illustrations/loginpage.png" imageAlt="Login Illustration">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Log in to manage your moves</p>
      </div>

      {/* Role Selector */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
        {[UserRole.CUSTOMER, UserRole.DRIVER, UserRole.HELPER].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
              role === r ? 'bg-white text-brand-gold shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          label="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <a href="#" className="text-sm text-brand-gold hover:underline">Forgot password?</a>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
          Log In
        </Button>
      </form>
      
      <p className="text-center mt-6 text-sm text-gray-500">
        Don't have an account? <Link href="/join" className="text-brand-gold font-semibold">Sign Up</Link>
      </p>

      {/* Quick Access Section stays here... */}
    </AuthLayout>
  );
}
