import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TripPost from "../TripPost/TripPost";

const { Navigator, Screen } = createNativeStackNavigator();

const PostNavigator = () => {
  return (
    <Navigator>
      <Screen name="New Trip" component={TripPost} />
    </Navigator>
  );
};

export default PostNavigator;
