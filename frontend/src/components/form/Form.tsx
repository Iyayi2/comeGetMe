import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Input from './Input';
import css from './Form.module.css';
import { fetchData } from '@/util/fetchData';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';

export default function Form() {
  const [formState, setFormState] = useState('signup');
  const signup = formState === 'signup';
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(event.target.value);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const resData = await fetchData({ path: formState, method: 'POST', data });

    if (!signup && resData.user) {
      dispatch(setUser(resData.user));
    }

    console.log('[form data]', data, '\n\n', '[server response]', resData);
  };

  const animateProps = { opacity: 0, x: signup ? 100 : -100 };
  const radioProps = { type: 'radio', name: 'toggleForm', onChange: changeHandler };
  const buttonProps = {
    background: signup ? '#538392' : '#ADD899',
    textShadow: signup ? '1px 1px 2px #000' : '',
    color: signup ? '#FFFFFF' : '',
  };

  return (
    <form className={css.form} onSubmit={submitHandler}>
      <div className={css['radio-buttons']}>
        <label>
          <input value='signup' {...radioProps} defaultChecked={signup} /> Sign Up
        </label>
        <label>
          <input value='login' {...radioProps} defaultChecked={!signup} /> Login
        </label>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={formState}
          className={css.inputs}
          initial={{ ...animateProps }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ ...animateProps }}
          transition={{ ease: 'easeIn', duration: 0.3 }}
        >
          {formState === 'signup' && <Input id='username' />}
          <Input id='email' />
          <Input id='password' />
          <motion.button
            style={{ ...buttonProps }}
            whileHover={{ y: -3, rotate: [-5, 5, 0] }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: 'spring', bounce: 0.8 }}
          >
            {formState.toUpperCase()}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </form>
  );
}
