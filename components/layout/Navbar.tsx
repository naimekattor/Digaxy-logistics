'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Logo } from '@/components/ui/Primitives';
import { Home, MapPin, ShoppingBag, BadgeCheck, Tag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Cities', href: '/cities', icon: MapPin },
  { label: 'Retailers', href: '/retailers', icon: ShoppingBag },
  { label: 'Become a Digaxy Partner', href: '/partner-page', icon: BadgeCheck },
  { label: 'Get Estimate', href: '/estimate', icon: Tag },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
            <Link href="/login" className="hidden sm:block">
              <Button className="w-auto px-8 py-2.5 rounded-xl bg-brand-gold text-white font-bold text-sm shadow-none hover:bg-brand-gold/90 transition-all">
                Log In
              </Button>
            </Link>
            
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
          <div className="pt-6 border-t border-gray-100">
             <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-14 rounded-2xl bg-brand-gold text-white font-bold text-lg shadow-xl shadow-brand-gold/20">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
