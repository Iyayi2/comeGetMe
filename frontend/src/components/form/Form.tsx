import Input from './Input';
import css from './Form.module.css'
// import { useState } from 'react';

export default function Form() {

  const signup = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log('data', data, '\n\n', 'response', resData)
  };

  return (
    <form className={css.form} onSubmit={signup}>
      <Input id='username' />
      <Input id='email' />
      <Input id='password' />
      <button>Submit</button>
    </form>
  );
}
