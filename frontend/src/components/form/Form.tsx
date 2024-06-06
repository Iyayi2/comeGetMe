import Input from './Input';
import css from './Form.module.css'

export default function Form() {
  return (
    <form className={css.form}>
      <Input id='username' />
      <Input id='email' />
      <Input id='password' />
      <button>Submit</button>
    </form>
  );
}
