import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import Button from '../button/Button';
import css from './DeletePrompt.module.css';

export default function DeletePrompt({ onDelete }: { onDelete: () => void }) {
  const [confirmation, setConfirmation] = useState(false);
  const isAnimating = useRef(false);

  const confirmHandler = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      setConfirmation((toggle) => !toggle);
      setTimeout(() => {
        isAnimating.current = false;
      }, 1500);
    }
  }, []);

  function deleteHandler() {
    onDelete();
  }

  return (
    <AnimatePresence mode='wait' initial={false}>
      {!confirmation ? (
        <motion.button
              layout
                type='button'
                 key={'a' + confirmation}
             onClick={confirmHandler}
             initial={{    opacity: 0, scaleX: 0.5    }}
             animate={{    opacity: 1, scaleX:   1    }}
                exit={{    opacity: 0, scaleX: 0.5    }}
          transition={{ duration: 0.5, ease: 'linear' }}
        >
          Delete Listing
        </motion.button>
      ) : (
        <motion.div
              layout
           className={css['confirm-dialog']}
                 key={'b' + confirmation}
             initial={{ opacity: 0, x: -100, height:    35  }}
             animate={{ opacity: 1, x:    0, height: 'auto' }}
                exit={{ opacity: 0, x:  100, height:    35  }}
          transition={{    duration: 0.5, ease: 'linear'    }}
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
