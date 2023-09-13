import { View, Image, Button, Text } from "react-native";
import React from "react";

export default FriendRequest = ({ friendRequest }) => {
  return (
    <View>
      <View className="items-center">
        <Image
          className="h-20 w-20 rounded-full"
          source={{
            uri: friendRequest?.image,
          }}
        />
        <View className="flex-row">
          <Text className="text-xl font-bold mx-2">
            {friendRequest?.firstname}
          </Text>
          <Text className="text-xl font-bold ">{friendRequest?.lastname}</Text>
        </View>
        <Text className="text-xl ">vous a demandé en amis </Text>
        <View className="flex-row">
          <Button title="accepter" />
          <Button title="refuser" />
        </View>
      </View>
    </View>
  );
};
