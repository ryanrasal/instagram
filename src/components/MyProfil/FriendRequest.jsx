import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default FriendRequest = ({ friendRequest, confirmFriend }) => {
  return (
    <View className="items-center justify-center bg-gray-50 my-1 flex-row">
      <Image
        className="h-14 w-14   rounded-full"
        source={{
          uri: `${ADDRESS_BACK_END}/uploads/${friendRequest?.image}`,
        }}
      />
      <View className="flex-col ml-5">
        <View className="flex-row mx-auto">
          <Text className="text-xl font-bold mx-2">
            {friendRequest?.firstname}
          </Text>
          <Text className="text-xl font-bold ">{friendRequest?.lastname}</Text>
        </View>
        <Text className="text-xl ">vous a demandé en amis</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => confirmFriend(friendRequest.id)}
            className="bg-[#3747f6] mb-3 mx-3 p-2 rounded-lg"
          >
            <Text className="text-white font-bold text-center text-lg">
              accepter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#ff4343] mb-3 mx-3 p-2 rounded-lg">
            <Text className="text-white font-bold text-center text-lg">
              refuser
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
