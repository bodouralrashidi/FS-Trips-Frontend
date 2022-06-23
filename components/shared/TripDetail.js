import { Container } from "@draftbit/ui";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import authStore from "./../../stores/authStore";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tripStore from "../../stores/tripStore";
import { Feather } from "@expo/vector-icons";
import {
  AlertDialog,
  Menu,
  Box,
  Pressable,
  HamburgerIcon,
  Avatar,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import geolocation from "./../../geolocation";
import Marker from "react-native-maps";
function TripDetail({ route, navigation }) {
  const { id } = route.params;
  tripStore.setSingleTripWithId(id);

  //Get geolocation from json
  const geolocationMap = geolocation.find(
    (country) => country.name == "Kuwait"
  );

  const trip = tripStore.singleTrip ?? tripStore.emptyTrip;

  //Handle User fname lname
  let Fname;
  let Lname;
  if (!trip.userId) {
    Fname = "";
    Lname = "";
  } else {
    const findUser = authStore.Users.find(
      (userss) => trip.userId == userss._id
    );
    Fname = findUser.Fname;
    Lname = findUser.Lname;
  }

  const handleDelete = async () => {
    await tripStore.deleteTrip(id);
    navigation.popToTop();
  };

  //Hamburger Icon
  const Hamburger = (
    <Box style={styles.editbutton}>
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="More options menu" {...triggerProps}>
              <Image
                style={styles.edit}
                source={require("./../../assets/outline/edit.png")}
              />
            </Pressable>
          );
        }}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate("Edit Trip", { id });
          }}
        >
          Edit
        </Menu.Item>
        <Menu.Item onPress={handleDelete}>Delete</Menu.Item>
      </Menu>
    </Box>
  );

  //handel user delete
  let deleteButton;
  if (authStore.user._id === trip.userId) deleteButton = Hamburger;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip.title,
    });
  }, [trip.title]);

  if (!trip) return <Text>Loading</Text>;
  return (
    <View style={styles.container}>
      {/* Find User Button */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UsersProfile", { userId: trip.userId });
        }}
        style={styles.informationContainer}
      >
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require("./../../assets/outline/user.png")}
          />
        </View>
        <Text style={styles.usernamePost}>{`${Fname} ${Lname}`}</Text>
      </TouchableOpacity>
      {/* Delete button */}
      {deleteButton}

      <Image style={styles.tripImage} source={{ uri: `${trip.image}` }} />
      <View style={styles.containerSecond}>
        <View style={styles.titleContener}>
          <Image
            style={styles.pin}
            source={require("./../../assets/outline/pin.png")}
          />
          <Text style={styles.title}>{trip.location}</Text>
          <View style={{ flexGrow: 1 }}></View>
          <Image
            style={styles.star}
            source={require("./../../assets/outline/star.png")}
          />
        </View>
        {/* <Text style={styles.location}>Paris, France</Text> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 800 }}
        >
          <Text style={styles.para}>{trip.description}</Text>

          <View style={styles.titleContener}>
            <Image
              style={styles.mapIcon}
              source={require("./../../assets/outline/map.png")}
            />
            <Text style={styles.title}>Map: </Text>
          </View>
          <View style={styles.containermap}>
            <Marker
              style={styles.map}
              initialRegion={{
                latitude: geolocationMap.latitude,
                longitude: geolocationMap.longitude,
                latitudeDelta: 3.1,
                longitudeDelta: 0.005,
              }}
            />
          </View>
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
  editbutton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
  edit: {
    width: 24,
    height: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pin: {
    tintColor: "red",
    width: 24,
    height: 24,
  },
  mapIcon: {
    tintColor: "black",
    width: 24,
    height: 24,
  },
  titleContener: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerSecond: {
    padding: 10,
  },
  avatar: {
    tintColor: "white",
    width: 30,
    height: 30,
    // transform: [{ rotate: '90deg'}]
    // top:80,
    // left: 20,
    // zIndex:1,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  informationContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 250,
    left: 20,
    width: 180,
    zIndex: 1,
    borderRadius: 50,
  },
  usernamePost: {
    color: "black",
    position: "absolute",
    padding: 10,
    paddingLeft: 45,
    width: 200,
    fontWeight: "300",
  },
  containermap: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    borderRadius: 10,
    height: 250,
  },
});

export default observer(TripDetail);
