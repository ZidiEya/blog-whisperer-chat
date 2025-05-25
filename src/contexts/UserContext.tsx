
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  bio?: string;
  joinedAt: Date;
  lastActive: Date;
}

interface UserContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  getAllUsers: () => UserProfile[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user database - in a real app, this would come from a backend
const MOCK_USERS: UserProfile[] = [
  {
    id: 'current-user',
    name: 'Eya Zidi',
    email: 'eya@tunisiehub.com',
    avatar: '/lovable-uploads/0c847fa3-d2fe-4d6a-ad25-637be5fd48a6.png',
    status: 'online',
    bio: 'Founder of Tunisie Hub - Passionate about connecting Tunisian creators',
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date()
  },
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    status: 'online',
    bio: 'Tech enthusiast and digital nomad',
    joinedAt: new Date('2024-02-01'),
    lastActive: new Date()
  },
  {
    id: 'user-2',
    name: 'Mohamed Ali',
    email: 'mohamed@example.com',
    avatar: 'https://i.pravatar.cc/150?img=67',
    status: 'away',
    bio: 'Software developer from Tunis',
    joinedAt: new Date('2024-01-20'),
    lastActive: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 'user-3',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: 'https://i.pravatar.cc/150?img=53',
    status: 'offline',
    bio: 'Designer and artist',
    joinedAt: new Date('2024-02-10'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tunisie-hub-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      // Update user status to online
      setUsers(prev => prev.map(u => 
        u.id === user.id ? { ...u, status: 'online', lastActive: new Date() } : u
      ));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app, this would call an API
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user && password === 'demo123') {
      const loggedInUser = { ...user, status: 'online' as const, lastActive: new Date() };
      setCurrentUser(loggedInUser);
      localStorage.setItem('tunisie-hub-user', JSON.stringify(loggedInUser));
      
      // Update user status in the users list
      setUsers(prev => prev.map(u => 
        u.id === user.id ? loggedInUser : u
      ));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      // Update user status to offline
      setUsers(prev => prev.map(u => 
        u.id === currentUser.id ? { ...u, status: 'offline' } : u
      ));
    }
    
    setCurrentUser(null);
    localStorage.removeItem('tunisie-hub-user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('tunisie-hub-user', JSON.stringify(updatedUser));
      
      // Update in users list
      setUsers(prev => prev.map(u => 
        u.id === currentUser.id ? updatedUser : u
      ));
    }
  };

  const getAllUsers = () => {
    return users.filter(u => u.id !== currentUser?.id);
  };

  const value: UserContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    updateProfile,
    getAllUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
