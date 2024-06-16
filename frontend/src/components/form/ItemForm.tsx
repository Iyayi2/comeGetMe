import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import ImagePicker from './ImagePicker';
import Button from '../button/Button';
import css from './ItemForm.module.css';

export default function ItemForm({
  expanded,
  onAddItem,
  isLoading,
  error,
}: {
  expanded: boolean;
  onAddItem: (data: object) => void;
  isLoading: boolean;
  error: string | null;
}) {
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
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
            <Input id='title' />
            <Input id='price' />
            <Input id='description' text />
          </div>
          <div className={css.controls}>
            <ImagePicker />
            <Button text='Add Item' style={{ background: '#538392' }} isLoading={isLoading} />
          </div>
          {error && <p>{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
