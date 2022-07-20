import Loader from 'components/Loader';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Categories = lazy(() => import ('pages/Categories'));
const Events = lazy(() => import ('pages/Events'));
const Event = lazy(() => import ('pages/Event/Event'));
const Dashboard = lazy(() => import ('pages/Dashboard/Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/categories"
          element={
            <Categories />
          }
        />
        <Route
          path="/categories/:link"
          element={
            <Events />
          }
        />
        <Route
          path="/event/:link"
          element={
            <Event />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
        <Route
          path="*"
          element={
            <Navigate to="/categories" replace />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
