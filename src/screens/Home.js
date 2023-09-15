import React, { useState, useEffect } from "react";
import { ScrollView, View, TextInput, Button } from "react-native";
import CardPublication from "../components/Home/CardPublication";
import Stories from "../components/Home/Stories";
import { useUserContext } from "../services/UserContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function Home({ navigation }) {
  const { userConnect, reloadPublication, setReloadPublication } =
    useUserContext();

  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [textSearchUser, setTextSearchUser] = useState("");
  const [toggleSearch, setToggleSearch] = useState(true);
  const [likes, setLikes] = useState([]);

  // récupere les publications
  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/publications`)
      .then((response) => response.json())
      .then((data) => {
        const reverseData = data?.reverse();
        setPublications(reverseData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
      });
  }, [reloadPublication]);

  // navigation vers le profil d'un user
  function navigateToProfil(userId) {
    navigation.navigate("Profil", {
      user: users.find((user) => user.id === userId),
    });
  }

  const likePost = (publication) => {
    // récupère le like d'une publication  WHERE user_id = ${userId} AND publication_id = ${publicationId}`;
    try {
      fetch(
        `${ADDRESS_BACK_END}/likepublication/byId?publicationId=${publication.id}&userId=${userConnect[0].id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          setLikes(response);
          // si response === 0, qu'il n'y a pas de like de l'utilisateur sur cette publication
          if (response[0]?.likeCount === 0) {
            return fetch(`${ADDRESS_BACK_END}/likepublication`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userConnect[0]?.id,
                publication_id: publication.id,
              }),
            });
          } else {
            return fetch(
              `${ADDRESS_BACK_END}/likepublication/${response[0]?.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        })
        .then(() => {
          setReloadPublication(!reloadPublication);
        })
        .catch((error) => {
          console.error("Erreur lors de la requête :", error);
        });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const searchUser = () => {
    setToggleSearch(!toggleSearch);
    fetch(
      `${ADDRESS_BACK_END}/users/search?userName=${textSearchUser}&userEmail=${userConnect[0].email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  return (
    <View className="bg-white">
      <View className="flex-row items-center ml-4 mt-12 relative">
        <View style={{ width: 30, height: 30 }}>
          {toggleSearch ? null : (
            <MaterialCommunityIcons
              size={30}
              name="arrow-left-bold-outline"
              onPress={() => setToggleSearch(!toggleSearch)}
            />
          )}
        </View>
        <TextInput
          className="border p-2 rounded-lg w-2/3 mx-3"
          placeholder="Rechercher..."
          onChangeText={setTextSearchUser}
        />

        <MaterialCommunityIcons
          size={30}
          name="account-search-outline"
          onPress={searchUser}
        />
      </View>
      <Button onPress={() => console.warn(likes)} title="press me " />
      {!toggleSearch ? (
        <Stories users={users} navigateToProfil={navigateToProfil} />
      ) : (
        <ScrollView className={publications.length < 0 ? `pb-36` : "h-screen"}>
          {publications.map((publication) => (
            <CardPublication
              key={publication.id}
              likePost={likePost}
              publication={publication}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
