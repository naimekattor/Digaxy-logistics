'use client';

import React from 'react';
import { Card, Button, Input, Toggle } from '@/components/ui/Primitives';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

export default function CustomerSettingsPage() {
  return (
    <div className=" mx-auto  min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-3 border-b border-gray-100">
        {/* <button className="p-1">
          <ChevronLeft size={24} className="text-gray-900" />
        </button> */}
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Account Settings Card */}
        <Card className="p-6 border-none shadow-sm bg-white">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Account Settings</h2>
          
          {/* Profile Section */}
          <a href="/customer/profile" className="flex items-center gap-4 mb-6 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-brand-gold overflow-hidden">
              <img 
                src="https://picsum.photos/200" 
                alt="Joe Mitchell" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">Joe Mitchell</h3>
              <p className="text-sm text-gray-500">joemitchell01@gmail.com</p>
            </div>
          </a>

          {/* Change Password */}
          <a href="/customer/settings/change-password" className="w-full flex items-center justify-between py-4 border-t border-gray-100 cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-900">Change Password</span>
            <ChevronRight size={20} className="text-gray-400" />
          </a>
        </Card>

        {/* More Section */}
        <Card className="p-6 border-none shadow-sm bg-white">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">More</h2>
          
          <div className="space-y-0">
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-900">Privacy Policy</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-900">Terms & Condition</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-900">Helps & Support</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between py-4">
              <span className="text-sm font-medium text-red-500">Logout</span>
              <LogOut size={20} className="text-red-500" />
            </button>
          </div>
        </Card>

        {/* Admin Support Dropdown */}
        <Card className="p-4 border-none shadow-sm bg-gray-200">
          <button className="w-full flex items-center justify-between">
            <span className="text-sm font-medium text-brand-gold">Admin Support</span>
            <ChevronRight size={20} className="text-brand-gold rotate-90" />
          </button>
        </Card>
      </div>
    </div>
  );
}