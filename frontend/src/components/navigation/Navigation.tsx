import css from './Navigation.module.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

  return (
    <motion.ul
      className={css.nav}
      animate={{
        transition: { duration: 0.8, ease: 'easeInOut' },
      }}
    >
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/market'>Market</NavLink>

    </motion.ul>
  );
}
