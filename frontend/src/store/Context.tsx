import Conversation from '@/models/Conversation';
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type ContextType = {
     conversation: Conversation | null;
  setConversation: Dispatch<SetStateAction<Conversation | null>>;
};

export const Context = createContext<ContextType>({
     conversation: null,
  setConversation: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const ctxValue = {
       conversation,
    setConversation,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
