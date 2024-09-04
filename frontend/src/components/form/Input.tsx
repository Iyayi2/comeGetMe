import { motion } from 'framer-motion';
import css from './Input.module.css';

export function Error({ error, delay }: { error: string | undefined; delay: number }) {
  return (
    <motion.span
           style={{ originY: 0.7, originX: 0.2, display: 'inline-block' }}
         initial={{ opacity: 0, scale: 0 }}
         animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {error}
    </motion.span>
  );
}

export default function Input({
  id,
  error,
  text,
  ...props
}: {
  id: string;
  error: object | null;
  text?: boolean;
  defaultValue?: string | number;
}) {
  const  Element = text ? 'textarea' : 'input';
  const hasError = error?.[id as keyof typeof error];
  const    delay = Object.keys(error || {}).indexOf(id) * 0.1; // converts object to array, then finds index of current element

  return (
    <p className={css.input}>
      <motion.label
           htmlFor={id}
           animate={{ color: hasError ? '#FF0000' : '#000' }}
        transition={{ duration: 0.5, delay }}
      >
        <span>{id + ' '}</span>
        <Error key={hasError} error={hasError} delay={delay} />
      </motion.label>
      <Element id={id} name={id} type={id === 'password' ? 'password' : 'text'} {...props} />
    </p>
  );
}
