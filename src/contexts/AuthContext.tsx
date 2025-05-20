
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const mockUsers = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'patient@example.com',
    password: 'password',
    role: 'patient' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '2',
    name: 'Dr. Siti Nurhaliza',
    email: 'nurse@example.com',
    password: 'password',
    role: 'nurse' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '3',
    name: 'Admin Sistem',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?img=8'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('healthcareUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function (mock implementation)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Email atau kata sandi tidak valid');
    }
    
    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('healthcareUser', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  // Register function (mock implementation)
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email sudah terdaftar');
    }
    
    // In a real app, we would send this to the server
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setUser(newUser);
    localStorage.setItem('healthcareUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcareUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
