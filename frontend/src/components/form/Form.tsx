import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import css from './Form.module.css';
import Button, { ButtonType } from '../button/Button';

export default function Form({
  onLogin,
  isLoading,
  error,
}: {
  onLogin: (path: string, data: object) => void;
  isLoading: boolean;
  error: string | null;
}) {
  const [formState, setFormState] = useState<ButtonType>('signup');
  const signup = formState === 'signup';

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(event.target.value as ButtonType);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onLogin(formState, data);
  };

  const animateProps = { opacity: 0, x: signup ? 100 : -100 };
  const radioProps = { type: 'radio', name: 'toggleForm', onChange: changeHandler };

  return (
    <motion.form
      className={css.form}
      onSubmit={submitHandler}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css['radio-buttons']}>
        <label>
          <input value='signup' {...radioProps} defaultChecked={signup} /> Sign Up
        </label>
        <label>
          <input value='login' {...radioProps} defaultChecked={!signup} /> Login
        </label>
      </div>
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={formState}
          className={css.inputs}
          initial={{ ...animateProps }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ ...animateProps }}
          transition={{ ease: 'easeIn', duration: 0.3 }}
        >
          {signup && <Input id='username' />}
          <Input id='email' />
          <Input id='password' />
          {error && <p>{error}</p>}
          <Button isLoading={isLoading} type={formState} />
        </motion.div>
      </AnimatePresence>
    </motion.form>
  );
}
