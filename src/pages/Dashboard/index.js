import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export default function Dashboard() {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    Logout();
  }

  return (
    <>
      <h1>Hello,{user.nome}!</h1>
      <button onClick={() => navigate('/employees')}>See Employees</button>
      <br />
      <button onClick={() => handleLogout()}>Logout</button>
    </>
  );
}
