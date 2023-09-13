import { TouchableOpacity, Image } from "react-native";
import React from "react";

export default PublicationProfil = ({ publication }) => {
  return (
    <TouchableOpacity onPress={() => console.log(publication.id)} className="m-1">
      <Image
        className="h-28 w-28 "
        source={{
          uri: publication.imageVideoURL,
        }}
      />
    </TouchableOpacity>
  );
};
