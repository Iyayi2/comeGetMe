import User from '@/models/User';
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

type ContextType = {
            user: User | null;
         setUser: Dispatch<SetStateAction<User | null>>;
     isAnimating: boolean,
  setIsAnimating: Dispatch<SetStateAction<boolean>>,
           navTo: (path: string) => void;
};

export const Context = createContext<ContextType>({
            user: null,
         setUser: () => {},
     isAnimating: false,
  setIsAnimating: () => {},
           navTo: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [       user,        setUser] = useState<User | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const                     navigate  = useNavigate();

  const navTo = (path: string) => {
    if (!isAnimating) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      navigate(path);
      setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = '';
      }, 1500);
    }
  };

  const ctxValue = {
    user,
    setUser,
    isAnimating,
    setIsAnimating,
    navTo,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
