import React from 'react';

import { useAuth } from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

export default function Routes() {
  const { authenticated } = useAuth();

  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
