import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import ImagePicker from './ImagePicker';
import Button from '../button/Button';
import css from './ItemForm.module.css';
import { APIError } from '@/hooks/useHTTP';

export default function ItemForm({
  expanded,
  onAddItem,
  isLoading,
  error,
}: {
  expanded: boolean;
  onAddItem: (data: object) => void;
  isLoading: boolean;
  error: APIError;
}) {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAddItem(data);
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.form
          onSubmit={submitHandler}
          className={css.form}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
        >
          <div className={css.inputs}>
            <Input id='title'       error={error} />
            <Input id='price'       error={error} />
            <Input id='description' error={error} text />
          </div>
          <div className={css.controls}>
            <ImagePicker error={error} />
            <Button text='Add +' style={{ background: '#538392' }} isLoading={isLoading} />
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
