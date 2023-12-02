import { StyleSheet, Text, View, Image, TouchableOpacity,Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from './context/UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductPage = (props) => {
  const { backendURL } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [urlImage, setImageURL] = useState("");

  const createTwoButtonAlert = (message) =>
  Alert.alert(
    "Status",
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  useEffect(() => {
    async function calling() {
      try {
        const response = await axios.get(backendURL + `/getproduct/${props.id}/`);
        if (response.data.status === 200) {
          setProduct(response.data.data);
        } else {
          console.log('Error');
        }
      } catch (error) {
        console.log(error);
      }
    }
    calling();
  }, [props.id]);

  useEffect(() => {
    if (product !== null) {
      setImageURL(backendURL + '/static' + product.image);
    }
  }, [product]);

  async function addToCart(){
    const token = await AsyncStorage.getItem('token');
    const t = {token:token}
    try {
      const response = await axios.post(backendURL+'/addtocart/',{productId:props.id}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          },
          params: {t}, 
      });
      if(response.data.status===200){
        createTwoButtonAlert(response.data.message);
        
      }else{
        createTwoButtonAlert(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      {product ? (
        <>
          <Text style={styles.title}>{product.name}</Text>
          <View style={[{ alignItems: 'center', marginVertical: 15 }]}>
            <Image source={{ uri: urlImage }} style={styles.image} />
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'center',margin:30}]}>
            <Text style={styles.priceStyle}>₹ {product.price}</Text>
            <TouchableOpacity
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'tomato',
                  width: 130,
                  height: 30,
                  borderRadius: 30,
                  elevation: 10,
                  marginLeft: 20,
                },
              ]}
            >
              <Text
                style={[
                  { color: '#fff', fontWeight: '700', fontSize: 15 },
                ]}
                onPress={() => {
                  addToCart();
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[{fontSize:18,fontWeight:'400'}]}>{product.description}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  priceStyle:{
    fontSize:20,
    fontWeight:'600',
  },
});
