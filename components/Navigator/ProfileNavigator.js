import React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Profile/Profile";
import EditProfile from "../Profile/EditProfile";
import authStore from "../../stores/authStore";
const { Navigator, Screen } = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Navigator>
      <Screen
        name="Profile"
        component={EditProfile}
        options={{
          headerLeft: () => (
            <Button title="Sign Out" onPress={() => authStore.signout()} />
          ),
        }}
      />
      <Screen name="Edit" component={EditProfile} />
    </Navigator>
  );
};

export default ProfileNavigator;
