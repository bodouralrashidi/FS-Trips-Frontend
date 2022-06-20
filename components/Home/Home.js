import React from "react";
import { observer } from "mobx-react";
import { FlatList, View } from "react-native";
import tripStore from "../../stores/tripStore";
import TripItem from "./TripItem";
import FloatingActionButton from "./FloatingActionButton";

function Home() {
  const trips = tripStore.trips;

  return (
    <View>
      <FlatList
        data={trips}
        renderItem={TripItem}
        keyExtractor={(item) => item._id}
      />
      <FloatingActionButton />
    </View>
  );
}
export default observer(Home);
