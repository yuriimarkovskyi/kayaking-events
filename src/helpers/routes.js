import EventsList from '../pages/EventsList';
import EventPage from '../pages/EventPage';
import ErrorPage from '../components/ErrorPage';
import Dashboard from '../pages/Dashboard';

export const routes = [
  {
    path: '/',
    element: <EventsList />,
  },
  {
    path: 'event/:link',
    element: <EventPage />,
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
