import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

import { AuthProvider } from "./contexts/auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
