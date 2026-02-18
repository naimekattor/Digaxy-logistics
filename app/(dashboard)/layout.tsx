'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { UserRole } from '@/types';
import SocketNotification from '@/components/SocketNotification';
import { useNotificationStore } from '@/stores/notificationStore';
import { useTrackingStore } from '@/stores/trackingStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const connect = useNotificationStore((state) => state.connect);
  const connectTracker = useTrackingStore((state) => state.connect);

  useEffect(() => {
    const token = session?.accessToken;
    if (token) {
      connect(token);
    }
  }, []);


  //live tracking websocket
  useEffect(()=>{
    const token = session?.accessToken;
    if (token) {
      connectTracker(token);
    }
  },[])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="animate-pulse text-brand-gold font-serif text-2xl">DIGAXY...</div>
      </div>
    );
  }

  if (!session) return null;

  // Check for pending driver status
  if (session.role === 'driver' && session.driverStatus !== 'Approved') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-amber-100">
           <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h2 className="text-2xl font-bold text-[#1A2E35] mb-2">Application Pending</h2>
           <p className="text-gray-500 mb-8">
             Your driver application is currently under review by our admin team. This usually takes 24-48 hours.
           </p>
           <div className="bg-amber-50 p-4 rounded-lg mb-8 text-left text-sm text-gray-700">
             <p className="font-medium mb-1">What's next?</p>
             <ul className="list-disc list-inside space-y-1">
               <li>Admin reviews your documents</li>
               <li>Verification of license & identity</li>
               <li>Approval notification via email</li>
             </ul>
           </div>
           <button 
             onClick={() => window.location.href = '/'} // Or logout
             className="text-gray-400 hover:text-gray-600 font-medium text-sm"
           >
             Back to Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Sidebar role={session.role || UserRole.CUSTOMER} />
      <main className="lg:pl-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto p-6 pt-20 lg:pt-8 max-w-6xl">
          {children}
        </div>
      </main>
      <SocketNotification/>
    </div>
  );
}