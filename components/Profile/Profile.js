import * as React from "react";
import { Screen } from "native-base";
import { View, StyleSheet, Dimensions, StatusBar, Button } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import FavouriteTabView from "./FavouriteTabView";
import TripsTabView from "./TripsTabView"
import EditProfile from "./EditProfile";

const TripsRoute = () => (
  <TripsTabView/>
);
const FavouriteRoute = () => (
  <EditProfile/>
);

const initialLayout = { width: Dimensions.get("window").width };

const renderScene = SceneMap({
  first: TripsRoute,
  second: FavouriteRoute,
});

export default function Profile({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Post" },
    { key: "second", title: "Favourite" },
  ]);

  return (
    <>
  
      <View style={{ height: 100 }}>
        
        <Button title="Edit Profile" onPress={() =>navigation.navigate('Profile', { name: 'Jane' })} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
