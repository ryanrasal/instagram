import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderProfil from "../components/Profil/HeaderProfil";
import PublicationMyProfil from "../components/MyProfil/PublicationMyProfil";
import { useUserContext } from "../services/UserContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function Profil({ navigation }) {
  const { userConnect } = useUserContext();
  const route = useRoute();
  const { user } = route.params ? route.params : {};
  const [statusAdd, setStatusAdd] = useState(false);

  const [dataFriendShip, setDataFriendShip] = useState([]);
  const [isFriend, setIsFriend] = useState(false);

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
        console.log(user.id);
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
      <HeaderProfil navigation={navigation} user={user} />
      {!statusAdd ? (
        <TouchableOpacity
          onPress={addFriend}
          className=" py-2 px-4 mx-3 mt-2 rounded-md  bg-[#3747f6]"
        >
          <Text className="text-white text-center">Ajouter</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-center text-lg  font-bold">
          Demande en cours...
        </Text>
      )}
      {isFriend ? (
        <View className="flex-row flex-wrap mt-4">
          {publications?.map((publication) => (
            <PublicationMyProfil
              key={publication.id}
              publication={publication}
            />
          ))}
        </View>
      ) : (
        <View>
          <MaterialCommunityIcons
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30 }}
            size={100}
            name="block-helper"
          />
          <Text className="text-center font-bold text-lg mt-3 mx-3">
            Ce profil est en privé, veuillez l'ajouter pour voir son contenu{" "}
          </Text>
        </View>
      )}
    </View>
  );
}
