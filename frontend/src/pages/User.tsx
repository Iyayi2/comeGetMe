import { useFetch } from '@/hooks/useFetch';
import { useHTTP } from '@/hooks/useHTTP';
import Portal from '@/components/user/Portal';
import SignInForm from '../components/form/SignInForm';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import PageWrapper from '@/components/pages/PageWrapper';

export default function UserPage() {
  const { data: isLoggedIn, setData, isLoading, error, sendRequest } = useHTTP();
  const { isLoading: isFetching } = useFetch('login', setData);

  const handleLogin = async (params: string, data: object) => {
    await sendRequest({ params, method: 'POST', data });
  };

  const handleLogout = async () => {
    await sendRequest({ params: 'logout', method: 'POST' });
  };

  return (
    <PageWrapper recreate={isLoggedIn}>
      {isFetching ? (
        <LoadingIndicator key='lds' />
      ) : isLoggedIn ? (
        <Portal key='portal' user={isLoggedIn} isLoading={isLoading} onLogout={handleLogout} />
      ) : (
        <SignInForm key='form' isLoading={isLoading} error={error} onLogin={handleLogin} />
      )}
    </PageWrapper>
  );
}
