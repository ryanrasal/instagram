import React, { useState } from "react";
import { Image, Text, View, ToastAndroid } from "react-native";
import fond from "../../assets/fond.png";
import FormSignIn from "../components/Login/FormSignIn";
import FormSignUp from "../components/Login/FormSignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginContext } from "../services/LoginContext";
import { useUserContext } from "../services/UserContext";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function SignIn() {
  const { toggleIsSignedIn } = useLoginContext();
  const { reloadUserConnect, setReloadUserConnect } =
    useUserContext();
  // UseState Pour le Formulaire d'inscription
  const [dataFormSignUp, setFormSignUp] = useState({
    firstname: "",
    lastname: "",
    pseudo: "",
    followers: 0,
    suivies: 0,
    image: "",
    role: "user",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  // UseState pour voir SignIn ou SignUp
  const [formSignIn, setFormSignIn] = useState(true);

  // UseState Pour la connexion
  const [dataLogin, setDataLogin] = React.useState({
    email: "",
    password: "",
  });

  const handleChangeEmail = (text) => {
    setDataLogin({ ...dataLogin, email: text });
  };

  const handleChangePassword = (text) => {
    setDataLogin({ ...dataLogin, password: text });
  };

  const [showPassWord, setShowPassWord] = useState(true);

  const toggleShowPassWord = () => {
    setShowPassWord(!showPassWord);
  };

  const handleLogin = () => {
    fetch(`${ADDRESS_BACK_END}/authentification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json(); // Renvoie la réponse JSON pour le traitement ultérieur
        } else {
          ToastAndroid.show(
            " ❌ Informations incorrectes ❌ !",
            ToastAndroid.SHORT
          );
        }
      })
      .then((data) => {
        AsyncStorage.setItem("userConnect", JSON.stringify(data.userConnect));
        AsyncStorage.setItem("isLogin", JSON.stringify(true))
          .catch((error) => {
            console.error(
              "Erreur lors de l'enregistrement de l'utilisateur dans AsyncStorage :",
              error
            );
          })
          .then(() => {
            setReloadUserConnect(!reloadUserConnect);
          });
        setTimeout(() => {
          toggleIsSignedIn();
        }, 2000);
      });
  };

  return (
    <View className="h-[100%]">
      <Image
        className="h-[100%] absolute top-0 bottom-0 left-0 right-0"
        source={fond}
      />
      <View className="mt-24">
        <Text className="text-white text-3xl mb-6 mx-auto">Instagram</Text>
        {formSignIn ? (
          <FormSignIn
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            toggleShowPassWord={toggleShowPassWord}
            setFormSignIn={setFormSignIn}
            handleLogin={handleLogin}
            showPassWord={showPassWord}
            dataLogin={dataLogin}
          />
        ) : (
          <FormSignUp setFormSignIn={setFormSignIn} />
        )}
      </View>
    </View>
  );
}
