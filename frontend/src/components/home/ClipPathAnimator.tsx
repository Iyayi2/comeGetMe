import { motion } from 'framer-motion';
import { useState } from 'react';
import   man1 from '@/assets/stock/man-thinking.png';
import woman1 from '@/assets/stock/woman-thinking.png';
import   man2 from '@/assets/stock/man-celebrating.png';
import woman2 from '@/assets/stock/woman-celebrating.png';
import css from './ClipPathAnimator.module.css';

const clipPath = (index: number, open?: boolean) => {
  return [
    `circle(${open ? 150 : 10}% at 15% 35%)`,
    open
      ? 'polygon(-60% -15%, 150% -15%, 150% 150%, 73% 150%, 74% 150%, 70% 150%, -60% 150%)'
      : 'polygon( 60%  15%,  79%  15%,  79%  38%, 73%  38%, 74%  48%, 70%  38%,  60%  38%)',
  ][index];
};

const background = (index: number) => {
  return [
    'linear-gradient(to right, #2980B9, #6DD5FA)',
    'linear-gradient(to right, #d1d9d5, #fef3f3)',
  ][index];
};

export default function ClipPathAnimator() {
  const [isOpen, toggleOpen] = useState<number | null>(null);

  return (
    <div className={css['container']}>
      {Array.from({ length: 2 }, (_, index) => (
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
              borderColor: index === 1 ? '#000' : '#0000000',
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
          <motion.span animate={{ opacity: index === isOpen ? 0 : 1 }}>
            Take it or Leave it?
          </motion.span>
          <motion.span animate={{ opacity: index === isOpen ? 0 : 1 }}>
            Come Get Me?
          </motion.span>
          <motion.h2 animate={{ opacity: isOpen === 0 ? 1 : 0 }}>Temptation!</motion.h2>
          <motion.h2 animate={{ opacity: isOpen === 1 ? 1 : 0 }}> Go Get It!</motion.h2>
          <motion.img src={woman2} alt='woman celebrating' animate={{ opacity: isOpen === 0 ? 1 : 0 }} />
          <motion.img src=  {man2} alt=  'man celebrating' animate={{ opacity: isOpen === 1 ? 1 : 0 }} />
        </motion.div>
      ))}
      <img src={woman1} alt='woman thinking' />
      <img src={man1}   alt=  'man thinking' />
    </div>
  );
}
