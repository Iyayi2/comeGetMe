import { Dispatch, SetStateAction, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import Button from '../button/Button';
import css from './SignInForm.module.css';

export default function SignInForm({
  onLogin,
  isLoading,
  error,
  setError,
}: {
    onLogin: (params: string, data: object) => void;
  isLoading: boolean;
      error: object | null;
   setError: Dispatch<SetStateAction<null>>;
}) {
  const [formType,   setFormType] = useState('signup');
  const signup = formType === 'signup';

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.value);
    setError(null);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onLogin(formType, data);
  };

  const animateProps = { opacity: 0, x: signup ? 100 : -100 };
  const   radioProps = { type: 'radio', name: 'toggleForm', onChange: changeHandler };
  const  buttonProps = {
    ...{ alignSelf: 'end', marginRight: '0.5rem' },
    ...(signup
      ? { background: '#538392' }
      : { background: '#ADD899', textShadow: 'none', color: '#000' }),
  };

  return (
    <motion.form
      className={css['form']}
      onSubmit={submitHandler}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={css['radio-buttons']}>
        <label>
          <input value='signup' {...radioProps} defaultChecked={signup}  /> Sign Up
        </label>
        <label>
          <input value='login'  {...radioProps} defaultChecked={!signup} /> Login
        </label>
      </div>
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
                 key={formType}
           className={css['inputs']}
             initial={{ ...animateProps }}
             animate={{ opacity: 1, x: 0 }}
                exit={{ ...animateProps }}
          transition={{ ease: 'easeIn', duration: 0.3 }}
        >
          {signup &&
          <Input id='username' error={error} />}
          <Input id='email'    error={error} />
          <Input id='password' error={error} />
          <Button isLoading={isLoading} text={formType} style={buttonProps} />
        </motion.div>
      </AnimatePresence>
    </motion.form>
  );
}
