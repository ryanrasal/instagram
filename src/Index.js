import React, { useEffect, useState } from "react";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLoginContext } from "./services/LoginContext";
import Profil from "./screens/Profil";
import Settings from "./components/Profil/HeaderProfil";
import LogoutButton from "./components/LogoutButton";
import MyProfil from "./screens/MyProfil";
import PostPublication from "./screens/PostPublication";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Notification from "./screens/Notification";
import { Badge } from "react-native-elements";
import { useUserContext } from "./services/UserContext";

const ADDRESS_BACK_END = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NotificationBadge({ count }) {
  if (count > 0) {
    return (
      <Badge
        value={count.toString()}
        status="error"
        containerStyle={{ position: "absolute", top: 2, right: 4 }}
      />
    );
  }
  return null;
}

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
  const { userConnect } = useUserContext();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchFriendsRequest = async () => {
      try {
        const response = await fetch(
          `${ADDRESS_BACK_END}/friendship?friend_id=${userConnect[0]?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          setNotificationCount(data.length);
        } else {
          console.log("Échec de la connexion");
        }
      } catch (error) {
        console.error("Erreur de connexion:", error);
      }
    };
    fetchFriendsRequest();
  }, [userConnect, notificationCount]);

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
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <MaterialCommunityIcons name="bell" size={size} color={color} />
              <NotificationBadge count={notificationCount} />
            </>
          ),
        }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen name="Deconnexion" component={LogoutButton} />
    </Tab.Navigator>
  );
}
