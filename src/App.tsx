import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoMatch from 'components/NoMatch';
import Events from 'pages/Events';
import Dashboard from 'pages/protected/Dashboard';
import Event from 'pages/Event';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="event/:link" element={<Event />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
