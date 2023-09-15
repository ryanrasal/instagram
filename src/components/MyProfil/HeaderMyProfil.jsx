import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default HeaderMyProfil = ({ userConnect }) => {
  return (
    <View>
      <View className="flex-row justify-arounds items-center mb-3"></View>
      <View className="flex-row items-center">
        <View className="flex-col items-center">
          <Text className="text-black font-bold text-xl  ml-4 mb-2 ">
            {userConnect[0]?.pseudo}
          </Text>
          <Image
            className="h-24 w-24 rounded-full ml-4"
            source={{
              uri: userConnect[0]?.image,
            }}
          />
        </View>

        <View className="flex-row justify-around ml-3 w-52">
          <View className="flex-col items-center">
            <Text className="text-black text-center font-bold text-xl">
              {userConnect[0]?.followers}
            </Text>
            <Text className="text-black font-bold text-lg">Followers</Text>
          </View>
          <View>
            <Text className="text-black text-center font-bold text-xl">
              {userConnect[0]?.suivies}
            </Text>
            <Text className="text-black font-bold text-lg">Suivi(e)s</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
