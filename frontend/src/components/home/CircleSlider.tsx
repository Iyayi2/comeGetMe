import { motion } from 'framer-motion';
import { useState } from 'react';
import css from './CircleSlider.module.css';

const clipPath = (index: number, open?: boolean) => {
  return [
    `circle(${open ? 150 :  9}% at 15% 35%)`,
    `circle(${open ? 150 : 12}% at 50% 65%)`,
    `circle(${open ? 150 : 10}% at 85% 35%)`,
  ][index];
}

const offSet = (index: number) => {
  return [
    { top: '30%', left:  '9.5%' },
    { top: '60%', left: '44.5%' },
    { top: '30%', left: '79.5%' },
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
