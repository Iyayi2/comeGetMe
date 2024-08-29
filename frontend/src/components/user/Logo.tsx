import { motion } from 'framer-motion';
import signpost from '@/assets/pngs/signpost.png'
import css from './Logo.module.css';

export default function Logo() {
  return (
    <motion.div
      className={css.logo}
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 0.5, delay: 0.5 }}
    >
      <p>Your ads can be managed here</p>
      <img src={signpost} alt='logo' />
    </motion.div>
  );
}
