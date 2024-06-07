import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from './Input';
import css from './Form.module.css';

export default function Form() {
  const [formState, setFormState] = useState('signup');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`http://localhost:3000/${formState}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log('data', data, '\n\n', 'response', resData, '\n\n', 'formState', formState);
  };

  console.log('formState', formState);

  return (
    <motion.form
      className={css.form}
      onSubmit={submitHandler}
      key={formState}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* prettier-ignore */}
      <input type='radio' value='signup' name='formSwitch' onChange={changeHandler} defaultChecked={formState === 'signup'} /> Sign Up
      <input type='radio' value='login' name='formSwitch' onChange={changeHandler} defaultChecked={formState === 'login'} /> Login
      {formState === 'signup' && <Input id='username' />}
      <Input id='email' />
      <Input id='password' />
      <button>{formState.toUpperCase()}</button>
    </motion.form>
  );
}
