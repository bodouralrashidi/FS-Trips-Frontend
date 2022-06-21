import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TripForm from "./TripForm";

const AddTripModal = ({ closeModal }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>New Trip</Text>
          <Ionicons
            name="close"
            size={28}
            color="hsl(174, 62%, 47%)"
            onPress={closeModal}
          />
        </View>
        <TripForm closeModal={closeModal} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTripModal;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
      flex: 1,
      marginTop:70,
      paddingHorizontal: 30,
      },
      android: {
        flex: 1,
        paddingHorizontal: 30,
      },
      default: {
        flex: 1,
        paddingHorizontal: 30,
      }
    })
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
