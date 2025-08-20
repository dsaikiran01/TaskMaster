import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginData, SignupData } from '../types/index.ts';
import apiService from '../services/api.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (!storedToken) {
    setIsLoading(false);
    return;
  }

  console.log('Restoring session with token:', storedToken);

  setToken(storedToken);
  apiService.setToken(storedToken);

  // Fetch user from backend using the token
  apiService.getCurrentUser()
    .then((user) => {
      setUser(user);
    })
    .catch((error) => {
      // Token is invalid or expired
      console.error('Failed to restore user session:', error);
      setToken(null);
      localStorage.removeItem('token');
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);


  useEffect(() => {
    apiService.setToken(token || null);
  }, [token]);

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const response = await apiService.login(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    try {
      setIsLoading(true);
      const response = await apiService.signup(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = useMemo(() => ({
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
  }), [user, token, isLoading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
