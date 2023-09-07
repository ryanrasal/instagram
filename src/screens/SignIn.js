import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import fond from "../../assets/fond.png";
import { useLoginContext } from "../services/LoginContext";
import FormSignIn from "../components/Login/FormSignIn";
import FormSignUp from "../components/Login/FormSignUp";

export default function SignIn() {
  const { toggleIsSignedIn } = useLoginContext();

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
    phone: ""
  })

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
            toggleIsSignedIn={toggleIsSignedIn}
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
