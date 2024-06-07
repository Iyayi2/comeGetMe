import css from './Input.module.css'

export default function Input({ id }: { id: string }) {
  return (
    <p className={css.input}>
      <label htmlFor={id}>{id}</label>
      <input id={id} name={id} type={id === 'email' ? 'email' : 'text'} />
    </p>
  );
}
