import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function TripItem({ item: trip, navigation }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Trip Detail", { id: trip._id })}
      >
        <Image style={styles.cardImage} source={{ uri: trip.image }} />
        <Text style={styles.cardText}>{trip.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardImage: {
    height: 200,
  },
  cardText: {
    position: "absolute",
    color: "white",
    bottom: 15,
    left: 0,
    right: 0,
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
