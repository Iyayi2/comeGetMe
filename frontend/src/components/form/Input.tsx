import css from './Input.module.css'

export default function Input({ id, text }: { id: string, text?: boolean }) {
  const Element = text ? 'textarea' : 'input'

  return (
    <p className={css.input}>
      <label htmlFor={id}>{id}</label>
      <Element id={id} name={id} />
    </p>
  );
}
