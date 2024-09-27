import { useFetch } from '@/hooks/useFetch';
import Conversations from '@/components/conversations/Conversations';
import ErrorPage from '@/components/error/Error';
import LoadingIndicator from '@/components/loading/LoadingIndicator';
import Conversation from '@/models/Conversation';

export default function Inbox() {
  const { data: conversations, setData, isLoading, error } = useFetch<Conversation[]>('conversations');

  return isLoading ? (
    <LoadingIndicator />
  ) : error ? (
    <ErrorPage type='inbox' />
  ) : (
    <Conversations conversations={conversations || []} setConversations={setData} />
  );
}
