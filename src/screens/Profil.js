import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
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
  const [isFriend, setIsFriend] = useState();
  const [dataPostFriendShip, setDataPostFriendShip] = useState({
    friend_id: user?.id,
    user_id: userConnect[0]?.id,
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

  useEffect(() => {
    fetch(
      `${ADDRESS_BACK_END}/friendship/get?friend_id=${userConnect[0]?.id}&user_id=${user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        setIsFriend(data[0]);
      });
  }, []);

  return (
    <View className="mt-10">
      <HeaderProfil navigation={navigation} user={user} />
      {isFriend?.status === "accepted" ? (
        <Button title="Se Désabonner" />
      ) : (
        <View className=" py-2 px-4 mx-3 mt-2 rounded-md">
          <Text className="text-center font-bold ">
            {statusAdd ? (
              "Demande en cours..."
            ) : (
              <TouchableOpacity
                onPress={addFriend}
                className=" py-2 px-4 mx-3 mt-2 rounded-md  bg-[#3747f6]"
              >
                <Text className="text-white text-center">Ajouter</Text>
              </TouchableOpacity>
            )}
          </Text>
        </View>
      )}

      {isFriend?.status === "accepted" ? (
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
