import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

type User = {
  uid: string;
}

export function Routes() {
// useState<User | null>(null) -> ou ele vai ter um user ou vai ser null
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo);
      
      setUser(userInfo);
      
    });
    //função de limpeza
    return subscriber;
  },[]);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}