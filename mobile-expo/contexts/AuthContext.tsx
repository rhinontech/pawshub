import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = "pet_owner" | "veterinarian";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: any; // require() image
  // pet owner extras
  petCount?: number;
  memberSince?: string;
  // vet extras
  clinic?: string;
  specialty?: string;
  rating?: number;
  yearsExp?: number;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah@pawshub.com",
    role: "pet_owner",
    avatar: require("../assets/pet-dog.jpg"),
    petCount: 3,
    memberSince: "2022",
  },
  {
    id: "v1",
    name: "Dr. James Wilson",
    email: "dr.wilson@pawshub.com",
    role: "veterinarian",
    avatar: require("../assets/pet-cat.jpg"),
    clinic: "PawCare Clinic",
    specialty: "General & Dental",
    rating: 4.8,
    yearsExp: 12,
  },
  {
    id: "v2",
    name: "Dr. Priya Sharma",
    email: "dr.priya@pawshub.com",
    role: "veterinarian",
    avatar: require("../assets/pet-bunny.jpg"),
    clinic: "Happy Tails Hospital",
    specialty: "Surgery",
    rating: 4.6,
    yearsExp: 8,
  },
];

interface AuthContextType {
  user: MockUser | null;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean | null;
  login: (user: MockUser) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  hasCompletedOnboarding: null,
  login: async () => {},
  logout: async () => {},
  completeOnboarding: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Load state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        // Check onboarding
        const completed = await AsyncStorage.getItem('onboarding_completed');
        setHasCompletedOnboarding(completed === 'true');

        // Check auth
        const userId = await AsyncStorage.getItem('user_id');
        if (userId) {
          const found = MOCK_USERS.find(u => u.id === userId);
          if (found) setUser(found);
        }
      } catch (e) {
        console.error("Auth initialization error", e);
      } finally {
        setLoading(false);
      }
    };
    loadState();
  }, []);

  const login = async (u: MockUser) => {
    setUser(u);
    await AsyncStorage.setItem('user_id', u.id);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user_id');
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await AsyncStorage.setItem('onboarding_completed', 'true');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, hasCompletedOnboarding, login, logout, completeOnboarding }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
