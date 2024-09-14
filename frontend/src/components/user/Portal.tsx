import { useState } from 'react';
import { LayoutGroup,
           motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import {  useHTTP } from '@/hooks/useHTTP';
import       User   from '@/models/User';
import    Listing    from '@/models/Listing';
import   UserInfo   from './UserInfo';
import   ItemForm   from '../form/ItemForm';
import   Listings    from '../listings/Listings';
import        css   from './Portal.module.css';

export default function Portal({
  user,
  onLogout,
  isLoading,
}: {
       user: User;
   onLogout: () => void;
  isLoading: boolean;
}) {
  const { sendRequest, isLoading: sendingData, error, setError } = useHTTP();
  const { data, setData, isLoading: isFetching } = useFetch<Listing[]>('my-listings');
  const [expanded, setExpanded] = useState(false);

  const listings = data || [];
  const hasItems = listings.length > 0;

  const submitHandler = async (data: object) => {
    const newItem = await sendRequest({ params: 'add-listing', method: 'POST', data });
    if (newItem) {
      setExpanded(false);
      setTimeout(() => {
        setData((items) => (items ? [...items, newItem] : [newItem]));
      }, 500);
    }
  };

  const userInfoProps = { expanded, setExpanded, isLoading, user, onLogout, setError, adsOnline: listings.length };
  const itemFormProps = { expanded,       error, isLoading: sendingData,                 dataFn:   submitHandler };
  const listingsProps = { hasItems,    listings, isLoading:  isFetching                                          };

  return (
    <LayoutGroup>
      <motion.div
            layout
        className={css['portal']}
          initial={{ y: -100 }}
          animate={{ y: 0, transition: { ease: 'easeIn', duration: 0.5 } }}
      >
        <UserInfo  {...userInfoProps} />
        <ItemForm  {...itemFormProps} />
        <Listings   {...listingsProps} onUserPage />
      </motion.div>
    </LayoutGroup>
  );
}
