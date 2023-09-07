import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default CardPublication = ({ publication }) => {
  const [isLike, setIsLike] = React.useState(true);

  const toggleHeart = () => {
    setIsLike(!isLike);
  };

  const cutText = (str) => {
    if (str.length > 150) {
      return str.slice(0, 150) + "...";
    }
    return str;
  };

  return (
    <View>
      <View className="flex-row items-center mx-3 mt-6 mb-3 ">
        <Image
          className="rounded-full h-10 w-10 mr-3 "
          source={publication.image}
        />
        <Text>{publication.pseudo}</Text>
        <Ionicons
          style={{ marginLeft: "auto" }}
          name="md-ellipsis-vertical-sharp"
          size={24}
          color="black"
        />
      </View>
      <Image className="w-full h-48" source={publication.imageVideoURL} />
      <View className="flex-row ml-2 my-2">
        <TouchableOpacity onPress={toggleHeart}>
          {isLike ? (
            <Ionicons
              style={{ marginRight: 20, marginTop: 10 }}
              name="ios-heart-outline"
              size={28}
              color="black"
            />
          ) : (
            <Ionicons
              style={{ marginRight: 20, marginTop: 10 }}
              name="heart"
              size={28}
              color="red"
            />
          )}
        </TouchableOpacity>
        <Ionicons
          style={{ marginRight: 20, marginTop: 10 }}
          name="ios-chatbubble-outline"
          size={24}
          color="black"
        />
        <Ionicons
          style={{ marginRight: 20, marginTop: 10 }}
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
