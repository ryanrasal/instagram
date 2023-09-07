import React from "react";
import Index from "./src/Index";
import { LoginProvider } from "./src/services/LoginContext";
import { UserProvider } from "./src/services/UserContext";

export default function App() {

  return (
    <UserProvider>
      <LoginProvider>
        <Index />
      </LoginProvider>
    </UserProvider>
  );
}
