import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Not authorized!</h1>
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </>
  );
}
