import React from "react";
import { Button, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Profile/Profile";
import EditProfile from "../Profile/EditProfile";
import authStore from "../../stores/authStore";
import UsersProfile from "../Profile/UsersProfile";
const { Navigator, Screen } = createNativeStackNavigator();
import { AntDesign } from "@expo/vector-icons";

const ProfileNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Screen
        name="Edit"
        component={EditProfile}
        options={{
          headerRight: () => (
            <AntDesign
              name="logout"
              size={18}
              color="red"
              onPress={handleLogout}
            />
          ),
        }}
      />
      <Screen name="UsersProfile" component={UsersProfile} />
    </Navigator>
  );
};

const handleLogout = () =>
  Alert.alert("Log out?", "Are you sure you want to log out?", [
    {
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    {
      text: "Log out",
      style: "destructive",
      onPress: () => authStore.signout(),
    },
  ]);

export default ProfileNavigator;
