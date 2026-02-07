'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, role: UserRole, driverDetails?: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session simulation
    const storedUser = localStorage.getItem('digaxy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: '1',
      name: role === UserRole.DRIVER ? 'Naim Doe' : role === UserRole.HELPER ? 'Alex Helper' : 'John Customer',
      email,
      role,
      image: 'https://picsum.photos/150',
      status: 'approved' as any
    };

    setUser(mockUser);
    localStorage.setItem('digaxy_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, role: UserRole, driverDetails?: any) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      image: 'https://picsum.photos/150',
      status: role === UserRole.DRIVER ? 'pending' : 'approved' as any,
      driverDetails: role === UserRole.DRIVER ? driverDetails : undefined
    };

    setUser(mockUser);
    localStorage.setItem('digaxy_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digaxy_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};