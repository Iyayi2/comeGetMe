import { motion } from 'framer-motion';
import css from './LoadingIndicator.module.css';

export default function LoadingIndicator({ scale = 1 }: { scale?: number }) {
  return (
    <motion.div
      className={css['lds-ring']}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale,    opacity: 1 }}
         exit={{ scale: 0, opacity: 0 }}
    >
      <div />
      <div />
      <div />
      <div />
    </motion.div>
  );
}
