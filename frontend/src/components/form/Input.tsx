import css from './Input.module.css';

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
  const Element = text ? 'textarea' : 'input';
  const hasError = error?.[id as keyof typeof error];

  return (
    <p className={css.input}>
      <label htmlFor={id} style={{ color: hasError ? 'red' : '' }}>
        {id} {hasError}
      </label>
      <Element id={id} name={id} type={id === 'password' ? 'password' : 'text'} {...props} />
    </p>
  );
}
