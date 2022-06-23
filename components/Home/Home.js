import React from "react";
import { observer } from "mobx-react";
import { FlatList, View, Modal, Text } from "react-native";
import tripStore from "../../stores/tripStore";
import TripItem from "./TripItem";

function Home({ navigation }) {
  const trips = tripStore.trips;
  const renderItem = ({ item }) => (
    <TripItem item={item} navigation={navigation} />
  );

  return (
    <View style ={{flex: 1}}>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
export default observer(Home);
