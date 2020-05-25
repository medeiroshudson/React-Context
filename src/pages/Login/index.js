import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { Login } = useAuth();

  function handleLogin() {
    Login(username, password);
  }

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button onClick={() => handleLogin()}>Login!</button>
    </>
  );
}
