import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home/Home";

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Navigator>
      {/* Home icon */}
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default HomeNavigator;
