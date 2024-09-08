import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import graphic from '@/assets/pngs/graphic.png';
import css from './SlideOutMenu.module.css';

const ListItem = ({ icon, text }: { icon: IconProp; text: string }) => {
  return (
    <motion.li
      variants={{
          open: { opacity: 1, y:  0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { opacity: 0, y: 20, transition: {                  duration: 0.2              } },
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </motion.li>
  );
};

export default function SlideOutMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className={css['menu']} initial={false} animate={isOpen ? 'open' : 'closed'}>
      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}>
        <span>Start in Minutes</span>
        <motion.span animate={{ rotate: isOpen ? -180 : 0 }}>
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
        <ListItem icon='user'         text='Create your profile' />
        <ListItem icon='rectangle-ad' text='List your products' />
        <ListItem icon='shop'         text='Explore the market' />
        <ListItem icon='people-group' text='Connect with others' />
      </motion.ul>
      <motion.img
               src={graphic}
               alt='abstract graphic'
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      />
    </motion.div>
  );
}
