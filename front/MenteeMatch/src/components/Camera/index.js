import React from 'react';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { useCamera } from 'react-native-camera-hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Camera({ route, navigation }) {
  const [{ cameraRef }, { takePicture }] = useCamera(null);
  const [imgCache, setImgCache] = React.useState('');
  const [typeCamera, setTypeCamera] = React.useState(false);

  React.useEffect(() => {}, [imgCache]);

  const takePhoto = async () => {
    try {
      const data = await takePicture();
      setImgCache(data.uri);
    } catch (err) {
      console.log(err);
    }
  };
  const setProfile = () => {
    route.params.onPicture(imgCache);
    setImgCache('');
    navigation.navigate('UserDetails');
  };

  return (
    <View style={styles.container}>
      {imgCache ? (
        <>
          <Image source={{ uri: imgCache }} style={styles.preview} />
          <TouchableOpacity
            style={styles.capture}
            onPress={() => setImgCache('')}>
            <Text>Tomar otra foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={() => setProfile()}>
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={styles.preview}
          type={typeCamera ? RNCamera.Constants.Type.back: RNCamera.Constants.Type.front}>
          <View style={{ flexDirection:'row', paddingLeft: 130 }}>
          <TouchableOpacity style={styles.capture}>
            <Ionicons
              name="camera"
              size={50}
              color={'#FFFFFF'}
              onPress={() => takePhoto()}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture}>
            <Ionicons
              name="camera-reverse"
              size={50}
              color={'#FFFFFF'}
              onPress={() => setTypeCamera(!typeCamera)}
            />
          </TouchableOpacity>
        </View>
        </RNCamera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
