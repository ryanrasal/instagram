import { View, ScrollView } from "react-native";
import { useUserContext } from "../services/UserContext";
import React, { useEffect, useState } from "react";
import HeaderMyProfil from "../components/MyProfil/HeaderMyProfil";
import PublicationMyProfil from "../components/MyProfil/PublicationMyProfil";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default MyProfil = () => {
  const { userConnect, reloadPublication } = useUserContext();

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/publications/${userConnect[0]?.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      });
  }, [reloadPublication]);

  return (
    <ScrollView className="pt-10 bg-white">
      <HeaderMyProfil userConnect={userConnect} />
      <View className="flex-row flex-wrap mt-4">
        {publications?.map((publication) => (
          <PublicationMyProfil
            key={publication?.id}
            publication={publication}
          />
        ))}
      </View>
    </ScrollView>
  );
};
