import { motion } from 'framer-motion';
import css from './Button.module.css';

interface ButtonProps {
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
  style: { background: string };
}

export default function Button({ text, isLoading, ...props }: ButtonProps) {
  return (
    <motion.button
      className={css.button}
      whileHover={{ y: -2, rotate: [-5, 5, 0] }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: 'spring', bounce: 0.8 }}
      {...props}
    >
      {isLoading ? 'sending...' : text.toUpperCase()}
    </motion.button>
  );
}
