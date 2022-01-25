import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import EventList from './pages/EventList';
import EventPage from './pages/EventPage';
import EventsInformation from './pages/EventsInformation';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:name" element={<EventPage />} />
        <Route
          path="/events-information"
          element={<EventsInformation />}
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
