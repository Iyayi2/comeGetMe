import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import css from './Banner.module.css';

export default function Banner() {
  const [direction, setDirection] = useState(1);

  function clickHandler(direction: number) {
    setDirection(prev => prev + direction)
  }

  return (
    <section className={css['banner']}>
      <button onClick={() => clickHandler(-1)}>
        <FontAwesomeIcon icon='chevron-left' />
      </button>
      <AnimatePresence>
        <motion.div>
          {direction}
        </motion.div>
      </AnimatePresence>
      <button onClick={() => clickHandler(1)}>
        <FontAwesomeIcon icon='chevron-right' />
      </button>
    </section>
  );
}
