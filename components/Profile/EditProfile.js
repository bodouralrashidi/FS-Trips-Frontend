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
} from "react-native";
export default function EditProfile({ navigation }) {
  const [EditProfile, setEditProfile] = React.useState({
    bio: "",
    image:
      "http://cdn.cnn.com/cnnnext/dam/assets/180219103122-zanzibar-and-its-islands---mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg",
  });
  const [Edituser, setEdituser] = React.useState({
    Fname: "",
    Lname: "",
  });

  const handlesubmit = (event) => {
    console.log(EditProfile);
    ProfileStore.updateProfile(
      EditProfile,
      Edituser,
     authStore.user._id
    );
  };

  return (
    <ScreenContainer scrollable={true} hasSafeArea={true}>
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
          <Text style={StyleSheet.flatten([styles.textEa, { color: "black" }])}>
            Create Your Profile
          </Text>
          <Text style={StyleSheet.flatten([styles.textUm, { color: "black" }])}>
            Since this is your first time, we just need some basic information
            to get you started.
          </Text>
          <Image
            style={StyleSheet.flatten([styles.imageSq])}
            resizeMode="cover"
            source={{
              uri: EditProfile.image,
            }}
          />
          <TextField
            style={styles.textFieldK7}
            type="underline"
            label="First Name"
            name="First Name"
            keyboardType="default"
            leftIconMode="inset"
            onChangeText={(Fname) => setEdituser({ ...Edituser, Fname })}
          />
          <TextField
            style={styles.textFieldK7}
            type="underline"
            label="Last Name"
            name="Last Name"
            keyboardType="default"
            leftIconMode="inset"
            onChangeText={(Lname) => setEdituser({ ...Edituser, Lname })}
          />
          <TextField
            style={styles.textField8U}
            type="underline"
            label="Bio"
            name="bio"
            keyboardType="default"
            leftIconMode="inset"
            onChangeText={(bio) => setEditProfile({ ...EditProfile, bio })}
          />
        </Container>
        <Container
          style={styles.containerVk}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <Button style={styles.buttonUf} type="solid" onPress={handlesubmit}>
            Done
          </Button>
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
    height: 82,
    marginTop: 16,
  },
  textField8U: {
    height: 82,
    marginTop: 16,
  },
});
