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

  return (
    <p className={css.input}>
      <label htmlFor={id} style={{ color: error?.[id as keyof APIError] ? 'red' : '' }}>
        {id} {error?.[id as keyof APIError]}
      </label>
      <Element id={id} name={id} type={id === 'password' ? 'password' : 'text'} {...props} />
    </p>
  );
}
