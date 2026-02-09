'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  Home, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Truck,
  Box,
  MapPin,
  Wallet,
  History,
  User
} from 'lucide-react';
import { Logo } from '@/components/ui/Primitives';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();

  // Define navigation based on role
  const getNavItems = () => {
    const baseItems = [
      { label: 'Notification', href: `/${role}/notifications`, icon: Bell },
      { label: 'Setting', href: `/${role}/settings`, icon: Settings },
    ];

    if (role === UserRole.DRIVER) {
      return [
        { label: 'Home', href: `/${role}`, icon: Home },
        { label: 'Earnings', href: `/${role}/earnings`, icon: Wallet },
        { label: 'History', href: `/${role}/history`, icon: History },
        ...baseItems
      ];
    }

    if (role === UserRole.HELPER) {
      return [
        { label: 'Home', href: `/${role}`, icon: Home },
        { label: 'Earnings', href: `/${role}/earnings`, icon: Wallet },
        { label: 'Progress', href: `/${role}/progress`, icon: History },
        ...baseItems
      ];
    }

    if (role === UserRole.CUSTOMER) {
      return [
        { label: 'Home', href: `/${role}`, icon: Home },
        { label: 'Bookings', href: `/${role}/bookings`, icon: History },
        { label: 'Cities', href: `/${role}/cities`, icon: MapPin },
        { label: 'Notification', href: `/${role}/notifications`, icon: Bell },
        { label: 'Setting', href: `/${role}/settings`, icon: Settings },
      ];
    }
    
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Logo className="scale-75 origin-left" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-gray-100 flex flex-col",
          isOpen ? "translate-x-0 pt-16 lg:pt-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className="p-8 hidden lg:block">
           <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-8 py-4 space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl text-md transition-all duration-200",
                  isActive 
                    ? "bg-gray-100 text-gray-900 font-semibold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={20} className="text-brand-gold" />
                {item.label}
              </Link>
            );
          })}
        </nav>


        {/* User Profile & Logout */}
        <div className="p-8 space-y-4 border-t border-gray-50">
          <div className="flex items-center gap-3 px-2 cursor-pointer hover:bg-gray-50 rounded-xl py-2 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center text-brand-gold">
                <User size={20} />
            </div>
            <span className="font-medium text-gray-900">{session?.user?.name || "Naim Doe"}</span>
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-4 px-2 py-2 text-md font-medium text-brand-gold hover:bg-red-50 hover:text-red-600 rounded-xl transition-all w-full"
          >
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}