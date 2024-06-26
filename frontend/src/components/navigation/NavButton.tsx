import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import css from './Navigation.module.css'

export default function NavButton({ path, label }: { path: string; label: string }) {
  const { pathname } = useLocation();
  const isActive = pathname === path || (pathname.startsWith(path) && path !== '/') || (pathname === '/inbox' && path === '/account');

  return (
    <li>
      <NavLink to={path}>{label}</NavLink>
      {isActive && (
        <motion.div layoutId='tab-indicator' className={css['active-tab']} />
      )}
    </li>
  );
}
