import User from '@/models/User';
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
     user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Context = createContext<ContextType>({
     user: null,
  setUser: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const ctxValue = {
    user,
    setUser,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
