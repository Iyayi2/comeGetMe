import { motion } from 'framer-motion';
import css from './Button.module.css';

export type ButtonType = 'signup' | 'login' | 'logout';

export default function Button({ type, isLoading }: { type: ButtonType; isLoading?: boolean }) {
  const styles = {
    signup: { background: '#538392', textShadow: '1px 1px 2px #000', color: '#FFFFFF' },
    login:  { background: '#ADD899' },
    logout: { background: '#538392' },
  }[type];

  return (
    <motion.button
      className={css.button}
      style={{ ...styles }}
      whileHover={{ y: -3, rotate: [-5, 5, 0] }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: 'spring', bounce: 0.8 }}
    >
      {isLoading ? 'sending...' : type.toUpperCase()}
    </motion.button>
  );
}
