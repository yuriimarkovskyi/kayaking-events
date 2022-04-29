import Events from '../pages/Events';
import Event from '../pages/Event';
import EventsInformation from '../pages/EventsInformation';
import ErrorPage from '../components/ErrorPage';

export const routes = [
  {
    path: '/',
    element: <Events />,
  },
  {
    path: '/event/:name',
    element: <Event />,
  },
  {
    path: '/events-information',
    element: <EventsInformation />,
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
];
