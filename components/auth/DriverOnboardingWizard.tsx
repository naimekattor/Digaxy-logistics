'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/Primitives';
import { UserRole } from '@/types';
import BasicInfoStep from './steps/BasicInfoStep';
import LicenseStep from './steps/LicenseStep';
import VehicleStep from './steps/VehicleStep';
import IdentityStep from './steps/IdentityStep';
import ReviewStep from './steps/ReviewStep';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { useDriverSignupStore } from '@/stores/driverSignup.store';
import { submitDriverSignup } from '@/services/driverSignup.service';

export default function DriverOnboardingWizard() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const {basicInfo}=useDriverSignupStore();

  const totalSteps = 5;

  const handleNext = () => {
    setError('');
    
    if (step === 1) {
        if (!basicInfo.fullName || !basicInfo.email || !basicInfo.password || !basicInfo.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if (basicInfo.password !== basicInfo.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
  try {
    const data = useDriverSignupStore.getState();
    await submitDriverSignup(data);

    router.push("/driver/pending");
  } catch (err) {
    console.error(err);
    alert("Driver application failed");
  }
};

  const renderStep = () => {
    switch (step) {
      case 1: return <BasicInfoStep  />;
      case 2: return <LicenseStep  />;
      case 3: return <VehicleStep />;
      case 4: return <IdentityStep  />;
      case 5: return <ReviewStep  />;
      default: return null;
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth_illustrations/signup.png" imageAlt="Driver Signup">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#1A2E35] mb-2">Driver Registration</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
           <span>Step {step} of {totalSteps}</span>
           <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-[#A37800] transition-all duration-300"
               style={{ width: `${(step / totalSteps) * 100}%` }}
             />
           </div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {error && <p className="text-xs text-red-500 mt-4">{error}</p>}

      <div className="flex items-center gap-3 mt-8">
        {step > 1 && (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex-1 h-12"
          >
            <ChevronLeft size={18} /> Back
          </Button>
        )}
        <Button 
          onClick={handleNext} 
          isLoading={isLoading}
          className="flex-1 h-12 bg-[#A37800] hover:bg-[#866200]"
        >
          {step === totalSteps ? (
              <span className="flex items-center gap-2">Submit Application <Check size={18} /></span>
          ) : (
              <span className="flex items-center gap-2">Next Step <ChevronRight size={18} /></span>
          )}
        </Button>
      </div>
    </AuthLayout>
  );
}
