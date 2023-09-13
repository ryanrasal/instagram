import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default HeaderProfil = ({
  user,
  navigation: { goBack },
  setStatusAdd,
  statusAdd,
  addFriend,
}) => {
  return (
    <View>
      <View className="flex-row justify-arounds items-center mb-3">
        <TouchableOpacity
          onPress={() => goBack()}
          className=" py-2 px-4 w-28 ml-3 mt-2 rounded-md  bg-[#2E2E2E]"
        >
          <Text className="text-white text-center">Retour</Text>
        </TouchableOpacity>
        {!statusAdd ? (
          <TouchableOpacity
            onPress={addFriend}
            className=" py-2 px-4 w-28 ml-2 mt-2 rounded-md  bg-[#2E2E2E]"
          >
            <Text className="text-white text-center">Ajouter +</Text>
          </TouchableOpacity>
        ) : (
          <Text className=" ml-8 text-lg font-bold">Demande en cours...</Text>
        )}
      </View>
      <View className="flex-row items-center">
        <View className="flex-col items-center">
          <Text className="text-black font-bold text-xl  ml-4 mb-2 ">
            {user?.pseudo}
          </Text>
          <Image
            className="h-24 w-24 rounded-full ml-4"
            source={{
              uri: user?.image,
            }}
          />
        </View>

        <View className="flex-row justify-around ml-3 w-52">
          <View className="flex-col items-center">
            <Text className="text-black text-center font-bold text-xl">
              {user?.followers}
            </Text>
            <Text className="text-black font-bold text-lg">Followers</Text>
          </View>
          <View>
            <Text className="text-black text-center font-bold text-xl">
              {user?.suivies}
            </Text>
            <Text className="text-black font-bold text-lg">Suivi(e)s</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
