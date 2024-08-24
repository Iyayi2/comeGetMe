import Conversations from '@/components/conversations/Conversations';
import { useFetch } from '@/hooks/useFetch';

export default function Inbox() {
  const { data: conversations } = useFetch('conversation');

  console.log(conversations);

  return <Conversations conversations={conversations || []} />
}
