import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Context } from '@/store/Context';
import Button from '../button/Button';
import User from '@/models/User';
import css from './UserInfo.module.css';

export default function UserInfo({
  user,
  onLogout,
  isLoading,
  adsOnline,
  expanded,
  setExpanded,
  setError,
}: {
         user: User;
     onLogout: () => void;
    isLoading: boolean;
    adsOnline: number;
     expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
     setError: Dispatch<SetStateAction<null>>;
}) {
  const { username, email } = user;
  const { navTo, isAnimating, setIsAnimating } = useContext(Context);

  function clickHandler() {
    if (!isAnimating) {
      setIsAnimating(true)
      setExpanded((toggle) => !toggle)
      setError(null);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }

  return (
    <motion.section layout className={css['container']}>
      <div className={css['info']}>
        <motion.h2
             initial={{ opacity: 0, x: -100, scaleY: 0 }}
             animate={{ opacity: 1, x:    0, scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Welcome {username}
        </motion.h2>
        <p>
          <FontAwesomeIcon icon='envelope'  /> Your Email: {email}
        </p>
        <p>
          <FontAwesomeIcon icon='signs-post' /> Ads Online: {adsOnline}
        </p>
      </div>
      <div className={css['buttons']}>
        <Button
               text='logout'
              style={{ background: '#cd4f25' }}
            onClick={onLogout}
          isLoading={isLoading}
        />
        <Button text={'inbox'} style={{ background: '#94ca7c' }} onClick={() => navTo('/inbox')} />
        <Button
             text={              expanded ?  'cancel' : 'new ad'   }
            style={{ background: expanded ? '#747272' : '#538392' }}
          onClick={clickHandler}
        />
      </div>
    </motion.section>
  );
}
