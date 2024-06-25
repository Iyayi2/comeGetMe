import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import ImagePicker from './ImagePicker';
import Button from '../button/Button';
import { APIError } from '@/hooks/useHTTP';
import Product from '@/models/Product';
import css from './ItemForm.module.css';

export default function ItemForm({
  expanded,
  dataFn,
  isLoading,
  error,
  product,
}: {
   expanded: boolean;
     dataFn: (data: object) => void;
  isLoading: boolean;
      error: APIError;
   product?: Product;
}) {
  const { title = '', price = '', description = '' } = product || {};

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dataFn(data);
  };

  return (
    <AnimatePresence mode='wait'>
      {expanded && (
        <motion.form
          onSubmit={submitHandler}
          className={css.form}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
        >
          <div className={css.inputs}>
            <Input id='title'       error={error} defaultValue={title} />
            <Input id='price'       error={error} defaultValue={price} />
            <Input id='description' error={error} defaultValue={description} text />
          </div>
          <div className={css.controls}>
            <ImagePicker error={error} />
            <Button text={product ? 'Update' : 'Add +'} style={{ background: '#538392' }} isLoading={isLoading} />
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
