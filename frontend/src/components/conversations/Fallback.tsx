import { motion } from 'framer-motion';
import postbox from '@/assets/pngs/postbox.png';
import css from './Fallback.module.css';

export default function Fallback() {
  return (
    <div className={css['fallback']}>
      <motion.h2
        initial={{ opacity: 0, scaleY: 0, x: -50 }}
        animate={{
          opacity: [0, 0, 1],
          scaleY: 1,
          x: 0,
          color: '#FFFFFF',
          borderColor: '#FFFFFF',
          transition: {
            duration: 0.5,
            delay: 1.2,
            color: { delay: 2.5, duration: 1 },
            borderColor: { delay: 2.5, duration: 1.5 },
          },
        }}
      >
        Your Inbox is Empty
      </motion.h2>
      <motion.img
        src={postbox}
        alt='postbox'
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: [0, 0, 1], y: 0, transition: { duration: 0.5, delay: 0.5 } }}
      />
      <motion.div
        className={css['background']}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85, transition: { duration: 1, delay: 1.8 } }}
      />
    </div>
  );
}
