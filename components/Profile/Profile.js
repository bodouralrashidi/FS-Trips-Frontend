import * as React from "react";
import { Screen } from "native-base";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import { TabView, SceneMap,TabBar } from "react-native-tab-view";
import FavouriteTabView from "./FavouriteTabView";
import TripsTabView from "./TripsTabView";
import EditProfile from "./EditProfile";
import profileStore from "../../stores/profileStore";
import authStore from "../../stores/authStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
//Navigation import

const TripsRoute = () => <TripsTabView />;
const FavouriteRoute = () => <FavouriteTabView />;
const initialLayout = { width: Dimensions.get("window").width };
const renderScene = SceneMap({
  first: TripsRoute,
  second: FavouriteRoute,
});

 function Profile({ navigation }) {
  profileStore.getUserInfo(authStore.user._id)
const currentUser =  profileStore.CurrentUser
const currentUserProfile = currentUser["profile"]
// console.log(currentUserProfile["image"], "profile currentrr usewr/////////////")
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Post" },
    { key: "second", title: "Favourite" },
  ]);

  return (
    <>
      <View style={styles.box}>
      <Image
            style={styles.imageSq}
            source={{
              uri:( currentUserProfile["image"] === "" ? "https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif" : currentUserProfile["image"])
            }}
          />
          <View style={{padding:20, width: "80%"}}>
         <Text style={{padding:5, fontWeight:"bold", fontSize: 20, color:  "hsl(224, 53%, 40%)"}}>
          {currentUser["Fname"] +" "+ currentUser["Lname"]}
          </Text>
          <Text style={{padding:5}}>
          {currentUserProfile["bio"]}
          </Text>
          </View>
      </View>
      <View  style={styles.center}>
      <TouchableOpacity  style={styles.appButtonContainer}  onPress={() => navigation.navigate("Edit")}>
          <Text
            style={styles.appButtonText}
          >Edit Profile</Text>
        </TouchableOpacity>
        </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={props => <TabBar {...props}  style={{backgroundColor:   "hsl(224, 53%, 40%)" , fontWeight: "bold" } }/>} 
       
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    
  },
  scene: {
    flex: 1,
  },
  box: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: 10,
    flexWrap: "wrap",
    height: 120,
  },
  imageSq: {
    width: 100,
    height: 100,
    marginTop: 24,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "hsl(224, 53%, 40%)",
  },
  appButtonContainer: {
    backgroundColor: "#97e5f1",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginBottom: 5,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  center :
  {
    paddingLeft: 30,
    padding:10,
    alignItems: "center",
    justifyContent: "center",
  }
  
});

export default observer(Profile);