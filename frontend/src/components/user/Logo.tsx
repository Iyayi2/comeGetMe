import { motion } from 'framer-motion';
import signpost from '@/assets/pngs/signpost.png'
import css from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      className={css.logo}
      initial={{ opacity: 0, scale: 0, height: 200 }}
      animate={{ opacity: 1, scale: 1, height: 'auto' }}
         exit={{ opacity: 0, scale: 0, height: 200 }}
    >
      <p>Your ads can be managed here</p>
      <img src={signpost} alt='logo' />
    </motion.div>
  );
}
