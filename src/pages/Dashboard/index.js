import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export default function Dashboard() {
  const { token, Logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    Logout();
  }

  return (
    <>
      <h1>Hello, {token.given_name}!</h1>
      <h1>{new Date(token.exp * 1000).toString()}</h1>
      <button onClick={() => navigate('/employees')}>See Employees</button>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
}
