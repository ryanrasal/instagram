import { TouchableOpacity, Image } from "react-native";
import React from "react";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;


export default PublicationMyProfil = ({ publication }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log(publication.id)}
      className="m-1"
    >
      <Image
        className="h-28 w-28 "
        source={{
          uri: `${ADDRESS_BACK_END}/uploads/${publication.imageVideoURL}`,
        }}
      />
    </TouchableOpacity>
  );
};
