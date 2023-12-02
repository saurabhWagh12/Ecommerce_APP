import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/themed';
import UserContext from './context/UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './CartItem';

const Cart = () => {
  const dict = {
    'Volley Ball': 'price_1OAYVDSHgfpV3VGrsai38oIT',
    'Cricket Bat': 'price_1OAYVlSHgfpV3VGrTKul2Tf4',
    'Foot Ball': 'price_1OAYU4SHgfpV3VGrIMMCcCJr',
    'Badminton Racket': 'price_1OAYWDSHgfpV3VGrGSgbKM0u',
  };
  const { backendURL } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const { total, setTotal } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post(backendURL + '/getcartproducts/', { token: token });
      if (response.data.status === 200) {
        setProduct(response.data.data);
        setTotal(response.data.total);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View
            style={[
              { flexDirection: 'row', justifyContent: 'center', gap: 15, alignItems: 'center', paddingVertical: 30 },
            ]}
          >
            <Text style={[{ fontSize: 20 }]}>Total: {total}</Text>
            <TouchableOpacity style={styles.ButtonCheckout}>
              <Text
                style={[{ textAlign: 'center', fontSize: 15, color: '#fff', fontWeight: '700' }]}
                onPress={() => {}}
              >
                Proceed To Checkout
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {product &&
              product.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  image={item.image}
                />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  ButtonCheckout: {
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: 'tomato',
    width: 180,
    height: 35,
    fontWeight: '700',
    elevation: 10,
    borderRadius: 5,
  },
});
