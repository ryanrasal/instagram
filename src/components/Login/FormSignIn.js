import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import logoInsta from "../../../assets/logoInsta.png";

export default function FormSignIn({
  handleChangeEmail,
  handleChangePassword,
  toggleShowPassWord,
  toggleIsSignedIn,
  setFormSignIn,
  showPassWord,
  dataLogin,
}) {
  return (
    <View>
      <Image className="h-20 w-20 mx-auto mb-3" source={logoInsta} />
      <View>
        <TextInput
          className="bg-white text-black mb-3 mx-10 p-3 rounded-lg "
          placeholder={"Email"}
          onChangeText={handleChangeEmail}
          value={dataLogin.email}
        />
        <View className="relative">
          <TextInput
            className="bg-white text-black mb-3 mx-10 p-3 rounded-lg "
            placeholder={"Mot de passe"}
            secureTextEntry={showPassWord ? true : false}
            onChangeText={handleChangePassword}
            value={dataLogin.password}
          />
          <TouchableOpacity
            onPress={toggleShowPassWord}
            className="absolute top-3 right-14"
          >
            {!showPassWord ? (
              <Ionicons name="eye" size={25} />
            ) : (
              <Ionicons name="eye-off" size={25} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={toggleIsSignedIn}
        className="bg-[#3747f6] mb-3 mx-10 p-3 rounded-lg"
      >
        <Text className="text-white font-bold text-center text-lg">
          Se Connecter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFormSignIn(false)}
        className="bg-[#000000] mb-3 mx-10 p-3 rounded-lg"
      >
        <Text className="text-white font-bold text-center text-lg">
          S'inscrire
        </Text>
      </TouchableOpacity>
    </View>
  );
}
