import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';

import storage from '@react-native-firebase/storage';

import { Container, PhotoInfo } from './styles';
import { Header } from '../../components/Header';
import { Photo } from '../../components/Photo';
import { File, FileProps } from '../../components/File';

/* import { photosData } from '../../utils/photo.data'; */

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState('');
  const [photoInfo, setPhotoInfo] = useState('');

  //obter a URL de exibição da imagem
  async function handleShowImage(path: string) {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage);

    const info = await storage().ref(path).getMetadata();
    setPhotoInfo(`Upload realizada em ${info.timeCreated}`);
    // console.log('info: ' + info.timeCreated);
  }

  //deleta arquivos no storage do firebase
  async function handleDeleteImage(path: string) {
    await storage()
    .ref(path)
    .delete()
    .then(() => {
      Alert.alert('Imagem excluída com sucesso!')
      //2 - e chama quando for deletado pra recarregar as imagens
      fetchImages();
    })
    .catch(error => console.error(error));
  }

  //fazer recarregar a tela. //agora é uma função que busca pelas imagens
  async function fetchImages(){
    storage()
    .ref('/images')
    .list()
    .then(result => {
      const files: FileProps[] = [];

      result.items.forEach(file => {
        files.push({
          name: file.name,
          path: file.fullPath
        });
      });

      setPhotos(files);
    })
  }

  //chama a função aqui agora
  useEffect(() => {
    //chamando a função em dois lugares.
    //1- quando carregar a interface, busca as imagens
    fetchImages();
  },[]);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>
        {photoInfo}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
