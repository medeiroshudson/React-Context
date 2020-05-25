import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import EmployeeInfo from '../pages/Employees/info';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />

      <Route path="/employees" element={<Employees />}>
        <Route path="/:id" element={<EmployeeInfo />} />
      </Route>

      <Route path="*" element={<h1>Not found!</h1>} />
    </Routes>
  );
}
