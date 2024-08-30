import { AnimatePresence, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useContext } from 'react';
import { Context } from '@/store/Context';
import NavButton from './NavButton';
import css from './Navigation.module.css';

export default function Navigation() {
  const { user, setUser } = useContext(Context);
  const { data } = useFetch('login', setUser);

  console.log('NAV context user', user, '\nfetched data', data);

  return (
    <nav className={css.nav}>
      <h2>▢▢▢ Come Get Me ▫◻</h2>
      <motion.ul
        initial='hidden'
        animate='visible'
        transition={{ staggerChildren: 0.2 }}
      >
        <NavButton path='/'        label='Home' />
        <NavButton path='/market'  label='Market' />
        <NavButton path='/account' label='Account' />
        <AnimatePresence>
          {user && <NavButton path='/inbox' label='Inbox' key={user + ''} />}
        </AnimatePresence>
      </motion.ul>
    </nav>
  );
}
