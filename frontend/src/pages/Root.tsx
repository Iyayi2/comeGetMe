import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '../components/navigation/Navigation';
import { useLocation } from 'react-router-dom';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  return (
    <>
      <Navigation />
      <AnimatePresence mode='popLayout'>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: '-100px' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100px' }}
          transition={{
            type: 'spring',
            ease: 'linear',
            duration: 0.2,
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
