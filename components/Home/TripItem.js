import { Image, Text, StyleSheet, Dimensions } from "react-native";
import { Center, Container } from "native-base";
import { Link } from "@react-navigation/native";

export default function TripItem({ trip }) {
  return (
    <Container style={styles.container}>
      <Image style={styles.cardImage} source={{ uri: trip.image }} />
      <Text>{trip.title}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: Dimensions.get("window").width,
    height: 200,
    resizeMode: "stretch",
  },
  container: {
    width: Dimensions.get("window").width,
  },
});
