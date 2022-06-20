import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingActionButton() {
  const handlePress = () => {
    console.log("pressed");
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Ionicons name="ios-add" size={32} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 8,
    borderRadius: 50,
    bottom: 10,
    right: 10,
    backgroundColor: "hsl(174, 62%, 47%)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
