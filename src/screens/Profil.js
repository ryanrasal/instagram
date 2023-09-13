import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderProfil from "../components/Profil/HeaderProfil";
import PublicationProfil from "../components/Profil/PublicationProfil";
import { useUserContext } from "../services/UserContext";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function Profil({ navigation }) {
  const { userConnect } = useUserContext();
  const route = useRoute();
  const { user } = route.params ? route.params : {};
  const [statusAdd, setStatusAdd] = useState(false);

  const [dataFriendShip, setDataFriendShip] = useState([]);

  const [dataPostFriendShip, setDataPostFriendShip] = useState({
    friend_id: user.id,
    user_id: userConnect[0].id,
    status: "pending",
  });

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/publications/${user?.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPublications(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      });
  }, [user?.id]);

  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/friendship`)
      .then((response) => response.json())
      .then((data) => {
        setDataFriendShip(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des friendship", error);
      });
  }, []);

  const addFriend = async () => {
    try {
      const response = await fetch(`${ADDRESS_BACK_END}/friendship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPostFriendShip),
      });

      if (response.status === 201) {
        const data = await response.json();
        setStatusAdd(!statusAdd);
      } else {
        console.log("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <View className="mt-10">
      <HeaderProfil
        statusAdd={statusAdd}
        addFriend={addFriend}
        setStatusAdd={setStatusAdd}
        navigation={navigation}
        user={user}
      />
      <View className="flex-row justify-center flex-wrap mt-4">
        {publications?.map((publication) => (
          <PublicationProfil key={publication.id} publication={publication} />
        ))}
      </View>
    </View>
  );
}
