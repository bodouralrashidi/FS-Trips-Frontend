import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavigationContainer, Nav } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import authStore from "./stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider } from "native-base";
import EditProfile from "./components/Profile/EditProfile";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
export default function App() {
  const Tab = createBottomTabNavigator();

  let isSignedIn = authStore.user;

  // const checkForToken = async () => {
  //   isSignedIn = await AsyncStorage.getItem('myToken')
  // };
  // checkForToken()

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: [{ display: "flex" }, null],
          }}
        >
          {/* Login */}
          <Tab.Screen
            name="Login"
            options={{
              tabBarStyle: { display: "none" },
              tabBarButton: () => null,
              tabBarVisible: false,
            }}
            component={Login}
          />

          {/* Home icon */}
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: 30, height: 30, tintColor: "gray" }}
                    source={require("./assets/outline/home.png")}
                  />
                );
              },
            }}
          />

          {/* Post icon */}
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.tabBarIcon}>
                  <Image
                    source={require("./assets/outline/location-med.png")}
                    resizeMode="contain"
                    style={styles.imageicon}
                  />
                </View>
              ),
            }}
            name="Post"
            component={Post}
          />
          {/* <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: ({size,focused,color}) => { return ( <Image style={{ width: 30, height: 30, tintColor: "gray",}} source={ require("./assets/outline/user.png")}/>);}, }} /> */}

          {/* Profile icon */}
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ size, focused, color }) => {
                return (
                  <Image
                    style={{ width: 30, height: 30, tintColor: "gray" }}
                    source={require("./assets/outline/user.png")}
                  />
                );
              },
            }}
          />
          <Screen
            name="EditProfile"
            component={EditProfile}
            options={({ navigation }) => ({
              tabBarStyle: { display: "none" },
              tabBarButton: () => null,
              tabBarVisible: false,
              headerLeft: () => (
                <Button
                  title="<"
                  onPress={() => navigation.navigate("Profile")}
                />
              ),
            })}
          />

          {/* Profile icon */}
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

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
    backgroundColor: "#FE6D64",
    paddingTop: 5,
  },
  imageicon: {
    width: 43,
    height: 43,
    tintColor: "white",
  },
});
