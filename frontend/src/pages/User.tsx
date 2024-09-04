import { Context } from '@/store/Context';
import { useContext } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Portal from '@/components/user/Portal';
import SignInForm from '../components/form/SignInForm';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import PageWrapper from '@/components/pages/PageWrapper';

export default function UserPage() {
  const { data: user, setData, isLoading, error, setError, sendRequest } = useHTTP();
  const { isLoading: isFetching } = useFetch('login', setData);
  const { setUser } = useContext(Context);

  const handleLogin = async (params: string, data: object) => {
    const isLoggedIn = await sendRequest({ params, method: 'POST', data });
    if (isLoggedIn) {
      setUser(isLoggedIn);
    }
  };

  const handleLogout = async () => {
    const response = await sendRequest({ params: 'logout', method: 'POST' });
    if (!response) {
      setUser(response); // backend sends null on success / json objects on fail
    }
  };

  return (
    <PageWrapper recreate={user}>
      {isFetching ? (
        <LoadingIndicator key='lds' />
      ) : user ? (
        <Portal key='portal' user={user} isLoading={isLoading} onLogout={handleLogout} />
      ) : (
        <SignInForm key='form' isLoading={isLoading} error={error} setError={setError} onLogin={handleLogin} />
      )}
    </PageWrapper>
  );
}
