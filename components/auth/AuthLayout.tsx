import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc: string; // Dynamic image path
  imageAlt?: string;
}

const AuthLayout = ({ children, imageSrc, imageAlt }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      {/* LEFT SIDE: Dynamic Image & Back Button */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white items-center justify-center p-12">
        
        {/* Back to Website Button */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium bg-[#A97200] text-white py-2 px-6 rounded-[16px]  transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span>Back to website</span>
        </Link>

        {/* Dynamic Image */}
        <div className="relative w-full max-w-lg aspect-square">
          <Image
            src={imageSrc} 
            alt={imageAlt || "Authentication Illustration"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* RIGHT SIDE: Auth Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 relative">
        
        {/* Mobile-only Back Button (Visible when left side is hidden) */}
        <div className="absolute top-4 left-4 lg:hidden">
          <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-gold">
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>

        <div className="w-full max-w-md mt-6 lg:mt-0">
          {/* Brand Logo Header */}
          <div className="text-center mb-10">
            <div className="flex flex-col items-center mb-2">
              <span className="text-3xl font-serif font-bold tracking-widest text-brand-gold">DIGAXY</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                Your Move , Our Priority
              </span>
            </div>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;