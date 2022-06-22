import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect } from "react";
import profileStore from "../../stores/profileStore";
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

function TripsTabView() {
  useEffect(() => {
    tripStore.fetchtripsUser(authStore.user._id);
  }, []);

  const trips = tripStore.UserTrips;

  const text = "island";
  function renderTrips({ item: trip }) {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
        }}
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

  ("http://cdn.cnn.com/cnnnext/dam/assets/180219103122-zanzibar-and-its-islands---mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg");
  return (
    <View style={styles.box}>
      <FlatList
        data={trips}
        renderItem={renderTrips}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default observer(TripsTabView);
