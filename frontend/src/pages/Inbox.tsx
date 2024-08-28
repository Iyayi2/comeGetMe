import { useFetch } from '@/hooks/useFetch';
import Conversations from '@/components/conversations/Conversations';
import ErrorPage from '@/components/error/Error';
import LoadingIndicator from '@/components/loading/LoadingIndicator';

export default function Inbox() {
  const { data: conversations, isLoading, error } = useFetch('conversations');

  return isLoading ? (
    <LoadingIndicator />
  ) : error ? (
    <ErrorPage type='inbox' />
  ) : (
    <Conversations conversations={conversations || []} />
  );
}
