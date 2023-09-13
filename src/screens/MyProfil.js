import { View, Text, Button, Image, ScrollView } from "react-native";
import { useUserContext } from "../services/UserContext";
import React, { useEffect, useState } from "react";
import HeaderMyProfil from "../components/MyProfil/HeaderMyProfil";
import PublicationMyProfil from "../components/MyProfil/PublicationMyProfil";
import FriendRequest from "../components/MyProfil/FriendRequest";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default MyProfil = () => {
  const { userConnect, reloadPublication } = useUserContext();

  const [publications, setPublications] = useState([]);
  const [friendsRequest, setFriendsRequest] = useState();

  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/friendship?friend_id=${userConnect[0]?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              setFriendsRequest(data);
            })
            .catch((jsonError) => {
              console.error("Erreur lors de l'analyse JSON:", jsonError);
            });
        } else {
          console.log("Échec de la connexion");
        }
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
  }, [userConnect]);

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
    <ScrollView className="mt-10">
      <HeaderMyProfil userConnect={userConnect} />
      <View>
        {friendsRequest?.map((friendRequest) => (
          <FriendRequest key={friendRequest.id} friendRequest={friendRequest} />
        ))}
      </View>
      <View className="flex-row justify-center flex-wrap mt-4">
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
