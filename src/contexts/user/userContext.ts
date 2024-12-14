'use client'
import { createContext, useContext } from 'react';

export interface User {
  name: string;
  email: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  signin: (user: User) => void;
  // logoutuser: () => void;
}

// create  context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;



