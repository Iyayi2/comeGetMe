import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const TestDiv = ({ name }: { name: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0 }}
    transition={{ duration: 1 }}
  >
    {name}
  </motion.div>
);

export default function Inbox() {
  const [state, setState] = useState(1);

  const changeState = () => {
    setState((prevState) => (prevState < 3 ? prevState + 1 : 1));
  };

  return (
    <>
      <button onClick={changeState}>Change State</button>
      <AnimatePresence mode='wait'>
        {state === 1 ? (
          <TestDiv key='1' name='One' />
        ) : state === 2 ? (
          <TestDiv key='2' name='Two' />
        ) : (
          <TestDiv key='3' name='Three' />
        )}
      </AnimatePresence>
    </>
  );
}
