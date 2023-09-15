import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginContext } from "../services/LoginContext";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../services/UserContext";
import fond from "../../assets/fond.png";

const LogoutButton = () => {
  const { toggleIsSignedIn } = useLoginContext();
  const { setUserConnect } = useUserContext();
  const navigation = useNavigation();

  const handleLogout = () => {
    AsyncStorage.clear();
    toggleIsSignedIn(false);
    setTimeout(() => {
      navigation.navigate("SignIn");
    }, 1500);
  };

  const handleHome = () => {
    navigation.navigate("Accueil");
  };

  return (
    <View className="h-full">
      <Image
        className="h-full absolute top-0 bottom-0 left-0 right-0"
        source={fond}
      />
      <View className="mt-24">
        <Text className="text-white text-3xl mb-6 mx-auto">Instagram</Text>
        <Text className="text-white text-xl text-center mb-6 mx-auto">
          Voulez-Vous vraiment vous deconnectez ?{" "}
        </Text>
        <TouchableOpacity
          className="bg-[#3747f6] mb-3 mx-10 p-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-bold text-center text-lg">
            Déconnexion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#000000] mb-3 mx-10 p-3 rounded-lg"
          onPress={handleHome}
        >
          <Text className="text-white font-bold text-center text-lg">
            Retour
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutButton;
