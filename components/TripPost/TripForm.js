import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import geolocation from "./../../geolocation"
import Checkbox from 'expo-checkbox';
import { Formik } from "formik";
import React from "react";
import {  useToast } from 'native-base';
import tripStore from "../../stores/tripStore";
import authStore from "../../stores/authStore";

const TripForm = ({ trip, navigation }) => {
  const toast = useToast();
  const isNew = !trip;
  const initialValues = isNew ? tripStore.emptyTrip : trip;

  const [products, setProducts] = React.useState([...geolocation]);
  const handleChangee = (name) => {
    let temp = products.map((product) => {
      if (name === product.name) {
        return { ...product, isChecked: !product.isChecked };
      }
      return { ...product, isChecked: false };
    });
    setProducts(temp);
    console.log(name)
  };

  const listing = products.map((item)=>{
    return(
      <View style={styles.locationBox} key={item.name}>
        <Checkbox value={item.isChecked} onValueChange={() => handleChangee(item.name)}/>
        <Text style={styles.boxText}>{item.name}</Text>
      </View>
    )
  })
  // const onSubmit = async (values, actions) => {
  //   if (isNew) {
  //     const userId = authStore.user._id;
  //     await tripStore.addTrip({ ...values, userId });
  //     actions.resetForm();
  //   } else {
  //     await tripStore.updateTrip(values);
  //     navigation.goBack();
  //   }
  // };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        if ((!values.title) || (!values.description)|| (!values.image)) {
          toast.show({
            description: "Check Your Inputs 😊 ",
            placement: "top"
          })
        }else{
          const location = products.find(product=>product.isChecked).name
        if (isNew) {
          const userId = authStore.user._id;
          await tripStore.addTrip({ ...values,location , userId })& toast.show({
            description: "Trip Has Been Added 🔥",
            placement: "top"
          });;
          actions.resetForm();
          setProducts([...geolocation])
        } else {
          await tripStore.updateTrip({...values, })& toast.show({
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
          <View showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
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
            <Text style={styles.textInput}> Location:</Text>
          <View style={styles.locationContainer}>
            <ScrollView>
            {listing}
            </ScrollView>
            </View>
          </View>
          
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
  locationBox:{
    flexDirection:"row",
    padding:5,
  },
  boxText:{
    marginLeft:10,
  },
  locationContainer:{
    height:150,
    padding:10
  }
});
