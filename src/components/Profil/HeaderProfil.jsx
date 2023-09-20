import React from "react";
import { View, Text, Image } from "react-native";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default HeaderProfil = ({ user, navigation: { goBack } }) => {
  return (
    <View>
      <View className="flex-row items-center">
        <View className="flex-col items-center">
          <Text className="text-black font-bold text-xl  ml-4 mb-2 ">
            {user?.pseudo}
          </Text>
          <Image
            className="h-24 w-24 rounded-full ml-4"
            source={{
              uri: `${ADDRESS_BACK_END}/uploads/${user?.image}`,
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
