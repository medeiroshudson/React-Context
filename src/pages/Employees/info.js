import React from 'react';
import { useParams } from 'react-router-dom';

export default function Employees() {
  const { id } = useParams();

  return (
    <>
      <h1>Employee ID: {id}</h1>
    </>
  );
}
