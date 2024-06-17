import { APIError } from '@/hooks/useHTTP';
import css from './Input.module.css';

export default function Input({
  id,
  error,
  text,
}: {
  id: string;
  error: APIError;
  text?: boolean;
}) {
  const Element = text ? 'textarea' : 'input';
  let hasError;

  if (error?.errors?.[id as keyof APIError]) {
    hasError = 'required';
  } else if (error?.keyPattern?.[id as keyof APIError]) {
    hasError = 'exists';
  }

  return (
    <p className={css.input}>
      <label
        htmlFor={id}
        style={{
          color: hasError ? 'red' : '',
        }}
      >
        {id} {hasError}
      </label>
      <Element id={id} name={id} />
    </p>
  );
}
