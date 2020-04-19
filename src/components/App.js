import React from "react";
import "../stylesheets/App.css";
import { useAuth } from "../providers/auth-provider"
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";
import { AuthenticatedApp } from "./AuthenticatedApp";

function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
