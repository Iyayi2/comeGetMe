import { motion } from 'framer-motion';
import css from './Navigation.module.css';
import NavButton from './NavButton';

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <h2>▢▢▢ Come Get Me ▫◻</h2>
      <motion.ul
        animate={{
          transition: { duration: 0.8, ease: 'easeInOut' },
        }}
      >
        <NavButton path='/' label='Home' />
        <NavButton path='/market' label='Market' />
      </motion.ul>
    </nav>
  );
}
