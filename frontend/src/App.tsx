import ContextProvider from './store/Context';
import { HelmetProvider } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';
import HomePage from './pages/Home';
import MarketPage from './pages/Market';
import MarketIdPage from './pages/MarketIdPage';
import UserPage from './pages/User';
import Inbox from './pages/Inbox';
import ErrorPage from './components/error/Error';
import RootLayout from './pages/Root';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';  // import brand icons
import { fas } from '@fortawesome/free-solid-svg-icons';   // import solid icons
import { far } from '@fortawesome/free-regular-svg-icons'; // import regular icons

library.add(fab, fas, far);

export default function App() {
  const element = useRoutes([
    { path: '/',                     element: <HomePage />     },
    { path: 'market',                element: <MarketPage />   },
    { path: 'market/:productId',     element: <MarketIdPage /> },
    { path: 'account',               element: <UserPage />     },
    { path: 'inbox',                 element: <Inbox />        },
    { path: 'inbox/:conversationId', element: <Inbox />        },
    { path: '*',                     element: <ErrorPage />    },
  ]);

  if (!element) return null;

  return (
    <ContextProvider>
      <HelmetProvider>
        <RootLayout>{element}</RootLayout>
      </HelmetProvider>
    </ContextProvider>
  );
}
