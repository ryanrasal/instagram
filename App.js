import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text className="text-red-500">
        Open up App.js to start working on your app
      </Text>
      <View className="bg-red-500 h-60"/>
      <StatusBar style="auto" />
    </View>
  );
}
