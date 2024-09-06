import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import css from './Banner.module.css';

// prettier-ignore
const variants = {
    left: (direction: number) => ({ opacity: 0, x: direction > 0 ? 100 : -100 }),
  center: { opacity: 1, x: 0 },
   right: (direction: number) => ({ opacity: 0, x: direction < 0 ? 100 : -100 }),
};

export default function Banner() {
  const [[index, direction], setIndex] = useState([1, 0]);

  const clickHandler = (direction: number) => {
    if (index + direction >= 0 && index + direction <= 2) {
      setIndex([index + direction, direction]);
    }
  };

  return (
    <section className={css['banner']}>
      <button
        onClick={() => clickHandler(-1)}
        style={{ borderColor: direction === -1 ? '#000' : '' }}
      >
        <FontAwesomeIcon icon='chevron-left' />
      </button>
      <div>
        <AnimatePresence mode='popLayout' custom={direction}>
          <motion.div
                   key={index}
              variants={variants}
                custom={direction}
               initial='left'
               animate='center'
                  exit='right'
            transition={{ duration: 1 }}
          >
            {index}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => clickHandler(1)}
        style={{ borderColor: direction === 1 ? '#000' : '' }}
      >
        <FontAwesomeIcon icon='chevron-right' />
      </button>
    </section>
  );
}
