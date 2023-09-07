import { ScrollView, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Stories = ({ publications, navigation }) => {
  return (
    <ScrollView horizontal={true} className="mt-10 mx-2">
      {publications.map((publication) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          key={publication.id}
          className="items-center"
        >
          <Image
            className="h-14 w-14 mx-2 rounded-full"
            source={publication.image}
          />
          <Text>{publication.pseudo}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Stories;
