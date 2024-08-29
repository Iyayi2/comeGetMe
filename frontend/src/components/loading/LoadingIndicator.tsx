import { motion } from 'framer-motion';
import css from './LoadingIndicator.module.css';

export default function LoadingIndicator() {
  return (
    <motion.div
      className={css['lds-ring']}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
         exit={{ scale: 0, opacity: 0 }}
         transition={{ duration: 0.5 }}
    >
      <div />
      <div />
      <div />
      <div />
    </motion.div>
  );
}
