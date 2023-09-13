import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserContext } from "../services/UserContext";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

export default PostPublication = ({ navigation }) => {
  const { userConnect, setReloadPublication, reloadPublication } =
    useUserContext();
  const [image, setImage] = React.useState(null);
  const [dataPublication, setDataPublication] = React.useState({
    user_id: userConnect[0]?.id,
    legende: "",
    DatePublication: "2023-09-05",
    imageVideoURL: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("je suis le console de lupload", result.assets[0].uri);
    }
  };

  const handleChangeLegende = (text) => {
    setDataPublication({ ...dataPublication, legende: text });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    const publication = JSON.stringify(dataPublication);
    const formData = new FormData();

    formData.append("publication", publication);
    if (image) {
      formData.append("picture", {
        uri: image,
        name: image,
        type: "image/jpeg",
      });
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
    };
    myHeaders.append("Content-Type", "multipart/form-data");

    fetch(`${ADDRESS_BACK_END}/publications`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        setReloadPublication(!reloadPublication);
        setImage(null);
      })
      .then(() => {
        navigation.navigate("Accueil");
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  return (
    <View className="mt-10">
      <Text className="text-center font-bold text-lg">
        Ajouter une nouvelle publication
      </Text>
      <View className="flex-row items-center mx-3 mt-6 mb-3 ">
        <Image
          className="rounded-full h-10 w-10 mr-3 "
          source={{
            uri: userConnect[0]?.image,
          }}
        />
        <Text className="text-md font-bold mr-2">
          {userConnect[0]?.firstname}
        </Text>
        <Text className="text-md font-bold ">{userConnect[0]?.lastname}</Text>
        <Ionicons
          style={{ marginLeft: "auto" }}
          name="md-ellipsis-vertical-sharp"
          size={24}
          color="black"
        />
      </View>
      {!image && (
        <TouchableOpacity
          onPress={pickImage}
          className="w-full items-center flex-row justify-center bg-gray-400 h-48"
        >
          <Text className="text-white font-bold text-lg ">
            Cliquez pour télécharger une photo
          </Text>
        </TouchableOpacity>
      )}
      {image && (
        <View className="relative">
          <Image className="w-full h-48" source={{ uri: image }} />
          <Ionicons
            onPress={() => setImage(null)}
            style={{ marginLeft: "auto", position: "absolute", right: 5 }}
            name="close"
            size={45}
            color="red"
          />
        </View>
      )}
      <TextInput
        className="p-4 mt-1 mx-4 rounded-lg border h-auto"
        placeholder={"Description"}
        multiline={true}
        onChangeText={(text) => handleChangeLegende(text)}
      />

      <TouchableOpacity
        style={{
          padding: 10,
          marginTop: 30,
          borderRadius: 10,
          backgroundColor: "white",
          width: 200,
          marginRight: "auto",
          marginLeft: "auto",
        }}
        onPress={onSubmit}
      >
        <Text style={{ textAlign: "center" }}>Poster la Publication</Text>
      </TouchableOpacity>
    </View>
  );
};
