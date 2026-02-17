'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Logo } from '@/components/ui/Primitives';
import { 
  Home, MapPin, ShoppingBag, BadgeCheck, Tag, 
  Menu, X, LogOut, LayoutDashboard, User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Cities', href: '/cities', icon: MapPin },
  { label: 'Retailers', href: '/retailers', icon: ShoppingBag },
  { label: 'Become a Digaxy Partner', href: '/partner-page', icon: BadgeCheck },
  { label: 'Get Estimate', href: '/estimate', icon: Tag },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const dashboardHref = session?.role ? `/${session.role}` : '/login';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
                    isActive 
                      ? "bg-brand-gold/10 text-brand-gold" 
                      : "text-gray-600 hover:text-brand-gold hover:bg-gray-50"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive ? "text-brand-gold" : "text-brand-gold")} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {status === 'authenticated' && session ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={toggleProfile}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-brand-gold/20"
                >
                  <div className="w-10 h-10 rounded-full border border-brand-gold/30 overflow-hidden bg-gray-50 flex items-center justify-center">
                    {session.user?.profile_picture ? (
                      <img 
                        src={session.user.profile_picture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="text-brand-gold w-6 h-6" />
                    )}
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                <div className={cn(
                  "absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 transition-all duration-200 origin-top-right z-[60]",
                  isProfileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}>
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account</p>
                    <p className="text-sm font-black text-gray-900 truncate">{(session.user as any)?.username || session.user?.name}</p>
                  </div>
                  
                  <Link 
                    href={dashboardHref}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-brand-gold/5 hover:text-brand-gold transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            ) : status !== 'loading' && (
              <Link href="/login" className="hidden sm:block">
                <Button className="w-auto px-8 py-2.5 rounded-xl bg-brand-gold text-white font-bold text-sm shadow-none hover:bg-brand-gold/90 transition-all">
                  Log In
                </Button>
              </Link>
            )}
            
            {/* Mobile Menu Trigger */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-brand-gold transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden transition-all duration-300 ease-in-out transform",
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-6">
          {session && (
             <div className="flex items-center gap-4 p-4 rounded-3xl bg-brand-gold/5 border border-brand-gold/10">
                <div className="w-16 h-16 rounded-full border-2 border-brand-gold overflow-hidden">
                  {session.user?.profile_picture ? (
                    <img src={session.user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center text-brand-gold">
                      <UserIcon size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xl font-black text-gray-900">{(session.user as any)?.username || session.user?.name}</p>
                  <p className="text-sm font-bold text-brand-gold capitalize">{session.role}</p>
                </div>
             </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
                <span className="text-lg font-bold text-gray-800 group-hover:text-brand-gold transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="pt-6 border-t border-gray-100 space-y-4">
            {session ? (
              <>
                <Link 
                  href={dashboardHref} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-brand-gold text-white font-bold text-lg shadow-xl shadow-brand-gold/20"
                >
                  <LayoutDashboard size={22} />
                  Go to Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-red-50 text-red-600 font-bold text-lg"
                >
                  <LogOut size={22} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-14 rounded-2xl bg-brand-gold text-white font-bold text-lg shadow-xl shadow-brand-gold/20">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
