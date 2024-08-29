import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '../components/navigation/Navigation';
import { useLocation } from 'react-router-dom';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const inboxPath = pathname.startsWith('/inbox');

  console.clear(); // logData

  return (
    <>
      <Navigation />
      <AnimatePresence mode='popLayout'>
        <motion.main
          id='main'
          key={inboxPath ? 'inbox' : pathname}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: 'tween',
              ease: 'linear',
              duration: inboxPath ? 1 : 0.5,
              delay: 0.5,
            },
          }}
          exit={{
            opacity: 0,
            y: inboxPath ? 0 : 200,
            transition: { type: 'spring', damping: 60, stiffness: 200, mass: 2 },
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
