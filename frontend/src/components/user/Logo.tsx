import { motion } from 'framer-motion';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      key='3'
      className={css.logo}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0 }}
    >
      <p>Your ads can be managed here</p>
      <img src='signpost.png' alt='logo' />
    </motion.div>
  );
}
