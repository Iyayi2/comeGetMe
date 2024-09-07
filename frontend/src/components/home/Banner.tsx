import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import woman from '@/assets/pngs/autumn-woman.png';
import css from './Banner.module.css';

// prettier-ignore
const variants = {
    left: (direction: number) => ({ opacity: 0, x: direction > 0 ? 100 : -100 }),
  center: { opacity: 1, x: 0 },
   right: (direction: number) => ({ opacity: 0, x: direction < 0 ? 100 : -100 }),
};

const slides = [
  <p>Component</p>,
  <img src={woman} alt='woman in autumn' style={{ width: 125 }} />,
  <p>Component</p>,
];

export default function Banner() {
  const [[index, direction], setIndex] = useState([1, 0]);
  const isAnimating = useRef(false);

  const clickHandler = (direction: number) => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      if (index + direction >= 0 && index + direction <= 2) {
        setIndex([index + direction, direction]);
      }
      setTimeout(() => {
        isAnimating.current = false;
      }, 1000);
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
      <div
        style={{
          borderRadius: direction === 1 ? '3px 0 0 3px' : direction === -1 ? '0 3px 3px 0' : 3,
        }}
      >
        <AnimatePresence mode='popLayout' custom={direction}>
          {/* prettier-ignore */}
          <motion.div
                   key={index}
              variants={variants}
                custom={direction}
               initial='left'
               animate='center'
                  exit='right'
            transition={{ duration: 1 }}
          >
            {slides[index]}
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
