import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import profileStore from "../../stores/profileStore"

export default function TripsTabView() {

  const text = "island";
  const image =
    "http://cdn.cnn.com/cnnnext/dam/assets/180219103122-zanzibar-and-its-islands---mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg";
  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={{
          padding: 10,
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  container: {
    width: 150,
    height: 200,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "70%",
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
