import { Container } from '@draftbit/ui';
import { StatusBar } from 'expo-status-bar';
import { Center } from 'native-base';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
export default function Post() {
  return (
    
    <View style={styles.container}>
    <Image style={styles.edit} source={ require("./../../assets/outline/edit.png")}/>
    <Image style={styles.tripImage} source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"}}/>
    <Image style={styles.star} source={ require("./../../assets/outline/star.png")}/>
    <Text style={styles.title}>paris</Text>
    <Text style={styles.location}>Paris, France</Text>
    <Text style={styles.para}>When building a cross-platform app, you'll want to re-use as much code as possible. Scenarios may arise where it makes sense for the code to be different, for example you may want to implement separate visual components for Android and iOS.</Text>
    <StatusBar style="auto" />
    <Container style={styles.buttonn}>
    <TouchableOpacity  style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Want to go</Text>
    </TouchableOpacity>
    </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonn:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripImage:{
    position:"relative",
    top:0,
    width:"100%",
    height:300,
  },
  title:{
    fontSize:23,
    padding:10,
    textTransform: 'capitalize'
  },
  location:{
    marginTop:-5,
    fontSize:12,
    paddingLeft:10,
    color:"#333",
  },
  edit:{
    position:'absolute',
    top:50,
    right: 15,
    width:30,
    height:30,
    zIndex:1,
  },
  star:{
    position:'absolute',
    top:310,
    right: 15,
    width:40,
    height:40,
    tintColor:'hsl(50,100%,48%)',
    zIndex:1,
  },
  para:{
    padding:10,
    fontSize:18,
    fontWeight:"300",
    color:"#333",
  },
  appButtonContainer: {
    position:"relative",
    top:100,
    elevation: 8,
    backgroundColor: "#97e5f1",
    borderRadius: 100,
    paddingVertical: 15,
    width:180,

  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
