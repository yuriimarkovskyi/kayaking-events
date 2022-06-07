import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Events from './pages/Events';
import Dashboard from './pages/protected/Dashboard';
import NoMatch from './components/NoMatch';
import Event from './pages/Event';

function App(): JSX.Element {
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
