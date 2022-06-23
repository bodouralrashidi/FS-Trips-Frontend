import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home/Home";
import TripDetail from "../shared/TripDetail";
import TripPost from "../TripPost/TripPost";
import UsersProfile from "../Profile/UsersProfile";

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Navigator>
      {/* Home icon */}
      <Screen name="Home" component={Home} />
      <Screen options={{headerShown:false}} name="Trip Detail" component={TripDetail} />
      <Screen name="Edit Trip" component={TripPost} />
      <Screen name="UsersProfile" component={UsersProfile} />

    </Navigator>
  );
};

export default HomeNavigator;
