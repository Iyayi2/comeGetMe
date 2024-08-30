import { AnimatePresence, motion } from 'framer-motion';
import css from './PageWrapper.module.css';

export default function PageWrapper({
  recreate,
  children,
}: {
  recreate: React.Key | null;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode='wait'>
      <motion.section
        className={css['page']}
        key={recreate}
        exit={{
          y: 100,
          opacity: 0,
          transition: { duration: 0.5 },
        }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
