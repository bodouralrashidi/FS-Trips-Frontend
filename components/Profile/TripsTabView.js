import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

function TripsTabView({ trips }) {
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
  if (trips.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No posts</Text>
      </View>
    );
  return (
    <FlatList
      data={trips.slice()}
      extraData={trips}
      renderItem={renderTrips}
      numColumns={2}
      columnWrapperStyle={styles.flatListColumns}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.box}
    />
  );
}

const styles = StyleSheet.create({
  flatListColumns: {
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
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

export default TripsTabView;
