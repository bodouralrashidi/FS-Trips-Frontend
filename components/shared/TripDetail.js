import { Container } from "@draftbit/ui";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import tripStore from "../../stores/tripStore";
import { Feather } from "@expo/vector-icons";

function TripDetail({ route, navigation }) {
  const { id } = route.params;
  tripStore.setSingleTripWithId(id);
  const trip = tripStore.singleTrip ?? tripStore.emptyTrip;

  const handleDelete = async () => {
    await tripStore.deleteTrip(id);
    navigation.popToTop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip.title,
      headerRight: () => (
        <Feather
          name="edit"
          size={18}
          color="hsl(0, 0%, 35%)"
          onPress={() => {
            navigation.navigate("Edit Trip", { id });
          }}
        />
      ),
    });
  }, [trip.title]);

  if (!trip) return <Text>Loading</Text>;

  return (
    <View style={styles.container}>
      <Image
        style={styles.tripImage}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
        }}
      />
      <Image
        style={styles.star}
        source={require("../../assets/getaway_logo5.png")}
      />
      <Text style={styles.title}>
        {"📍 "}
        {trip.location}
      </Text>
      {/* <Text style={styles.location}>Paris, France</Text> */}
      <Text style={styles.para}>{trip.description}</Text>
      <StatusBar style="auto" />
      <Container style={styles.buttonn}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={handleDelete}
        >
          <Text style={styles.appButtonText}>Delete</Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonn: {
    alignItems: "center",
    justifyContent: "center",
  },
  tripImage: {
    position: "relative",
    top: 0,
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 23,
    padding: 10,
    textTransform: "capitalize",
  },
  location: {
    marginTop: -5,
    fontSize: 12,
    paddingLeft: 10,
    color: "#333",
  },
  star: {
    position: "absolute",
    top: 310,
    right: 15,
    width: 40,
    height: 40,
    tintColor: "hsl(50,100%,48%)",
    zIndex: 1,
  },
  para: {
    padding: 10,
    fontSize: 18,
    fontWeight: "300",
    color: "#333",
  },
  appButtonContainer: {
    position: "relative",
    top: 100,
    elevation: 8,
    // backgroundColor: "#97e5f1",
    backgroundColor: "red",
    borderRadius: 100,
    paddingVertical: 15,
    width: 180,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default observer(TripDetail);