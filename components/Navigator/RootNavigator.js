import { StyleSheet, View, Image, Button, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from "../Post/Post";
import React from "react";
import ProfileNavigator from "./ProfileNavigator";
import HomeNavigator from "./HomeNavigator";
import PostNavigator from "./PostNavigator";

const { Navigator, Screen } = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
        headerShown: false,
      }}
    >
      {/* Home */}
      <Screen
        name="Home Navigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: 30, height: 30, tintColor: "gray" }}
                source={require("../../assets/outline/home.png")}
              />
            );
          },
        }}
      />

      {/* Post */}
      <Screen
        options={
          Platform.OS === "ios"
            ? {
                tabBarIcon: ({ color }) => (
                  <View style={styles.tabBarIcon}>
                    <Image
                      source={require("../../assets/outline/location-med.png")}
                      resizeMode="contain"
                      style={styles.imageicon}
                    />
                  </View>
                ),
              }
            : {
                tabBarIcon: ({ size, focused, color }) => {
                  return (
                    <Image
                      style={{ width: 30, height: 30, tintColor: "#9ef1fe" }}
                      source={require("../../assets/outline/location-med.png")}
                    />
                  );
                },
              }
        }
        name="Post Navigator"
        component={PostNavigator}
      />

      {/* Profile */}
      <Screen
        name="Profile Navigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: 30, height: 30, tintColor: "gray" }}
                source={require("../../assets/outline/user.png")}
              />
            );
          },
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIcon: {
    marginTop: 0,
    height: 60,
    width: 60,
    justifyContent: "top",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#9ef1fe",
    paddingTop: 5,
  },
  imageicon: {
    width: 43,
    height: 43,
    tintColor: "white",
  },
});

export default RootNavigator;
