import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isSignedIn, setIsSignIn] = useState(false);

  // Ajoutez une fonction pour récupérer la valeur de "isLogin" depuis AsyncStorage
  const getIsLoginFromStorage = async () => {
    try {
      const isLoginValue = await AsyncStorage.getItem("isLogin");
      if (isLoginValue !== null) {
        setIsSignIn(JSON.parse(isLoginValue));
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de isLogin depuis AsyncStorage :",
        error
      );
    }
  };

  useEffect(() => {
    getIsLoginFromStorage();
  }, [isSignedIn]);

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
