import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isSignedIn, setIsSignIn] = useState(false);

  const toggleIsSignedIn = () => {
    setIsSignIn(!isSignedIn);
  };

  return (
    <LoginContext.Provider
      value={{ isSignedIn, setIsSignIn, toggleIsSignedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
};
