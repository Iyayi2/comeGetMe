import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './SlideOutMenu.module.css';

export default function SlideOutMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={css['menu']}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}>
        <span>Click</span>
        <motion.span animate={{ rotate: isOpen ? 0 : -180 }}>
          <FontAwesomeIcon icon='caret-up' />
        </motion.span>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            scale: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            scale: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
      >
        <motion.li variants={variants}>1</motion.li>
        <motion.li variants={variants}>2</motion.li>
        <motion.li variants={variants}>3</motion.li>
        <motion.li variants={variants}>4</motion.li>
      </motion.ul>
    </motion.div>
  );
}
