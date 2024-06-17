import { AnimatePresence, motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import SignInForm from '../components/form/SignInForm';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import Portal from '@/components/user/Portal';

export default function UserPage() {
  const { data: isLoggedIn, setData, isLoading, error, sendRequest } = useHTTP();
  const { isLoading: isFetching } = useFetch('login', setData);

  const handleLogin = async (path: string, data: object) => {
    await sendRequest({ path, method: 'POST', data });
  };

  const handleLogout = async () => {
    await sendRequest({ path: 'logout', method: 'POST' });
  };

  return (
    <AnimatePresence mode='popLayout'>
      <motion.section
        key={isLoggedIn}
        exit={{
          y: isFetching ? 0 : 100,
          scale: isFetching ? 0 : 1,
          opacity: 0,
          transition: { duration: 0.6 },
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {isFetching ? (
          <LoadingIndicator />
        ) : isLoggedIn ? (
          <Portal user={isLoggedIn} isLoading={isLoading} onLogout={handleLogout} />
        ) : (
          <SignInForm isLoading={isLoading} error={error} onLogin={handleLogin} />
        )}
      </motion.section>
    </AnimatePresence>
  );
}
