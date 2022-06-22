import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Formik } from "formik";
import React from "react";
import tripStore from "../../stores/tripStore";

const TripForm = ({ trip, navigation }) => {
  const isNew = !trip;
  const initialValues = isNew ? tripStore.emptyTrip : trip;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        if (isNew) {
          await tripStore.addTrip(values);
          actions.resetForm();
        } else {
          await tripStore.updateTrip(values);
          navigation.goBack();
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("title")}
              placeholder="Title"
              autoFocus
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("description")}
              placeholder="Description"
              multiline={true}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("image")}
              placeholder="Image"
              onBlur={handleBlur("image")}
              value={values.image}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("location")}
              placeholder="Location"
              onBlur={handleBlur("location")}
              value={values.location}
            />
          </ScrollView>
          <View style={styles.spacer}></View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.submitButton}>{isNew ? "ADD" : "UPDATE"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default TripForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "hsl(210,8%,75%)",
    borderRadius: 30,
    marginTop: 20,
    padding: 10,
  },
  spacer: {
    flexGrow: 1,
  },
  submitButton: {
    marginBottom: 15,
    padding: 16,
    borderRadius: 30,
    overflow: "hidden",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "hsl(174, 62%, 47%)",
    textAlign: "center",
  },
});