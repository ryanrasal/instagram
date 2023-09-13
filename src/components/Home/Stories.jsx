import { ScrollView, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Stories = ({ otherUsers, navigateToProfil }) => {
  return (
    <ScrollView horizontal={true} className="mt-10 h-32 mx-2 fixed top-0">
      {otherUsers.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => navigateToProfil(user.id)}
          className="flex-col mx-3"
        >
          <Image
            className="h-20 w-20 rounded-full"
            source={{
              uri: user.image,
            }}
          />
          <Text className="text-black text-center">{user.pseudo}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stories;
