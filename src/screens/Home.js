import React, { useState, useEffect } from "react";
import { ScrollView, View, Button } from "react-native";
import CardPublication from "../components/Home/CardPublication";
import Stories from "../components/Home/Stories";
import { useUserContext } from "../services/UserContext";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function Home({ navigation }) {
  const { userConnect, reloadPublication, setReloadPublication } =
    useUserContext();

  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);

  // filtre les users pour ne pas afficher le user connecté
  const connectedUserEmail = userConnect ? userConnect[0]?.email : null;
  const otherUsers = users.filter((user) => user?.email !== connectedUserEmail)

  // récupere les users
  useEffect(() => {
    fetch(`${ADDRESS_BACK_END}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      });
  }, []);

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
        .then((likeExists) => {
          // si likeCount === 0, qu'il n'y a pas de like de l'utilisateur sur cette publication
          if (likeExists[0]?.likeCount === 0) {
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
              `${ADDRESS_BACK_END}/likepublication/${likeExists[0]?.id}`,
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

  return (
    <View>
      <Stories otherUsers={otherUsers} navigateToProfil={navigateToProfil} />
      {/* <Button onPress={() => console.warn(dataLike)} title="press me" /> */}
      <ScrollView className="mb-52">
        {publications.map((publication) => (
          <CardPublication
            key={publication.id}
            likePost={likePost}
            publication={publication}
          />
        ))}
      </ScrollView>
    </View>
  );
}
