import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainContainer from './src/MainContainer';
import Login from './src/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './src/context/UserContext';

// const Stack = createNativeStackNavigator();

export default function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {isLoggedIn} = useContext(UserContext);
  const {setIsLoggedIn} = useContext(UserContext);
  const {backendURL} = useContext(UserContext);
  const {setBackendURL} = useContext(UserContext);

  function check(){
    return isLoggedIn ? <MainContainer /> : <Login />
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      setBackendURL('http://172.20.10.5:8000');
      try {
        const value = await AsyncStorage.getItem('token');
        if(value===null){
            console.log("NUll")
        }else{
          // console.log(value)
          setIsLoggedIn(true);
        }
        check();
        
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return isLoggedIn ? <MainContainer /> : <Login />
}

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
});
