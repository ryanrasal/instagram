import React from "react";
import { Text, View, Button } from "react-native";
import { useUserContext } from "../services/UserContext";
import { useLoginContext } from "../services/LoginContext";

export default function Profil({ navigation }) {
  const { userConnect } = useUserContext();
  const { isSignedIn } = useLoginContext();

  return (
    <View>
      <Text>coucou</Text>
      <Button title="Aller vers Settings" onPress={() => console.log(userConnect)} />
    </View>
  );
}
