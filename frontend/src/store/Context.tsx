import User from '@/models/User';
import Product from '@/models/Product';
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

type ContextType = {
            user: User | null;
         setUser: Dispatch<SetStateAction<User | null>>;
        metadata: Product | null;
     setMetadata: Dispatch<SetStateAction<Product | null>>;
     isAnimating: boolean,
  setIsAnimating: Dispatch<SetStateAction<boolean>>,
           navTo: (path: string) => void;
};

export const Context = createContext<ContextType>({
            user: null,
         setUser: () => {},
        metadata: null,
     setMetadata: () => {},
     isAnimating: false,
  setIsAnimating: () => {},
           navTo: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [       user,        setUser] = useState<User    | null>(null);
  const [   metadata,    setMetadata] = useState<Product | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const                     navigate  = useNavigate();

  const navTo = (path: string) => {
    if (!isAnimating) {
      setIsAnimating(true);
         setMetadata(null);
            navigate(path);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = '';
      }, 1400);
    }
  };

  const ctxValue = {
    user,
    setUser,
    metadata,
    setMetadata,
    isAnimating,
    setIsAnimating,
    navTo,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
