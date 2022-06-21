import * as React from 'react';
import { observer } from 'mobx-react';
import {useState} from 'react';
import { StyleSheet,TouchableOpacity, TextInput, Text, View, Button,Image, Platform, TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard} from 'react-native';
import authStore from './../../stores/authStore'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  
  const handleSubmit = async () => {
    await authStore.signin(user);
    const token = await AsyncStorage.getItem('myToken')
    if (token) navigation.navigate('Home');
    
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButtonContainer} onPress={()=>(navigation.goBack())} >
        <Text style={styles.GOback} >Back</Text>
    </TouchableOpacity>
    <Image style={styles.Image} source={ require("./../../assets/Welcome/login.gif")}/>
    <Text style={styles.WelcomeText}><Text  style={{fontWeight:"100"}}>Welcome</Text> Back!</Text>
      <TextInput
        placeholder="Username"
        name="username"
        placeholderTextColor="#5f6368"
        style={styles.input}
        onChangeText={(username) => setUser({ ...user, username })}
      />
      <TextInput
        placeholder="Password"
        name="password"
        placeholderTextColor="#5f6368"
        onChangeText={(password) => setUser({ ...user, password })}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>(navigation.navigate('Register'))}>
        <Text style={styles.registerText}>Haven't Registerd yet, Join Now</Text>
    </TouchableOpacity>
       
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    alignItems: 'center',
    backgroundColor: '#fff',
    width:"100%",
    height: "100%"
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#97e5f1",
    borderRadius: 100,
    paddingVertical: 15,
    width:180,
    marginTop:50,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  input: {
    width: "80%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius:20,
    borderColor: '#5f6368',
    marginBottom: -30,
    marginTop:50,
  },
  Image:{ 
    position:"absolute",
    marginTop:100,
    marginBottom:10,
    resizeMode: 'contain',
    width: "70%", 
    height: "30%",
},
WelcomeText:{
  fontSize: 25,
  marginTop:220,
  color: "#5f6368",
  fontWeight: "bold",
  alignSelf: "center",
},
GOback:{
  fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
},  
backButtonContainer:{
  elevation: 8,
  backgroundColor: "#97e5f1",
  borderRadius: 15,
  paddingVertical: 10,
  width:60,
  marginTop:20,
  position:"absolute",
  right:"80%",
},
registerText:{
  color: "#5f6368",
  position: "relative",
  bottom: -150,
},
});
export default observer(Login)