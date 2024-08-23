import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
     userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
}

export const Context = createContext<ContextType>({
     userId: '',
  setUserId: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState('');

  const ctxValue = {
       userId,
    setUserId,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
