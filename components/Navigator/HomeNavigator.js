import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home/Home";
import TripDetail from "../shared/TripDetail";
import TripPost from "../TripPost/TripPost";
import UsersProfile from "../Profile/UsersProfile";
import EditProfile from "../Profile/EditProfile";
import Profile from "../Profile/Profile";
import ProfileNavigator from "./ProfileNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Navigator>
      {/* Home icon */}
      <Screen name="Home" component={Home} />
      <Screen
        options={{ headerShown: false }}
        name="Trip Detail"
        component={TripDetail}
      />
      <Screen name="Edit Trip" component={TripPost} />
      <Screen name="UsersProfile" component={UsersProfile} />
      <Screen
        name="MyProfile"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default HomeNavigator;
