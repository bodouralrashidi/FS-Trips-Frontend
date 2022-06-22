import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Login/Login";
import NavLogin from "../Login/index";
import Register from "../Login/Register";
const { Navigator, Screen } = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/* NavLogin */}
      <Screen name="Welcome" component={NavLogin} />
      {/* Login */}
      <Screen name="Login" component={Login} />
      {/* Register */}
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};

export default AuthNavigator;
