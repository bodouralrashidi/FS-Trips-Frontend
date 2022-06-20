import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, TextInput, Text, View, Button} from 'react-native';
import authStore from './../../stores/authStore'

function Login({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async () => {
    await authStore.signin(user);
    if (authStore.user) navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        name="username"
        style={styles.input}
        onChangeText={(username) => setUser({ ...user, username })}
      />
      <TextInput
        placeholder="Password"
        name="password"
        onChangeText={(password) => setUser({ ...user, password })}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: "80%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop:50,
  },
});
export default Login