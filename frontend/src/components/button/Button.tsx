import { motion } from 'framer-motion';
import css from './Button.module.css';

export type ButtonType = 'signup' | 'login' | 'logout' | 'new ad';

interface ButtonProps {
  type: ButtonType;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button({ type, isLoading, ...props }: ButtonProps) {
  const styles = {
    signup: { background: '#538392' },
     login: { background: '#ADD899', textShadow: 'none', color: '#000' },
    logout: { background: '#cd4f25', margin: '0.5rem auto' },
  'new ad': { background: '#538392' }
  }[type];

  return (
    <motion.button
      className={css.button}
      style={{ ...styles }}
      whileHover={{ y: -2, rotate: [-5, 5, 0] }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: 'spring', bounce: 0.8 }}
      {...props}
    >
      {isLoading ? 'sending...' : type.toUpperCase()}
    </motion.button>
  );
}
