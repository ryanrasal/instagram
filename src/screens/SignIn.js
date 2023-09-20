import React, { useState } from "react";
import { Image, Text, View, ToastAndroid } from "react-native";
import fond from "../../assets/fond.png";
import FormSignIn from "../components/Login/FormSignIn";
import FormSignUp from "../components/Login/FormSignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginContext } from "../services/LoginContext";
import { useUserContext } from "../services/UserContext";
import * as ImagePicker from "expo-image-picker";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default function SignIn() {
  const { toggleIsSignedIn } = useLoginContext();
  const { reloadUserConnect, setReloadUserConnect } = useUserContext();
  const [image, setImage] = React.useState(null);
  const [showPassWord, setShowPassWord] = useState(true);

  // UseState Pour le Formulaire d'inscription
  const [dataSignUp, setDataSignUp] = useState({
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

  const handleValueDataSignUp = (fieldName, value) => {
    setDataSignUp({ ...dataSignUp, [fieldName]: value });
  };

  const handleChangeEmail = (text) => {
    setDataLogin({ ...dataLogin, email: text });
  };

  const handleChangePassword = (text) => {
    setDataLogin({ ...dataLogin, password: text });
  };

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
        AsyncStorage.setItem(
          "userConnect",
          JSON.stringify(data.message.userConnect)
        );
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    const dataPostSignup = JSON.stringify(dataSignUp);
    const formData = new FormData();

    formData.append("dataPostSignup", dataPostSignup);
    if (image) {
      formData.append("picture", {
        uri: image,
        name: image,
        type: "image/jpeg",
      });
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };
    myHeaders.append("Content-Type", "multipart/form-data");
    fetch(`${ADDRESS_BACK_END}/users`, requestOptions)
      .then(() => {
        ToastAndroid.show(" ✅ Inscription réussite ✅ !", ToastAndroid.SHORT);
        setFormSignIn(!formSignIn);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  return (
    <View className="h-[100%]">
      <Image className="h-full absolute inset-0" source={fond} />
      <View className="pt-12">
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
          <FormSignUp
            setFormSignIn={setFormSignIn}
            handleValueDataSignUp={handleValueDataSignUp}
            dataSignUp={dataSignUp}
            image={image}
            pickImage={pickImage}
            setImage={setImage}
            handleSignUp={handleSignUp}
          />
        )}
      </View>
    </View>
  );
}
