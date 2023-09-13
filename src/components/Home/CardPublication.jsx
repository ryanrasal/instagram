import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default CardPublication = ({ publication, likePost }) => {
  const cutText = (str) => {
    if (str?.length > 150) {
      return str.slice(0, 150) + "...";
    }
    return str;
  };

  return (
    <View>
      {/* <Button onPress={() => console.warn(publication)} title="button" /> */}
      <View className="flex-row items-center mx-3 mt-6 mb-3 ">
        <Image
          className="rounded-full h-10 w-10 mr-3 "
          source={{
            uri: publication?.userImage,
          }}
        />
        <Text className="text-md font-bold mr-2">
          {publication?.userFirstname}
        </Text>
        <Text className="text-md font-bold ">{publication?.userLastname}</Text>
        <Ionicons
          style={{ marginLeft: "auto" }}
          name="md-ellipsis-vertical-sharp"
          size={24}
          color="black"
        />
      </View>
      <Image
        className="w-full h-48"
        source={{
          uri: `${ADDRESS_BACK_END}/uploads/${publication.imageVideoURL}`,
        }}
      />
      {publication?.nbLikes === 0 ? (
        ""
      ) : publication?.nbLikes === 1 ? (
        <Text className="font-bold text-base ml-2 mt-1">
          {" "}
          {publication?.nbLikes} j'aime
        </Text>
      ) : (
        <Text className="font-bold text-base ml-2 mt-1">
          {" "}
          {publication?.nbLikes} j'aimes
        </Text>
      )}
      <View className="flex-row ml-2 mb-2">
        <Ionicons
          onPress={() => likePost(publication)}
          style={{ marginRight: 20, marginTop: 5 }}
          name="ios-heart-outline"
          size={28}
          color="black"
        />
        <Ionicons
          style={{ marginRight: 20, marginTop: 5 }}
          name="ios-chatbubble-outline"
          size={24}
          color="black"
        />
        <Ionicons
          style={{ marginRight: 20, marginTop: 5 }}
          name="send-outline"
          size={24}
          color="black"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
        }}
      >
        <Text>{cutText(publication?.legende)}</Text>
      </View>
    </View>
  );
};
