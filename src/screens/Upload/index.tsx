import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import storage from '@react-native-firebase/storage';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';

import { Container, Content, Progress, Transferred } from './styles';

export function Upload() {
  const [image, setImage] = useState('');

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
    //usar a numeração como estratégia para definir o nome do arquivo,para não sobrescrever o arquivo e ter o nome único. 
    const fileName = new Date().getTime();
    //salvar dentro dessa pasta e setando e nome da foto.
    const reference = storage().ref(`/images/${fileName}.png`);

    //upload pelo .putFile (image é o endereço da foto no dispositivo)
    reference
      .putFile(image)
      .then(() => Alert.alert('Imagem enviada com sucesso'))
      .catch((error) => console.error(error));
  }

  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button
          title="Fazer upload"
          onPress={handleUpload}
        />

        <Progress>
          0%
        </Progress>

        <Transferred>
          0 de 100 bytes transferido
        </Transferred>
      </Content>
    </Container>
  );
}
