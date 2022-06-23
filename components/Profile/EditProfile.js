import ProfileStore from "../../stores/profileStore";
import React from "react";
import authStore from "../../stores/authStore";
import {
  Button,
  Container,
  ScreenContainer,
  TextField,
  withTheme,
} from "@draftbit/ui";
import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
export default function EditProfile({ route, navigation }) {
  const user = route.params.user;
  const profile = route.params.profile;
  const bio = profile?.bio ?? "";
  const image =
    profile?.image ??
    "https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif";
  const Fname = user?.Fname ?? "";
  const Lname = user?.Lname ?? "";

  const [EditProfile, setEditProfile] = React.useState({
    bio,
    image,
  });
  const [Edituser, setEdituser] = React.useState({
    Fname,
    Lname,
  });
  const createTwoButtonAlert = () =>
    Alert.alert("Confirmation ", "do you want to save changes", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handlesubmit },
    ]);
  const handlesubmit = (event) => {
    console.log(EditProfile);
    ProfileStore.updateProfile(EditProfile, Edituser, authStore.user._id);
    navigation.navigate("Profile");
  };

  return (
    <ScreenContainer scrollable={true} hasSafeArea={false}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView5A}
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <Container
          style={styles.container9T}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <Text
            style={StyleSheet.flatten([
              styles.textEa,
              { color: "hsl(224, 53%, 40%)", fontWeight: "bold", fontSize: 20 },
            ])}
          >
            Create Your Profile
          </Text>

          <Image
            style={StyleSheet.flatten([styles.imageSq])}
            resizeMode="cover"
            source={{
              uri: EditProfile.image,
            }}
          />
          <View>
            <TextField
              style={styles.textFieldK7}
              type="underline"
              label="First Name"
              name="First Name"
              value={Edituser.Fname}
              keyboardType="default"
              leftIconMode="inset"
              onChangeText={(Fname) => setEdituser({ ...Edituser, Fname })}
            />
            <TextField
              style={styles.textFieldK7}
              type="underline"
              label="Last Name"
              name="Last Name"
              activeUnderlineColor="hsl(224, 53%, 40%)"
              value={Edituser.Lname}
              keyboardType="default"
              leftIconMode="inset"
              onChangeText={(Lname) => setEdituser({ ...Edituser, Lname })}
            />
            <TextField
              style={styles.textFieldK7}
              type="underline"
              label="image"
              name="image"
              activeUnderlineColor="hsl(224, 53%, 40%)"
              value={EditProfile.image}
              keyboardType="default"
              leftIconMode="inset"
              onChangeText={(image) =>
                setEditProfile({ ...EditProfile, image })
              }
            />
            <TextField
              style={styles.textField8U}
              type="underline"
              label="Bio"
              name="bio"
              maxLength={200}
              value={EditProfile.bio}
              keyboardType="default"
              leftIconMode="inset"
              onChangeText={(bio) => setEditProfile({ ...EditProfile, bio })}
            />
          </View>
        </Container>
        <Container
          style={styles.containerVk}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={createTwoButtonAlert}
          >
            <Text style={styles.appButtonText}>Done</Text>
          </TouchableOpacity>
        </Container>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container9T: {
    marginTop: 24,
    alignItems: "center",
  },
  buttonUf: {
    height: 48,
    width: 100,
    alignSelf: "stretch",
  },
  keyboardAvoidingView5A: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  textEa: {
    textAlign: "center",
  },
  containerVk: {
    alignItems: "center",
  },
  textUm: {
    marginTop: 16,
    textAlign: "center",
  },
  imageSq: {
    width: 100,
    height: 100,
    marginTop: 24,
    borderRadius: 50,
  },
  textFieldK7: {
    height: 70,
    marginTop: 20,
    borderBottomWidth: 2,
    borderColor: "hsl(224, 53%, 40%)",
    width: 350,
  },
  textField8U: {
    height: 70,
    marginTop: 20,
    borderBottomWidth: 2,
    borderColor: "hsl(224, 53%, 40%)",
    width: 350,
  },
  appButtonContainer: {
    marginTop: 40,
    backgroundColor: "hsl(224, 53%, 40%)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
    marginBottom: 5,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  center: {
    paddingLeft: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    input: {
      width: "80%",
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#5f6368",
      marginBottom: -30,
      marginTop: 50,
    },
  },
});
