import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Context } from '@/store/Context';
import { useContext } from 'react';
import usePaths from '@/hooks/usePaths';
import Navigation from '../components/navigation/Navigation';

const metadata = {
         '/': { title: 'Come Get Me',  description: 'Home Page'      },
  '/account': { title: 'My Account',   description: 'User Account'   },
   '/market': { title: 'Marketplace',  description: 'Market Place'   },
    '/inbox': { title: 'My Messages',  description: 'Mail Inbox'     },
         "*": { title: 'Come Get Me',  description: 'Page Not Found' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { pathname, prevPath } = usePaths();
  const { metadata: dynamic  } = useContext(Context);
  const { title, description } = dynamic ? dynamic : metadata[pathname as keyof typeof metadata] || metadata['*'];

  console.clear(); // logData

  return (
    <>
      <Navigation />
      <AnimatePresence mode='popLayout'>
        <motion.main
          id='main'
          key={pathname.startsWith('/inbox') ? 'inbox' : pathname}
          initial={{ opacity: 0, x: pathname === '/' ? -100 : 0 }}
          animate={{
               opacity: 1,
                     x: 0,
            transition: {
                    ease: 'linear',
                duration: pathname.startsWith('/inbox') ? 1 : 0.5,
                   delay: 0.5,
            },
          }}
          exit={{
               opacity: 0,
                     x: prevPath         === '/'        ?            -100   :  0,
                     y: prevPath         === '/account' ?             200   :  0,
                filter: prevPath.startsWith('/market')  ? 'brightness(0.4)' : '',
            transition: {
                    type: 'spring',
                 damping: 60,
               stiffness: 200,
                    mass: 2,
            },
          }}
        >
          <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
          </Helmet>
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
