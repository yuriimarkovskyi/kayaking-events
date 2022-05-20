import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EventsList from '../pages/EventsList';
import EventPage from '../pages/EventPage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from './ErrorPage';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<EventsList />}
      />
      <Route
        path="event/:link"
        element={<EventPage />}
      />
      <Route
        path="events-information"
        element={<LoginPage />}
      />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default AppRoutes;
