import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../services/UserContext";
import FriendRequest from "../components/MyProfil/FriendRequest";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default Notification = () => {
  const [friendsRequest, setFriendsRequest] = useState();
  const { userConnect } = useUserContext();

  useEffect(() => {
    const fetchFriendsRequest = async () => {
      try {
        const response = await fetch(
          `${ADDRESS_BACK_END}/friendship?friend_id=${userConnect[0]?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setFriendsRequest(data);
        } else {
          console.log("Échec de la connexion", response.statusText);
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
      }
    };

    fetchFriendsRequest();
  }, []);

  return (
    <View className="pt-8">
      {friendsRequest?.map((friendRequest) => (
        <FriendRequest key={friendRequest.id} friendRequest={friendRequest} />
      ))}
    </View>
  );
};
