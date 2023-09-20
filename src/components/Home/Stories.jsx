import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

const Stories = ({ users, navigateToProfil }) => {
  return (
    <ScrollView className="my-4 h-screen mx-2 bg-white">
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => navigateToProfil(user.id)}
          className="flex-row mx-3 my-3 shadow-lg items-center "
        >
          <Image
            className="h-20 w-20 rounded-full"
            source={{
              uri: `${ADDRESS_BACK_END}/uploads/${user?.image}`,
            }}
          />
          <View className="flex-row">
            <Text className="text-black text-center font-bold mx-1">
              {user?.firstname}
            </Text>
            <Text className="text-black text-center font-bold mx-1">
              {user?.lastname}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stories;
