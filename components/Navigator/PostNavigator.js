import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "../Post/Post";

const { Navigator, Screen } = createNativeStackNavigator();

const PostNavigator = () => {
  return (
    <Navigator>
      <Screen name="Post" component={Post} />
    </Navigator>
  );
};

export default PostNavigator;
