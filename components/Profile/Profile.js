import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FavouriteTabView from "./FavouriteTabView";
import TripsTabView from "./TripsTabView";
import EditProfile from "./EditProfile";
import profileStore from "../../stores/profileStore";
import { observer } from "mobx-react";

//Navigation import
const TripsRoute = () => <TripsTabView />;
const FavouriteRoute = () => <TripsTabView />;
const renderScene = SceneMap({
  first: TripsRoute,
  second: FavouriteRoute,
});

function Profile({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Post" },
    { key: "second", title: "Favourite" },
  ]);

  const userProfile = profileStore.profile;

  if (!userProfile)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading ..</Text>
      </View>
    );
  const [user, profile, trips] = profileStore.getUserProfileTrips(userProfile);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <TripsTabView trips={trips} />;
      case "second":
        return (
          <TripsTabView trips={trips.filter(({ favourite }) => favourite)} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={{ marginTop: 60, marginBottom: 30 }}>
        <View style={styles.box}>
          <Image
            style={styles.imageSq}
            source={{
              uri:
                profile.image === ""
                  ? "https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif"
                  : profile.image,
            }}
          />
          <View style={{ paddingLeft: 15 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "hsl(224, 53%, 40%)",
              }}
            >
              {user.Fname + " " + user.Lname}
            </Text>
            <Text style={{ width: 240 }}>{profile.bio}</Text>
            <View style={{ marginTop: 15 }}>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => navigation.navigate("Edit", { user, profile })}
              >
                <Text style={styles.appButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{
            height: 0,
            width: Dimensions.get("window").width,
          }}
          style={styles.container}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: "hsl(224, 53%, 40%)",
                fontWeight: "bold",
              }}
            />
          )}
        />
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 120,
  },
  imageSq: {
    width: 100,
    height: 100,
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
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default observer(Profile);
