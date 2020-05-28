import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import Dashboard from '../pages/dashboard';
import Unauthorized from '../pages/unauthorized';
import Employees from '../pages/employees';
import EmployeeInfo from '../pages/employees/info';

export default function AppRoutes() {
  function PrivateRoute({ roles, ...rest }) {
    const { user } = useAuth();

    // if user role is not permited return unauthorized
    if (roles.indexOf(user.role) === -1) {
      return <Route {...rest} element={<Unauthorized />} />;
    }

    return <Route {...rest} />;
  }

  return (
    <Routes>
      <Route path="" element={<Dashboard />} />

      <PrivateRoute path="/employees" roles={['Admin']} element={<Employees />}>
        <PrivateRoute path="/:id" element={<EmployeeInfo />} />
      </PrivateRoute>

      <Route path="*" element={<h1>Not found!</h1>} />
    </Routes>
  );
}
