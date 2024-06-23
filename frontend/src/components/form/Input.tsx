import { APIError } from '@/hooks/useHTTP';
import css from './Input.module.css';

export default function Input({
  id,
  error,
  text,
  ...props
}: {
  id: string;
  error: APIError;
  text?: boolean;
  defaultValue?: string | number;
}) {
  const Element = text ? 'textarea' : 'input';
  let hasError;

  if (error?.errors?.[id as keyof APIError]) {
    hasError = 'required';
  } else if (error?.keyPattern?.[id as keyof APIError]) {
    hasError = 'exists';
  } else if (error?.path === id) {
    hasError = 'non numeric';
  }

  return (
    <p className={css.input}>
      <label htmlFor={id} style={{ color: hasError ? 'red' : '' }}>
        {id} {hasError}
      </label>
      <Element id={id} name={id} {...props} />
    </p>
  );
}
