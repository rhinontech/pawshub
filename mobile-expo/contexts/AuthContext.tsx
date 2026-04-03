import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = "owner" | "veterinarian" | "admin" | "shelter";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: any;
  token?: string;
  isVerified?: boolean;
  petCount?: number;
  memberSince?: string;
  rating?: number | string;
  yearsExp?: number | string;
  clinic?: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  isLoading: boolean;
  switchUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  hasCompletedOnboarding: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  completeOnboarding: async () => {},
  isLoading: true,
  switchUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      try {
        const completed = await AsyncStorage.getItem('onboarding_completed');
        setHasCompletedOnboarding(completed === 'true');

        const savedUser = await AsyncStorage.getItem('user_data');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Auth initialization error", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    const userData: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      token: data.token,
      isVerified: data.isVerified,
    };

    setUser(userData);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    await AsyncStorage.setItem('user_token', data.token);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");

    const userData: User = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      token: data.token,
      isVerified: data.isVerified || (data.role === 'veterinarian' ? false : true),
    };

    setUser(userData);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    await AsyncStorage.setItem('user_token', data.token);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user_data');
    await AsyncStorage.removeItem('user_token');
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await AsyncStorage.setItem('onboarding_completed', 'true');
  };

  const switchUser = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    if (userData.token) {
      await AsyncStorage.setItem('user_token', userData.token);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn: !!user, 
      hasCompletedOnboarding, 
      login, 
      register,
      logout, 
      completeOnboarding,
      isLoading,
      switchUser
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
