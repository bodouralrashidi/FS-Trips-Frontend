import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import tripStore from "../../stores/tripStore";
import TripForm from "./TripForm";

const TripPost = ({ route, navigation }) => {
  const id = route.params?.id;
  tripStore.setSingleTripWithId(id);
  const trip = tripStore.singleTrip;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TripForm trip={trip} navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TripPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    letterSpacing: 0.5,
    color: "hsl(174, 62%, 47%)",
    fontWeight: "bold",
  },
});
