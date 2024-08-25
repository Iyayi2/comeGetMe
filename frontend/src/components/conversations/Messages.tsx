import { motion } from 'framer-motion';
import css from './Messages.module.css';

export default function Messages() {
  return (
    <motion.div
      className={css['messages']}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
    >
      <span>MESSAGES</span>
    </motion.div>
  );
}
