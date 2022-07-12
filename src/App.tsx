import Loader from 'components/Loader';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Categories = lazy(() => import ('pages/Categories'));
const Events = lazy(() => import ('pages/Events'));
const Event = lazy(() => import ('pages/Event'));
const Dashboard = lazy(() => import ('pages/protected/Dashboard'));
const NoMatch = lazy(() => import ('components/NoMatch'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/events/:link" element={<Events />} />
        <Route path="/event/:link" element={<Event />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
}

export default App;
