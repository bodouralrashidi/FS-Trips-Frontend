import { observer } from "mobx-react";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./components/Navigator/AuthNavigator";
import RootNavigator from "./components/Navigator/RootNavigator";
import authStore from "./stores/authStore";

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {authStore.user ? <RootNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default observer(App);
