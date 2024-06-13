import { AnimatePresence, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Form from '../components/form/Form';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import Portal from '@/components/user/Portal';

export default function UserPage() {
  const { data: isLoggedIn, setData, isLoading, error, sendRequest } = useHTTP();
  const { data: user, isLoading: isFetching } = useFetch('login', setData);

  let content;

  const handleLogin = async (path: string, data: object) => {
    await sendRequest({ path, method: 'POST', data });
  };

  const handleLogout = async () => {
    await sendRequest({ path: 'logout', method: 'POST' });
  };

  console.log('isLoggedIn', isLoggedIn, '\n\n', 'fetchedUser', user); // logData

  if (isLoggedIn) {
    content = <Portal user={isLoggedIn} isLoading={isLoading} onLogout={handleLogout} />;
  } else {
    content = <Form isLoading={isLoading} error={error} onLogin={handleLogin} />;
  }

  return (
    <AnimatePresence mode='popLayout'>
      <motion.section
        key={isLoggedIn}
        exit={{ y: isFetching ? 0 : 100, scale: isFetching ? 0 : 1, opacity: 0, transition: { duration: 0.6 } }}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        {isFetching ? <LoadingIndicator /> : content}
      </motion.section>
    </AnimatePresence>
  );
}
