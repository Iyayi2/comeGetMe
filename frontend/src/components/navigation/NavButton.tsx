import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '@/store/Context';
import css from './Navigation.module.css';

export default function NavButton({ path, label }: { path: string; label: string }) {
  const { pathname } = useLocation();
  const { isAnimating, navTo } = useContext(Context);
  const isActive =
    pathname === path ||
    (pathname.startsWith(path) && path !== '/') ||
    (pathname === '/inbox' && path === '/account');


  return (
    <li>
      <button
        style={isAnimating ? { pointerEvents: 'none', opacity: 0.6 } : {}}
        onClick={() => navTo(path)}
      >
        {label}
      </button>
      {isActive && <motion.div layoutId='tab-indicator' className={css['active-tab']} />}
    </li>
  );
}
