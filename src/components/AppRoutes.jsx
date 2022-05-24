import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../helpers/routes';

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
