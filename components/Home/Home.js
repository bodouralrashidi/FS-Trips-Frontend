import React from "react";
import { observer } from "mobx-react";
import { FlatList, View, Modal, Text,RefreshControl } from "react-native";
import tripStore from "../../stores/tripStore";
import profileStore from "../../stores/profileStore";
import TripItem from "./TripItem";
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function Home({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    tripStore.fetchTrips();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const trips = tripStore.trips;
  const renderItem = ({ item }) => (
    <TripItem item={item} navigation={navigation} />
  );

  return (
    <View style ={{flex: 1}}> 
      <FlatList
      refreshControl= {
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
export default observer(Home);
