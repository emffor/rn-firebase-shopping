import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';


export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
    .collection('products')
    .orderBy('quantity')
    .startAt(2)
    .endAt(4)
    // .endBefore(5)
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      }) as ProductProps[];

      setProducts(data);
    });

    return () => subscribe();
  }, []);
  
/*   //LEITURA DE UM ÚNICO DOCUMENTO
  useEffect(() => {
    firestore()
    .collection('products')
    .doc('OxLjGtyQpbR58JUeF62A')
    .get()
    .then(response => console.log({
      id: response.id,
      ...response.data()
    }));
    
  },[]); */

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
