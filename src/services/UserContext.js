import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userConnect, setUserConnect] = useState(null);

  useEffect(() => {
    // Récupérer les données utilisateur depuis AsyncStorage lors du chargement de l'application
    const getUserData = async () => {
      try {
        const userConnectData = await AsyncStorage.getItem("userConnect");
        if (userConnectData !== null) {
          setUserConnect(JSON.parse(userConnectData));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur depuis AsyncStorage :",
          error
        );
      }
    };

    getUserData();
  }, [setUserConnect]);

  const logout = () => {
    setUserConnect(null);
  };

  return (
    <UserContext.Provider
      value={{ userConnect, setUserConnect, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
