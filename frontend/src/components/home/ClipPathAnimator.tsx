import { motion } from 'framer-motion';
import { useState } from 'react';
import man1 from '@/assets/stock/man-with-laptop-1.png';
import man2 from '@/assets/stock/man-with-laptop-2.png';
import css from './ClipPathAnimator.module.css';

const clipPath = (index: number, open?: boolean) => {
  return [
    `circle(${open ? 150 : 9}% at 15% 35%)`,
    `circle(${open ? 150 : 12}% at 50% 65%)`,
    open
      ? 'polygon(-60% -15%, 150% -15%, 150% 150%, 73% 150%, 74% 150%, 70% 150%, -60% 150%)'
      : 'polygon( 60%  15%,  79%  15%,  79%  38%, 73%  38%, 74%  48%, 70%  38%,  60%  38%)',
  ][index];
};

const offSet = (index: number) => {
  return [
    { top: '30%', left:  '9.5%' },
    { top: '60%', left: '44.5%' },
    { top: '20%', left:   '64%' },
  ][index];
};

const background = (index: number) => {
  return [
    'linear-gradient(to right, #4286f4, #4e5360)',
    'linear-gradient(to right, #BE5869, #4e5360)',
    'linear-gradient(to right, #e0e6e3, #ffffff)',
  ][index];
};

export default function ClipPathAnimator() {
  const [isOpen, toggleOpen] = useState<number | null>(null);

  console.log(isOpen);

  return (
    <div className={css['slider']}>
      {Array.from({ length: 3 }, (_, index) => (
        <motion.div
          key={index}
          className={css['clippath']}
          onClick={() => toggleOpen(index === isOpen ? null : index)}
          initial={false}
          animate={isOpen === index ? 'open' : 'closed'}
          style={{ background: background(index) }}
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
                zIndex: { delay: 0.5 },
              },
            },
          }}
        >
          <span style={offSet(index)}>CLICK</span>
          <motion.img
            src={man2}
            alt='man with laptop'
            animate={{ opacity: index === 2 ? 1 : 0 }}
          />
        </motion.div>
      ))}
      <img src={man1} alt='man with laptop' />
    </div>
  );
}
