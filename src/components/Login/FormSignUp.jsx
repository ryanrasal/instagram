import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function FormSignUp({ setFormSignIn }) {
  return (
    <View>
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Prénom"}
        name="firstname"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Nom"}
        name="lastname"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Pseudo"}
        name="pseudo"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Email"}
        name="email"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Mot de passe"}
        name="password"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Confirmer mot de passe"}
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Adresse"}
        name="address"
      />
      <TextInput
        className="bg-white text-black mb-3 mx-10 p-2 rounded-lg "
        placeholder={"Téléphone"}
        name="phone"
      />
      <TouchableOpacity className="bg-[#3747f6] mb-3 mx-10 p-2 rounded-lg">
        <Text className="text-white font-bold text-center text-lg">
          Enregistrer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setFormSignIn(true)}
        className="bg-[#000000] mx-10 p-2 rounded-lg"
      >
        <Text className="text-white font-bold text-center text-lg">Retour</Text>
      </TouchableOpacity>
    </View>
  );
}
