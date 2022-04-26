import React from 'react';

import firestore from '@react-native-firebase/firestore';

import { ButtonIcon } from '../ButtonIcon';
import { Container, Info, Title, Quantity, Options } from './styles';
import { Alert } from 'react-native';

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
}

type Props = {
  data: ProductProps;
}

export function Product({ data }: Props) {

  function handleDoneToggle(){
    firestore()
    .collection('products')
    .doc(data.id)
    //done: !data.done -> pega o que já tem e inverter. ex: se tiver false vira true e vice-versa.
    .update({
      done: !data.done,
      // description: 'Pão de queijo',
      // quantity: data.quantity - 1,
    })
  }

  function handleDelete(){
    firestore()
    .collection('products')
    .doc(data.id)
    .delete()
    .then(() => {
      Alert.alert('Deletado com sucesso!');
    })
    .catch(error => console.error(error));
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>
          {data.description}
        </Title>

        <Quantity>
          Quantidade: {data.quantity}
        </Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
          onPress={handleDelete}
        />
      </Options>
    </Container>
  );
}
