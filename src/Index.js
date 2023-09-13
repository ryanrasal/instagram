import React, { useEffect } from "react";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLoginContext } from "./services/LoginContext";
import Profil from "./screens/Profil";
import Settings from "./components/Profil/HeaderProfil";
import LogoutButton from "./components/LogoutButton";
import MyProfil from "./screens/MyProfil";
import PostPublication from "./screens/PostPublication";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Index() {
  const { isSignedIn } = useLoginContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        {isSignedIn ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Accueil: "home",
            "Mon Profil": "account",
            Deconnexion: "logout",
            Publier: "plus-circle",
          };
          const iconName = iconMap[route.name] || "home";

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Accueil" component={Home} />
      <Tab.Screen name="Mon Profil" component={MyProfil} />
      <Tab.Screen name="Publier" component={PostPublication} />
      <Tab.Screen name="Deconnexion" component={LogoutButton} />
    </Tab.Navigator>
  );
}
