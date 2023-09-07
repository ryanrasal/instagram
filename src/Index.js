import React, { useEffect } from "react";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLoginContext } from "./services/LoginContext";
import Profil from "./screens/Profil";
import Settings from "./components/Profil/Settings";
import LogoutButton from "./components/LogoutButton";

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
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person-sharp" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Logout" component={LogoutButton} />
      {/* Ajoutez le bouton de déconnexion ici */}
    </Tab.Navigator>
  );
}
