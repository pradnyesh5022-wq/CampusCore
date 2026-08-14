import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUserProfile, loginUser } from '@/services/auth';
import type { User } from '@/types/auth';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('campuscore_token');

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUserProfile()
      .then((profile) => setUser(profile))
      .catch(() => {
        window.localStorage.removeItem('campuscore_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);
    window.localStorage.setItem('campuscore_token', response.access_token);
    const profile = await getCurrentUserProfile();
    setUser(profile);
  };

  const logout = () => {
    window.localStorage.removeItem('campuscore_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
