import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import Card from './Card';
import UserContext from './context/UserContext';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState(null);
  const { backendURL } = useContext(UserContext);
  const { setBackendURL } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  // Searched Items:
  const [searchproducts, setsearchProducts] = useState(null);
  const [search, setSearch] = useState('');

  const SearchProduct = async () => {
    try {
      const response = await axios.get(backendURL + `/products/search/?q=${search}`);
      if (response.data.status === 200) {
        setsearchProducts(response.data.data);
      } else {
        console.log('Error in Extracting data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function calling() {
    try {
      const response = await axios.get(backendURL + '/products/');
      if (response.data.status === 200) {
        setProducts(response.data.data);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onRefresh() {
    setsearchProducts(null);
    calling();
  }

  useEffect(() => {
    calling();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={(text) => setSearch(text)}
                value={search}
              />
              <TouchableOpacity
                onPress={() => {
                  SearchProduct();
                }}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'tomato',
                    width: 100,
                    height: 30,
                    borderRadius: 30,
                    elevation: 10,
                    marginLeft: 20,
                  },
                ]}
              >
                <Text style={[{ color: '#fff', fontWeight: '700', fontSize: 15 }]}>Search</Text>
              </TouchableOpacity>
            </View>

              {searchproducts?
              (<View>
              <Text style={[{fontSize:25,textAlign:'center'}]}>Searched Items</Text>
              </View>)
              :
              (null)
              }
            <ScrollView horizontal={true}>
              {searchproducts ? (
                <View style={{ flexDirection: 'row', padding: 10}}>
                  {searchproducts.map((product) => (
                    <View style={[{marginHorizontal:10}]}><Card id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} /></View>
                  ))}
                </View>
                
              ) : null}
            </ScrollView>

            {products ? (
              products.map((product) => (
                <View style={[{marginHorizontal:5}]}><Card id={product.id} name={product.name} description={product.description} image={product.image} price={product.price} /></View>
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  inputContainer: {
    width: '99%',
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Home;
