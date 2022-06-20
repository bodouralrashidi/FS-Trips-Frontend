import React from "react";
import { observer } from "mobx-react";
import { StyleSheet, ScrollView, View } from "react-native";
import tripStore from "../../stores/tripStore";
import TripItem from "./TripItem";

function Home() {
  const trips = tripStore.trips.map((trip) => (
    <TripItem key={trip._id} trip={trip} />
  ));

  return <ScrollView style={styles.scrollView}>{trips}</ScrollView>;
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "#333",
  },
});
export default observer(Home);
