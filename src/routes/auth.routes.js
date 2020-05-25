import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<h1>Not found!</h1>} />
    </Routes>
  );
}
