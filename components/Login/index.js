import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Button, Image} from 'react-native';
function NavLogin({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.GetAway}>GetAway</Text>
      <Image style={styles.welocmeImage} source={ require("./../../assets/Welcome/Welcomepage.png")}/>
      {/* <Image style={styles.welocmeImage} source={ require("./../../assets/Welcome/D5Ui.gif")}/> */}
      <TouchableOpacity onPress={()=>(navigation.navigate('Login'))} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Login</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>(navigation.navigate('Register'))} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Register</Text>
    </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // color:"#2EC4B6"
  },
  welocmeImage:{ 
    marginTop:130,
    marginBottom:150,
    resizeMode: 'stretch',
    width: "80%", 
    height: "30%",
},
appButtonContainer: {
    elevation: 8,
    backgroundColor: "#9ef1fe",
    borderRadius: 100,
    paddingVertical: 10,
    width:300,
    marginBottom:5,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  GetAway:{
    position:"absolute",
    top:100,
    fontSize: 30,
    color:"#9ef1fe",
    textTransform: "uppercase",
    fontWeight: "bold",
  }
});
export default NavLogin