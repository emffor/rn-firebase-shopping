import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import storage from '@react-native-firebase/storage';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';

export function Upload() {
  const [image, setImage] = useState('');
  const [bytesTransferred, setBytesTransferred] = useState('0');
  const [progress, setProgress] = useState('0');

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  async function handleUpload() {
    const fileName = new Date().getTime();
    const reference = storage().ref(`/images/${fileName}.png`);

    //.putFile envia o arquivo pegando a URI do arquivo
    const uploadTask = reference.putFile(image);

    //'state_changed' -> estados da mudança do upload
    uploadTask.on('state_changed', taskSnapshot => {
      const percent = (( taskSnapshot.bytesTransferred / taskSnapshot.totalBytes ) * 100).toFixed(0);
      //passando o valor para o setProgress
      setProgress(percent);
      //passando o valor para o setBytesTransferred
      setBytesTransferred(`${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`);
    });

    uploadTask.then(async() => {
      const imageUrl = await reference.getDownloadURL();
      //console.log('imageUrl: ' + imageUrl);
      Alert.alert('Upload Concluído com sucesso!');
    });
  }

  return (
    <Container>
      <Header title="Upload de Fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          {progress}%
        </Progress>

        <Transferred>
          {bytesTransferred} bytes
        </Transferred>
      </Content>
    </Container>
  );
}


