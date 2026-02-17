'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components/ui/Primitives';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { changePassword } from '@/services/auth.service';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear messages when user starts typing again
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (!session?.accessToken) {
      setError('You are not authenticated');
      return;
    }

    try {
      setLoading(true);
      await changePassword(session.accessToken, {
        old_password: formData.oldPassword,
        new_password: formData.newPassword
      });
      
      // Show success state instead of immediate redirect
      setSuccess(true);
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
      // Optional: still show toast (less intrusive than before)
      toast.success('Password changed successfully');
      
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  // Optional: let user go back manually after seeing success
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="mx-auto min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
        <button 
          onClick={success ? handleBack : () => router.back()} 
          className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Change Password</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <CheckCircle size={64} className="text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Password Changed!</h2>
            <p className="text-gray-600 max-w-md">
              Your password has been updated successfully.
              
            </p>
            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline"
                onClick={handleBack}
                className="min-w-[140px]"
              >
                Go Back
              </Button>
              <Button 
                onClick={() => setSuccess(false)}
                className="min-w-[140px] bg-[#A37800] hover:bg-[#866200]"
              >
                Change Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <Input 
                label="Old Password" 
                name="oldPassword"
                placeholder="Type here" 
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="bg-white border-brand-gold/20 focus:border-brand-gold"
              />
              
              <Input 
                label="New Password" 
                name="newPassword"
                placeholder="Type here" 
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-white border-brand-gold/20 focus:border-brand-gold"
              />

              <Input 
                label="Confirm Password" 
                name="confirmPassword"
                placeholder="Type here" 
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white border-brand-gold/20 focus:border-brand-gold"
              />
              
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="mt-8">
              <Button 
                onClick={handleSubmit} 
                isLoading={loading}
                className="w-full bg-[#A37800] hover:bg-[#866200]"
              >
                Change Password
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}