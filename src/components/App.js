import React from "react";
import "../stylesheets/App.css";
// import { useOrgAuth } from "../providers/auth-provider"
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { useAuth } from "../providers/auth-provider";
import { AuthOrgApp } from "./AuthOrgApp";

function App() {
  const { user } = useAuth();
  // const { org } = useOrgAuth();
  if (user) {
    if (user.role === 'super_admin') {
      return <AuthenticatedApp />;
    } else {
      return <AuthOrgApp />;
    }
  } else {
    return <UnAuthenticatedApp />;
  }

}

export default App;
