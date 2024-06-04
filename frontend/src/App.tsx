import { useRoutes } from 'react-router-dom';
import HomePage from './pages/Home';
import MarketPage from './pages/Market';
import ErrorPage from './components/error/Error';
import RootLayout from './pages/Root';

export default function App() {
  const element = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: 'market', element: <MarketPage /> },
    { path: '*', element: <ErrorPage /> },
  ]);

  if (!element) return null;

  return <RootLayout>{element}</RootLayout>;
}
