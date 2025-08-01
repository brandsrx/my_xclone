'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: number;
  followers: number;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  username: 'johndoe',
  displayName: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  bio: 'Frontend Developer | React enthusiast | Coffee lover ☕',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  joinDate: '2021-03-15',
  following: 234,
  followers: 1247,
  verified: true,
};

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'john@example.com' && password === 'password') {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '',
      location: '',
      website: '',
      joinDate: new Date().toISOString().split('T')[0],
      following: 0,
      followers: 0,
      verified: false,
    };
    setUser(newUser);
    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a Providers component');
  }
  return context;
};