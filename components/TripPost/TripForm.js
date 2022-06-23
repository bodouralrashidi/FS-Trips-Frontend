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
import {  useToast } from 'native-base';
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";

const TripForm = ({ trip, navigation }) => {
  const toast = useToast();
  const isNew = !trip;
  const initialValues = isNew ? tripStore.emptyTrip : trip;

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        if ((!values.title) || (!values.description)|| (!values.image)|| (!values.location)) {
          toast.show({
            description: "Check Your Inputs 😊 ",
            placement: "top"
          })
        }else{
        if (isNew) {
          await tripStore.addTrip(values)& toast.show({
            description: "Trip Has Been Added 🔥",
            placement: "top"
          });;
          actions.resetForm();
        } else {
          await tripStore.updateTrip(values)& toast.show({
            description: "Updated ✅ ",
            placement: "top"
          });
          navigation.goBack();
        }
      }}
    }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
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
          
          <View style={styles.spacer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{isNew ? "ADD" : "UPDATE"}</Text>
          </TouchableOpacity>
          </View>
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
    borderBottomWidth:1,
    borderColor: "hsl(210,8%,75%)",
    borderRadius: 0,
    marginTop: 20,
    padding: 10,
  },
  spacer: {
    flexGrow: 1,
    alignItems: "center",
  },
  submitButton: {
    marginBottom: 15,
    padding: 16,
    borderRadius: 20,
    overflow: "hidden",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "hsl(174, 62%, 47%)",
    textAlign: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "hsl(224, 53%, 40%)" ,
    borderRadius: 100,
    paddingVertical: 15,
    width: 180,
    marginTop: 0,
    marginBottom: 50,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
