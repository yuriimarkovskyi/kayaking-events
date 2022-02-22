import React from 'react';
import styled from 'styled-components';
import AppRoutes from './components/AppRoutes';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <AppRoutes />
    </StyledApp>
  );
}

export default App;
