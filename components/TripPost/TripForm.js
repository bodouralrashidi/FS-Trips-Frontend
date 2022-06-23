import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Button,
  Image,
} from "react-native";
import { Formik } from "formik";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";

const TripForm = ({ trip, navigation }) => {
  const isNew = !trip;
  const initialValues = isNew ? tripStore.emptyTrip : trip;
  const [image, setImage] = useState(null);

  const onSubmit = async (values, actions) => {
    if (isNew) {
      const userId = authStore.user._id;
      await tripStore.addTrip({ ...values, userId });
      actions.resetForm();
    } else {
      await tripStore.updateTrip(values);
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("title")}
              placeholder="Title"
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
            {/* <TextInput
              style={styles.textInput}
              onChangeText={handleChange("image")}
              placeholder="Image"
              onBlur={handleBlur("image")}
              value={values.image}
            /> */}
            <TouchableOpacity style={{ backgroundColor: "black" }}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              {!image && (
                <Image
                  source={require("../../assets/outline/add-image.png")}
                  style={styles.noImage}
                />
              )}
            </TouchableOpacity>

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
    borderBottomWidth: 1,
    borderColor: "hsl(210,8%,75%)",
    marginTop: 20,
    padding: 10,
  },
  noImage: {
    height: 200,
    resizeMode: "cover",
    aspectRatio: 1,
    marginTop: 20,
    alignSelf: "center",
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
