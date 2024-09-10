import { motion } from 'framer-motion';
import { useState } from 'react';
import css from './CircleSlider.module.css';

const clipPath = (index: number, open?: boolean) => {
  return [
    `circle(${open ? 500 : 30}px at  75px  75px)`,
    `circle(${open ? 500 : 40}px at 225px 125px)`,
    `circle(${open ? 500 : 35}px at 400px  75px)`,
  ][index];
}

const offSet = (index: number) => {
  return [
    { top:  65, left:  50 },
    { top: 115, left: 200 },
    { top:  65, left: 375 },
  ][index];
}

export default function CircleSlider() {
  const [isOpen, toggleOpen] = useState<string | null>(null);

  console.log(isOpen);

  return (
    <div className={css['slider']}>
      {['shape1', 'shape2', 'shape3'].map((shape, index) => (
        <motion.div
          key={shape}
          className={css[shape]}
          onClick={() => toggleOpen(shape === isOpen ? null : shape)}
          initial={false}
          animate={isOpen === shape ? 'open' : 'closed'}
          variants={{
            open: {
              clipPath: clipPath(index, true),
              zIndex: 2,
              transition: {
                type: 'spring',
                stiffness: 20,
                restDelta: 2,
              },
            },
            closed: {
              clipPath: clipPath(index),
              zIndex: 1,
              transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
              },
            },
          }}
        >
          <span style={offSet(index)}>CLICK</span>
        </motion.div>
      ))}
    </div>
  );
}
