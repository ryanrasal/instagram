import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FormSignUp({
  setFormSignIn,
  handleValueDataSignUp,
  dataSignUp,
  image,
  pickImage,
  setImage,
  handleSignUp,
}) {
  return (
    <ScrollView>
      <View className="my-2">
        {!image && (
          <TouchableOpacity
            onPress={pickImage}
            className="w-32 rounded-full mx-auto items-center flex-row justify-center bg-gray-400 h-32"
          >
            <Text className="text-white font-bold text-lg ">Photo</Text>
          </TouchableOpacity>
        )}
        {image && (
          <View className="relative">
            <Image
              className="w-32 rounded-full mx-auto h-32"
              source={{ uri: image }}
            />
            <Ionicons
              onPress={() => setImage(null)}
              style={{ marginLeft: "auto", position: "absolute", right: 5 }}
              name="close"
              size={45}
              color="red"
            />
          </View>
        )}
      </View>

      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Prénom"}
        onChangeText={(text) => handleValueDataSignUp("firstname", text)}
        value={dataSignUp.firstname}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Nom"}
        onChangeText={(text) => handleValueDataSignUp("lastname", text)}
        value={dataSignUp.lastname}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Pseudo"}
        onChangeText={(text) => handleValueDataSignUp("pseudo", text)}
        value={dataSignUp.pseudo}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Email"}
        onChangeText={(text) => handleValueDataSignUp("email", text)}
        value={dataSignUp.email}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Mot de passe"}
        onChangeText={(text) => handleValueDataSignUp("password", text)}
        value={dataSignUp.password}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Confirmer mot de passe"}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Adresse"}
        onChangeText={(text) => handleValueDataSignUp("address", text)}
        value={dataSignUp.address}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Téléphone"}
        onChangeText={(text) => handleValueDataSignUp("phone", text)}
        value={dataSignUp.phone}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-[#3747f6] mb-3 mx-10 p-2 rounded-lg"
      >
        <Text className="text-white font-bold text-center text-lg">
          Enregistrer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFormSignIn(true)}
        className="bg-[#000000] mx-10 p-2 mb-16 rounded-lg"
      >
        <Text className="text-white font-bold text-center text-lg">Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
