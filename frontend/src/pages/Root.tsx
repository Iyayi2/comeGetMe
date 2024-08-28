import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '../components/navigation/Navigation';
import { useLocation } from 'react-router-dom';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  console.clear(); // logData

  return (
    <>
      <Navigation />
      <AnimatePresence mode='popLayout'>
        <motion.main
          id='main'
          key={pathname.startsWith('/inbox') ? 'inbox' : pathname}
          initial={{ opacity: 0, y: '-100px' }}
          animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: '100%' }}
          transition={{
            type: 'tween',
            ease: 'linear',
            duration: 0.3,
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
