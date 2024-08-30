import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '@/store/Context';
import css from './Navigation.module.css';

export default function NavButton({ path, label }: { path: string; label: string }) {
  const { pathname } = useLocation();
  const { isAnimating, navTo } = useContext(Context);
  const isActive = pathname === path || (pathname.startsWith(path) && path !== '/');

  return (
    <motion.li
       variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
           exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <button
        style={isAnimating ? { pointerEvents: 'none', opacity: 0.6 } : {}}
        onClick={() => navTo(path)}
      >
        {label}
      </button>
      {isActive && <motion.div layoutId='tab-indicator' className={css['active-tab']} />}
    </motion.li>
  );
}
