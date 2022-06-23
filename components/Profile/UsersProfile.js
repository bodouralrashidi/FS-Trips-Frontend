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
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FavouriteTabView from "./FavouriteTabView";
import TripsTabView from "./TripsTabView";
import EditProfile from "./EditProfile";
import profileStore from "../../stores/profileStore";
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
//Navigation import

function UsersProfile({ navigation, route }) {
  const { userId } = route.params;
  useEffect(() => {
    profileStore.fetchProfile(userId);
  }, []);
  const userProfile = profileStore.profile;
  const [user, profile, trips] = profileStore.getUserProfileTrips(userProfile);
  function renderTrips({ item: trip }) {
    return (
      <TouchableOpacity>
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
            uri:
              profile.image === ""
                ? "https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif"
                : profile.image,
          }}
        />
        <Text
          style={{
            padding: 5,
            fontWeight: "bold",
            fontSize: 20,
            color: "hsl(224, 53%, 40%)",
          }}
        >
          {user.Fname + " " + user.Lname}
        </Text>
        <Text style={{ padding: 5, textAlign: "center" }}>{profile.bio}</Text>
      </View>
      <Text style={styles.postContainer}>Post</Text>

      <View style={styles.box}>
        <FlatList
          data={trips.slice()}
          extraData={trips}
          renderItem={renderTrips}
          numColumns={2}
          columnWrapperStyle={styles.flatListColumns}
          keyExtractor={(item) => item._id}
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
  postContainer: {
    textAlign: "center",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "hsl(224, 53%, 40%)",
    color: "white",
    fontWeight: "bold",
    width: "100%",
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
  center: {
    paddingLeft: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListColumns: {
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default observer(UsersProfile);
