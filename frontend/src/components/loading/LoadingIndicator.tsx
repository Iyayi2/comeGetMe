import { motion } from 'framer-motion';
import css from './LoadingIndicator.module.css';

export default function LoadingIndicator({scale = 1, ...props}: { scale?: number}) {
  return (
    <motion.div
      className={css['lds-ring']}
      {...props}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </motion.div>
  );
}
