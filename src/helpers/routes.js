import Events from '../pages/Events';
import Event from '../pages/Event';
import ErrorPage from '../components/ErrorPage';
import Dashboard from '../pages/Dashboard';

export const routes = [
  {
    path: '/',
    element: <Events />,
  },
  {
    path: 'event/:link',
    element: <Event />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
