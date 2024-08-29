import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '../components/navigation/Navigation';
import usePaths from '@/hooks/usePaths';

const paths = (pathname: string) => {
  const path = {
       home: pathname        === '/',
    account: pathname        === '/account',
     market: pathname.startsWith('/market'),
      inbox: pathname.startsWith('/inbox'),
  };

  return path;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname, prevPath } = usePaths();

  console.clear(); // logData

  return (
    <>
      <Navigation />
      <AnimatePresence mode='popLayout'>
        <motion.main
          id='main'
          key={paths(pathname).inbox ? 'inbox' : pathname}
          initial={{ opacity: 0, x: paths(pathname).home ? -100 : 0 }}
          animate={{
            opacity: 1,
                  x: 0,
            transition: {
                  ease: 'linear',
              duration: paths(pathname).inbox ? 1 : 0.5,
                 delay: 0.5,
            },
          }}
          exit={{
            opacity: 0,
                 x: paths(prevPath).home    ?            -100   :  0,
                 y: paths(prevPath).account ?             200   :  0,
            filter: paths(prevPath).market  ? 'brightness(0.4)' : '',
            transition: {
                   type: 'spring',
                damping: 60,
              stiffness: 200,
                   mass: 2,
            },
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
