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
  Text,
  FlatList
} from "react-native";
import { TabView, SceneMap,TabBar } from "react-native-tab-view";
import FavouriteTabView from "./FavouriteTabView";
import TripsTabView from "./TripsTabView";
import EditProfile from "./EditProfile";
import profileStore from "../../stores/profileStore";
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
//Navigation import

// profileStore.getUserInfo(authStore.user._id)
// const currentUser = profileStore.CurrentUser
// console.log(currentUser, "profile currentrr usewr")



 function Profile({ navigation , userId}) {
    //add user id  and fetch profile
    useEffect(() => {
        tripStore.fetchtripsUser(authStore.user._id);

      }, []);
      const trips = tripStore.UserTrips;
    function renderTrips({ item: trip }) {
        return (
          <TouchableOpacity
          >
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={{
                  uri: trip.image,
                }}
              />
    
              <View style={styles.textContainer}>
                <Text style={styles.text}>{trip.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
  return (
    <>

      <View style={styles.center}>
      <Image
            style={styles.imageSq}
            source={{
              uri: "http://cdn.cnn.com/cnnnext/dam/assets/180219103122-zanzibar-and-its-islands---mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg"
            }}
          />
         <Text style={{ padding:5,fontWeight:"bold", fontSize: 20, color:  "hsl(224, 53%, 40%)"}}>
            Bodour Alrasidi
          </Text>
          <Text style={{padding:5, textAlign: "center"}}>
           udhadfhaoiwdfhow'iqahd'oawihd'waoihd'awoidhaw'oidhawo'idhwio
          </Text>
      </View>
        <Text style={styles.postContainer}>
  Post
     </Text>

     <View style={styles.box}>
      <FlatList
        data={trips}
        renderItem={renderTrips}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.box}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
 
  scene: {
    flex: 1,
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
  postContainer:
  { textAlign: 'center',
    padding:10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(224, 53%, 40%)",
    color: "white",
    fontWeight: "bold",
    width:"100%",
  },
  box: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    width: 150,
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "70%",
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
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