import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      if (cameraStatus.status !== 'granted') {
        setErrorMsg('Permiso de acceso a la cámara denegado.');
      }
    })();
  }, []);


  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setErrorMsg(null); 
      }
    } catch (error) {
      setErrorMsg('Hubo un problema al intentar acceder a la cámara.');
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <>

          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Ionicons name="camera-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Tomar una foto con la cámara</Text>
          </TouchableOpacity>

          {image && (
            <View style={styles.imageContainer}>
              <Text style={styles.infoText}>Imagen seleccionada:</Text>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

