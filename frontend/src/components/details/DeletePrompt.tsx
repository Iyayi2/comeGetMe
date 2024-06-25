import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../button/Button';
import css from './DeletePrompt.module.css';

export default function DeletePrompt({ onDelete }: { onDelete: () => void }) {
  const [confirmation, setConfirmation] = useState(false);
  const navigate = useNavigate();

  function confirmHandler() {
    setConfirmation((toggle) => !toggle);
  }

  function deleteHandler() {
    onDelete();
    navigate('/account');
  }

  return (
    <AnimatePresence mode='wait' initial={false}>
      {!confirmation ? (
        <motion.button
          type='button'
          key={'a' + confirmation}
          onClick={confirmHandler}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
             exit={{ opacity: 0, scaleX: 0.5 }}
          transition={{ duration: 0.2, type: 'tween', ease: 'linear' }}
        >
          Delete Listing
        </motion.button>
      ) : (
        <motion.div
          className={css['confirm-dialog']}
          key={'b' + confirmation}
          initial={{ opacity: 0, x: -100, height: 0 }}
          animate={{ opacity: 1, x:    0, height: 'auto' }}
             exit={{ opacity: 0, x:  100, height: 35 }}
        >
          <h5>Are you sure you want to delete the listing?</h5>
          <div>
            <Button text='Delete' onClick={deleteHandler}  style={{ background: '#d04121cd' }} />
            <Button text='Cancel' onClick={confirmHandler} style={{ background: '#457bdfb7' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
