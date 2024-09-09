import { motion, useCycle } from 'framer-motion';
import css from './CircleSlider.module.css';

export default function CircleSlider() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.div className={css['slider']} initial={false} animate={isOpen ? 'open' : 'closed'}>
      <motion.div
        onClick={() => toggleOpen()}
        variants={{
          open: {
            clipPath: 'circle(500px at 50px 50px)',
            transition: {
              type: 'spring',
              stiffness: 20,
              restDelta: 2,
            },
          },
          closed: {
            clipPath: 'circle(30px at 50px 50px)',
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 40,
            },
          },
        }}
      >
        <span>CLICK</span>
      </motion.div>
    </motion.div>
  );
}
