import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <h2>▢▢▢ Come Get Me ▫◻</h2>
      <motion.ul
        animate={{
          transition: { duration: 0.8, ease: 'easeInOut' },
        }}
      >
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/market'>Market</NavLink>
      </motion.ul>
    </nav>
  );
}
