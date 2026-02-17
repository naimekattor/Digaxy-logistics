'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/ui/Primitives';
import { 
    ChevronRight, LogOut, X, Phone, User, 
    Printer, PhoneCall, Info
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function CustomerSettingsPage() {
  const { data: session } = useSession();
  const [isAdminSupportOpen, setIsAdminSupportOpen] = useState(false);

  // Fallback data if session is not available
  const userName = (session?.user as any)?.username || session?.user?.username || "User";
  const userEmail = session?.user?.email || "";
  const profilePicture = (session?.user as any)?.profile_picture || "https://picsum.photos/200";

  return (
    <div className="mx-auto min-h-screen relative">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Account Settings Card */}
        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 tracking-tight">Account Settings</h2>
          
          {/* Profile Section */}
          <a href="/customer/profile" className="flex items-center gap-4 mb-6 cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all">
            <div className="w-12 h-12 rounded-full border-2 border-brand-gold overflow-hidden shadow-sm">
              <img 
                src={profilePicture} 
                alt={userName} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 leading-tight">{userName}</h3>
              <p className="text-sm text-gray-500 font-medium">{userEmail}</p>
            </div>
          </a>

          {/* Change Password */}
          <a href="/customer/settings/change-password" className="w-full flex items-center justify-between py-4 border-t border-gray-100 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2">
            <span className="text-sm font-bold text-gray-700">Change Password</span>
            <ChevronRight size={20} className="text-gray-400" />
          </a>
        </Card>

        {/* More Section */}
        <Card className="p-6 border-none shadow-sm bg-white rounded-3xl">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 tracking-tight">More</h2>
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
              <span className="text-sm font-bold text-gray-700">Privacy Policy</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
              <span className="text-sm font-bold text-gray-700">Terms & Condition</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between py-4 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors pt-4">
              <span className="text-sm font-bold text-gray-700">Helps & Support</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </Card>

        {/* Admin Support Button */}
        <div 
          onClick={() => setIsAdminSupportOpen(true)}
          className="p-5 rounded-3xl shadow-sm bg-brand-gold/10 border border-brand-gold/20 cursor-pointer hover:bg-brand-gold/15 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-brand-gold text-white rounded-xl group-hover:scale-110 transition-transform">
                  <PhoneCall size={18} />
               </div>
               <span className="text-sm font-black text-brand-gold tracking-wide">Admin Support</span>
            </div>
            <ChevronRight size={20} className="text-brand-gold transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Admin Support Modal */}
      {isAdminSupportOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAdminSupportOpen(false)}
          />
          <div className="relative bg-[#E0E0E0] w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl transform transition-all p-8 md:p-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-medium text-[#C4A47C]">Admin Support</h2>
              <button 
                onClick={() => setIsAdminSupportOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={32} className="text-gray-900" />
              </button>
            </div>

            <div className="space-y-8">
              <a href="tel:3032760303" className="flex items-center gap-6 group">
                <div className="text-[#C4A47C]">
                  <Phone size={28} />
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-800 group-hover:text-brand-gold transition-colors">
                  Customer Service: (303) 276-0303
                </span>
              </a>

              <a href="tel:3038793870" className="flex items-center gap-6 group">
                <div className="text-[#C4A47C]">
                  <Printer size={28} />
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-800 group-hover:text-brand-gold transition-colors">
                  Fax: (303) 879-3870
                </span>
              </a>

              <a href="tel:3039630093" className="flex items-center gap-6 group">
                <div className="text-[#C4A47C]">
                  <User size={28} />
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-800 group-hover:text-brand-gold transition-colors">
                  Alain I. Digarson (Ext 101): (303) 963-0093
                </span>
              </a>

              <a href="tel:3032760323" className="flex items-center gap-6 group">
                <div className="text-[#C4A47C]">
                  <div className="border-2 border-[#C4A47C] rounded-full p-0.5">
                    <Phone size={20} />
                  </div>
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-800 group-hover:text-brand-gold transition-colors">
                  Extension 102: (303) 276-0323
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
