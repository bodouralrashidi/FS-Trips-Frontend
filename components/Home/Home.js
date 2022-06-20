import React from "react";
import { observer } from "mobx-react";
import { StyleSheet, FlatList, View } from "react-native";
import tripStore from "../../stores/tripStore";
import TripItem from "./TripItem";

function Home() {
  const trips = tripStore.trips;

  return (
    <View>
      <FlatList
        data={trips}
        renderItem={TripItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
export default observer(Home);
