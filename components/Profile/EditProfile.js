import React from "react";

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
export default function EditProfile({navigation}) {
  const image =
    "http://cdn.cnn.com/cnnnext/dam/assets/180219103122-zanzibar-and-its-islands---mnemba-a-view-from-the-sky-mnemba-island-lodge.jpg";
  const [textFieldValue, setTextFieldValue] = React.useState(undefined);
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
          <Text style={StyleSheet.flatten([styles.textEa, { color: "Black" }])}>
            Create Your Profile
          </Text>
          <Text style={StyleSheet.flatten([styles.textUm, { color: "Black" }])}>
            Since this is your first time, we just need some basic information
            to get you started.
          </Text>

          <Image
            style={StyleSheet.flatten([styles.imageSq])}
            resizeMode="cover"
            source={{
              uri: image,
            }}
          />
          <TextField
            style={styles.textFieldK7}
            type="underline"
            label="Name"
            keyboardType="default"
            leftIconMode="inset"
            value={textFieldValue}
            onChangeText={(textFieldValue) => setTextFieldValue(textFieldValue)}
          />
          <TextField
            style={styles.textField8U}
            type="underline"
            label="Title"
            keyboardType="default"
            leftIconMode="inset"
            value={textFieldValue}
            onChangeText={(textFieldValue) => setTextFieldValue(textFieldValue)}
          />
        </Container>
        <Container
          style={styles.containerVk}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <Button style={styles.buttonUf} type="solid">
            edit{" "}
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
    borderRadius: "50%",
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
