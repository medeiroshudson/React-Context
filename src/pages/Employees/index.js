import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Employees page</h1>
      <Outlet />
      <button onClick={() => navigate("/")}>Go to Dashboard</button>
    </>
  );
}
