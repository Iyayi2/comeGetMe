import { motion } from 'framer-motion';
import signpost from '@/assets/pngs/signpost.png';
import css from './Fallback.module.css';

export function NoAds() {
  return (
    <motion.div
          layout
       className={css['noAds']}
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0, transition: { ease: 'linear', duration: 0.5, delay: 0.5 } }}
            exit={{ opacity: 0, scale: 0, position: 'absolute', transition: { ease: 'easeOut', duration: 0.5 } }}
    >
      <p>Your ads can be managed here</p>
      <img src={signpost} alt='logo' />
    </motion.div>
  );
}

export function NoSearches() {
  return (
    <motion.p
          layout
       className={css['noSearches']}
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      Nothing Found
    </motion.p>
  );
}

export default function Fallback({ noAds }: { noAds?: boolean | undefined }) {
  return noAds ? <NoAds /> : <NoSearches />;
}
