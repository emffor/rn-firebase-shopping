import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  //para criar o email e password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //login anônimo informações do usuário.
  async function handleSignInAnonymous(){
    const { user } = await auth().signInAnonymously();
    console.log(user);
  }

  //login e senha. essa estratégia não precisa usar o async
  function handleCreateUserAccount(){
   auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso!'))
    .catch(error => {
      // console.log(error.code);

      if(error.code === 'auth/email-already-in-use'){
       return Alert.alert('E-mail já cadastrado!');
      }

      if(error.code === 'auth/invalid-email'){
       return Alert.alert('E-mail inválido!');
      }

      if(error.code === 'auth/weak-password'){
       return Alert.alert('Senha muito fraca!');
      }
    })
  }

  //dados do usuário autenticado console.log(user));
  function handleSignInWithEmailAndPassword(){
   auth()
   .signInWithEmailAndPassword(email, password)
   .then(({ user }) => console.log(user))
    .catch(error => {
      // console.log(error.code);
      if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
       return Alert.alert('Usuário ou senha inválidos!');
      }
    })
   };

  //ligar com esqueceu a senha.
  function handleForgotPassword(){
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link para seu E-mail para você redefinir sua senha!'))
  }
  

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        
        <ButtonText 
        title="Recuperar senha" 
        onPress={handleForgotPassword} 
        />

        <ButtonText 
          title="Criar minha conta" 
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
