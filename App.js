import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ToastAndroid, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import NavLogin from './components/Login/index'
import Post from './components/Post/Post'
import authStore from './stores/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  const Tab = createBottomTabNavigator();
  let isSignedIn = authStore.user
  // const checkForToken = async () => {
  //   isSignedIn = await AsyncStorage.getItem('myToken')
  // };
  // checkForToken()

  return (
    <NativeBaseProvider>
    <NavigationContainer>
     <Tab.Navigator initialRouteName="NavLogin" screenOptions={{ "tabBarShowLabel": false, "tabBarStyle": [{"display": "flex"},null] }}>
      
      {/* NavLogin */}
      <Tab.Screen name="Welcome" options={{ headerShown: false, tabBarStyle: { display: "none" },tabBarButton: () => null, tabBarVisible: false}} component={NavLogin} />
     
      {/* headerLeft: () => <Button title="back home" onPress={() => navigation.goBack()} />, */}
      {/* Login */}
      <Tab.Screen name="Login" options={{ headerShown: false, tabBarStyle: { display: "none" },tabBarButton: () => null, tabBarVisible: false}} component={Login} />
      
      {/* Register */}
      <Tab.Screen name="Register" options={{ headerShown: false, tabBarStyle: { display: "none" },tabBarButton: () => null, tabBarVisible: false}} component={Register} />
     
      {/* Home icon */}
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({size,focused,color}) => { return ( <Image style={{ width: 30, height: 30, tintColor: "gray",}} source={ require("./assets/outline/home.png")}/>);}, }} />
      
      {/* Post icon */}
      {Platform.OS === 'ios' ? <Tab.Screen options={{ tabBarIcon: ({ color }) => ( <View style={styles.tabBarIcon}>
      <Image source={ require("./assets/outline/location-med.png")} resizeMode="contain" style={styles.imageicon}/></View> ),}} name="Post" component={Post} /> : <Tab.Screen name="Post" component={Post} options={{ tabBarIcon: ({size,focused,color}) => { return ( <Image style={{ width: 30, height: 30, tintColor: "#9ef1fe",}} source={ require("./assets/outline/location-med.png")}/>);}, }} />}
      

      {/* Profile icon */}
      <Tab.Screen name="Profile" component={Profile} options={{ headerLeft: () => <Button title="Sign Out" onPress={() => navigation.goBack()} />, tabBarIcon: ({size,focused,color}) => { return ( <Image style={{ width: 30, height: 30, tintColor: "gray",}} source={ require("./assets/outline/user.png")}/>);}, }} />
     
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
    backgroundColor: "#9ef1fe",
    paddingTop: 5,
  },
  imageicon:{
    width:43,
    height:43,
    tintColor:"white",
  },
});
