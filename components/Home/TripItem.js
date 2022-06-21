import { Image, Text, StyleSheet, View } from "react-native";
import { Link } from "@react-navigation/native";

export default function TripItem({ item: trip }) {
  return (
    // <Link>
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: trip.image }} />
      <Text style={styles.cardText}>{trip.title}</Text>
    </View>
    // </Link>
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
