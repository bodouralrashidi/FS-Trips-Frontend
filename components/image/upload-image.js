import React, { useState, useEffect } from 'react';
import { View , StyleSheet,RefreshControl,Button,Linking } from 'react-native';
import { observer } from 'mobx-react';
import { NativeBaseProvider,Avatar,ScrollView,Text,Platform,Image, Link  } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import NavBar from './navBar'
import * as FileSystem from 'expo-file-system';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
function Test(){
  const [image, setImage] = useState("https://cdn.sick.com/media/ZOOM/2/82/782/IM0077782.png");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  let formData = new FormData();
  formData.append('photo', { uri: localUri, name: filename, type });

  return await fetch("http://192.168.8.123:8001/upload", {
    method: 'POST',
    type: 'image/png',
    body: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
    return (
  <NativeBaseProvider>
      <View style={styles.container}>
       <NavBar />
          <ScrollView  showsVerticalScrollIndicator={false} refreshControl= {
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image from camera roll" onPress={pickImage} />
              {image && <Image alt="image-upload" source={{ uri: image }} style={{ width: 200, height: 200 }} />}
             
          </View>
          </ScrollView>
      </View>
  </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: "#eaeaea"
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});
export default observer(Test)