import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EventsList from '../pages/EventsList';
import EventPage from '../pages/EventPage';
import EventsInformation from '../pages/EventsInformation';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/event/:name" element={<EventPage />} />
      <Route
        path="/events-information"
        element={<EventsInformation />}
      />
    </Routes>
  );
}

export default AppRoutes;
