import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [reloadUserConnect, setReloadUserConnect] = useState(false);
  const [reloadPublication, setReloadPublication] = useState(false);
  const [userConnect, setUserConnect] = useState({});

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

  useEffect(() => {
    getUserData();
  }, [reloadUserConnect]);

  return (
    <UserContext.Provider
      value={{
        userConnect,
        setUserConnect,
        setReloadUserConnect,
        reloadUserConnect,
        reloadPublication,
        setReloadPublication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
