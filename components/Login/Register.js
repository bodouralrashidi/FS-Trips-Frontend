import * as React from "react";
import { useState } from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Image,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import authStore from "./../../stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

function Register({ navigation }) {
  const toast = useToast();
  const [user, setUser] = useState({
    username: "",
    password: "",
    Fname: "",
    Lname: "",
  });
  let icon
  const checker = authStore.Users.map((users)=> users.username).some(username => username.toLowerCase() === user.username.toLowerCase());
  const handleSubmit = async () => {
    if ((!user.username) || (!user.password) || (!user.Fname)|| (!user.Lname)) {
      toast.show({
        description: "Check Your Inputs 😊 "
      })
    }else{
      await authStore.signup(user);
    }

  };
  if (checker === true ) {
    icon =  <Ionicons style={styles.checker} name="close-circle-outline" size={32} color="red" />
  } else if(checker === false && !user.username) {
     icon = null
  }else if(checker === false ){
    icon = <Ionicons style={styles.checker} name="md-checkmark-circle" size={32} color="green" />
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.GetAway}>GetAway</Text>
          <TextInput
            placeholder="First Name"
            name="Fname"
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={(Fname) => setUser({ ...user, Fname })}
          />
          <TextInput
            placeholder="Last Name"
            name="Lname"
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={(Lname) => setUser({ ...user, Lname })}
          />
          <View style={styles.usernameContainer}>

          <TextInput
            placeholder="Username"
            name="username"
            placeholderTextColor="#fff"
            style={{...styles.input, marginBottom: 0,
              marginTop: 0, width:"100%"}}
            onChangeText={(username) => setUser({ ...user, username })}
            />
            {icon}
            </View>
          <TextInput
            placeholder="Password"
            name="password"
            placeholderTextColor="#fff"
            onChangeText={(password) => setUser({ ...user, password })}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Register</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
      <Image
            style={styles.gitImage}
            source={require("./../../assets/Welcome/XTEC.gif")}
          />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#9ef1fe",
    width: "100%",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 15,
    width: 180,
    marginTop: 50,
  },
  gitImage: {
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    position:"absolute",
    bottom:0,
    height: 190,
    resizeMode: "stretch",
  },
  appButtonText: {
    fontSize: 16,
    color: "#9ef3ff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  input: {
    width: "80%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#fff",
    marginBottom: -30,
    marginTop: 50,
  },
  GOback: {
    fontSize: 12,
    color: "#9ef3ff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  backButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 10,
    width: 60,
    marginTop: 20,
    position: "absolute",
    right: "80%",
  },
  GetAway: {
    position: "relative",
    marginTop: 90,
    fontSize: 30,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  usernameContainer:{
    position: "relative",
    marginBottom: -30,
    marginTop: 50,
    width: "80%",
    height: 44,
  },
  checker:{
    position:"absolute",
    top: 5,
    right:5,
  }
});
export default observer(Register);
