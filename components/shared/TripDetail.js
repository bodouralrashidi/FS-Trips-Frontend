import { Container } from "@draftbit/ui";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import authStore from "./../../stores/authStore";
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import tripStore from "../../stores/tripStore";
import { Feather } from "@expo/vector-icons";
import { AlertDialog,Menu,Box,Pressable,HamburgerIcon,Avatar} from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
function TripDetail({ route, navigation }) {
  const { id } = route.params;
  tripStore.setSingleTripWithId(id);
  const trip = tripStore.singleTrip ?? tripStore.emptyTrip;

  const handleDelete = async () => {
    await tripStore.deleteTrip(id);
    navigation.popToTop();
  };
  
  const Hamburger=(
  <Box style={styles.editbutton}>
  <Menu w="190" trigger={triggerProps => {
  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
          <Image style={styles.edit} source={ require("./../../assets/outline/edit.png")}/>
        </Pressable>;}}>
    <Menu.Item onPress={() => {navigation.navigate("Edit Trip", { id })}}>Edit</Menu.Item>
    <Menu.Item onPress={handleDelete} >Delete</Menu.Item>
  </Menu>
</Box>)
 let deleteButton;
  if(authStore.user._id === trip.userId)deleteButton =  Hamburger
  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip.title
    });
  }, [trip.title]);

  if (!trip) return <Text>Loading</Text>;

  return (
    <View style={styles.container}>
      {deleteButton}
      {/* <TouchableOpacity onPress={() => {navigation.navigate("Edit Trip", { id })}} style={styles.editbutton}>
          <Image style={styles.edit} source={ require("./../../assets/outline/edit.png")}/>
    </TouchableOpacity> */}
      <Image
        style={styles.tripImage}
        source={{
          uri:`${trip.image}`,
        }}
      />
  <View style={styles.containerSecond}>
    <View style={styles.titleContener}>
    <Image style={styles.pin} source={ require("./../../assets/outline/pin.png")}/>
      <Text style={styles.title}>
        {trip.location}
      </Text>
      <View style={{flexGrow:1}}></View>
      <Image style={styles.star} source={ require("./../../assets/outline/star.png")}/>
      </View>
      {/* <Text style={styles.location}>Paris, France</Text> */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 800}}>
      <Text style={styles.para}>{trip.description}</Text>
      </ScrollView>
      <StatusBar style="auto" />
      </View>
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
  buttonn: {
    alignItems: "center",
    justifyContent: "center",
  },
  tripImage: {
    position: "relative",
    top: 0,
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 23,
    padding: 10,
    paddingLeft: 2,
    textTransform: "capitalize",
  },
  location: {
    marginTop: -5,
    fontSize: 12,
    paddingLeft: 10,
    color: "#333",
  },
  star: {
    width: 40,
    height: 40,
    tintColor: "hsl(50,100%,48%)",
  },
  para: {
    padding: 10,
    fontSize: 18,
    fontWeight: "300",
    color: "#333",
  },
  appButtonContainer: {
    position: "relative",
    top: 100,
    elevation: 8,
    // backgroundColor: "#97e5f1",
    backgroundColor: "red",
    borderRadius: 100,
    paddingVertical: 15,
    width: 180,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  editbutton:{
    position:'absolute',
    top:60,
    right: 20,
    zIndex:1,
  },
  edit:{
    width:24,
    height:24,
    ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,    
      },
      android: {
          elevation: 5,
      },
      }),
  },
  pin:{
    tintColor:"red",
    width:24,
    height:24,
  },
  titleContener:{
    flexDirection:"row",
    alignItems:"center",
  },
  containerSecond:{
    padding:10,
  }
});

export default observer(TripDetail);
